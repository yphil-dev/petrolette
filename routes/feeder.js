const fetch = require('node-fetch'),
      iconv = require('iconv-lite'),
      FeedParser = require('feedparser');

exports.getFeed = getFeed;

function maybeTranslate(res, charset) {
  var iconvStream;
  if (!iconvStream && charset && !/utf-*8/i.test(charset)) {
    try {
      iconvStream = iconv.decodeStream(charset);
      iconvStream.on('error', () => { return; });
      res = res.pipe(iconvStream);
    } catch (err) {
      res.emit('error', err);
    }
  }
  return res;
}

function getParams(str) {
  var params = str.split(';').reduce(function(params, param) {
    var parts = param.split('=').map(function(part) { return part.trim(); });
    if (parts.length === 2) {
      params[parts[0]] = parts[1];
    }
    return params;
  }, {});
  return params;
}

function formatError(error) {

  let message = (error.message) ? error.message : 'A network error has occured';
  let type = (error.type) ? error.type : 'Network';
  let status = (error.status && Number.isInteger(error.status)) ? error.status : 0;

  return { type: type, status: status, message: message };

}

async function getFeed(feedUrl, lastItem) {
  try {
    const res = await fetch(feedUrl, {
			headers: {
				'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/114.0'},
			'compress': true,
      'redirect': 'follow'
    });

    if (res.status != 200) {
			console.error('AAAAAAH', res);
      throw formatError({ type: res.type, status: res.status, message: res.statusText });
    } else {
			console.error('OK:', res);
		}

    const feedparser = new FeedParser();
    const feedItems = [];
    const charset = getParams(res.headers.get('content-type') || '').charset;
    const responseStream = maybeTranslate(res.body, charset);
    responseStream.pipe(feedparser);

    return new Promise((resolve, reject) => {
      feedparser.on('error', error => reject(formatError(error)))
        .on('readable', function () {
          try {
            let item;
            while (item = this.read()) {
              feedItems.push(item);
            }
          } catch (error) {
						console.error('AAAH', error);
            reject(formatError(error));
          }
        })
        .on('end', function () {
          if (feedItems.length === 0) {
            reject(formatError({ type: 'Syntax', status: res.status, message: 'Feed OK, but empty' }));
          }

          let newLastItem;
          let totalNewItems;
          let i = 0;
          feedItems.forEach(countItems);

          function countItems(item) {
            i++;
            if (newLastItem == undefined) newLastItem = item.link;
            if (item.link == lastItem) totalNewItems = i - 1;
          }

          if (totalNewItems == undefined) totalNewItems = i;
          const meta = this.meta;

          resolve({
            feedItems,
            feedTitle: meta.title || feedUrl,
            feedLink: meta.link || feedUrl,
            newLastItem,
            totalNewItems,
            feedIcon: meta.image.url || null
          });
        });
    });
  } catch (error) {
		console.error('AAAH', error);
    throw formatError({ type: error.type, status: error.status, message: error.message });
  }
}

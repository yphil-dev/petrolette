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

function getFeed(feedUrl, lastItem, callback) {
  
  fetch(feedUrl, {
			headers: {
				'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/114.0'},
			'compress': true,
      'redirect': 'follow'
  }).then(function(res) {

    if (res.status != 200) {
      // console.error('whoaaaa: %o (%s)', res.statusText, feedUrl);
      callback(formatError({type: res.type, status: res.status, message: res.statusText}));
    }
      
    var feedparser = new FeedParser();
    var feedItems = [];
    var charset = getParams(res.headers.get('content-type') || '').charset;
    var responseStream = res.body;
    responseStream = maybeTranslate(responseStream, charset);
    responseStream.pipe(feedparser);

    feedparser.on('error', function(error) {

      callback(formatError(error));

    }).on('readable', function() {

      try {
        var item = this.read();
        if (item !== null) {
          feedItems.push(item);
        }
      }
      catch (error) {
        callback(formatError(error));
      }

    }).on('end', function() {

      if (feedItems.length === 0) {
        callback(formatError({ type: 'Syntax', status: res.status, message: 'Feed OK, but empty' }));
      }

      var newLastItem;
      var totalNewItems;
      var i = 0;

      feedItems.forEach(countItems);

      function countItems(item) {
        i++;
        if (newLastItem == undefined) newLastItem = item.link;
        if (item.link == lastItem) totalNewItems = i - 1;
      }

      if (totalNewItems == undefined) totalNewItems = i;

      const meta = this.meta;
			
      return callback(null, feedItems, meta.title || feedUrl, meta.link || feedUrl, newLastItem, totalNewItems, meta.image.url || null);

    });

  }).catch((error) => {
    callback(formatError({type: error.type, status: error.status, message: error.message}));
  });
}

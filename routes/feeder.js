const fetch = require('node-fetch'),
      zlib = require('zlib'),
      iconv = require('iconv-lite'),
      FeedParser = require('feedparser');

exports.getFeed = getFeed;

function maybeTranslate (res, charset) {
  var iconvStream;
  // Decode using iconv-lite if its not utf8 already.
  if (!iconvStream && charset && !/utf-*8/i.test(charset)) {
    try {
      iconvStream = iconv.decodeStream(charset);
      console.error('ICONV: Converting from charset %s to utf-8', charset);
      iconvStream.on('error', () => {return;});
      res = res.pipe(iconvStream);
    } catch(err) {
      res.emit('error', err);
    }
  }
  return res;
}

function getParams(str) {
  var params = str.split(';').reduce(function (params, param) {
    var parts = param.split('=').map(function (part) { return part.trim(); });
    if (parts.length === 2) {
      params[parts[0]] = parts[1];
    }
    return params;
  }, {});
  return params;
}

function getFeed (feedUrl, lastItem, callback) {

  try {

    fetch(feedUrl, {
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36',
      'accept': 'text/html,application/xhtml+xml',
      redirect: 'follow'
    }).then(function (res) {

      var feedparser = new FeedParser();
      var feedItems = [];
      var charset = getParams(res.headers.get('content-type') || '').charset;
      var responseStream = res.body;
      responseStream = maybeTranslate(responseStream, charset);
      responseStream.pipe(feedparser);
      
      return new Promise((resolve, reject) => {
        feedparser.on('error', function(error) {
          console.error('## feedParserErr: %s (%s)', error.message, feedUrl);
          reject('woopsie');
          return callback({error:error, errno:res.status, message:error.message});
        }).on('readable', function() {
          try {
            let item;
            while ((item = this.read())) {
              if (item !== null) {
		feedItems.push(item);	
              }
            }
          }
          catch (err) {
            console.error('## feedParserCatchErr: %s (%s)', err, feedUrl);
          }
        }).on ('end', function () {

	  var newLastItem;
	  var totalNewItems;
	  var i = 0;

	  feedItems.forEach(countItems);

	  function countItems(item) {
	    i++;
	    if (newLastItem == undefined) newLastItem = item.link;
	    if (item.link == lastItem) {
	      totalNewItems = Number(i - 1);
	    }
	  }

	  var meta = this.meta;
	  var thereArenewItems = false;
          resolve();
          console.error('### Return i:%s, lastItem: [%s], totalNewItems: %d thereArenewItems: [%s]', i, lastItem, totalNewItems, thereArenewItems);
          return callback(null, feedItems, meta.title || 'Untitled', meta.link || feedUrl, newLastItem, totalNewItems);
        });
      });

    }).catch((error) => {
      console.error('Whooaps: %s (%s)', error.message, error.errno);
      callback(error);
    });

  } catch (err) {
    console.error('Whoops: %s (%s)');
  }

}

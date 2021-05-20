const fetch = require('node-fetch'),
  zlib = require('zlib'),
  iconv = require('iconv-lite'),
  FeedParser = require('feedparser');

exports.getFeed = getFeed;

function maybeTranslate(res, charset) {
  var iconvStream;
  // Decode using iconv-lite if its not utf8 already.
  if (!iconvStream && charset && !/utf-*8/i.test(charset)) {
    try {
      iconvStream = iconv.decodeStream(charset);
      console.error('ICONV: Converting from charset %s to utf-8', charset);
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

function getFeed(feedUrl, lastItem, callback) {
  // Get a response stream
  fetch(feedUrl, {
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36',
    'accept': 'text/html,application/xhtml+xml',
    redirect: 'follow'
  }).then(function(res) {

    if (res.status != 200) {
      console.error('## statusErr: %s (%s)', res.status, feedUrl);
      // callback({ error: 'error', errno: res.status, message: 'Bad server response' });
      reject();
      throw new Error({ error: 'error', errno: res.status, message: 'Bad server response' });
    }

    var feedparser = new FeedParser();
    var feedItems = [];
    var charset = getParams(res.headers.get('content-type') || '').charset;
    var responseStream = res.body;
    responseStream = maybeTranslate(responseStream, charset);
    responseStream.pipe(feedparser);

    return new Promise((resolve, reject) => {
      feedparser.on('error', function(error) {
        console.error('## feedParserErr: %s (%s)', error.message, feedUrl);
        reject();
        // return callback({ error: error, errno: res.status, message: error.message });
        callback({ error: error, resStatus: 400, message: error.message });
      }).on('readable', function() {
        try {
          var item = this.read();
          if (item !== null) feedItems.push(item);
        }
        catch (error) {
          console.error('## feedParserCatchErr: %s (%s)', error, feedUrl);
          callback({ error: error, resStatus: 400, message: error.message });
        }
      }).on('end', function() {
        resolve();

        var newLastItem;
        var totalNewItems;
        var i = 0;

        feedItems.forEach(countItems);

        function countItems(item) {
          i++;
          // console.error('item: %s', item.link);
          if (newLastItem == undefined) newLastItem = item.link;
          if (item.link == lastItem) {
            totalNewItems = i - 1;
            // console.error('Wopop: %s [%s] (%s)', item.link, totalNewItems, i);
          }
        }

        if (totalNewItems == undefined) totalNewItems = i;

        var meta = this.meta;
        return callback(null, feedItems, meta.title || 'Untitled', meta.link || feedUrl, newLastItem, totalNewItems);

      });

    });

  }).catch((error) => {

    var message;

    if (error) {
      message = error.message;
      console.error('Yep, error: %s [%s] (%s)', error);
    } else {
      message = 'Unknown error';
      var error = 'Unknown error';
      console.error('No error: %s [%s] (%s)');
    }
    
    callback({ error: error, resStatus: 400, message: error.message });
  });
}

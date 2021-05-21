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
      reject();
      // callback({ error: 'error', errno: res.status, message: 'Bad server response' });
    }

    var feedparser = new FeedParser();
    var feedItems = [];
    var charset = getParams(res.headers.get('content-type') || '').charset;
    var responseStream = res.body;
    responseStream = maybeTranslate(responseStream, charset);
    responseStream.pipe(feedparser);

    return new Promise((resolve, reject) => {
      feedparser.on('error', function(error) {

        let message = (error.message) ? error.message : 'Can\'t read this feed';
        let type = (error.type) ? error.type : 'Feed parsing';
        let status = (error.status) ? error.status : 400;
        
        console.error('## feedParserOnErr: %s (%s)', error, feedUrl);
        reject();
        callback({ type: type, status: status, message: message+'onErr' });

      }).on('readable', function() {
        try {
          var item = this.read();
          if (item !== null) feedItems.push(item);
        }
        catch (error) {

          let message = (error.message) ? error.message : 'Can\'t read this feed';
          let type = (error.type) ? error.type : 'Feed parsing';
          let status = (error.status) ? error.status : 400;

          console.error('## feedParserOnErr: %s (%s)', error, feedUrl);
          reject();
          callback({ type: type, status: status, message: message });

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

    var message = 'Unknown error';
    var type = 'Unknown type';
    var status = 400;

    if (error) {
      
      message = error.message;
      type = error.type;
      status = Number.isInteger(error.status) ? error.status : 400;
      
    }

    console.error('Error OK, status: %s', Number(status));

    callback({ type: type, status: status, message: message });

  });
}

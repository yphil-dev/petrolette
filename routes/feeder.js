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
      // If we're using iconvStream, stream will be the output of iconvStream
      // otherwise it will remain the output of request
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
  // Get a response stream
  fetch(feedUrl, {
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36',
    'accept': 'text/html,application/xhtml+xml',
    redirect: 'follow'
  }).then(function (res) {

    if (res.status != 200) {
      callback({error:'error', errno:res.status, message:'Bad server response'});
      return reject();
    }

    var feedparser = new FeedParser();
    var feedItems = [];
    var charset = getParams(res.headers.get('content-type') || '').charset;
    var responseStream = res.body;
    responseStream = maybeTranslate(responseStream, charset);
    responseStream.pipe(feedparser);
    var newLastItem;

    var i = 0;

    return new Promise((resolve, reject) => {
      feedparser.on('error', function(error) {
        console.error('## feedParserErr: %s (%s)', error.message, feedUrl);
        reject();
        return callback({error:error, errno:res.status, message:error.message});
      }).on('readable', function() {
        try {
          var item = this.read();

          // console.error('ITEM: %s (%s)', JSON.stringify(item));

          if (item !== null){
            i++;

            if (typeof newLastItem === 'undefined') {
              newLastItem = item.link;
            }

            if (item.link !== lastItem) {
              console.error('### PUSHING: #%s GUID: %s', i, newLastItem);
              feedItems.push(item);
            } else {
              console.error('### Count reached i:%s, lastItem: [%s], newLastItem: %s', i, lastItem, newLastItem);
              this.resume();
            }

          } else {
            console.error('### NULL: (%s)', feedUrl);
          }
        }
        catch (err) {
          console.error('## feedParserCatchErr: %s (%s)', err, feedUrl);
        }
      }).on ('end', function () {
        var meta = this.meta;
        resolve();
        return callback (null, feedItems, meta.title || 'Untitled', meta.link || feedUrl, newLastItem);
      });
    });

  }).catch((err) => {
    callback({error:err, resStatus:0, message:err.message});
  });
}

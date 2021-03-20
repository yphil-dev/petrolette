const fetch = require('node-fetch'),
      zlib = require('zlib'),
      iconv = require('iconv-lite'),
      AbortController = require('node-abort-controller'),
      FeedParser = require('feedparser');

exports.getFeed = getFeed;

function maybeDecompress (res, encoding) {
  var decompress;
  if (encoding.match(/\bdeflate\b/)) {
    decompress = zlib.createInflate();
  } else if (encoding.match(/\bgzip\b/)) {
    decompress = zlib.createGunzip();
  }
  return decompress ? res.pipe(decompress) : res;
}

function maybeTranslate (res, charset) {
  var iconvStream;
  // Decode using iconv-lite if its not utf8 already.
  if (!iconvStream && charset && !/utf-*8/i.test(charset)) {
    try {
      iconvStream = iconv.decodeStream(charset);
      console.log('Converting from charset %s to utf-8', charset);
      iconvStream.on('error', done);
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

function done(err) {
  console.error('whoa!: %s (%s)');
  if (err) {
    console.error('err: %s Stack %s', err, err.stack);
    return;
  }
}


const controller = new AbortController();
const signal = controller.signal;
setTimeout(() => {
  controller.abort();
}, 10000);

function getFeed (feedUrl, callback) {
  // Get a response stream
  fetch(feedUrl, {
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36',
    'accept': 'text/html,application/xhtml+xml',
    redirect: 'manual'
  }).then(function (res) {

    console.error('node-fetch status: %s', res.status);

    // Setup feedparser stream
    var feedparser = new FeedParser();
    var feedItems = [];
    feedparser.on('error', function() {
      console.error('## RRfeedUrl: %s (%s)', feedUrl, res.status);
      return callback('Unknown error');
    });
    feedparser.on('end', done);
    feedparser.on('readable', function() {
      try {
        var item = this.read();
        if (item !== null) feedItems.push (item);
      }
      catch (err) {
        console.error('## ERR (%s)', err.message);
      }
    }).on ('end', function () {
      var meta = this.meta;
      return callback (null, feedItems, meta.title, meta.link);
    });

    if (res.status != 200) {
      return callback(res.status);
    }

    var charset = getParams(res.headers.get('content-type') || '').charset;
    var responseStream = res.body;
    responseStream = maybeTranslate(responseStream, charset);
    responseStream.pipe(feedparser);

  }).catch((err) => {
    console.error('## RERR (%s)', err.message);
    return callback(err);
  });
}

const request = require('request'),
      zlib = require('zlib'),
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
  var iconv;
  // Use iconv if its not utf8 already.
  if (!iconv && charset && !/utf-*8/i.test(charset)) {
    try {
      iconv = new Iconv(charset, 'utf-8');
      console.error('Converting from charset %s to utf-8', charset);
      iconv.on('error', done);
      // If we're using iconv, stream will be the output of iconv
      // otherwise it will remain the output of request
      res = res.pipe(iconv);
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

function getFeed (urlfeed, callback) {

  var req = request(urlfeed, {timeout: 10000, pool: false});
  req.setMaxListeners(50);
  req.setHeader('user-agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36');
  req.setHeader('accept', 'text/html,application/xhtml+xml');

  var feedparser = new FeedParser ();
  var feedItems = [];

  req
    .on ('error', function (err) {
      callback(err);
    })
    .on ('response', function (res) {
      if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));
      var encoding = res.headers['content-encoding'] || 'identity',
          charset = getParams(res.headers['content-type'] || '').charset;
      res = maybeDecompress(res, encoding);
      res = maybeTranslate(res, charset);
      res.pipe (feedparser);
    });

  feedparser
    .on ('readable', function () {
      try {
        var item = this.read ();
        if (item !== null) feedItems.push (item);
      }
      catch (err) {
        console.error('ERR (%s)', err.message);
      }
    })
    .on ('error', function (err) {
      var meta = this.meta;
      console.error('Error reading feed [%s] (%s)', err.message, urlfeed);
      callback (err.message);
    })
    .on ('end', function () {
      var meta = this.meta;

      callback ('Feed OK', feedItems, meta.title, meta.link);

      return;
    });
}

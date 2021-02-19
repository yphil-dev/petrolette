const express = require('express'),
      router = express.Router(),
      favrat = require('favrat'),
      FeedParser = require('feedparser'),
      request = require('request'),
      feedrat = require('feedrat'),
      // feedrat = require(__dirname + '/../../feedrat/'),
      fs = require('fs'),
      path = require('path'),
      crypto = require('crypto'),
      pjson = require('../package.json'),
      Iconv = require('iconv').Iconv,
      zlib = require('zlib'),
      morgan = require('morgan');

require('events').EventEmitter.defaultMaxListeners = 15;

// console.log('####### START ## Version (%s)', pjson.version);

process.on('uncaughtException', function(err) {
  console.log('### uncaughtException (%s) : ', err);
});

function escape(s) {
  if (s) {
    return s.replace(/[&"<>]/g, function (c) {
      return {
        '&': "&amp;",
        '"': "&quot;",
        '<': "&lt;",
        '>': "&gt;"
      }[c];
    });
  }
}

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
      console.log('Converting from charset %s to utf-8', charset);
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
        console.log('ERR (%s)', err.message);
      }
    })
    .on ('error', function (err) {
      var meta = this.meta;
      console.log('HUUM (%s) %s %s', err.message, meta.title, urlfeed);
      callback (err.message);
    })
    .on ('end', function () {
      var meta = this.meta;

      callback ('Feed OK', feedItems, meta.title, meta.link);

      return;
  });
}

router.get('/feed', function(req, res) {

  var dnsreq = request(req.query.feedurl);

  dnsreq
    .on('error', function(error) {
      // The only way so far to catch a DNS error
      // console.log('Err: %s (%s)', {error:error.code}, req.query.feedurl);
      res.send({error:error.code});
    })
    .on('response', function(response) {

      getFeed(req.query.feedurl, function (err, feedItems, feedTitle, feedLink) {

        if (feedItems && !res.headersSent) {
          res.send({
            feedItems: feedItems,
            feedLink: feedLink,
            feedTitle: feedTitle
          });
          // return;

        } else if (!res.headersSent) {
          res.send({error:err});
        }
      });
    });
});

router.get('/favicon', function(req, res) {

  favrat(req.query.url, function(err, url) {

    if (url) {

      if (!url.startsWith('http')) url = 'http://' + url.substring(url.indexOf("/") + 1);

      const hash = crypto.createHash('md5').update(url).digest('hex'),
            fileName = hash + '.favicon',
            filePath = path.join(pjson.FAVICONS_CACHE_DIR, fileName);

      if (fs.existsSync(filePath)) {
        res.send('/favicons/' + fileName);
      } else {
        var p = new Promise(resolve => request(url)
                            .pipe(fs.createWriteStream(filePath, {'Content-Type': 'image/x-icon'}))
                            .on('finish', resolve({fileName, url})));

        p.then(function(r) {
          res.send('/favicons/' + r.fileName);
        });
      }

    } else {
      res.status(500).send('No icon found');
    }
  });
});

router.get('/discover', function(req, res) {

  feedrat(req.query.url, req.query.searchPrefix, function(err, feed) {

    if (feed) {
      res.send(feed);
    } else if (err) {
      console.log('err: %s', err);
      res.status(500).send(err.code);
    } else {
      res.status(500).send('No feed found');
    }

  });
});

router.get('/about/javascript', function(req, res) {
  res.render('javascript');
});

router.use(morgan('combined'));

router.get('/', function(req, res) {
  res.render('index', {
    queryString: escape(req.query.add),
    version: pjson.version
  });
});

module.exports = router;

const express = require('express'),
      router = express.Router(),
      favrat = require('favrat'),
      FeedParser = require('feedparser'),
      request = require('request'),
      feedrat = require('feedrat'),
      http = require("http"),
      fs = require('fs'),
      path = require('path'),
      crypto = require('crypto'),
      pjson = require('../package.json'),
      Iconv = require('iconv').Iconv,
      zlib = require('zlib');

require('events').EventEmitter.defaultMaxListeners = 15;

console.log('####### START');

process.on('uncaughtException', function(err) {
  console.log('### BIG ONE (%s) : ', err);
});

var d = require('domain').create();
d.on('error', function(err){
  // handle the error safely
  console.log(err);
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

router.get('/', function(req, res) {
  res.render('index', {
    queryString:escape(req.query.add),
    version: pjson.version
  });
});

router.get('/about/javascript', function(req, res) {
  res.render('javascript');
});

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

  var options = {
    url: urlfeed,
    jar: true, // enable cookie    maxRedirects:2,
    headers: {
      'User-Agent': 'Mozilla/5.0',
      'Accept': 'application/rss+xml, application/rdf+xml;q=0.8, application/atom+xml;q=0.6, application/xml;q=0.4, text/xml;q=0.4'
    }
  };

  // var rreq = request(urlfeed);
  var req = request(options);

  if (!req) {
    console.log('erreur');
  }

  // req.setMaxListeners(0);

  var feedparser = new FeedParser ();
  var feedItems = [];

  req
    .on ('error', function (err) {
      console.log('RHA (%s)', err);
      // callback ('err');
    })
    .on ('response', function (res) {

      // try {
      var stream = this;
      if (res && typeof res !== 'undefined' && res.statusCode === 200 && res.headers['content-type'] && res.headers['content-type'].includes('xml')) {


        var encoding = res.headers['content-encoding'] || 'identity',
            charset = getParams(res.headers['content-type'] || '').charset;
        res = maybeDecompress(res, encoding);
        res = maybeTranslate(res, charset);

        res.pipe (feedparser);

      } else {
        console.log (' %s status: %s, content-type: %s', urlfeed, res.statusCode, res.headers['content-type']);
        // callback (res.headers['content-type']);
        callback (res.statusCode);
        // return;
      }
      // }
      // catch (err) {
         // console.log('ERR (%s)', err.message);
         // }

        });

  feedparser
    .on ('readable', function () {
      try {
        var item = this.read ();
        if (item !== null) { //2/9/17 by DW
          feedItems.push (item);
        }
      }
      catch (err) {
        console.log('ERR (%s)', err.message);
      }
    })
    .on ('error', function (err) {
      console.log('HUM (%s)', err);
      // callback ('err');
    })
    .on ('end', function () {
      var meta = this.meta;

    callback ('Feed OK', feedItems, meta.title, meta.link);

    // d.run(function(){
    // });

    return;
  });
}

router.get('/feed', function(req, res) {

  if (res.headersSent) return;

  console.log('getFeed (%s)', req.query.feedurl);

  var myreq = request(req.query.feedurl);

  myreq
    .on('error', function(error) {
      console.log('Oh My (%s) [%s]',req.query.feedurl, error.code);
      res.send({error:error.code});
    })
    .on('response', function(response) {

      console.log ('### %s status: %s, content-type: %s', req.query.feedurl, response.statusCode, response.headers['content-type']);

      // console.log('RESPONSE (%s) [%s]', req.query.feedurl, JSON.stringify(response));

      if (response.statusCode == 200) {

        getFeed(req.query.feedurl, function (err, feedItems, feedTitle, feedLink) {

          console.log('ERR: (%s)', err);

          if (feedItems && !res.headersSent) {
            console.log('Sending (%s) - %s Header status: (%s)', req.query.feedurl, new Date().getTime(), res.headersSent);
            res.send({
                feedItems: feedItems,
                feedLink: feedLink,
                feedTitle: feedTitle
              });

            return;

          } else if (!res.headersSent) {
            res.send({error:err});
          } else {
          }

        });

      }

      // console.log(response.headers['content-type']);
    });


});

router.get('/favicon', function(req, res) {

  favrat(req.query.url, function(err, url) {

    if (url) {

      if (!url.startsWith('http')) url = 'http://' + url.substring(url.indexOf("/") + 1);

      const hash = crypto.createHash('md5').update(url).digest('hex'),
            fileName = hash + '.favicon',
            filePath = path.join(process.env.FAVICONS_CACHE_DIR, fileName);

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

  feedrat(req.query.url, function(err, feed) {

    if (feed) {
      res.send(feed);
    } else {
      res.status(500).send('No feed found');
    }

  });
});

module.exports = router;

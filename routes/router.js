const express = require('express'),
      router = express.Router(),
      favrat = require('favrat'),
      feeder = require('./feeder'),
      request = require('request'),
      feedrat = require('feedrat'),
      // feedrat = require(__dirname + '/../../feedrat/'),
      fs = require('fs'),
      path = require('path'),
      crypto = require('crypto'),
      pjson = require('../package.json'),
      Iconv = require('iconv').Iconv,
      sanitize = require('sanitize').middleware,
      parser = require('xml2json'),
      morgan = require('morgan');

require('events').EventEmitter.defaultMaxListeners = 15;

console.error('####### Pétrolette (re)START ## Version (%s)', pjson.version);

process.on('uncaughtException', function(err) {
  console.error('### Pétrolette uncaughtException: %s', err);
});

var options = {
  object: false,
  reversible: false,
  coerce: true,
  sanitize: false,
  trim: false,
  arrayNotation: false,
  alternateTextNode: false
};

router.use(sanitize);

router.get('/parser', function (req, res) {

  console.error('plop!!!: %s (%s)', req.query.x);

  // var xml = req.query.xml;

  // // console.error('xml: %s (%s)',xml, req);

  // var json = parser.toJson(xml);

  // if (json) {
  //   res.send(json);
  // } else if (err) {
  //   console.log('err: %s (%s)', err, res);
  //   res.status(500).send(err.code);
  // } else {
  //   res.status(500).send('Bad file');
  // }

  // var xml = "<foo attr=\"value\">bar</foo>";
  // console.error("##### input -> %s", xml, req.query.plop);

  // xml to json
  // console.error("##### to json -> %s", json);

});

router.get('/feed', function(req, res) {

  var dnsreq = request(req.query.feedurl);

  dnsreq
    .on('error', function(error) {
      // The only way so far to catch a DNS error
      console.error('Err: %s (%s)', {error:error.code}, req.query.feedurl);
      res.send({error:error.code});
    })
    .on('response', function(response) {

      feeder.getFeed(req.query.feedurl, function (err, feedItems, feedTitle, feedLink) {

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

router.use(morgan('combined'));

router.get('/robots.txt', function (req, res) {
  res.type('text/plain');
  res.send("User-agent: *\nDisallow: /");
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

router.get('/', function(req, res) {
  res.render('index', {
    queryString: req.query.add,
    version: pjson.version
  });
});

router.use(function(req, res) {
  res.send('404: Page not Found', 404);
});

router.use(function(error, req, res, next) {
  res.send('500: Internal Server Error', 500);
});

module.exports = router;

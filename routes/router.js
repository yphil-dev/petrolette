const express = require('express'),
      router = express.Router(),
      favrat = require('favrat'),
      feeder = require('./feeder'),
      fetch = require('node-fetch'),
      feedrat = require('feedrat'),
      // feedrat = require(__dirname + '/../../feedrat/'),
      fs = require('fs'),
      path = require('path'),
      crypto = require('crypto'),
      pjson = require('../package.json'),
      sanitize = require('sanitize').middleware,
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

router.get('/feed', function(req, res) {

  feeder.getFeed(req.query.feedurl, function (err, feedItems, feedTitle, feedLink) {

    if (feedItems && !res.headersSent) {
      res.send({
        feedItems: feedItems,
        feedLink: feedLink,
        feedTitle: feedTitle
      });

    } else if (!res.headersSent) {
      res.send({error:err, errno:err.errno, message:err.message});
    }
  });
});

router.get('/favicon', function(req, res) {

  favrat(req.query.url, function(err, url) {

    if (url) {

      if (!url.startsWith('http')) url = 'http://' + url.substring(url.indexOf("/") + 1);

      const hash = crypto.createHash('md5').update(url).digest('hex'),
            fileName = hash + '.favicon',
            filePath = path.join(pjson.FAVICONS_CACHE_DIR, fileName);

      res.send('/favicons/' + fileName);

      fetch(url)
        .then(
          res =>
            new Promise((resolve, reject) => {
              const dest = fs.createWriteStream(filePath, {'Content-Type': 'image/x-icon'});
              res.body.pipe(dest);
              res.body.on("end", () => resolve({fileName, url}));
              dest.on("error", () => {
                res.status(500).send(false);
                reject('No favicon found');
              });
            })
        );

    } else {
      res.send(false);
    }
  });
});

router.use(morgan('combined'));

router.get('/robots.txt', function (req, res) {
  res.type('text/plain');
  res.send("User-agent: *\nDisallow: /feed\nDisallow: /discover\nDisallow: /favicon");
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
  // res.send('404: Page not Found', 404);
  res.status(404).send('404: Page not Found');
});

router.use(function(error, req, res, next) {
  // res.send('500: Internal Server Error', 500);
  res.status(500).send('500: Internal Server Error');
});

module.exports = router;

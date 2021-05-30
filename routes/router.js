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

console.error('### (re)START ## Version (%s)', pjson.version);

router.use(sanitize);

router.get('/favicon', function(req, res) {

  favrat(req.query.url, function(err, url) {

    if (err) console.error('######### err: %s (%s)', err);
    
    if (url) {

      if (!url.startsWith('http') || !url.startsWith('//')) url = 'http://' + url.substring(url.indexOf("/") + 1);

      const hash = crypto.createHash('md5').update(url).digest('hex'),
            fileName = hash + '.favicon',
            filePath = path.join(pjson.FAVICONS_CACHE_DIR, fileName);

      fetch(url)
        .then(
          res =>
            new Promise((resolve, reject) => {
              const dest = fs.createWriteStream(filePath, {'Content-Type': 'image/x-icon'});
              res.body.pipe(dest);
              res.body.on("end", () => {
                resolve({fileName, url});
              });
              dest.on("error", () => {
                res.status(500).send(false);
                reject('No favicon found');
              });
            })
        );

    } else {
      reject('Not a valid URL');
      res.send(false);
    }
  });
});

router.use(morgan('combined'));

router.get('/feed', function(req, res) {

  feeder.getFeed(req.query.url, req.query.lastItem, function (error, feedItems, feedTitle, feedLink, lastItem, totalNewItems) {

    if (feedItems && !res.headersSent) {
      res.send({
        feedItems: feedItems,
        feedLink: feedLink,
        feedTitle: feedTitle,
        lastItem: lastItem,
        totalNewItems: totalNewItems
      });

    } else if (error && !res.headersSent) {
      res.send({ error: error });
    }
    
  });
});

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
  console.error('404 req: %s (%s)', req.url);
  res.status(404).send('404: Page not Found');
});

router.use(function(error, req, res, next) {
  console.error('500 req: %s (%s)', req.url);
  res.status(500).send('500: Internal Server Error');
});

module.exports = router;

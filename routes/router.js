const express = require('express'),
      router = express.Router(),
      feeder = require('./feeder'),
      fetch = require('node-fetch'),
      favrat = require('favrat'),
      feedrat = require('feedrat'),
      // feedrat = require('/home/px/src/feedrat/'),
      fs = require('fs'),
      path = require('path'),
      crypto = require('crypto'),
      pjson = require('../package.json'),
      favratpjson = require('../node_modules/favrat/package.json'),
      feedratpjson = require('../node_modules/feedrat/package.json'),
      sanitize = require('sanitize').middleware,
      URL = require('url').URL,
      morgan = require('morgan');

const localFeeds = path.resolve(__dirname, '../petrolette.feeds');
const defaultFeeds = path.resolve(__dirname, '../public/js/default-feeds.json');

console.error('### (re)START ## Version (%s)', pjson.version);

// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

router.use(sanitize);

router.use('/favicon', function(req, res) {

  favrat(req.query.url, async function(error, url) {

    if (error) {
      res.status(500).send(error);
    } else if (url) {

      const hash = crypto.createHash('md5').update(url).digest('hex'),
            fileName = hash + '.favicon',
            filePath = path.join(pjson.FAVICONS_CACHE_DIR, fileName);

      try {

        const response = await fetch(url);
        const fileStream = fs.createWriteStream(filePath);

        response.body.pipe(fileStream);
        response.body.on("error", () => {
          res.status(500).send(error);
        });
        fileStream.on("finish", () => {
          res.send(hash);
        });

      } catch (err) {
        res.status(500).send(error);
      }

    }

  });
});

router.use(morgan('combined'));

router.use('/feed', function(req, res) {

  feeder.getFeed(req.query.url, req.query.lastItem, function(error, feedItems, feedTitle, feedLink, lastItem, totalNewItems) {

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

router.use('/robots.txt', function(req, res) {
  res.type('text/plain');
  res.send("User-agent: *\nDisallow: /feed\nDisallow: /discover\nDisallow: /favicon");
});

router.use('/discover', function(req, res) {

  try {
    new URL(req.query.url);
  } catch (error) {
    console.error('err: %s (%s)',error);
    let feeds = [];
    feeds.push(req.query.searchPrefix + req.query.url.split(' '));
    return res.send(feeds);
  }

  feedrat(req.query.url, function(err, url) {

    if (err) {
      console.error('err: %s (%s)',err);
      res.status(500).send(err);
    } else if (url) {
      res.send(url);
    } else {
      res.send({ error: 'error' });
    }

  });
});

router.use('/about/javascript', function(req, res) {
  res.render('javascript');
});

router.route('/localfeeds')
  .all(function (req, res, next) {
    // runs for all HTTP verbs first
    // think of it as route specific middleware!
    console.error('ALL: %s (%s)');
    next();
  })
  .get(function (req, res, next) {

    // console.error('Trying to r (%s)', localFeeds);        

    fs.readFile(localFeeds, 'utf-8', (err, data) => {

      // console.error('DATA: %s (%s)', data, defaultFeeds);

      if (err && !res.headersSent) {
	      // console.error('ERR: %s (%s)', err, JSON.parse(defaultFeeds));
        // res.send(JSON.parse(defaultFeeds));
        res.status(500).send();
      }
      
      if (data && !res.headersSent) {
        res.send(data);
      }

    });
    
    // next();
  })
  .post(function (req, res, next) {

    console.error('Trying to w (%s)', req.body.feeds.substring(1, 18));        
    
    fs.writeFile(localFeeds, req.body.feeds, (err) => {
      if (err) {
        console.error('Cannot write feeds file, dang (%s)', err);        
      }

      res.status(200).send();
      console.error('Successfully Written to %s', localFeeds);
      // if (data) {
      // }
    });

  });

router.use('/', function(req, res) {

  console.error('req.ptlOptions: %s (%s)', req.ptlOptions.instanceType);

  res.render('index', {
    instanceType: req.ptlOptions.instanceType,
    queryString: req.query.add,
    version: pjson.version,
    favratversion: favratpjson.version,
    feedratversion: feedratpjson.version,
    nonce: res.locals.cspNonce
  });
});

router.use(function(error, req, res, next) {
  console.error('500 req: %s (%s)', req.url);
  res.status(500).send('500: whoa! Internal Server Error');
});

router.use(function(req, res) {
  console.error('404 req: %s (%s)', req.url);
  res.status(404).send('404: Page not Found');
});

module.exports = router;

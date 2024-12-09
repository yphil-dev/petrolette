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

console.error('### Pétrolette (re)START ## Version (%s)', pjson.version);

const localFeedsFilePath = path.resolve(__dirname, '../petrolette.feeds');

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

router.use(sanitize);

router.get('/favicon', function(req, res) {

    favrat(req.query.url, async function(error, url) {

        if (error) {
            res.status(500).send(error);
        } else if (url) {

            console.error('My url:', url);

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    return res.status(500).send('Failed to fetch favicon');
                }

                // Pipe the favicon directly to the response
                response.body.pipe(res);

                // Handle potential errors during the fetch
                response.body.on("error", () => {
                    res.status(500).send('Error piping the favicon');
                });

            } catch (err) {
                res.status(500).send('Error fetching favicon');
            }

        }

    });
});


router.get('/localfeeds', function(req, res) {

  fs.readFile(localFeedsFilePath, 'utf8', (err, data) => {
    if (err && !res.headersSent) {
      res.status(404).send(err);
    } else if (data && !res.headersSent) {

      // console.error('data: ', data);

      res.status(200).send(data);
    }

  });

});

router.post('/localfeeds', function(req, res) {

  // console.error('req.body: (%s)', JSON.stringify(req.body));

  try {

    fs.writeFile(localFeedsFilePath, JSON.stringify(req.body), function (err) {
      if (err && !res.headersSent) {
        console.error('ERR: (%s)', err);
        res.status(500).send(err);
      } else if (!res.headersSent) {
        res.status(200).send('OK');
      }
    });

  } catch (err) {
    console.error('EERR: %s (%s)',err);
    if (!res.headersSent) {
      res.status(500).send(err);
    }
  }

});

router.use(morgan('combined'));

router.get('/feed', function(req, res) {

  feeder.getFeed(req.query.url, req.query.lastItem, function(error, feedItems, feedTitle, feedLink, lastItem, totalNewItems, feedIcon) {

    if (feedItems && !res.headersSent) {
      res.send({
        feedItems: feedItems,
        feedLink: feedLink,
        feedTitle: feedTitle,
        lastItem: lastItem,
        totalNewItems: totalNewItems,
				feedIcon: feedIcon
      });

    } else if (error && !res.headersSent) {
      res.send({ error: error });
    }

  });
});

router.get('/robots.txt', function(req, res) {
  res.type('text/plain');
  res.send("User-agent: *\nDisallow: /feed\nDisallow: /discover\nDisallow: /favicon");
});

router.get('/discover', function(req, res) {

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

router.get('/about/javascript', function(req, res) {
  res.render('javascript');
});

router.get('/about/privacy-policy', function(req, res) {
  res.render('privacy');
});

router.get('/', function(req, res) {
  res.render('index', {
    instanceType: req.instanceType,
    queryString: req.query.add,
    version: pjson.version,
    favratversion: favratpjson.version,
    feedratversion: feedratpjson.version,
    nonce: res.locals.cspNonce
  });
});

router.use(function(req, res) {
  console.error('404 req: %s (%s)', req.url);
  res.status(404).send('404: Page not Found');
});

// router.use(function(error, req, res, next) {
//   // console.error('500 req: %s (%s)', JSON.stringify(res));
//   res.status(500).send('500: whoa! Internal Server Error');
//   next();
// });

module.exports = router;

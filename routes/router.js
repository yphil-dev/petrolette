const express = require('express'),
      router = express.Router(),
      feeder = require('./feeder'),
      fetch = require('node-fetch'),
      favrat = require('favrat'),
      feedrat = require('feedrat'),
      fs = require('fs'),
      path = require('path'),
      crypto = require('crypto'),
      pjson = require('../package.json'),
      favratpjson = require('../node_modules/favrat/package.json'),
      feedratpjson = require('../node_modules/feedrat/package.json'),
      sanitize = require('sanitize').middleware,
      morgan = require('morgan');

console.error('### (re)START ## Version (%s)', pjson.version);

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

router.use(sanitize);

router.get('/favicon', function(req, res) {

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

    try {
        var p = new URL(req.query.url);
    } catch (error) {
        return res.send(new String(req.query.searchPrefix + req.query.url.split(' ')));
    }

    feedrat(req.query.url, function(err, url) {
        
        if (err) {
            res.status(500).send(err.code);
        } else if (url) {
            res.send(url);
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
        version: pjson.version,
        favratversion: favratpjson.version,
        feedratversion: feedratpjson.version
    });
});

router.use(function(req, res) {
    console.error('404 req: %s (%s)', req.url);
    res.status(404).send('404: Page not Found');
});

router.use(function(error, req, res, next) {
    console.error('500 req: %s (%s)', req.url);
    res.status(500).send('500: whoa! Internal Server Error');
});

module.exports = router;

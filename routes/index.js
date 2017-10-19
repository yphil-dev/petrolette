var express = require('express');
var router = express.Router();
var favicon = require('favicon');
var parser = require('rss-parser');

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/feedicon', function(req, res, next) {

    favicon(req.query.url, function(err, u) {

        console.log('Url: ' + req.query.url + ' Got: (' + u + ') (' + typeof u + ')')

        if (typeof u === 'undefined' || !u) {
            // console.log('Url: ' + req.query.feedhost + '\nFavicon: ' + favicon_url)
            // res.send(err.code);
            console.log('Err: ' + JSON.stringify(err))
        } else {
            // console.log('Url: ' + req.query.feedhost + '\nError: ' + JSON.stringify(err))
            res.send(u)
            // console.log('Err: ' + JSON.stringify(err))
        }
    });
});

router.get('/feed', function(req, res, next) {

    parser.parseURL(req.query.feedurl, function(err, parsed) {

        if(err !== null) {
            console.log('## Feed ERROR: ' + err + ' (' + req.query.feedurl + ')');
            res.send(err.code);
        }

        if(typeof parsed != 'undefined') {
            res.send(parsed.feed);
        }
    });
});

module.exports = router;

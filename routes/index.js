var express = require('express');
var router = express.Router();
var favicon = require('favicon');
var parser = require('rss-parser');

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/feedicon', function(req, res, next) {

    favicon(req.query.feedhost, function(err, favicon_url) {

        if(typeof favicon_url != 'undefined') {
            res.send(favicon_url)
        } else {
            console.log('Err: ' + JSON.stringify(err))
            res.send(err.code);
        }
    });
});

router.get('/feed', function(req, res, next) {

    parser.parseURL(req.query.feedurl, function(err, parsed) {

        if(err !== null) {
            console.log('ERROR: ' + err);
            res.send(err.code);
        }

        if(typeof parsed != 'undefined') {
            res.send(parsed.feed);
        }
    });
});

module.exports = router;

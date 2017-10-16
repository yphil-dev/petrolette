var express = require('express');
var router = express.Router();

var parser = require('rss-parser');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/feed', function(req, res, next) {

    parser.parseURL(req.query.feedurl, function(err, parsed) {

        if(err !== null) {
            console.log('EROOR: ' + err);
            res.send(err.code);
        }

        if(typeof parsed != 'undefined') {
            res.send(parsed.feed);
        }
    });
});

module.exports = router;

var express = require('express');
var router = express.Router();

var parser = require('rss-parser');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/feed', function(req, res, next) {
    // res.send('plop!');
    console.log('req:' + JSON.stringify(req.query.feedurl));

    parser.parseURL(req.query.feedurl, function(err, parsed) {
        // console.log(parsed.feed.title);

        if(typeof parsed != 'undefined') {
            res.send(parsed.feed);
        }
        // parsed.feed.entries.forEach(function(entry) {
        // console.log(entry.title + ':' + entry.link);
        // })
    });


});

module.exports = router;

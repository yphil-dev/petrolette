var express = require('express');
var router = express.Router();

var parser = require('rss-parser');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/feed', function(req, res, next) {
    // res.send('plop!');
    console.log('req:' + JSON.stringify(req.param('feedurl')));

    parser.parseURL(req.param('feedurl'), function(err, parsed) {
        console.log(parsed.feed.title);
        res.send(parsed.feed);

        // parsed.feed.entries.forEach(function(entry) {
        // console.log(entry.title + ':' + entry.link);
        // })
    });


});

module.exports = router;

var express = require('express');
var router = express.Router();
var favicon = require('favicon');
var FeedParser = require('feedparser');
var request = require('request');

// require('request').debug = true;

var feedrat = require('feedrat');

router.get('/', function(req, res) {
    res.render('index');
});

router.get('/start', function(req, res) {
  res.render('start/start.html');
});

router.use(function(req,res,next){
    var _send = res.send;
    var sent = false;
    res.send = function(data){
        if(sent) return;
        _send.bind(res)(data);
        sent = true;
    };
    next();
});

function getFeed (urlfeed, callback) {

  var options = {
    url: urlfeed,
    headers: {
      // 'User-Agent': 'Mozilla/5.0',
      'Accept': 'application/rss+xml, application/rdf+xml;q=0.8, application/atom+xml;q=0.6, application/xml;q=0.4, text/xml;q=0.4'
    }
  };

  // var req = request (urlfeed);
  var req = request (options);

  var feedparser = new FeedParser ();
  var feedItems = [];
  req.on ('response', function (res) {
    var stream = this;
    if (res.statusCode === 200 && res.headers['content-type'].includes('xml')) {
      stream.pipe (feedparser);

    } else {
      console.log ('getFeed: Content-type Error read %s (%s) .', urlfeed, res.headers['content-type']);
      callback (res.headers['content-type']);
      return;
    }
  });
  req.on ('error', function (res) {
    console.log ('getFeed: Error read %s (%s) .', urlfeed, res);
  });
  feedparser.on ('readable', function () {
    try {
      var item = this.read ();
      if (item !== null) { //2/9/17 by DW
        feedItems.push (item);
      }
    }
    catch (err) {
      console.log ('getFeed: err.message == ' + err.message);
    }
  }).on ('end', function () {
    var meta = this.meta;
    callback ('Feed OK', feedItems, meta.title);
  }).on ('error', function (err) {
    // console.log ("getFeed: Error reading (%s) feed: %s.", urlfeed, err.message);
    callback ('Bad feed');
  });
}

router.get('/feed', function(req, res) {

  getFeed(req.query.feedurl, function (err, feedItems, feedTitle) {
        if (feedItems) {
            res.send({
                feedItems: feedItems,
                feedTitle: feedTitle
            });
        } else {
          res.send({error:err});
        }
    });

});

router.get('/feedicon', function(req, res) {

    favicon(req.query.url, function(err, u) {

        if (u) {
            res.send(u);
        } else {
            res.status(500).send('No icon found');
        }

    });
});

router.get('/discover', function(req, res) {

    feedrat(req.query.url, function(err, feed) {

        if (feed) {
          res.send(feed);
        } else {
            res.status(500).send('No feed found');
        }

    });
});


module.exports = router;

var express = require('express'),
    router = express.Router(),
    favicon = require('favicon'),
    FeedParser = require('feedparser'),
    request = require('request'),
    feedrat = require('feedrat'),
    Url = require('url'),
    fs = require('fs'),
    path = require('path'),
    crypto = require('crypto'),
    pjson = require('../package.json');

console.log(pjson.version);
// require('request').debug = true;

router.get('/', function(req, res) {
  res.render('index', {
    queryString:req.query.source,
    version: pjson.version
  });
});

router.get('/about/javascript', function(req, res) {
  res.render('javascript');
});

// router.use(function(req,res,next){
//   var _send = res.send;
//   var sent = false;
//   res.send = function(data){
//     if(sent) return;
//     _send.bind(res)(data);
//     sent = true;
//   };
//   next();
// });

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
      // console.log ('getFeed: Content-type Error read %s (%s) .', urlfeed, res.headers['content-type']);
      callback (res.headers['content-type']);
      return;
    }
  });

  req.on ('error', function (res) {
    // console.log ('getFeed: Error read %s (%s) .', urlfeed, res);
  });

  feedparser.on ('readable', function () {
    try {
      var item = this.read ();
      if (item !== null) { //2/9/17 by DW
        feedItems.push (item);
      }
    }
    catch (err) {
      // console.log ('getFeed: err.message == ' + err.message);
    }
  }).on ('end', function () {
    var meta = this.meta;
    callback ('Feed OK', feedItems, meta.title, meta.link);
  }).on ('error', function (err) {
    // console.log ("getFeed: Error reading (%s) feed: %s.", urlfeed, err.message);
    callback ('Bad feed');
  });
}

router.get('/feed', function(req, res) {

  getFeed(req.query.feedurl, function (err, feedItems, feedTitle, feedLink) {
    if (feedItems) {
      res.send({
        feedItems: feedItems,
        feedLink: feedLink,
        feedTitle: feedTitle
      });
    } else {
      res.send({error:err});
    }
    });

});

console.log('####### START');

// router.use('/favicon', function (req, res, next) {
//   console.log('Request:', req.method);
//   next();
// });

router.get('/favicon', function(req, res) {

  favicon(req.query.url, function(err, iconUrl) {

    if (iconUrl) {

      var hash = crypto.createHash('md5').update(iconUrl).digest('hex');

      var fileName = hash + '.favicon';
      var filePath = path.join(process.env.FAVICONS_CACHE_DIR, fileName);

      console.log('# %s (%s)', iconUrl, fileName);

      if (fs.existsSync(filePath)) {
        console.log('File exists');
        res.contentType(fileName);
        res.send('/favicons/' + fileName);
      } else {

        res.send(iconUrl);

        console.log('File does NOT exist');

        let stream = fs.createWriteStream(filePath);

        request(iconUrl).pipe(stream);

        stream.on('finish', function () {
          console.log("SAVED %s to %s (%s)", fileName, filePath, iconUrl);
        }).on('error', function (err) {
          console.log("NOT SAVED %s (%s)", fileName, err);
        });

      }

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

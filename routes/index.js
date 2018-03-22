var express = require('express'),
    router = express.Router(),
    favicon = require('favicon'),
    FeedParser = require('feedparser'),
    request = require('request'),
    feedrat = require('feedrat'),
    Url = require('url'),
    fs = require('fs'),
    path = require('path'),
    http = require('http'),
    packageJson = require('../package.json'),
    cacheDir = path.join(__dirname, packageJson.cacheDirName);

// require('request').debug = true;

router.get('/', function(req, res) {
  res.render('index', {queryString:req.query.source});
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


// var p = Url.parse(req.query.url),
// fileName = p.host + "-" + p.path;

// fs.exists(path.join(cacheDir, fileName), (exists) => {
//   if (!exists) {
//     console.log('path.join(cacheDir, fileName) does not exist');
//     // fs.mkdirSync(cacheDir);
//   }
// });

router.get('/favicon', function(req, res) {
  favicon(req.query.url, function(err, iconUrl) {
    if (iconUrl) {
      var u = Url.parse(iconUrl);
      request.get({url: iconUrl}, function (err, response, body) {

        if (!err && typeof body !== 'undefined') {
          var h = u.host.replace(/\//g, ''),
              p = u.path.replace(/\//g, ''),
              fileName;

          counter++;

          // fileName = path.join('/tmp', h + '.' + p);
          // fileName = path.join(__dirname, '..', 'cache', h + '.' + p);
          fileName = path.join(__dirname, '..', 'cache', counter.toString());

          fs.writeFile(fileName, body, function(err) {
            if(err)
              console.log(err);
            else
              console.log("SAVED! (%s)", fileName);
          });
        } else {
          console.log('### ERROR iconUrl: (%s) err: (%s)', iconUrl, err);
        }
      });
      res.send(iconUrl);
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

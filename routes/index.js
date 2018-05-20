const express = require('express'),
      router = express.Router(),
      favrat = require('favrat'),
      FeedParser = require('feedparser'),
      request = require('request'),
      feedrat = require('feedrat'),
      fs = require('fs'),
      path = require('path'),
      crypto = require('crypto'),
      pjson = require('../package.json');

console.log('####### START');

function escape(s) {
  if (s) {
    return s.replace(/[&"<>]/g, function (c) {
      return {
        '&': "&amp;",
        '"': "&quot;",
        '<': "&lt;",
        '>': "&gt;"
      }[c];
    });
  }
}

router.get('/', function(req, res) {
  res.render('index', {
    queryString:escape(req.query.add),
    version: pjson.version
  });
});

router.get('/about/javascript', function(req, res) {
  res.render('javascript');
});

function getFeed (urlfeed, callback) {

  var options = {
    url: urlfeed,
    headers: {
      // 'User-Agent': 'Mozilla/5.0',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml'
    }
  };

  // var req = request (urlfeed);
  var req = request(options);

  var feedparser = new FeedParser ();
  var feedItems = [];
  req.on ('response', function (res) {
    var stream = this;
    if (res && typeof res !== 'undefined' && res.statusCode === 200 && res.headers['content-type'] && res.headers['content-type'].includes('xml')) {
      stream.pipe (feedparser);

    } else {
      // console.log ('getFeed: Content-type Error read %s (%s) .', urlfeed, res.headers['content-type']);
      callback (res.headers['content-type']);
      return;
    }
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
    callback ('Bad feed: ', err);
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

router.get('/favicon', function(req, res) {

  favrat(req.query.url, function(err, url) {

    if (url) {

      if (!url.startsWith('http')) url = 'http://' + url.substring(url.indexOf("/") + 1);

      const hash = crypto.createHash('md5').update(url).digest('hex'),
            fileName = hash + '.favicon',
            filePath = path.join(process.env.FAVICONS_CACHE_DIR, fileName);

      if (fs.existsSync(filePath)) {
        res.send('/favicons/' + fileName);
      } else {
        var p = new Promise(resolve => request(url)
                            .pipe(fs.createWriteStream(filePath, {'Content-Type': 'image/x-icon'}))
                            .on('finish', resolve({fileName, url})));

        p.then(function(r) {
          res.send('/favicons/' + r.fileName);
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

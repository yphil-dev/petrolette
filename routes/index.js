var express = require('express')
var router = express.Router()
var favicon = require('favicon')
var FeedParser = require('feedparser')
var request = require('request') // for fetching the feed

var feedrat = require('feedrat')

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

function getFeed (urlfeed, callback) {
  var req = request(urlfeed)
  var feedparser = new FeedParser()
  var feedItems = []
  req.on('response', function (res) {
    var stream = this
    if (res.statusCode === 200) {
      stream.pipe(feedparser)
      // console.log ("OK: (code %s) reading (%s)", res.statusCode, urlfeed);
    } else {
      // console.log ("Error (code %s) reading (%s)", res.statusCode, urlfeed);
    }
  })
  req.on('error', function (res) {
    console.log('getFeed: Error reading %s (%s) .', urlfeed, res)
  })
  feedparser.on('readable', function () {
    try {
      var item = this.read()
      if (item !== null) { // 2/9/17 by DW
        feedItems.push(item)
      }
    } catch (err) {
      console.log('getFeed: err.message == ' + err.message)
    }
  }).on('end', function () {
    var meta = this.meta
    callback(null, feedItems, meta.title)
  }).on('error', function (err) {
    console.log('getFeed: Error reading (%s) feed.', urlfeed)
    callback(err)
  })
}

router.get('/feed', function (req, res, next) {
  getFeed(req.query.feedurl, function (err, feedItems, feedTitle) {
    if (!err) {
      res.status(200).json({'feedItems': feedItems, 'feedTitle': feedTitle})
    }
  })
})

router.get('/feedicon', function (req, res, next) {
  favicon(req.query.url, function (err, u) {
    if (u) {
      res.send(u)
    } else if (err) {
      res.status(500).send('No icon found' + err)
    } else {
      res.status(500).send('No icon found (no error returned)')
    }
  })
})

router.get('/discover', function (req, res, next) {
  feedrat(req.query.url, function (err, feed) {
    if (feed && typeof feed !== 'undefined') {
      res.send(feed)
    } else if (err) {
      res.status(500).send('No feed found' + err)
    } else {
      res.status(500).send('No feed found (no error returned)')
    }
  })
})

router.post('/upload', function (req, res) {
  if (!req.files) { return res.status(400).send('No files were uploaded.') }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('/tmp/plop.json', function (err) {
    if (err) { return res.status(500).send(err) }

    res.send('File uploaded!')
  })
})

module.exports = router

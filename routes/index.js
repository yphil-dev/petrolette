var express = require('express');
var router = express.Router();
var favicon = require('favicon');
// var parser = require('rss-parser');
const fileUpload = require('express-fileupload');

// Exp
var FeedParser = require('feedparser');
var request = require('request'); // for fetching the feed


// End exp

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.use(fileUpload({
    limits: { fileSize: 50 },
    safeFileNames: true,
    preserveExtension: true
}));


function getFeed (urlfeed, callback) {
    var req = request (urlfeed);
    var feedparser = new FeedParser ();
    var feedItems = new Array ();
    req.on ("response", function (res) {
        var stream = this;
        if (res.statusCode == 200) {
            stream.pipe (feedparser);
        }
    });
    req.on ("error", function (res) {
        console.log ("getFeed: Error reading feed.");
    });
    feedparser.on ("readable", function () {
        try {
            var item = this.read (), flnew;
            if (item !== null) { //2/9/17 by DW
                feedItems.push (item);
            }
        }
        catch (err) {
            console.log ("getFeed: err.message == " + err.message);
        }
    }).on ("end", function () {
        var meta = this.meta;
        callback (undefined, feedItems, meta.title);
    }).on ("error", function (err) {
        console.log ("getFeed: Error reading feed.");
        callback (err);
    });
}

router.get('/feed', function(req, res, next) {

    getFeed(req.query.feedurl, function (err, feedItems, feedTitle) {
        if (!err) {
            function pad (num) {
                var s = num.toString (), ctplaces = 3;
                while (s.length < ctplaces) {
                    s = "0" + s;
                }
                return (s);
            }
            console.log ("\n\nThere are " + feedTitle + " items in the feed.\n");
            for (var i = 0; i < feedItems.length; i++) {
                // console.log ("Item #" + pad (i) + ": " + feedItems[i].title + ".\n");
                // console.log('ALL: ' + JSON.stringify(feedItems[i]))
            }
            res.status(200).json({"feedItems": feedItems,"feedTitle": feedTitle});
        }
    });

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

router.post('/upload', function(req, res) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.sampleFile;

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv('/tmp/plop.json', function(err) {
        if (err)
            return res.status(500).send(err);

        res.send('File uploaded!');
    });
});

module.exports = router;

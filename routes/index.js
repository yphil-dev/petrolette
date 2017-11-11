var express = require('express');
var router = express.Router();
var favicon = require('favicon');
var FeedParser = require('feedparser');
var request = require('request'); // for fetching the feed

var cheerio = require('cheerio');

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

function getFeed (urlfeed, callback) {
    var req = request (urlfeed);
    var feedparser = new FeedParser ();
    var feedItems = new Array ();
    req.on ("response", function (res) {
        var stream = this;
        if (res.statusCode == 200) {
            stream.pipe (feedparser);
            // console.log ("OK: (code %s) reading (%s)", res.statusCode, urlfeed);
        } else {
            // console.log ("Error (code %s) reading (%s)", res.statusCode, urlfeed);
        }
    });
    req.on ("error", function (res) {
        console.log ("getFeed: Error reading (%s) feed.", urlfeed);
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
        console.log ("getFeed: Error reading (%s) feed.", urlfeed);
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
            res.status(200).json({"feedItems": feedItems,"feedTitle": feedTitle});
        }
    });

});

function getDomain(url) {
    var m = url.match(/^http:\/\/[^/]+/);
    return m ? m[0] : null;
}

router.get('/favicon', function(req, res, next) {

    var thisUri = req.query.url;
    var req = request(req.query.url, function(error, response, html) {

        var okTypes = [
            'image/x-icon',
            'image/png',
            'image/vnd.microsoft.icon'
        ];

        var $ = cheerio.load(html, {
            xmlMode: true
        });

        $.prototype.exists = function (selector) {
            return this.find(selector).length > 0;
        }

        var $link = $('link');

        if ($link.length !== 0){

            if (thisUri !== null && thisUri !== '') {

                console.log('\nDomain (%s)', getDomain(thisUri));

                var obviousIcon = getDomain(thisUri) + '/favicon.ico';
                var pngIcon = getDomain(thisUri) + '/favicon.png';

                request
                    .get(obviousIcon)
                    .on('response', function(response) {

                        if (response.statusCode == 200) {
                            console.log('(obvious) ICON! (%s)', obviousIcon)
                        }
                    })
                    .on('error', function(err) {
                        console.log('NO (obvious) ICON! (%s)', err)
                    })

                request
                    .get(pngIcon)
                    .on('response', function(response) {

                        if (response.statusCode == 200) {
                            console.log('(png) ICON! (%s)', pngIcon)
                        }
                    })
                    .on('error', function(err) {
                        console.log('NO (png) ICON! (%s)', err)
                    })


                // if (typeof $link.attr('rel') !== 'undefined' && $link.attr('rel') === 'alternate') {
                //     // console.log('REL (%s): %s', thisUri, $link.attr('href'));

                //     var altIcon = $link.attr('href') + '/favicon.ico';

                //     request
                //         .get(altIcon)
                //         .on('response', function(response) {

                //             if (response.statusCode == 200 && okTypes.indexOf(response.headers['content-type']) >= 0) {
                //                 console.log('ALT ICON! (%s)', altIcon) // 200
                //             }

                //         })
                //         .on('error', function(err) {
                //             console.log('NO (alt) ICON! (%s)', err)
                //         })


                // }

            }

        }

    });

    // req.on('response', function(response) {
    //     console.log('OK: %s', response.statusCode) // 200
    //     // console.log(response.headers['content-type']) // 'image/png'
    // })

    // req.on('error', function(err) {
    //     console.log('Err: %s', err) // 200
    // })

    // if (!error && response.statusCode == 200) {

    //     var $ = cheerio.load(html, {
    //         xmlMode: true
    //     });

    //     $.prototype.exists = function (selector) {
    //         return this.find(selector).length > 0;
    //     }

    //     if ($('link').attr('rel').exists()) {
    //         console.log('Link: %s', $('link').attr('href'))

    //         if (isValidUri(getDomain($('link').attr('href')) + '/favicon.ico')) {
    //             console.log('Found VALID alt!');
    //         } else {
    //             console.log('bummer! (%s)', isValidUri(getDomain($('link').attr('href')) + '/favicon.ico'));
    //         }
    //     }

    // }


})

router.get('/feedicon', function(req, res, next) {

    favicon(req.query.url, function(err, u) {

        if (typeof u === 'undefined' || !u) {

            // console.log('Url: ' + req.query.feedhost + '\nFavicon: ' + favicon_url)

            // res.send(err.code);
            // console.log('Error getting (%s) icon', JSON.stringify(req.query.url))
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

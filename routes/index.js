var express = require('express');
var router = express.Router();
var favicon = require('favicon');
var parser = require('rss-parser');
const fileUpload = require('express-fileupload');

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.use(fileUpload({
    limits: { fileSize: 50 },
    safeFileNames: true,
    preserveExtension: true
}));

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

router.get('/feed', function(req, res, next) {

    parser.parseURL(req.query.feedurl, function(err, parsed) {

        if(err !== null) {
            console.log('## Feed ERROR: ' + err + ' (' + req.query.feedurl + ')');
            res.send(err.code);
        }

        if(typeof parsed != 'undefined') {
            res.send(parsed.feed);
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

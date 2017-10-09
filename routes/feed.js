var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/feed', function(req, res, next) {
    // res.send('im the feed!');
    console.log('im the feed!');
});

module.exports = router;

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/feed', function(req, res, next) {
    console.log('im the feed!');
});

module.exports = router;

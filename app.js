var express = require('express');
var path = require('path');

var index = require('./routes/index');
var feed = require('./routes/feed');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/static', express.static(__dirname + '/public'));
app.use('/bower', express.static(__dirname + '/bower_components'));

app.use('/', index);
// app.use('/feed', feed);
//

module.exports = app;

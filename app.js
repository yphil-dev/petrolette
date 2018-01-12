var express = require('express'),
    path = require('path'),
    index = require('./routes/index'),
    app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/static', express.static(__dirname + '/public'));
app.use('/tmp', express.static(__dirname + '/tmp'));

app.use('/bower', express.static(__dirname + '/bower_components'));

app.use('/', index);

module.exports = app;

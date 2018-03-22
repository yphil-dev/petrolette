var express = require('express'),
    path = require('path'),
    index = require('./routes/index'),
    app = express();


var counter = 0;

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/bower', express.static(path.join(__dirname, 'bower_components')));
app.use('/', index);

module.exports = app;

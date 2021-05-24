const express = require('express'),
      path = require('path'),
      router = require('./routes/router'),
      fs = require('fs'),
      pjson = require('./package.json'),
      bodyParser = require('body-parser'),
      app = express(),
      helmet = require("helmet"),
      compression = require('compression');

fs.mkdir(path.join(__dirname, pjson.FAVICONS_CACHE_DIR), (err) => {
  if (err) {
    return console.error(err);
  }
  return true;
});

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(compression());

app.use(helmet({contentSecurityPolicy: false}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/favicons', express.static(path.join(__dirname, pjson.FAVICONS_CACHE_DIR)));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/bower', express.static(path.join(__dirname, 'bower_components')));
app.use('/', router);

module.exports = app;

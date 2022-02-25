const express = require('express'),
      path = require('path'),
      router = require('./routes/router'),
      fs = require('fs'),
      pjson = require('./package.json'),
      bodyParser = require('body-parser'),
      app = express(),
      helmet = require("helmet"),
      compression = require('compression');

fs.mkdir(path.join(__dirname, pjson.FAVICONS_CACHE_DIR), {
  recursive: true
}, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log('Directory created successfully!');
  return true;
});

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(compression());

app.use(helmet({contentSecurityPolicy: false, crossOriginEmbedderPolicy: false,}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Comment out for cert renewal, then back in
// app.use(express.static(__dirname + '/public', { dotfiles: 'allow' }));

app.use('/favicons', express.static(path.join(__dirname, pjson.FAVICONS_CACHE_DIR)));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/bower', express.static(path.join(__dirname, 'bower_components')));
app.use('/', router);

module.exports = app;

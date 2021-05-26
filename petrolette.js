const express = require('express'),
      path = require('path'),
      router = require('./routes/router'),
      fs = require('fs'),
      pjson = require('./package.json'),
      bodyParser = require('body-parser'),
      app = express(),
      helmet = require("helmet"),
      compression = require('compression');

function ensureExists(path, mask, cb) {
    if (typeof mask == 'function') { 
        cb = mask;
        mask = 0777;
    }
    fs.mkdir(path, mask, function(err) {
        if (err) {
            if (err.code == 'EEXIST') cb(null); 
            else cb(err); 
        } else cb(null); 
    });
}

ensureExists(path.join(__dirname, pjson.config.FAVICONS_CACHE_DIR), 0744, function(err) {

  if (err)
    console.error('Whoa: %s (%s)');
  else
    console.error('We good: %s (%s)');

});

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(compression());

app.use(helmet({contentSecurityPolicy: false}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/favicons', express.static(path.join(__dirname, pjson.config.FAVICONS_CACHE_DIR)));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/bower', express.static(path.join(__dirname, 'bower_components')));
app.use('/', router);

module.exports = app;

const express = require('express'),
      path = require('path'),
      index = require('./routes/router'),
      fs = require('fs'),
      pjson = require('./package.json'),
      bodyParser = require('body-parser'),
      app = express(),
      helmet = require("helmet"),
      compression = require('compression');

if (!fs.existsSync(path.join(__dirname, pjson.FAVICONS_CACHE_DIR))){
  fs.mkdirSync(path.join(__dirname, pjson.FAVICONS_CACHE_DIR));
}

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.disable('x-powered-by');

app.use(compression());

app.use('/favicons', express.static(path.join(__dirname, pjson.FAVICONS_CACHE_DIR)));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/bower', express.static(path.join(__dirname, 'bower_components')));

app.use('/', index);

app.use(helmet.originAgentCluster());
app.use(helmet.noSniff());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

module.exports = app;

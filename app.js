const express = require('express'),
      path = require('path'),
      index = require('./routes/index'),
      fs = require('fs'),
      pjson = require('./package.json'),
      bodyParser = require('body-parser'),
      app = express(),
      morgan = require('morgan');

if (!fs.existsSync(path.join(__dirname, pjson.FAVICONS_CACHE_DIR))){
  fs.mkdirSync(path.join(__dirname, pjson.FAVICONS_CACHE_DIR));
}

app.use(morgan('combined'));

// morgan.format('combined', ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"')

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/favicons', express.static(path.join(__dirname, pjson.FAVICONS_CACHE_DIR)));

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/bower', express.static(path.join(__dirname, 'bower_components')));
app.use('/', index);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

module.exports = app;

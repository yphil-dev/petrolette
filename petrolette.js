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
  return true;
});

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(compression());

// app.use(helmet({contentSecurityPolicy: false, crossOriginEmbedderPolicy: false}));

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", "https://www.googleapis.com", "https://api.dropboxapi.com", "https://content.dropboxapi.com", "https:"],
      imgSrc: ["'self'", "'unsafe-inline'", "https:", "data:"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      scriptSrcAttr: null
    }
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Comment out for cert renewal, then back in
// app.use(express.static(__dirname + '/public', { dotfiles: 'allow' }));

app.use('/favicons', express.static(path.join(__dirname, pjson.FAVICONS_CACHE_DIR)));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/introjs', express.static(path.join(__dirname, 'node_modules', 'intro.js')));
app.use('/jquery', express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist')));
app.use('/jquery-ui', express.static(path.join(__dirname, 'node_modules', 'jquery-ui-dist')));

app.use('/fancybox', express.static(path.join(__dirname, 'node_modules', '@fancyapps', 'fancybox', 'dist')));
app.use('/responsively-lazy', express.static(path.join(__dirname, 'node_modules', 'responsively-lazy')));


app.use('/rs', express.static(path.join(__dirname, 'node_modules', 'remotestoragejs', 'release')));
app.use('/rs-widget', express.static(path.join(__dirname, 'node_modules', 'remotestorage-widget', 'build')));

app.use('/dompurify', express.static(path.join(__dirname, 'node_modules', 'dompurify', 'dist')));
app.use('/mousetrap', express.static(path.join(__dirname, 'node_modules', 'mousetrap')));


app.use('/', router);

module.exports = app;

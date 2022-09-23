const express = require('express'),
      path = require('path'),
      router = require('./routes/router'),
      fs = require('fs'),
      pjson = require('./package.json'),
      bodyParser = require('body-parser'),
      app = express(),
      helmet = require("helmet"),
      crypto = require("crypto"),
      compression = require('compression');

const configFilePath = path.resolve(__dirname, 'petrolette.config.json');

var ptlOptions = '';
var instanceType = 'multiUser';

fs.mkdir(path.join(__dirname, pjson.FAVICONS_CACHE_DIR), {
  recursive: true
}, (err) => {
  if (err) {
    return console.error(err);
  }
  return true;
});

try {

  var theFile = fs.readFileSync(configFilePath);

  if (theFile) {

    try {
      ptlOptions = JSON.parse(theFile);

      if (ptlOptions.hasOwnProperty('instanceType')) {
        instanceType = ptlOptions.instanceType;
      }
      
    } catch (err) {
      console.error('## Pétrolette: Not a valid config file');
    }
    
  }
} catch {
  console.error('## Pétrolette: No config file found');
}

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(compression());

app.use(helmet({contentSecurityPolicy: false, crossOriginEmbedderPolicy: false}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Comment out for cert renewal, then back in
// app.use(express.static(__dirname + '/public', { dotfiles: 'allow' }));

app.use('/favicons', express.static(path.join(__dirname, pjson.FAVICONS_CACHE_DIR)));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/bower', express.static(path.join(__dirname, 'bower_components')));
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

console.error('## Pétrolette instance type: ', instanceType);

app.use('/', function (req, res, next) {
  req.instanceType = instanceType;
  next();        
}, router);

module.exports = app;

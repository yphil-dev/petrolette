var express = require('express'),
    path = require('path'),
    index = require('./routes/index'),
    fs = require('fs'),
    app = express();

if (!fs.existsSync(process.env.FAVICONS_CACHE_DIR)){
  fs.mkdirSync(process.env.FAVICONS_CACHE_DIR);
}

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'favicons-cache')));

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/bower', express.static(path.join(__dirname, 'bower_components')));
app.use('/', index);

module.exports = app;

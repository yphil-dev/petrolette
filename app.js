var express = require('express')
var path = require('path')

var index = require('./routes/index')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/tmp', express.static(path.join(__dirname, 'tmp')))

app.use('/bower', express.static(path.join(__dirname, 'bower_components')))
app.use('/', index)

module.exports = app

#!/usr/bin/env node

const petrolette = require('../petrolette'),
      path = require('path'),
      http = require('http'),
      https = require('https'),
      fs = require('fs');

const httpsServer = https.createServer({
  key: fs.readFileSync(path.join(__dirname, '../cert/privkey.pem'), 'utf8'),
  cert: fs.readFileSync(path.join(__dirname, '../cert/cert.pem'), 'utf8'),
}, petrolette);

var httpServer = http.createServer(petrolette);

httpServer.listen(8000, () => {
  console.error('HTTP Server running');
});

httpsServer.listen(443, () => {
  console.log('HTTPS Server running');
});

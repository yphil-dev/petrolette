const petrolette = require('../petrolette'),
      http = require('http'),
      https = require('https'),
      fs = require('fs');

const httpServer = http.createServer(petrolette);

httpServer.listen(8000, () => {
  console.debug('HTTP Server running');
});

const httpsServer = https.createServer({
  key: fs.readFileSync('/etc/letsencrypt/live/petrolette.space/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/petrolette.space/cert.pem'),
  ca: fs.readFileSync('/etc/letsencrypt/live/petrolette.space/chain.pem'),
}, petrolette);

httpsServer.listen(8001, () => {
  console.error('HTTPS Server running?');
});

const petrolette = require('../petrolette'),
      pjson = require('../package.json'),
      http = require('http'),
      https = require('https'),
      fs = require('fs');

const httpServer = http.createServer(petrolette);

const portHttp =  pjson.HTTP_PORT || 8000;
const portHttps =  pjson.HTTPS_PORT || 8001;

httpServer.listen(portHttp, () => {
  console.debug('HTTP Server running on port %s', port);
});

const httpsServer = https.createServer({
  key: fs.readFileSync('/etc/letsencrypt/live/petrolette.space/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/petrolette.space/cert.pem'),
  ca: fs.readFileSync('/etc/letsencrypt/live/petrolette.space/chain.pem'),
}, petrolette);

httpsServer.listen(portHttps, () => {
  console.debug('HTTPS Server running');
});

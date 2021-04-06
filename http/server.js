const petrolette = require('../petrolette'),
      http = require('http'),
      https = require('https'),
      fs = require('fs');

const httpServer = http.createServer(petrolette);

/* look for port in environment variable  */
const portHttp =  parseInt(process.env["PTL_PORT_HTTP"]) || 8000;
const portHttps =  parseInt(process.env["PTL_PORT_HTTPS"]) || 8001;

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

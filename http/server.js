const petrolette = require('../petrolette'),
      http = require('http'),
      https = require('https'),
      fs = require('fs');

const httpServer = http.createServer(petrolette);

/* look for port in environment variable  */
const port =  parseInt(process.env["PORT"]) || 8000;

httpServer.listen(port, () => {
  console.debug('HTTP Server running on port %s', port);
});

const httpsServer = https.createServer({
  key: fs.readFileSync('/etc/letsencrypt/live/petrolette.space/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/petrolette.space/cert.pem'),
  ca: fs.readFileSync('/etc/letsencrypt/live/petrolette.space/chain.pem'),
}, petrolette);

httpsServer.listen(8001, () => {
  console.debug('HTTPS Server running');
});

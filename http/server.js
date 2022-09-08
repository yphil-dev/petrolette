const petrolette = require('../petrolette'),
      pjson = require('../package.json'),
      http = require('http'),
      https = require('https'),
      fs = require('fs');

const httpServer = http.createServer(petrolette);

const myArgs = process.argv.slice(2);
console.error('myArgs: ', myArgs[0]);

const portHttp =  pjson.HTTP_PORT || 8000;
const portHttps =  pjson.HTTPS_PORT || 8001;

process.on('uncaughtException', function(err) {
  console.error('### Pétrolette uncaughtException: %s', err.code);
});

try {
  const httpsServer = https.createServer({
    key: fs.readFileSync('/etc/letsencrypt/live/petrolette.space/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/petrolette.space/cert.pem'),
    ca: fs.readFileSync('/etc/letsencrypt/live/petrolette.space/chain.pem'),
  }, petrolette);

  httpsServer.listen(portHttps, () => {
    console.debug('HTTPS Server running');
  });

} catch (error) {
  console.error('error: no HTTPS here');
}

httpServer.listen(portHttp, (req, res) => {
  console.debug('HTTP Server running on port %s, redirecting to port %s', portHttp, portHttps);
  res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
});


// http.createServer(function (req, res) {

//   console.error('yoo:' + myArgs[0]);

//   console.error('Running HTTPserver on ' + portHttp);
  
//   if (myArgs[0] != 'dev') {
//     console.error('Redirecting to ' + portHttps);
//     res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
//   }
  
//   res.end();
// }).listen(portHttp);

const petrolette = require('../petrolette'),
      pjson = require('../package.json'),
      http = require('http'),
      https = require('https'),
      fs = require('fs');

const portHttp =  pjson.HTTP_PORT || 8000;
const portHttps =  pjson.HTTPS_PORT || 8001;

process.on('uncaughtException', function(err) {
  console.error('## Pétrolette uncaughtException: %s', JSON.stringify(err));
});

console.error('## Pétrolette environment: %s', process.env.NODE_ENV);

process.on('uncaughtException', function(err) {
  console.error('## Pétrolette uncaughtException: %s', err.code);
});

if (process.env.NODE_ENV == 'development') {
  const httpServer = http.createServer(petrolette);
  httpServer.listen(portHttp, () => {
    console.error('## Pétrolette HTTP Server running on port %s', portHttp);
  });
	
} else {

  try {
    const httpsServer = https.createServer({
      key: fs.readFileSync('/etc/letsencrypt/live/petrolette.space/privkey.pem'),
      cert: fs.readFileSync('/etc/letsencrypt/live/petrolette.space/cert.pem'),
      ca: fs.readFileSync('/etc/letsencrypt/live/petrolette.space/chain.pem'),
    }, petrolette);

    httpsServer.listen(portHttps, () => {
      console.error('## Pétrolette HTTPS Server running on port %s', portHttps);
    });

  } catch (error) {
    console.error('HTTPS error: %s', error);
  }

  http.createServer(function (req, res) {
    console.error('## Pétrolette HTTP server running on %s and redirecting to %s', portHttp, portHttps);
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
  }).listen(portHttp);

}

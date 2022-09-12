const petrolette = require('../petrolette'),
      pjson = require('../package.json'),
      http = require('http'),
      fs = require('fs');

const httpServer = http.createServer(petrolette);

const portHttp =  pjson.HTTP_PORT || 8000;
const portHttps =  pjson.HTTPS_PORT || 8001;

process.on('uncaughtException', function(err) {
  console.error('### Pétrolette uncaughtException: %s', err.code);
});

httpServer.listen(portHttp, () => {
  console.debug('HTTP Server running on port %s', portHttp);
});

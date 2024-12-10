const petrolette = require('../petrolette');
const http = require('http');

const port = process.env.PORT || 8000;

console.log('port: ', port);

process.on('uncaughtException', function (err) {
  console.error('## Pétrolette uncaughtException:', err);
});

console.error('## Pétrolette environment:', process.env.NODE_ENV);

const server = http.createServer(petrolette);
server.listen(port, () => {
  console.error('## Pétrolette Server running on port', port);
});

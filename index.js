var http = require('http');
var server = http.createServer();
server.listen(process.env.PORT);
server.on('request', handleRequest);

function handleRequest (request, response) {
  response.end(`Handling request URL: ${request.url}`);
}

console.log(`listening on ${process.env.PORT}`); 
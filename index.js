var http = require('http');
var mongo = require('mongodb').MongoClient;

var server = http.createServer();
server.listen(process.env.PORT);
server.on('request', handleRequest);

var url = 'mongodb://krulik:foobar@ds133981.mlab.com:33981/heroku_f9src7jj';
var db;

mongo.connect(url, function (err, _db) {
  console.log('Connected successfully to mongo');
  console.log(_db);
  db = _db;
  collection = db.collection('items');
  collection.find({data: 42}).toArray(function (err, docs) {
    console.log(docs);
  });
});

function handleRequest (request, response) {
  response.end(`Handling request URL: ${request.url}, dbName: ${db.databaseName}`);
}

console.log(`listening on ${process.env.PORT}`); 
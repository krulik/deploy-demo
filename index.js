'use strict';

let http = require('http');
let fs = require('fs');
let mongo = require('mongodb').MongoClient;

let url = process.env.MONGO_URL || '';
let db, collection;
let server = http.createServer();
server.listen(process.env.PORT || '5000');
server.on('request', handleRequest);
if (url) {
  connectToMongo(url);
}

function connectToMongo(url) {
  mongo.connect(url, (err, _db) => {
    if (err) {
      console.log(`got error=[${err}]`);
      return;
    }
    db = _db;
    console.log('Connected successfully to mongo', db);
    collection = db.collection('items');
    collection.find({data: 42}).toArray(function (err, docs) {
      if (err) {
        console.log(`got query error=[${err}]`);
        return;
      }
      console.log('got docs', docs);
    });
  });
}

function handleRequest (request, response) {
  if (request.url === '/' || request.url === '/index.html') {
    fs.readFile('index.html', 'utf-8', (err, data) => {
      response.end(data);
    });
  } else {
    response.end(`Hi 2022 URL: ${request.url}, dbName: ${db.databaseName}`);
  }
}

console.log(`listening on ${process.env.PORT}`);

module.exports = {
  handleRequest
};
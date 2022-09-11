'use strict';

let fs = require('fs');

const express = require('express');
var cors = require('cors');
const app = express();
app.use(cors());

let mongo = require('mongodb').MongoClient;

let url = process.env.MONGO_URL || '';
let db, collection;

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
  });
}

const port = process.env.PORT || '5000';
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

app.get('/', (req, res) => {
  fs.readFile('index.html', 'utf-8', (err, data) => {
    res.send(data);
  });
});

app.get('/docs', (req, res) => {
  collection.find({data: 42}).toArray(function (err, docs) {
    if (err) {
      console.log(`got query error=[${err}]`);
      return;
    }
    res.json(docs);
  });
});
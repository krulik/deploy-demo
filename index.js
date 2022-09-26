'use strict';

let fs = require('fs');
const path = require('path');

const express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
const multer  = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '/files/'))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + Math.round(Math.random() * 1E9)
    const parts = file.originalname.split('.');
    const extension = parts[parts.length - 1];
    const fullName = file.fieldname + uniqueSuffix + '.' + extension;
    cb(null, fullName)
  }
})

const upload = multer({ storage: storage })

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))

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

app.get('/files/:fileName', (req, res) => {
  fs.readFile(`./files/${req.params.fileName}`, (err, data) => {
    if (err) {
      console.log(`error=[${err}]`);
      return;
    }
    res.writeHead(200, {'Content-Type': 'image/png'});
    res.end(data);
  });
});

app.post('/posts', upload.single('img'), (req, res) => {
  // mongo.save(post.id, {
  //   imgUrl: `files/${req.file.fileName}`
  // })
  res.send({...req.body, file: req.file});
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
const fs = require('fs');
const express = require('express');

const app = express();

const port = process.env.PORT || '5000';
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

app.get('/', (req, res) => {
  fs.readFile('index.html', 'utf-8', (err, data) => {
    res.send(data);
  });
});
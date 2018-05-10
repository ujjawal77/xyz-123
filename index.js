var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, '/dist/')));

app.use('/api/voting', require('./xyz-123-api/voting'));

app.use('*', function (req, res, next) {
  res.sendFile('index.html', {root : path.join(__dirname, '/dist/')})
});

app.listen(port, function () {
  console.log("app listening on port : ", port);
});

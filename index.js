var express = require('express');

var quickstart = require('./quickstart');

var allowInsecureHTTP = false
var trustProxy = true;

var app = express();

app.get('/', function(req, res) {
  res.status(200).send('Test.');
});

app.use('/quickstart', quickstart);

var port = process.env.PORT || 3001;

var httpServer = require('http').createServer(app);

httpServer.listen(port, function() {
  console.log('server running on port ' + port + '.');
});

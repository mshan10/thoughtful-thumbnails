var express = require('express');

var search = require('./search');

var allowInsecureHTTP = false
var trustProxy = true;

var app = express();

app.get('/', function(req, res) {
  res.status(200).send('Test.');
});

app.use('/search', search);

var port = process.env.PORT || 4000;

var httpServer = require('http').createServer(app);

httpServer.listen(port, function() {
  console.log('server running on port ' + port + '.');
});

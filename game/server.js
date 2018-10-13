var app = require('express')();
var http = require('http').Server(app);
var config = require('./config.json');
var port = config.port;
app.get('/', function(req, res){
    res.sendFile(__dirname + './client/index.html');
  });

http.listen(port, function(){
  console.log(`listening on *:${port}`);
});

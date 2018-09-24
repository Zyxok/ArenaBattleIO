var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/index.html');
});
app.use('/client',express.static(__dirname + '/client'));

server.listen(8080);
var socket_list = {};
io.sockets.on("connection", (socket) => {
    console.log("connection");
    socket.id = Math.random();
    socket.x = 0;
    socket.y = 0;
    socket_list[socket.id] = socket;

    socket.on("disconnect", (socket) => {
        console.log("Disconnect");
    });
    socket.emit("hey", {
        reason: "whats up",
    });
});
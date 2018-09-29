var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/index.html');
});
app.use(express.static(__dirname + '/client'));

server.listen(8080);
var socket_list = {};
io.sockets.on("connection", (socket) => {
    console.log("connection");

    var players = {};
        // create a new player and add it to our players object
            players[socket.id] = {
                rotation: 0,
                x: Math.floor(Math.random() * 700) + 50,
                y: Math.floor(Math.random() * 500) + 50,
                layerId: socket.id,
                team: (Math.floor(Math.random() * 2) == 0) ? 'red' : 'blue'
            };
        // send the players object to the new player
            socket.emit('currentPlayers', players);
        // update all other players of the new player
            socket.broadcast.emit('newPlayer', players[socket.id]);

        socket.on("disconnect", (socket) => {
                console.log("Disconnect");
            // remove this player from our players object
                delete players[socket.id];
            // emit a message to all players to remove this player
                io.emit('disconnect', socket.id);
    });

});
'use strict';

var app = require('./app.js');
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log('Server running on port %d', port);
});

//Web socket////

let userSockets = {};

io.on('connection', (socket) => {
  socket.on('disconnect', function () {
    for (let user in userSockets) {
      if (userSockets[user] === socket.id) {
        delete userSockets[user];
      }
    }
    socket.id
    io.sockets
      .emit('friendsOnline', Object.keys(userSockets));
  })
  socket.on('init', (info) => {
    userSockets[info.loggedInUser] = socket.id;
    io.sockets
    .emit('friendsOnline', Object.keys(userSockets));
  })
  socket.on('friendsOnline', (req => {
    io.sockets
    .emit('friendsOnline', Object.keys(userSockets));
  }))
  socket.on('private', (msg) => {
    io.sockets.sockets[userSockets[msg.to]]
    .emit("private", { from: msg.from, to: msg.to, msg: msg.msg.text });
  })
})

///////////////
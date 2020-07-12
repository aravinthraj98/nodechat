const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require('path');
const socketio = require('socket.io');
const usermessage = require('./util/message');
const {
  userjoin,
  getcurrentuser,
  leftuser,
  roomuser,
} = require('./util/userjoin');
app.use(express.static(path.join(__dirname, 'public')));

const io = socketio(server);
io.on('connection', (socket) => {
  socket.on('joinroom', ({ username, room }) => {
    const user = userjoin(username, room, socket.id);
    const roomusers = roomuser(room);
    console.log(roomusers);
    io.to(user.room).emit('roomusers', roomusers);

    socket.join(user.room);
    io.to(user.room).emit('roomusers', roomusers);
    socket.emit(
      'message',
      usermessage(username, `welcome to the chat ${room} room`, 'center')
    );
    socket.broadcast
      .to(user.room)
      .emit('message', usermessage(username, `has joined the chat`, 'center'));

    console.log('rejj');
  });

  socket.on('chatMessage', (message) => {
    const user = getcurrentuser(socket.id);
    console.log(user.room);
    socket.broadcast
      .to(user.room)
      .emit('message', usermessage(user.username, message, 'left'));
    socket.emit('message1', usermessage(user.username, message, 'right'));
  });
  socket.on('disconnect', () => {
    const user = leftuser(socket.id);
    console.log(user[0].room);
    const roomusers = roomuser(user[0].room);

    io.to(user[0].room).emit(
      'message',
      usermessage(user[0].username, 'user left', 'center')
    );
    console.log(roomusers);
    io.to(user[0].room).emit('roomusers', roomusers);
  });
});
//if(process.env.NODE_ENV === "production"){
// app.use(express.static('bui'))}

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Connected to port ${PORT}`);
});

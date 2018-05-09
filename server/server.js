const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname + '/../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));
io.sockets.countUser = 0;
io.on('connection', (socket) => {
    console.log('New user connected!');
    io.sockets.countUser += 1;

    io.sockets.emit('countUser', {
        count: io.sockets.countUser,
    });
    // socket.emit('newMessage', {
    //     from: 'Son',
    //     text: 'see you then',
    //     createAt: 1231231
    // });

    socket.on('createEmail', (newEmail) => {
        console.log('createEmail', newEmail);
    });

    // socket.emit from admin text Welcom to the chat app
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    // socket.broadcast.emit from Admin text New user joined
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from the server.');
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createAt: new Date().getTime()
        // });
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        io.sockets.countUser -= 1;
        console.log('User was disconnected!');
        io.sockets.emit('countUser', {
            count: io.sockets.countUser,
        });
    });
});

server.listen(port, () => {
    console.log(`Connect to server port ${port}`);
});
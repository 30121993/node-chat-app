const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname + '/../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected!');

    // socket.emit('newMessage', {
    //     from: 'Son',
    //     text: 'see you then',
    //     createAt: 1231231
    // });

    socket.on('createEmail', (newEmail) => {
        console.log('createEmail', newEmail);
    });

    // socket.emit from admin text Welcom to the chat app
    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the chat app'
    });
    // socket.broadcast.emit from Admin text New user joined
    socket.broadcast.emit('newMessage',{
        from: 'Admin',
        text: 'New user joined',
        createAt: new Date().getTime()
    })

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createAt: new Date().getTime()
        });

        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createAt: new Date().getTime()
        // });
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected!');
    });
});

server.listen(port, () => {
    console.log(`Connect to server port ${port}`);
});
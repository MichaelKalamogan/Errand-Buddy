const path = require('path');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, '../../build')));

// app.get('/', (req, res, next) => res.sendFile(__dirname + './index.html'));

let users = []

const addUser = (user_name, socketId) => {
    !users.some((user) => user.user_name === user_name) &&
    users.push({user_name, socketId})
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId)
}

//Find user
const getUser = (user_name) => {
    return users.find(user => user.user_name === user_name)
}

io.on("connection", (socket) => {
    //when connected    
    console.log('user connected')

    //take username and socketId from user
    socket.on("addUser", (user_name) => {
        addUser(user_name, socket.id)
        io.emit("getUsers",users)
    })

    //send and get message
    socket.on('sendMessage', ({senderId, receiverId, text}) => {

        const user = getUser(receiverId)
        io.to(user.socketId).emit('getMessage', {senderId, text})
    })

    //when disconnected
    socket.on("disconnect", () => {
        console.log('user disconnected')
        removeUser(socket.id)
    })
});

server.listen(port);
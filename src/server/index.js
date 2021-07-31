const path = require('path');
const express = require('express');

const port = process.env.PORT || 3000;
const INDEX = '/index.html'

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = require('socket.io')(server);

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
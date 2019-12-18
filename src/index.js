const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')

const { generateMessage, generateLocationMessage } = require('./utils/messages')
const { addUser, removeUser, getUser, getUsers, getUsersInRoom } = require('./utils/users')
const { checkForAddingRoom, checkForRemoveRoom, getNumberofUser, getRooms } = require('./utils/rooms')
const { getRoomInfo } = require('./utils/boardingInfo')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000;

// --- define  path for express config
const publicDirectoryPath = path.join(__dirname, '../public')

// --- Setup static directory to serve
app.use(express.static(publicDirectoryPath))


io.on('connection', (socket) => {
    console.log('New web socket connection')

    socket.on('join', ({username, room}, callback) => {

        const addRoom = checkForAddingRoom(room, getUsers())
        const { error, user } = addUser({ id: socket.id, username, room })

        if (error) {
            return callback(error)
        }

        socket.join(user.room)
        
        socket.emit("message", generateMessage('Admin', `Welcome to the ${user.room} room !`))
        socket.broadcast.to(user.room).emit("message", generateMessage(`${user.username} has join the room !`))

        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        })

        io.emit('rooms', getRooms())
        
        const rooms = getRoomInfo()
        io.emit('LandingInfo', rooms)

        callback()

        // socket.emit - io.emit - socket.broadcast.emit   -->  For people in all server
        // io.to.emit - socket.broadcast.to.emit    -->  For people in a specific server
    })

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter()
        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed !')
        }

        const user = getUser(socket.id)

        io.to(user.room).emit('message', generateMessage(user.username, message))
        callback()
    })

    socket.on('sendYoutubeLink', (message, callback) => {
        const user = getUser(socket.id)
        message = message.replace("watch?v=", "embed/").replace("playlist", "embed/videoseries")

        io.to(user.room).emit('youtubeMessage', generateMessage(user.username, message))
        callback()
    })

    socket.on('sendLocation', (coords, callback) => {
        const user = getUser(socket.id)

        io.to(user.room).emit('locationMessage', generateLocationMessage(user.username, `https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
        callback()
    })


    socket.on('disconnect', () => { 

        const user = removeUser(socket.id)

        if (user) {
            const romoveRoom = checkForRemoveRoom(user.room, getUsers())
            io.to(user.room).emit('message', generateMessage(`${user.username} has left the room !`))
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room)
            })

            io.emit('rooms', getRooms())

            const rooms = getRoomInfo()
            io.emit('LandingInfo', rooms)
        }
    })

    /* ------------------------------------------------ */

    socket.on('needLandingInfo', () => {
        const rooms = getRoomInfo()
        socket.emit('LandingInfo', rooms)
    })
})

server.listen(port, () => {
    console.log('Server is up on port ' + port)
});

//app.use(express.json());
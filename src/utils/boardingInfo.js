const { addUser, removeUser, getUser, getUsers, getUsersInRoom } = require('./users')
const {checkForAddingRoom, checkForRemoveRoom, getNumberofUser, getRooms } = require('./rooms')

const getRoomInfo = () => {
    const roomAvailable = getRooms()
    const users = getUsers()
    const rooms = []
    roomAvailable.forEach(room => {
        
        const thisRoom = {
            roomname: room.roomname, 
            seat: getNumberofUser(room.roomname, users)
        }
        rooms.push(thisRoom)
    });

    return rooms
}

module.exports = {
    getRoomInfo
}
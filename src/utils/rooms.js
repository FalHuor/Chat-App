
const rooms = []

const checkForAddingRoom = (roomname, users) => {
    // Clean data
    roomname = roomname.trim().toLowerCase().replace(" ", "")

    let add = false
    const  nb = getNumberofUser(roomname, users)
    if (nb === 0) {
        addRoom(roomname)
        add = true
    }
    return add
}

const addRoom = (roomname) => {
    // Validate data
    if (!roomname) {
        return {
            error: 'room are required !'
        }
    }

     // Check for existing room
     const existingRoom = rooms.find((room) => {
        return room.name === roomname
    })

    // validate room
    if (existingRoom) {
        return {
            error: 'Room already exist !'
        }
    }

    const room = { roomname }
    rooms.push(room)
    return { room }       
}

const checkForRemoveRoom = (roomname, users) => {
    let remove = false
    const  nb = getNumberofUser(roomname, users)
    if (nb === 0) {
        removeRoom(roomname)
        remove = true
    }
    return remove
}

const removeRoom = (roomname) => {
    const index = rooms.findIndex((room) => room.roomname === roomname)

    if (index !== -1) {
        return rooms.splice(index, 1)[0]
    }
}

const getNumberofUser = (roomname, users) => {
    return users.filter((user) => user.room === roomname ).length
}

const getRooms = () => {
    return rooms
}

module.exports = {
    rooms,
    checkForAddingRoom,
    addRoom,
    checkForRemoveRoom,
    removeRoom,
    getNumberofUser,
    getRooms
}
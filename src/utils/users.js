const users = []

const addUser = ({ id, username, room }) => {
    // Validate data
    if (!username || !room) {
        return {
            error: 'Username and room are required !'
        }
    }
    
    // Clean data
    username = username.trim().toLowerCase().replace(" ", "")
    room = room.trim().toLowerCase().replace(" ", "")

    console.log(room);
    

    // Check for existing user
    const existingUser = users.find((user) => {
        return user.room === room && user.username === username
    })

    // validate username
    if (existingUser) {
        return {
            error: 'Username is already taken in this room !'
        }
    }

    // Store User
    const user = { id, username, room }
    users.push(user)
    return { user }
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id)

    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

const getUser = (id) => {
    return users.find(user => user.id === id)
}

const getUsers = () => {
    return users
}

const getUsersInRoom = (room) => {
    return users.filter((user) => user.room === room )
}

module.exports = {
    users,
    addUser,
    removeUser,
    getUser,
    getUsers,
    getUsersInRoom
}

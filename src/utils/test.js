const {checkForAddingRoom, checkForRemoveRoom, getNumberofUser, getRooms } = require('./rooms')
const { getUsers, addUser, removeUser } = require('./users')

checkForAddingRoom('name', getUsers())
addUser({id: 5, username: 'corentin', room: 'name'})

checkForAddingRoom('name', getUsers())
addUser({id: 6, username: 'clara', room: 'name'})

checkForAddingRoom('name', getUsers())
addUser({id: 7, username: 'felix', room: 'name'})

checkForAddingRoom('efsf', getUsers())
addUser({id: 8, username: 'panda', room: 'efsf'})

console.log(getUsers());

console.log(getNumberofUser('name', getUsers()))

console.log(getRooms());

removeUser(7)
checkForRemoveRoom('name', getUsers())
removeUser(8)
checkForRemoveRoom('efsf', getUsers())

console.log("\n------------------------------------------------\n");
console.log(getUsers());

console.log(getNumberofUser('name', getUsers()))

console.log(getRooms());
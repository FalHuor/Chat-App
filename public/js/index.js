const socket = io()

window.addEventListener('load', () => {
    console.log("It's load");

    socket.emit('needLandingInfo', () => {
        console.log("Appel fait !");
    })

})

socket.on('LandingInfo', (rooms) => {
    console.log(rooms)
})
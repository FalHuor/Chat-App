const socket = io()

// Elements
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocationButton = document.querySelector('#send-location')
const $messages = document.querySelector('#messages')

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const youtubeMessageTemplate = document.querySelector('#youtube-message-template').innerHTML
const locationMessageTemplate = document.querySelector('#location-message-template').innerHTML
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML
const sidebarRoomTemplate = document.querySelector('#sidebarRoom-template').innerHTML

// Options
const { username, room, color } = Qs.parse(location.search, { ignoreQueryPrefix: true })

console.log(username, room, color);


const autoscroll = () => {
    // New message element
    const $newMessage = $messages.lastElementChild

    // Height of the new message
    const newMessageStyles = getComputedStyle($newMessage)
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin

    // visible height
    const visibleHeight = $messages.offsetHeight

    // Height of messages container
    const containerHeight = $messages.scrollHeight

    // How far have I scrolled
    const scrollOffset = $messages.scrollTop + visibleHeight

    if (containerHeight - newMessageHeight <= scrollOffset) {
        $messages.scrollTop = $messages.scrollHeight
    }
}

socket.on('message', (message) => {
    console.log(message)
    const  html = Mustache.render(messageTemplate, {
        username: message.username,
        usercolor: message.usercolor,
        message: message.text,
        createdAt: moment(message.createdAt).format('H:mm:ss')
    })
    $messages.insertAdjacentHTML('beforeend', html)
    playNotification(message.username)
    autoscroll()
})

socket.on('youtubeMessage', (message) => {
    console.log(message)
    const  html = Mustache.render(youtubeMessageTemplate, {
        username: message.username,
        usercolor: message.usercolor,
        message: message.text,
        createdAt: moment(message.createdAt).format('H:mm:ss')
    })
    $messages.insertAdjacentHTML('beforeend', html)
    playNotification(message.username)
    autoscroll()
})

socket.on('locationMessage', (message) => {
    const html = Mustache.render(locationMessageTemplate, {
        username: message.username,
        usercolor: message.usercolor,
        url: message.url,
        createdAt: moment(message.createdAt).format('H:mm:ss')
    })
    $messages.insertAdjacentHTML('beforeend', html)
    playNotification(message.username)
    autoscroll()
})

socket.on('roomData', ({room, users}) => {
    const html = Mustache.render(sidebarTemplate, {
        room,
        users
    })
    document.querySelector('#sidebar_content').innerHTML = html
    console.log(users);
    
})

socket.on('rooms', (rooms) => {
    const html = Mustache.render(sidebarRoomTemplate, {
        rooms, 
        username,
        color
    })
    document.querySelector('#sidebarNext').innerHTML = html
    console.log(rooms)


})

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault();

    $messageFormButton.setAttribute('disabled', 'disabled')

    const message = e.target.elements.message.value

    const shortMessage = message.slice(0, 23);

    switch (shortMessage) {
        case "https://www.youtube.com":
            socket.emit('sendYoutubeLink', message, (error) => {
                if (error) {
                    return console.log(error);
                }
                console.log('YoutubeLink deliver');
            })
            break;
    
        default:
            socket.emit('sendMessage', message, (error) => {
                if (error) {
                    return console.log(error);
                }
                console.log('message deliver');
            })
            break;
    }

    $messageFormButton.removeAttribute('disabled')
    $messageFormInput.value = ''
    $messageFormInput.focus()
})

$sendLocationButton.addEventListener('click', () => {
    
    $sendLocationButton.setAttribute('disabled', 'disabled')

    if (!navigator.geolocation) {
        return alert('Geolocation is not support by your browser.')
    }

    navigator.geolocation.getCurrentPosition((position) => {

        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            $sendLocationButton.removeAttribute('disabled')
            console.log('Location Shared !')
        })
    })
})

socket.emit('join', { username, room, color }, (error) => {
    if (error) {
        alert(error)
        location.href = '/'   
    }
})

$("#sidebar").on('click', '.arrow', function(){ 
    
    $(".chat__sidebar").toggleClass("pannel_close")
    
    if ($(".arrow").attr('class') == "arrow arrow_open") {
        onAnimateStart()
        $(".arrow").removeClass("arrow_open").addClass("arrow_close")
        $(".arrow").children().removeClass("fa-angle-left").addClass("fa-angle-right")
        setTimeout(function(){ onAnimateComplete(); }, 500);
    } else {
        onAnimateStart()
        $(".arrow").removeClass("arrow_close").addClass("arrow_open")
        $(".arrow").children().removeClass("fa-angle-right").addClass("fa-angle-left")
        setTimeout(function(){ onAnimateComplete(); }, 500);
    }
});

function onAnimateStart() {
    $(".chat__sidebar").removeClass('hoverOn');
}
  
function onAnimateComplete() {
    $(".chat__sidebar").addClass('hoverOn');
}

function playNotification(user){
    if (user != username && user != "Admin") {
        if (localStorage.getItem('sound') === 'on' && !window.onfocus){
            var mp3Source = '<source src="../sound/NotificationSound.mp3" type="audio/mpeg">';
            var embedSource = '<embed hidden="true" autostart="true" loop="false" src="../sound/NotificationSound.mp3">';
            document.getElementById("sound").innerHTML='<audio autoplay="autoplay">' + mp3Source + embedSource + '</audio>';
        }
    }
}
const socket = io()

// Templates
const roomTemplate = document.querySelector('#room-template').innerHTML

window.addEventListener('load', () => {
    console.log("It's load");

    socket.emit('needLandingInfo', () => {
        console.log("Appel fait !");
    })

})

socket.on('LandingInfo', (rooms) => {
    const html = Mustache.render(roomTemplate, {
        rooms
    })
    document.querySelector('#join-room').innerHTML = html
    console.log(rooms);
    
    
})

$(document).ready(function(){

    $('.color').on('click', function(){
        $(this).siblings().removeClass('color-active')
        $(this).toggleClass('color-active')
        $('#color-input').val($('.color-active').attr('id'))
        console.log($('#color-input').val());
        
    })

    $('#join-room').on('mouseenter', '.room', function(){
        $(this).children('.room-join-button').addClass('active')
        $(".room").on('click', '.room-join-button', function(){
            const value = $(this).siblings('.room-name').html()
            console.log(value);
            //const color = $('.color-active').css('background-color')
            const color = $('.color-active').attr('id')
            console.log(color);
            
            $('#room-input').val(value).css('color', '#333744')
            $('#joining-form').submit()
        });
    })

    $('#join-room').on('mouseleave', '.room', function(){
        $(this).children('.room-join-button').removeClass('active')
        
    })

    $(".create-button").on('click', function(){
        const value = $('#room-input').val()
        console.log(value);
        const color = $('.color-active').attr('id')
        console.log(color);
        
        $('#joining-form').submit()
    })

    // $(".create-button").on('click', function(){
    //     const value = $('#room-input').val()
    //     console.log(value);
    //     const color = $('.color-active').attr('id')
    //     console.log(color);
        
    //     $('#joining-form').submit()
    // })
})
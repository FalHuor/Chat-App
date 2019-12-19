const generateMessage = (user, text) => {
    return {
        username: user.username,
        usercolor: user.color,
        text,
        createdAt: new Date().getTime()
    }
}

const generateWelcomeMessage = (username, text) => {
    return {
        username,
        text,
        createdAt: new Date().getTime()
    }
}

const generateLocationMessage = (user, url) => {
    return {
        username: user.username,
        usercolor: user.color,
        url,
        createdAt: new Date().getTime()
    }
}

module.exports = {
    generateMessage,
    generateWelcomeMessage,
    generateLocationMessage
}
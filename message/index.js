const msgCommon = require('./common')

const sheNames = msgCommon.sheNames
const heNames = msgCommon.heNames

function isItHim(name) {
    const names = [...heNames, ...sheNames]
    return names.includes(name)
}

async function onHandlerReceiveMsg(message, user) {
    if (message.substr(0, 1) == '@') {
        return await msgCommon.relayMessage(message, user)
    }
    if (message === 'ping') {
        return await msgCommon.pong(user)
    }

    return `发送内容: ${message}`
}

module.exports = {
    onHandlerReceiveMsg,
    isItHim,
    sheNames,
    heNames,
}
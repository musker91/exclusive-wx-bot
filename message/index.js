const msgCommon = require('./common')
const msgSchedule = require('./schedule')

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
    if (message === '早') {
        return await msgCommon.goodMorning()
    }
    if (message.substr(0, 1) == '#') {
        return await msgCommon.updateCity(message, user)
    }

    return await msgCommon.botAoutReply(message, user)
}

module.exports = {
    onHandlerReceiveMsg,
    isItHim,
    sheNames,
    heNames,
    msgSchedule,
}
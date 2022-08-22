const config = require('../config')
const msgCommon = require('./common')

const sheNames = msgCommon.sheNames
const heNames = msgCommon.heNames

async function onHandlerReceiveMsg(bot, message, user) {
    if (message.substr(0, 1) == '@') {
        return await msgCommon.relayMessage(bot, message, user)
    }

    return `发送内容: ${message}`
}

module.exports = {
    onHandlerReceiveMsg,
    sheNames,
    heNames,
}
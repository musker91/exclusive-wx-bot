const moment = require('moment')

function receivedMsgLog(who, msg) {
    const dateTime = moment().format('MMMM Do YYYY, h:mm:ss a')
    console.log(`[${dateTime}]: 收到消息[${who}]消息: ${msg}`)
}

function sendMsgLog(whoSend, toUser, msg) {
    const dateTime = moment().format('MMMM Do YYYY, h:mm:ss a')
    console.log(`[${dateTime}]: ${whoSend}回复[${toUser}]消息: ${msg}`)
}

module.exports = {
    receivedMsgLog,
    sendMsgLog,
}
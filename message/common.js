const config = require('../config')
const utils = require('../utils')
const { bot } = require('../core')

const sheNames = []
const heNames = []

function initialNames() {
    if (config.base.girlFriendName) {
        sheNames.push(config.base.girlFriendName)
    }
    if (config.base.girlFriendNickName) {
        sheNames.push(config.base.girlFriendNickName)
    }
    if (config.base.boyFriendName) {
        heNames.push(config.base.boyFriendName)
    }
    if (config.base.boyFriendNickName) {
        heNames.push(config.base.boyFriendNickName)
    }
}

initialNames()

async function relayMessage(msg, user) {
    const msgContent = msg.replace('@', '').trim()
    let name = ''
    let nickName = ''
    if (heNames.includes(user)) {
        name = config.base.girlFriendName
        nickName = config.base.girlFriendNickName
    }
    if (sheNames.includes(user)) {
        name = config.base.boyFriendName
        nickName = config.base.boyFriendNickName
    }
    if (name === '' && nickName === '') {
        console.log(`[转告消息]: 未找到对方账户`)
        return ''
    }
    let contact =
        (await bot.Contact.find({ name: nickName })) ||
        (await bot.Contact.find({ alias: name }))
    await contact.say(`${user}对你说:\n${msgContent}`)
    console.log(`[转告消息]: ${user} 给 ${nickName}说: ${msgContent}`)
    const sendMsg = '已发送'
    utils.sendMsgLog('转告消息', user, sendMsg)
    return sendMsg
}

async function pong(user) {
    const sayMsg = 'pong'
    utils.sendMsgLog('状态检测', user, sayMsg)
    return sayMsg
}

module.exports = {
    relayMessage,
    sheNames,
    heNames,
    pong,
}
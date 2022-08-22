const config = require('../config')

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

async function onHandlerReceiveMsg(message, user) {
    return `发送内容: ${message}`
}

module.exports = {
    onHandlerReceiveMsg,
    sheNames,
    heNames,
}
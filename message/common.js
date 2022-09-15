const config = require('../config')
const utils = require('../utils')
const { bot, delay } = require('../core')
const { getReply } = require('../api')
const api = require('../api')

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

async function botAoutReply(msg, user) {
    const sayMsg = await getReply(msg)
    utils.sendMsgLog('天行机器人', user, sayMsg)
    return sayMsg
}

async function goodMorning() {
    let contactGirl =
        (await bot.Contact.find({ name: config.base.girlFriendNickName })) ||
        (await bot.Contact.find({ alias: config.base.girlFriendName })) // 获取要发送的联系人

    let contactBoy =
        (await bot.Contact.find({ name: config.base.boyFriendNickName })) ||
        (await bot.Contact.find({ alias: config.base.boyFriendName })) // 获取要发送的联系人
    let qiaomen = await api.getQiaoMen() // 获取生活窍门
    let weather = await api.getTXweather() //获取天气信息
    let today = await utils.formatDate(new Date()) //获取今天的日期
    let loveDays = utils.getDay(config.importantDays.loveDate) //在一起的天数
    let meetDays = utils.getDay(config.importantDays.meetDate) //相识的天数

    let sayMsg = `早安，我的思思小宝贝！\n\n📆${today}\n\n🏘城市：${weather.city}\n${utils.getWeatherEmoji(weather.status)}天气：${weather.weather}\n🌡气温：${weather.lowest}～${weather.highest}\n💨风向：${weather.wind}\n\n👫今天是我们相识的第${meetDays}天\n💕今天是我们恋爱的第${loveDays}天\n\n${qiaomen}`

    try {
        if (contactGirl) { await contactGirl.say(sayMsg) // 发送消息
            utils.sendMsgLog('每日早安', config.base.girlFriendNickName, sayMsg)
        }
        await delay(2000)
        if (contactBoy) {
            contactBoy.say(sayMsg)
            utils.sendMsgLog('每日早安', config.base.boyFriendNickName, sayMsg)
        }
    } catch (e) {
        console.log('每日早安问候失败, err: ', e)
    }
    return ''
}

module.exports = {
    relayMessage,
    sheNames,
    heNames,
    pong,
    botAoutReply,
    goodMorning,
}

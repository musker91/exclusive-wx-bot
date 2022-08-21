const { WechatyBuilder } = require('wechaty')
const config = require('../config')
const { sendMsgLog, receivedMsgLog } = require('./message')

// 延时函数，防止检测出类似机器人行为操作
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const bot = WechatyBuilder.build({
  name: 'WechatEveryDay',
  puppet: 'wechaty-puppet-wechat', // 如果有token，记得更换对应的puppet
  puppetOptions: { uos: true },
})

// 二维码生成
function onScan(qrcode, status) {
  require('qrcode-terminal').generate(qrcode) // 在console端显示二维码
  const qrcodeImageUrl = [
    'https://api.qrserver.com/v1/create-qr-code/?data=',
    encodeURIComponent(qrcode),
  ].join('')

  console.log(qrcodeImageUrl)
}

// 登录
async function onLogin(user) {
  console.log(`贴心小助理${user}登录了`)
  const date = new Date()
  console.log(`当前容器时间:${date}`)
  if (config.AUTOREPLY) {
    console.log(`已开启机器人自动聊天模式`)
  }
}

// 登出
function onLogout(user) {
  console.log(`小助手${user} 已经登出`)
}

// 监听对话
async function onMessage(msg) {
  const contact = msg.talker() // 发消息人
  const content = msg.text().trim() // 消息内容
  const room = msg.room() // 是否是群消息
  const alias = (await contact.alias()) || (await contact.name()) // 发消息人备注
  const isText = msg.type() === bot.Message.Type.Text
  // 不处理来自己的消息
  if (msg.self()) {
    return
  }
  // 不处理群消息
  if (room) {
    return
  }
  
  // 暂时先不处理非文本消息
  if (!isText) {
    return
  }

  receivedMsgLog(alias, content)
  // process 
  await delay(2000)
  const sendMsg = `发送内容: ${content}`
  await contact.say(sendMsg)
  sendMsgLog('自动', alias, sendMsg)
}

bot.on('scan', onScan)
bot.on('login', onLogin)
bot.on('logout', onLogout)
bot.on('message', onMessage)

module.exports = {
  bot,
}

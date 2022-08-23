/**
 * exclusiv-wx-bot
 *  - https://github.com/spdir/exclusive-wx-bot
 * branch https://github.com/gengchen528/wechatBot
 */
const wxCore = require('./core')
const message = require('./message')
const { receivedMsgLog, sendMsgLog } = require('./utils')

function onLoginInitialTask() {
  console.log('初始化登陆后任务')
}

// 监听对话
async function onMessage(msg) {
  const contact = msg.talker() // 发消息人
  const content = msg.text().trim() // 消息内容
  const room = msg.room() // 是否是群消息
  const alias = (await contact.name()) || (await contact.alias()) // 发消息人备注
  const isText = msg.type() === wxCore.bot.Message.Type.Text
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
  // 不是指定对象，不处理对应消息
  if (!message.isItHim(alias)) {
    return
  }
  try {
    receivedMsgLog(alias, content)
    await wxCore.delay(2000)
    const sayMsg = await message.onHandlerReceiveMsg(content, alias)
    if (sayMsg) {
      contact.say(sayMsg)
    }
  } catch (e) {
    console.warn('处理消息出现异常: ', msg)
  }
}

wxCore.bot.on('scan', wxCore.onScan)
wxCore.bot.on('login', (user) => {
  wxCore.onLogin(user)
  onLoginInitialTask()
})
wxCore.bot.on('logout', wxCore.onLogout)
wxCore.bot.on('message', onMessage)

wxCore.bot
  .start()
  .then(() => console.log('开始登陆微信'))
  .catch((e) => console.error(e));

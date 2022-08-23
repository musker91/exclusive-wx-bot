const { WechatyBuilder } = require('wechaty')
const config = require('../config')

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

module.exports = {
  bot,
  onLogin,
  onLogout,
  onScan,
  delay,
}

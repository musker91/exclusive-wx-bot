const schedule = require('../schedule')
const config = require('../config')
const api = require('../api')
const utils = require('../utils')
const wxCore = require('../core')

async function goodMorningEveryDay() {
  console.log('已设定每日说早安任务')

  const taskFunc = async () => {
    const name = config.base.boyFriendName
    const nickName = config.base.boyFriendNickName
    let contact =
      (await wxCore.bot.Contact.find({ name: nickName })) ||
      (await wxCore.bot.Contact.find({ alias: name })) // 获取要发送的联系人

    let sweetWord = await api.getSweetWord() // 获取土味情话
    let weather = await api.getTXweather() //获取天气信息
    let today = await utils.formatDate(new Date()) //获取今天的日期
    let memorialDay = utils.getDay(config.importantDays.loveDate) //获取纪念日天数

    let sayMsg = `我最疼爱的宝宝，早啊!\n\n${today}\n\n城市：${weather.city}\n天气：${weather.weather}\n最低气温：${weather.lowest}\n最高气温：${weather.highest}\n\n今天是我们恋爱的第${memorialDay}天\n\n${sweetWord}`

    try {
      await wxCore.delay(2000)
      await contact.say(sayMsg) // 发送消息
      utils.sendMsgLog('每日早安', nickName, sayMsg)
    } catch (e) {
      console.log('每日早安问候失败, err: ', e)
    }
  }

  schedule.setSchedule(config.schedule.goodMorning, taskFunc)
}

module.exports = {
  goodMorningEveryDay,
}

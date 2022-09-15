const schedule = require('../schedule')
const config = require('../config')
const { goodMorning } = require('./common')

async function goodMorningEveryDay() {
  console.log('已设定每日说早安任务')

  schedule.setSchedule(config.schedule.goodMorning, goodMorning)
}

module.exports = {
  goodMorningEveryDay,
}

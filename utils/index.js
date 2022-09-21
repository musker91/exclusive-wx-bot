const moment = require('moment')

function receivedMsgLog(who, msg) {
  const dateTime = moment().format('MMMM Do YYYY, h:mm:ss a')
  console.log(`[${dateTime}]: 收到消息[${who}]消息: ${msg}`)
}

function sendMsgLog(whoSend, toUser, msg) {
  const dateTime = moment().format('MMMM Do YYYY, h:mm:ss a')
  console.log(`[${dateTime}]: ${whoSend}回复[${toUser}]消息: ${msg}`)
}

function getDay(date) {
  var date2 = new Date()
  var date1 = new Date(date)
  var iDays = parseInt(
    Math.abs(date2.getTime() - date1.getTime()) / 1000 / 60 / 60 / 24
  )
  return iDays
}

function formatDate(date) {
  var tempDate = new Date(date)
  var year = tempDate.getFullYear()
  var month = tempDate.getMonth() + 1
  var day = tempDate.getDate()
  var hour = tempDate.getHours()
  var min = tempDate.getMinutes()
  var second = tempDate.getSeconds()
  var week = tempDate.getDay()
  var str = ''
  if (week === 0) {
    str = '星期日'
  } else if (week === 1) {
    str = '星期一'
  } else if (week === 2) {
    str = '星期二'
  } else if (week === 3) {
    str = '星期三'
  } else if (week === 4) {
    str = '星期四'
  } else if (week === 5) {
    str = '星期五'
  } else if (week === 6) {
    str = '星期六'
  }
  if (hour < 10) {
    hour = '0' + hour
  }
  if (min < 10) {
    min = '0' + min
  }
  if (second < 10) {
    second = '0' + second
  }
  return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ' ' + str
}

function getWeatherEmoji(status) {
  if (!status) {
    return '🌈'
  }
  if (status == 'qing') {
    return '☀️'
  }
  if (status == 'duoyun') {
    return '⛅️'
  }
  if (status == 'yin') {
    return '☁️'
  }
  if (status.includes('yu')) {
    return '⛈'
  }
  if (status.includes('xue')) {
    return '🌨'
  }
  if (status.includes('feng')) {
    return '🌬'
  }
  return '🌈'
}

module.exports = {
  receivedMsgLog,
  sendMsgLog,
  getDay,
  formatDate,
  getWeatherEmoji
}

const client = require('./client')
const config = require('../config')
const cheerio = require('cheerio')
const { machineIdSync } = require('node-machine-id')
const crypto = require('crypto')

let md5 = crypto.createHash('md5')
let uniqueId = md5.update(machineIdSync()).digest('hex') // 获取机器唯一识别码并MD5，方便机器人上下文关联

const TXHOST = 'http://api.tianapi.com/txapi/' // 天行host

async function getOne() {
  const oneUrl = 'http://wufazhuce.com/'
  // 获取每日一句
  try {
    let res = await client.httpClient({
      url: oneUrl,
      method: 'GET',
      spider: true,
    })
    let $ = cheerio.load(res)
    let todayOneList = $('#carousel-one .carousel-inner .item')
    let todayOne = $(todayOneList[0])
      .find('.fp-one-cita')
      .text()
      .replace(/(^\s*)|(\s*$)/g, '')
    return todayOne
  } catch (err) {
    console.log('获取每日一句出错', err)
    return err
  }
}

// 获取天行天气
async function getTXweather() {
  let url = TXHOST + 'tianqi/'
  try {
    let content = await client.httpClient({
      url,
      method: 'GET',
      params: {
        key: config.base.tianXingApiKey,
        city: config.base.city,
      },
    })

    if (content.code === 200) {
      let todayInfo = content.newslist[0]
      let obj = {
        city: config.base.city,
        weather: todayInfo.weather,
        lowest: todayInfo.lowest,
        highest: todayInfo.highest,
        
      }
      return obj
    }
  } catch (err) {
    console.log('请求天气失败', err)
  }
}

async function getSweetWord() {
  // 获取土味情话
  let url = TXHOST + 'saylove/'
  try {
    let content = await client.httpClient({
      url,
      method: 'GET',
      params: { key: config.base.tianXingApiKey },
    })
    if (content.code === 200) {
      let sweet = content.newslist[0].content
      let str = sweet.replace('\r\n', '<br>')
      return str
    } else {
      return '你很像一款游戏。我的世界'
    }
  } catch (err) {
    console.log('获取接口失败', err)
  }
}

module.exports = {
  getOne,
  getTXweather,
  getSweetWord
}

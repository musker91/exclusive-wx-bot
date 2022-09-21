const client = require('./client')
const config = require('../config')
const cheerio = require('cheerio')
const { machineIdSync } = require('node-machine-id')
const crypto = require('crypto')

let md5 = crypto.createHash('md5')
let uniqueId = md5.update(machineIdSync()).digest('hex') // 获取机器唯一识别码并MD5，方便机器人上下文关联

const TXHOST = 'http://api.tianapi.com/txapi/' // 天行host

// 获取每日一句
async function getOne() {
  const oneUrl = 'http://wufazhuce.com/'
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
    return null
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
        wind: `${todayInfo.wind} ${todayInfo.windsc}`,
        status: todayInfo.weatherimg.split('.')[0]
      }
      return obj
    }
  } catch (err) {
    console.log('请求天气失败', err)
    return null
  }
}

// 获取土味情话
async function getSweetWord() {
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
    return null
  }
}

// 获取生活窍门
async function getQiaoMen() {
  let url = TXHOST + 'qiaomen/'
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
      return '人生的乐趣就在于享受生活'
    }
  } catch (err) {
    console.log('获取接口失败', err)
    return null
  }
}

// 天行聊天机器人
async function getReply(word) {
  let url = TXHOST + 'robot/'
  let content = await client.httpClient({
    url,
    method: 'GET',
    params: {
      key: config.base.tianXingApiKey,
      question: word,
      mode: 1,
      datatype: 0,
      userid: uniqueId,
    },
  })

  if (content.code === 200) {
    let res = content.newslist[0]
    let response = ''
    if (res.datatype === 'text') {
      response = res.reply
    } else if (res.datatype === 'view') {
      response = `虽然我不太懂你说的是什么，但是感觉很高级的样子，因此我也查找了类似的文章去学习，你觉得有用吗<br>《${content.newslist[0].title}》${content.newslist[0].url}`
    } else {
      response =
        '你太厉害了，说的话把我难倒了，我要去学习了，不然没法回答你的问题'
    }
    return response
  } else {
    return '我好像迷失在无边的网络中了，你能找回我么'
  }
}

module.exports = {
  getOne,
  getTXweather,
  getSweetWord,
  getReply,
  getQiaoMen,
}

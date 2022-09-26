const api = require('./')

async function testGetOne() {
    const result = await api.getOne()
    console.log(result)
}

async function testGetTXweather() {
    const result = await api.getTXweather()
    console.log(result)
}

async function testGetSweetWord() {
    const result = await api.getSweetWord()
    console.log(result)
}

// async function testGetReply() {
//     const result = await api.getReply('北京天气')
//     console.log(result)
// }

async function testDingDingMsg() {
    const result = await api.dingDingMessage({
        "msgtype": "markdown",
        "markdown": {
            "title":"Wx Login",
            "text": "![login](https://api.qrserver.com/v1/create-qr-code/?data=https%3A%2F%2Flogin.weixin.qq.com%2Fl%2FYe5yXjqsRQ%3D%3D)"
        }
    })
    console.log(result)
}

// testGetOne().then((v) => {})
// testGetTXweather().then((v) => {})
// testGetSweetWord().then((v) => {})
// testGetReply().then((v) => {})
testDingDingMsg().then((v) => {})
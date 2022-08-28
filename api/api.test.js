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

// testGetOne().then((v) => {})
// testGetTXweather().then((v) => {})
// testGetSweetWord().then((v) => {})
// testGetReply().then((v) => {})
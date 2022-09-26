const superagent = require('superagent')

/**
 *
 * @param url 请求地址
 * @param method 请求方法
 * @param params 请求参数
 * @param data 请求body
 * @param cookies cookies
 * @param spider 是否需要爬取数据
 * @returns {Promise}
 */
function httpClient({url, method, params, data, cookies, json = false, spider = false}) {
    return new Promise(function (resolve, reject) {
        superagent(method, url)
            .query(params)
            .send(data)
            .set('Content-Type', json ? 'application/json;charset=utf-8' : 'application/x-www-form-urlencoded')
            .end(function (err, response) {
                if (err) {
                    console.log('请求出错', err)
                    reject(err)
                }
                if (spider) { // 如果是爬取内容，直接返回页面html
                    resolve(response.text)
                } else { // 如果是非爬虫，返回格式化后的内容
                    const res = JSON.parse(response.text);
                    if (response.status !== 200) {
                        console.error('接口请求失败', res.msg || res.text)
                    }
                    resolve(res)
                }
            })
    })
}

module.exports = {
    httpClient
}

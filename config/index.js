// 配置文件
module.exports = {
    base: {
        girlFriendName: '', // 女朋友备注名字
        girlFriendNickName: '', // 女朋友昵称
        boyFriendName: '',  // 男朋友备注名字
        boyFriendNickName: '',  // 男朋友昵称
        tianXingApiKey: '', // 天行数据Api Key
        city: '',   // 目前所在城市
    },
    importantDays: {
        loveDate: '',   // 在一起的日子，例：1999/01/01
        meetDate: '', // 第一次见面的日子，例：1999/01/01
        sheBirthday: '', // 她的生日，例：1999/01/01
        heBirthday: '', // 他的生日，例：1999/01/01
    },
    schedule: {
        goodMorning: '0 30 7 * * *'  // 每天早上7点30分
    },
    login: {
        noticeName: '', // 通知人备注名字
        noticeNickName: '', // 通知人昵称
        dingdingToken: '',
    }
}

/**
 * exclusiv-wx-bot
 *  - https://github.com/spdir/exclusive-wx-bot
 * branch https://github.com/gengchen528/wechatBot
 */
const wxCore = require('./core')

wxCore.bot
  .start()
  .then(() => console.log('开始登陆微信'))
  .catch((e) => console.error(e));

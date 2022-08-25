# 女朋友的专属机器人 🤖️

## 支持的功能

- [x] 在线状态检测
- [x] 通过 bot 两人相互转告消息，有什么不好直接说出口的话，可以通过我来转告哦
- [ ] 每日早安语
- [ ] 特殊日期提醒
- [ ] 动态备忘提醒任务
- [ ] 自动陪女朋友聊天

## Docker Run

```
$ docker build -t wx-bot .
$ docker run -tid --rm -e TZ="Asia/Shanghai" --volume="$(pwd)/config/":/home/app/config wx-bot
```

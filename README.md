# 女朋友的专属机器人 🤖️

## Docker Run

```
$ docker build -t wx-bot .
$ docker run -tid --rm -e TZ="Asia/Shanghai" --volume="$(pwd)/config/":/home/app/config wx-bot
```

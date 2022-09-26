#!/bin/bash
#git stash
#git pull --rebase
docker build -t wx-bot .
#git stash pop
docker rm -f wx-bot
docker run -tid -e TZ="Asia/Shanghai" --name=wx-bot --volume="$(pwd)/config/":/home/app/config wx-bot
#docker logs -f wx-bot
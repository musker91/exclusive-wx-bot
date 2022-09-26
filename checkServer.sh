#!/bin/bash

# 30 * * * * base /opt/work/exclusive-wx-bot/checkServer.sh

WORK_PATH='/opt/work/exclusive-wx-bot'
DING_DING_TOKEN=''

docker ps --filter 'NAME=wx-bot' | grep wx-bot
if [[ $? != 0 ]];then
    echo -e "Wx Bot Server Down"
    curl "https://oapi.dingtalk.com/robot/send?access_token=${DING_DING_TOKEN}" \
        -H 'Content-Type: application/json' \
        -d '{"msgtype": "text","text": {"content":"Wx Bot Server Down"}}'
    cd $WORK_PATH
    bash restart.sh
fi
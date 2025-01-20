#!/bin/bash

ECS_USER="root"                # 服务器用户名
ECS_HOST="112.124.21.126"         # 服务器IP地址
ECS_PATH="/home/life-toolkit"  # 项目部署目录
LOCAL_PATH="./dist"            # 本地项目目录
SSH_KEY="./env.production.local" # 私钥路径

echo "打包项目..."
npm run build || { echo "打包失败！"; exit 1; }

echo "传输文件到 ECS..."
rsync -avz -e "ssh -i $SSH_KEY" --delete $LOCAL_PATH/ $ECS_USER@$ECS_HOST:$ECS_PATH || { echo "传输失败！"; exit 1; }

echo "重启服务..."
ssh -i $SSH_KEY $ECS_USER@$ECS_HOST "cd $ECS_PATH && pm2 restart all" || { echo "服务重启失败！"; exit 1; }

echo "发布完成！"
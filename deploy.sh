#!/bin/bash

# 定义变量
LOCAL_DIR="./life_toolkit"
REMOTE_DIR="/root/project"
ECS_USERNAME="root"
ECS_IP="112.124.21.126"

# 使用 rsync 同步文件
/opt/homebrew/bin/rsync -avz -e "ssh" "$LOCAL_DIR" "${ECS_USERNAME}@${ECS_IP}:$REMOTE_DIR"

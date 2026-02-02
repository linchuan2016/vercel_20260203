#!/bin/bash
# 在阿里云服务器上直接执行的部署脚本
# 不需要镜像仓库，直接在服务器上构建

echo "=========================================="
echo "开始部署..."
echo "=========================================="

# 进入项目目录（根据实际情况修改路径）
cd /root/my-figma-download-code || cd ~/my-figma-download-code

# 构建镜像
echo "构建 Docker 镜像..."
docker build -t figma-download-web:latest .

if [ $? -ne 0 ]; then
    echo "构建失败！"
    exit 1
fi

# 停止并删除旧容器
echo "停止旧容器..."
docker stop figma-download-web 2>/dev/null || true
docker rm figma-download-web 2>/dev/null || true

# 运行新容器
echo "启动新容器..."
docker run -d \
  -p 80:80 \
  --name figma-download-web \
  --restart unless-stopped \
  figma-download-web:latest

if [ $? -eq 0 ]; then
    echo "=========================================="
    echo "部署成功！"
    echo "=========================================="
    docker ps
    echo ""
    echo "访问地址: http://47.112.29.212"
else
    echo "部署失败！"
    exit 1
fi

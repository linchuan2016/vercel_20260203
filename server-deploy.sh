#!/bin/bash

# 在阿里云服务器上执行的部署脚本
# 使用方法: 将此脚本上传到服务器后执行 bash server-deploy.sh

# 配置信息 - 请根据实际情况修改
ALIYUN_REGISTRY="registry.cn-hangzhou.aliyuncs.com"
NAMESPACE="your-namespace"
IMAGE_NAME="figma-download-web"
IMAGE_TAG="latest"
CONTAINER_NAME="figma-download-web"
PORT="80"

FULL_IMAGE_NAME="${ALIYUN_REGISTRY}/${NAMESPACE}/${IMAGE_NAME}:${IMAGE_TAG}"

echo "=========================================="
echo "开始部署到阿里云服务器"
echo "=========================================="

# 检查 Docker 是否安装
if ! command -v docker &> /dev/null; then
    echo "错误: Docker 未安装，请先安装 Docker"
    exit 1
fi

# 登录阿里云容器镜像服务（如果需要）
echo "检查登录状态..."
if ! docker info | grep -q "Username"; then
    echo "请先登录阿里云容器镜像服务:"
    echo "docker login ${ALIYUN_REGISTRY}"
    read -p "按 Enter 继续..."
fi

# 拉取最新镜像
echo "拉取最新镜像: ${FULL_IMAGE_NAME}"
docker pull ${FULL_IMAGE_NAME}

if [ $? -ne 0 ]; then
    echo "错误: 镜像拉取失败"
    exit 1
fi

# 停止并删除旧容器
echo "停止旧容器..."
docker stop ${CONTAINER_NAME} 2>/dev/null || true
docker rm ${CONTAINER_NAME} 2>/dev/null || true

# 检查端口是否被占用
if lsof -Pi :${PORT} -sTCP:LISTEN -t >/dev/null ; then
    echo "警告: 端口 ${PORT} 已被占用"
    echo "正在尝试停止占用该端口的容器..."
    docker ps --filter "publish=${PORT}" --format "{{.ID}}" | xargs -r docker stop
fi

# 运行新容器
echo "启动新容器..."
docker run -d \
  -p ${PORT}:80 \
  --name ${CONTAINER_NAME} \
  --restart unless-stopped \
  ${FULL_IMAGE_NAME}

if [ $? -eq 0 ]; then
    echo "=========================================="
    echo "部署成功！"
    echo "=========================================="
    echo "容器名称: ${CONTAINER_NAME}"
    echo "访问地址: http://$(hostname -I | awk '{print $1}')"
    echo ""
    echo "查看容器状态: docker ps"
    echo "查看容器日志: docker logs -f ${CONTAINER_NAME}"
else
    echo "错误: 容器启动失败"
    exit 1
fi

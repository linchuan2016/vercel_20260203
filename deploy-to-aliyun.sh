#!/bin/bash

# 阿里云 Docker 部署脚本
# 使用方法: ./deploy-to-aliyun.sh

# 配置信息 - 请根据实际情况修改
ALIYUN_REGISTRY="registry.cn-hangzhou.aliyuncs.com"  # 根据你的地域修改
NAMESPACE="your-namespace"  # 你的命名空间
IMAGE_NAME="figma-download-web"
IMAGE_TAG="latest"
SERVER_IP="47.112.29.212"
SERVER_USER="root"  # 根据实际情况修改

# 颜色输出
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}开始构建 Docker 镜像...${NC}"
docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .

if [ $? -ne 0 ]; then
    echo -e "${RED}构建失败！${NC}"
    exit 1
fi

echo -e "${GREEN}镜像构建成功！${NC}"

# 标记镜像为阿里云镜像仓库格式
FULL_IMAGE_NAME="${ALIYUN_REGISTRY}/${NAMESPACE}/${IMAGE_NAME}:${IMAGE_TAG}"
docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${FULL_IMAGE_NAME}

echo -e "${YELLOW}请先登录阿里云容器镜像服务:${NC}"
echo -e "${YELLOW}docker login ${ALIYUN_REGISTRY}${NC}"
echo ""
read -p "按 Enter 继续推送镜像到阿里云..."

echo -e "${GREEN}推送镜像到阿里云容器镜像服务...${NC}"
docker push ${FULL_IMAGE_NAME}

if [ $? -ne 0 ]; then
    echo -e "${RED}推送失败！请检查登录状态。${NC}"
    exit 1
fi

echo -e "${GREEN}镜像推送成功！${NC}"
echo ""
echo -e "${YELLOW}现在可以在阿里云服务器上执行以下命令部署:${NC}"
echo -e "ssh ${SERVER_USER}@${SERVER_IP}"
echo -e "docker pull ${FULL_IMAGE_NAME}"
echo -e "docker stop figma-download-web || true"
echo -e "docker rm figma-download-web || true"
echo -e "docker run -d -p 80:80 --name figma-download-web --restart unless-stopped ${FULL_IMAGE_NAME}"

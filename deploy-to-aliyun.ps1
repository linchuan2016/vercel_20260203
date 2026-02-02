# 阿里云 Docker 部署脚本 (PowerShell)
# 使用方法: .\deploy-to-aliyun.ps1

# 配置信息 - 请根据实际情况修改
$ALIYUN_REGISTRY = "registry.cn-hangzhou.aliyuncs.com"  # 根据你的地域修改
$NAMESPACE = "your-namespace"  # 你的命名空间
$IMAGE_NAME = "figma-download-web"
$IMAGE_TAG = "latest"
$SERVER_IP = "47.112.29.212"
$SERVER_USER = "root"  # 根据实际情况修改

Write-Host "==========================================" -ForegroundColor Green
Write-Host "开始构建 Docker 镜像..." -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green

# 构建镜像
docker build -t "${IMAGE_NAME}:${IMAGE_TAG}" .

if ($LASTEXITCODE -ne 0) {
    Write-Host "构建失败！" -ForegroundColor Red
    exit 1
}

Write-Host "镜像构建成功！" -ForegroundColor Green

# 标记镜像为阿里云镜像仓库格式
$FULL_IMAGE_NAME = "${ALIYUN_REGISTRY}/${NAMESPACE}/${IMAGE_NAME}:${IMAGE_TAG}"
docker tag "${IMAGE_NAME}:${IMAGE_TAG}" $FULL_IMAGE_NAME

Write-Host ""
Write-Host "请先登录阿里云容器镜像服务:" -ForegroundColor Yellow
Write-Host "docker login ${ALIYUN_REGISTRY}" -ForegroundColor Yellow
Write-Host ""
$null = Read-Host "按 Enter 继续推送镜像到阿里云"

Write-Host "推送镜像到阿里云容器镜像服务..." -ForegroundColor Green
docker push $FULL_IMAGE_NAME

if ($LASTEXITCODE -ne 0) {
    Write-Host "推送失败！请检查登录状态。" -ForegroundColor Red
    exit 1
}

Write-Host "镜像推送成功！" -ForegroundColor Green
Write-Host ""
Write-Host "==========================================" -ForegroundColor Green
Write-Host "部署信息" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
Write-Host "镜像地址: $FULL_IMAGE_NAME" -ForegroundColor Cyan
Write-Host ""
Write-Host "在阿里云服务器上执行以下命令部署:" -ForegroundColor Yellow
Write-Host "ssh ${SERVER_USER}@${SERVER_IP}" -ForegroundColor Cyan
Write-Host "docker pull $FULL_IMAGE_NAME" -ForegroundColor Cyan
Write-Host "docker stop figma-download-web" -ForegroundColor Cyan
Write-Host "docker rm figma-download-web" -ForegroundColor Cyan
Write-Host "docker run -d -p 80:80 --name figma-download-web --restart unless-stopped $FULL_IMAGE_NAME" -ForegroundColor Cyan
Write-Host ""
Write-Host "或使用 server-deploy.sh 脚本自动部署" -ForegroundColor Yellow

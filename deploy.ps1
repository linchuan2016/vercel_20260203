# 一键部署到阿里云脚本
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  阿里云 Docker 部署助手" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# 获取用户输入
Write-Host "请输入以下信息：" -ForegroundColor Yellow
Write-Host ""

# 获取命名空间
$NAMESPACE = Read-Host "1. 阿里云容器镜像服务的命名空间 (Namespace)"
if ([string]::IsNullOrWhiteSpace($NAMESPACE)) {
    Write-Host "错误: 命名空间不能为空！" -ForegroundColor Red
    exit 1
}

# 默认使用杭州地域
$ALIYUN_REGISTRY = "registry.cn-hangzhou.aliyuncs.com"
$IMAGE_NAME = "figma-download-web"
$IMAGE_TAG = "latest"
$FULL_IMAGE_NAME = "$ALIYUN_REGISTRY/$NAMESPACE/$IMAGE_NAME`:$IMAGE_TAG"

Write-Host ""
Write-Host "==========================================" -ForegroundColor Green
Write-Host "配置信息确认：" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
Write-Host "镜像地址: $FULL_IMAGE_NAME" -ForegroundColor Cyan
Write-Host ""

$confirm = Read-Host "确认信息正确吗？(Y/N)"
if ($confirm -ne "Y" -and $confirm -ne "y") {
    Write-Host "已取消部署" -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "步骤 1: 标记镜像..." -ForegroundColor Green
docker tag "$IMAGE_NAME`:$IMAGE_TAG" $FULL_IMAGE_NAME
if ($LASTEXITCODE -ne 0) {
    Write-Host "标记镜像失败！" -ForegroundColor Red
    exit 1
}
Write-Host "✓ 镜像标记成功" -ForegroundColor Green

Write-Host ""
Write-Host "步骤 2: 登录阿里云容器镜像服务..." -ForegroundColor Green
Write-Host "请输入你的阿里云账号信息：" -ForegroundColor Yellow
docker login $ALIYUN_REGISTRY
if ($LASTEXITCODE -ne 0) {
    Write-Host "登录失败！请检查用户名和密码。" -ForegroundColor Red
    exit 1
}
Write-Host "✓ 登录成功" -ForegroundColor Green

Write-Host ""
Write-Host "步骤 3: 推送镜像到阿里云..." -ForegroundColor Green
Write-Host "正在推送镜像，这可能需要几分钟..." -ForegroundColor Yellow
docker push $FULL_IMAGE_NAME
if ($LASTEXITCODE -ne 0) {
    Write-Host "推送失败！" -ForegroundColor Red
    exit 1
}
Write-Host "✓ 镜像推送成功" -ForegroundColor Green

Write-Host ""
Write-Host "==========================================" -ForegroundColor Green
Write-Host "部署完成！" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
Write-Host ""
Write-Host "镜像已推送到: $FULL_IMAGE_NAME" -ForegroundColor Cyan
Write-Host ""
Write-Host "下一步：在阿里云服务器上执行以下命令" -ForegroundColor Yellow
Write-Host ""
Write-Host "ssh root@47.112.29.212" -ForegroundColor Cyan
Write-Host ""
Write-Host "然后执行：" -ForegroundColor White
Write-Host "docker login $ALIYUN_REGISTRY && docker pull $FULL_IMAGE_NAME && docker stop figma-download-web 2>/dev/null || true && docker rm figma-download-web 2>/dev/null || true && docker run -d -p 80:80 --name figma-download-web --restart unless-stopped $FULL_IMAGE_NAME && docker ps" -ForegroundColor Cyan
Write-Host ""

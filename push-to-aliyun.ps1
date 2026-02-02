# 推送本地 Docker 镜像到阿里云
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  推送 Docker 镜像到阿里云" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# 检查本地镜像
Write-Host "检查本地镜像..." -ForegroundColor Yellow
$localImage = docker images figma-download-web:latest --format "{{.Repository}}:{{.Tag}}"
if ([string]::IsNullOrWhiteSpace($localImage)) {
    Write-Host "错误: 本地镜像不存在，请先构建镜像！" -ForegroundColor Red
    Write-Host "执行: docker build -t figma-download-web:latest ." -ForegroundColor Yellow
    exit 1
}
Write-Host "✓ 找到本地镜像: $localImage" -ForegroundColor Green
Write-Host ""

# 获取用户输入
Write-Host "请输入阿里云容器镜像服务信息：" -ForegroundColor Yellow
Write-Host ""

# 获取命名空间
$NAMESPACE = Read-Host "1. 命名空间 (Namespace)"
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
Write-Host "配置信息：" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
Write-Host "本地镜像: $localImage" -ForegroundColor Cyan
Write-Host "阿里云镜像: $FULL_IMAGE_NAME" -ForegroundColor Cyan
Write-Host ""

$confirm = Read-Host "确认推送吗？(Y/N)"
if ($confirm -ne "Y" -and $confirm -ne "y") {
    Write-Host "已取消" -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "步骤 1: 标记镜像..." -ForegroundColor Green
docker tag "$localImage" $FULL_IMAGE_NAME
if ($LASTEXITCODE -ne 0) {
    Write-Host "标记失败！" -ForegroundColor Red
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

Write-Host ""
Write-Host "==========================================" -ForegroundColor Green
Write-Host "✓ 推送成功！" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
Write-Host ""
Write-Host "镜像地址: $FULL_IMAGE_NAME" -ForegroundColor Cyan
Write-Host ""
Write-Host "现在可以在服务器上拉取并运行：" -ForegroundColor Yellow
Write-Host "docker pull $FULL_IMAGE_NAME" -ForegroundColor Cyan
$runCmd = "docker run -d -p 80:80 --name figma-download-web --restart unless-stopped $FULL_IMAGE_NAME"
Write-Host $runCmd -ForegroundColor Cyan
Write-Host ""

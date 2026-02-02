# 一键部署到阿里云脚本
# 使用方法: 右键点击此文件 -> 使用 PowerShell 运行

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

# 获取地域（默认杭州）
Write-Host ""
Write-Host "2. 选择地域（直接回车使用默认值 registry.cn-hangzhou.aliyuncs.com）" -ForegroundColor Yellow
$REGION_INPUT = Read-Host "   输入地域代码 (hangzhou/beijing/shanghai/shenzhen/guangzhou/qingdao/chengdu/hongkong)"
if ([string]::IsNullOrWhiteSpace($REGION_INPUT)) {
    $ALIYUN_REGISTRY = "registry.cn-hangzhou.aliyuncs.com"
} else {
    $ALIYUN_REGISTRY = "registry.cn-$REGION_INPUT.aliyuncs.com"
}

$IMAGE_NAME = "figma-download-web"
$IMAGE_TAG = "latest"
$FULL_IMAGE_NAME = "$ALIYUN_REGISTRY/$NAMESPACE/$IMAGE_NAME`:$IMAGE_TAG"

Write-Host ""
Write-Host "==========================================" -ForegroundColor Green
Write-Host "配置信息确认：" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
Write-Host "镜像仓库: $ALIYUN_REGISTRY" -ForegroundColor Cyan
Write-Host "命名空间: $NAMESPACE" -ForegroundColor Cyan
Write-Host "镜像名称: $FULL_IMAGE_NAME" -ForegroundColor Cyan
Write-Host ""

$confirm = Read-Host "确认以上信息正确吗？(Y/N)"
if ($confirm -ne "Y" -and $confirm -ne "y") {
    Write-Host "已取消部署" -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "==========================================" -ForegroundColor Green
Write-Host "步骤 1: 标记镜像..." -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
docker tag "$IMAGE_NAME`:$IMAGE_TAG" $FULL_IMAGE_NAME

if ($LASTEXITCODE -ne 0) {
    Write-Host "标记镜像失败！" -ForegroundColor Red
    exit 1
}
Write-Host "✓ 镜像标记成功" -ForegroundColor Green

Write-Host ""
Write-Host "==========================================" -ForegroundColor Green
Write-Host "步骤 2: 登录阿里云容器镜像服务..." -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
Write-Host "请输入你的阿里云账号信息：" -ForegroundColor Yellow
docker login $ALIYUN_REGISTRY

if ($LASTEXITCODE -ne 0) {
    Write-Host "登录失败！请检查用户名和密码。" -ForegroundColor Red
    Write-Host "提示: 用户名通常是你的阿里云账号，密码在 ACR 控制台的'访问凭证'中设置" -ForegroundColor Yellow
    exit 1
}
Write-Host "✓ 登录成功" -ForegroundColor Green

Write-Host ""
Write-Host "==========================================" -ForegroundColor Green
Write-Host "步骤 3: 推送镜像到阿里云..." -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
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
Write-Host "==========================================" -ForegroundColor Yellow
Write-Host "下一步：在阿里云服务器上执行以下命令" -ForegroundColor Yellow
Write-Host "==========================================" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. SSH 连接到服务器：" -ForegroundColor White
Write-Host "   ssh root@47.112.29.212" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. 在服务器上执行以下命令（复制粘贴）：" -ForegroundColor White
Write-Host ""
Write-Host "docker login $ALIYUN_REGISTRY && \" -ForegroundColor Cyan
Write-Host "docker pull $FULL_IMAGE_NAME && \" -ForegroundColor Cyan
Write-Host "docker stop figma-download-web 2>/dev/null || true && \" -ForegroundColor Cyan
Write-Host "docker rm figma-download-web 2>/dev/null || true && \" -ForegroundColor Cyan
Write-Host "docker run -d -p 80:80 --name figma-download-web --restart unless-stopped $FULL_IMAGE_NAME && \" -ForegroundColor Cyan
Write-Host "docker ps && \" -ForegroundColor Cyan
Write-Host "echo '部署完成！访问 http://47.112.29.212'" -ForegroundColor Cyan
Write-Host ""
Write-Host "==========================================" -ForegroundColor Green

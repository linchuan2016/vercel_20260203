# 推送本地镜像到阿里云容器镜像服务 (ACR) - 个人版
# 使用前请先：1) 在 ACR 控制台创建命名空间和仓库  2) 执行 docker login

$REGISTRY = "crpi-r7qju4rykt1lw8mk.cn-shenzhen.personal.cr.aliyuncs.com"
$NAMESPACE = if ($env:ACR_NAMESPACE) { $env:ACR_NAMESPACE } else { "aliyun-20260202" }
$REPO = "figma-download-web"
$TAG = "latest"
$LOCAL_IMAGE = "${REPO}:${TAG}"
$REMOTE_IMAGE = "${REGISTRY}/${NAMESPACE}/${REPO}:${TAG}"

Write-Host ">>> 标记镜像: $LOCAL_IMAGE -> $REMOTE_IMAGE"
docker tag $LOCAL_IMAGE $REMOTE_IMAGE
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host ">>> 推送到阿里云 ACR..."
docker push $REMOTE_IMAGE
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "推送失败。请确认："
    Write-Host "  1. 已登录: docker login --username=491356605@qq.com $REGISTRY"
    Write-Host "  2. 命名空间 '$NAMESPACE' 已存在（或设置环境变量 ACR_NAMESPACE）"
    exit $LASTEXITCODE
}

Write-Host ">>> 推送完成: $REMOTE_IMAGE"

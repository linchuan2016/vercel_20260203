# 本地：构建镜像并推送到阿里云 ACR（更新部署用）
# 使用前请先执行一次：docker login --username=491356605@qq.com crpi-r7qju4rykt1lw8mk.cn-shenzhen.personal.cr.aliyuncs.com

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

Write-Host ">>> 1. 构建镜像 figma-download-web:latest ..."
docker build -t figma-download-web:latest .
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host ""
Write-Host ">>> 2. 推送到阿里云 ACR ..."
& "$PSScriptRoot\push-to-aliyun.ps1"
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host ""
Write-Host ">>> 本地更新完成。请在服务器上执行："
Write-Host "   sudo docker pull crpi-r7qju4rykt1lw8mk.cn-shenzhen.personal.cr.aliyuncs.com/aliyun-20260202/figma-download-web:latest"
Write-Host "   sudo docker stop figma-download-web; sudo docker rm figma-download-web"
Write-Host "   sudo docker run -d --name figma-download-web -p 8081:80 crpi-r7qju4rykt1lw8mk.cn-shenzhen.personal.cr.aliyuncs.com/aliyun-20260202/figma-download-web:latest"

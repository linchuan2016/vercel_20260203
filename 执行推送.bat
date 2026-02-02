@echo off
chcp 65001 >nul
echo ==========================================
echo   推送镜像到阿里云
echo ==========================================
echo.

echo 步骤 1: 登录阿里云容器镜像服务
echo 请输入你的阿里云账号信息：
docker login registry.cn-hangzhou.aliyuncs.com

if %errorlevel% neq 0 (
    echo 登录失败！
    pause
    exit /b 1
)

echo.
echo 步骤 2: 推送镜像到阿里云
echo 正在推送镜像，这可能需要几分钟...
docker push registry.cn-hangzhou.aliyuncs.com/aliyun-20260202/figma-download-web:latest

if %errorlevel% neq 0 (
    echo 推送失败！
    pause
    exit /b 1
)

echo.
echo ==========================================
echo   推送成功！
echo ==========================================
echo.
echo 镜像地址: registry.cn-hangzhou.aliyuncs.com/aliyun-20260202/figma-download-web:latest
echo.
echo 现在可以在服务器上拉取并运行：
echo docker pull registry.cn-hangzhou.aliyuncs.com/aliyun-20260202/figma-download-web:latest
echo docker run -d -p 80:80 --name figma-download-web --restart unless-stopped registry.cn-hangzhou.aliyuncs.com/aliyun-20260202/figma-download-web:latest
echo.
pause

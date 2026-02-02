# 阿里云 Docker 部署指南

## 前置准备

1. **阿里云容器镜像服务（ACR）**
   - 登录阿里云控制台
   - 开通容器镜像服务
   - 创建命名空间（Namespace）
   - 获取登录凭证

2. **阿里云 ECS 服务器**
   - 服务器 IP: `47.112.29.212`
   - 确保已安装 Docker
   - 确保可以 SSH 连接

## 部署步骤

### 方法一：使用脚本自动部署（推荐）

#### 1. 修改部署脚本配置

编辑 `deploy-to-aliyun.sh`，修改以下配置：

```bash
ALIYUN_REGISTRY="registry.cn-hangzhou.aliyuncs.com"  # 根据你的地域修改
NAMESPACE="your-namespace"  # 你的命名空间
SERVER_USER="root"  # 根据实际情况修改
```

#### 2. 执行部署脚本

```bash
# Windows (使用 Git Bash 或 WSL)
bash deploy-to-aliyun.sh

# 或手动执行以下步骤
```

### 方法二：手动部署

#### 步骤 1: 构建 Docker 镜像

```bash
cd D:\Aliyun\my-figma-download-code
docker build -t figma-download-web:latest .
```

#### 步骤 2: 登录阿里云容器镜像服务

```bash
# 登录（需要输入用户名和密码，在 ACR 控制台获取）
docker login registry.cn-hangzhou.aliyuncs.com
```

#### 步骤 3: 标记并推送镜像

```bash
# 替换为你的实际信息
ALIYUN_REGISTRY="registry.cn-hangzhou.aliyuncs.com"
NAMESPACE="your-namespace"
IMAGE_NAME="figma-download-web"
IMAGE_TAG="latest"

# 标记镜像
docker tag figma-download-web:latest ${ALIYUN_REGISTRY}/${NAMESPACE}/${IMAGE_NAME}:${IMAGE_TAG}

# 推送镜像
docker push ${ALIYUN_REGISTRY}/${NAMESPACE}/${IMAGE_NAME}:${IMAGE_TAG}
```

#### 步骤 4: 在阿里云服务器上部署

直接在服务器上执行以下命令（替换为你的实际镜像地址）：

```bash
# SSH 连接到服务器
ssh root@47.112.29.212

# 登录阿里云容器镜像服务（首次需要，输入用户名和密码）
docker login registry.cn-hangzhou.aliyuncs.com

# 拉取镜像（替换为你的实际镜像地址）
docker pull registry.cn-hangzhou.aliyuncs.com/your-namespace/figma-download-web:latest

# 停止并删除旧容器（如果存在）
docker stop figma-download-web 2>/dev/null || true
docker rm figma-download-web 2>/dev/null || true

# 运行新容器
docker run -d \
  -p 80:80 \
  --name figma-download-web \
  --restart unless-stopped \
  registry.cn-hangzhou.aliyuncs.com/your-namespace/figma-download-web:latest

# 查看容器状态
docker ps

# 查看日志
docker logs -f figma-download-web
```

## 使用 Docker Compose 部署（推荐）

在服务器上创建 `docker-compose.yml`:

```yaml
version: '3.8'

services:
  web:
    image: registry.cn-hangzhou.aliyuncs.com/your-namespace/figma-download-web:latest
    container_name: figma-download-web
    ports:
      - "80:80"
    restart: unless-stopped
```

然后执行：

```bash
docker-compose up -d
```

## 验证部署

访问服务器 IP: `http://47.112.29.212`

## 常用命令

### 查看容器状态
```bash
docker ps
```

### 查看容器日志
```bash
docker logs -f figma-download-web
```

### 重启容器
```bash
docker restart figma-download-web
```

### 更新部署
```bash
# 1. 本地重新构建并推送镜像
# 2. 在服务器上拉取新镜像
docker pull ${ALIYUN_REGISTRY}/${NAMESPACE}/${IMAGE_NAME}:${IMAGE_TAG}

# 3. 重启容器
docker-compose down
docker-compose up -d
```

## 故障排查

1. **无法登录容器镜像服务**
   - 检查用户名密码是否正确
   - 确认命名空间是否存在

2. **无法拉取镜像**
   - 检查网络连接
   - 确认镜像是否推送成功
   - 检查镜像路径是否正确

3. **容器无法启动**
   - 查看日志: `docker logs figma-download-web`
   - 检查端口是否被占用: `netstat -tulpn | grep 80`
   - 检查 Docker 服务状态: `systemctl status docker`

4. **网站无法访问**
   - 检查防火墙规则
   - 检查安全组设置（阿里云控制台）
   - 确认端口映射正确

## 安全建议

1. 使用非 root 用户运行容器
2. 配置 HTTPS（使用 Nginx 反向代理）
3. 定期更新镜像
4. 配置日志轮转
5. 设置资源限制

# 快速部署指南

## 快速开始（3步部署）

### 1. 配置信息

编辑 `deploy-to-aliyun.ps1`，修改以下配置：

```powershell
$ALIYUN_REGISTRY = "registry.cn-hangzhou.aliyuncs.com"  # 你的地域
$NAMESPACE = "your-namespace"  # 你的命名空间
$SERVER_USER = "root"  # 服务器用户名
```

### 2. 构建并推送镜像

在 Windows PowerShell 中执行：

```powershell
cd D:\Aliyun\my-figma-download-code
.\deploy-to-aliyun.ps1
```

脚本会：
- 构建 Docker 镜像
- 标记镜像
- 提示登录阿里云
- 推送镜像到阿里云容器镜像服务

### 3. 在服务器上部署

#### 方法 A: 直接在服务器上执行命令（推荐）

```bash
# SSH 连接到服务器
ssh root@47.112.29.212

# 登录阿里云容器镜像服务（首次需要）
docker login registry.cn-hangzhou.aliyuncs.com

# 拉取最新镜像（替换为你的实际镜像地址）
docker pull registry.cn-hangzhou.aliyuncs.com/your-namespace/figma-download-web:latest

# 停止并删除旧容器
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

#### 方法 B: 手动部署

```bash
# SSH 连接到服务器
ssh root@47.112.29.212

# 登录阿里云容器镜像服务
docker login registry.cn-hangzhou.aliyuncs.com

# 拉取镜像（替换为你的实际镜像地址）
docker pull registry.cn-hangzhou.aliyuncs.com/your-namespace/figma-download-web:latest

# 停止旧容器
docker stop figma-download-web || true
docker rm figma-download-web || true

# 运行新容器
docker run -d \
  -p 80:80 \
  --name figma-download-web \
  --restart unless-stopped \
  registry.cn-hangzhou.aliyuncs.com/your-namespace/figma-download-web:latest

# 查看状态
docker ps
docker logs -f figma-download-web
```

## 验证部署

访问: http://47.112.29.212

## 更新部署

当代码更新后，重复步骤 2 和 3 即可。

## 常见问题

### Q: 如何获取阿里云容器镜像服务的登录凭证？

A: 
1. 登录阿里云控制台
2. 进入"容器镜像服务" -> "访问凭证"
3. 设置固定密码或使用临时密码

### Q: 如何创建命名空间？

A:
1. 登录阿里云控制台
2. 进入"容器镜像服务" -> "命名空间"
3. 点击"创建命名空间"
4. 填写命名空间名称（如：my-apps）

### Q: 如何查看部署日志？

A:
```bash
docker logs -f figma-download-web
```

### Q: 如何重启服务？

A:
```bash
docker restart figma-download-web
```

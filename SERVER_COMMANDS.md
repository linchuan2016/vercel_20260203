# 阿里云服务器部署命令（直接执行）

## 一键部署命令

在阿里云服务器上直接执行以下命令（替换为你的实际镜像地址）：

```bash
# 1. 登录阿里云容器镜像服务（首次需要）
docker login registry.cn-hangzhou.aliyuncs.com

# 2. 拉取镜像（替换 your-namespace 为你的命名空间）
docker pull registry.cn-hangzhou.aliyuncs.com/your-namespace/figma-download-web:latest

# 3. 停止并删除旧容器
docker stop figma-download-web 2>/dev/null || true
docker rm figma-download-web 2>/dev/null || true

# 4. 运行新容器
docker run -d \
  -p 80:80 \
  --name figma-download-web \
  --restart unless-stopped \
  registry.cn-hangzhou.aliyuncs.com/your-namespace/figma-download-web:latest

# 5. 查看容器状态
docker ps

# 6. 查看日志（可选）
docker logs -f figma-download-web
```

## 完整命令（复制粘贴执行）

```bash
# 登录（首次需要，会提示输入用户名和密码）
docker login registry.cn-hangzhou.aliyuncs.com && \
# 拉取镜像（请替换 your-namespace）
docker pull registry.cn-hangzhou.aliyuncs.com/your-namespace/figma-download-web:latest && \
# 停止旧容器
docker stop figma-download-web 2>/dev/null || true && \
docker rm figma-download-web 2>/dev/null || true && \
# 运行新容器
docker run -d -p 80:80 --name figma-download-web --restart unless-stopped \
  registry.cn-hangzhou.aliyuncs.com/your-namespace/figma-download-web:latest && \
# 查看状态
docker ps && \
echo "部署完成！访问 http://47.112.29.212"
```

## 更新部署命令

当镜像更新后，只需执行：

```bash
docker pull registry.cn-hangzhou.aliyuncs.com/your-namespace/figma-download-web:latest && \
docker stop figma-download-web && \
docker rm figma-download-web && \
docker run -d -p 80:80 --name figma-download-web --restart unless-stopped \
  registry.cn-hangzhou.aliyuncs.com/your-namespace/figma-download-web:latest
```

## 常用管理命令

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

### 停止容器
```bash
docker stop figma-download-web
```

### 删除容器
```bash
docker rm figma-download-web
```

### 查看容器资源使用
```bash
docker stats figma-download-web
```

## 注意事项

1. **替换镜像地址**：将 `your-namespace` 替换为你在阿里云 ACR 中创建的命名空间
2. **首次登录**：第一次需要执行 `docker login`，输入阿里云 ACR 的用户名和密码
3. **端口占用**：确保服务器端口 80 未被其他服务占用
4. **安全组**：确保阿里云安全组已开放端口 80

## 故障排查

### 如果容器无法启动
```bash
# 查看详细日志
docker logs figma-download-web

# 检查端口占用
netstat -tulpn | grep 80

# 检查 Docker 服务状态
systemctl status docker
```

### 如果无法拉取镜像
```bash
# 检查登录状态
docker info | grep Username

# 重新登录
docker logout registry.cn-hangzhou.aliyuncs.com
docker login registry.cn-hangzhou.aliyuncs.com
```

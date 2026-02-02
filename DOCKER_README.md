# Docker 部署说明

## 快速开始

### 使用 Docker Compose（推荐）

```bash
# 构建并启动容器
docker-compose up -d --build

# 查看日志
docker-compose logs -f

# 停止容器
docker-compose down
```

### 使用 Docker 命令

```bash
# 构建镜像
docker build -t figma-download-web .

# 运行容器
docker run -d -p 8081:80 --name figma-download-web figma-download-web

# 查看日志
docker logs -f figma-download-web

# 停止并删除容器
docker stop figma-download-web
docker rm figma-download-web
```

## 访问地址

启动后访问：http://localhost:8081

## 项目信息

- **技术栈**: React + Vite + TypeScript + Tailwind CSS
- **构建工具**: Vite
- **Web 服务器**: Nginx (Alpine)
- **端口**: 8081 (容器内 80)

## 注意事项

1. 首次构建可能需要较长时间，因为需要安装所有依赖
2. 如果构建失败，请检查网络连接和 Node.js 版本
3. 项目使用了 Supabase，配置已硬编码在代码中

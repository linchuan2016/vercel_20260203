# 构建阶段
FROM node:20-alpine AS builder

WORKDIR /app

# 复制 package.json
COPY package.json ./

# 安装所有依赖（使用 --legacy-peer-deps）
RUN npm install --legacy-peer-deps

# 复制源代码
COPY . .

# 验证 React 安装
RUN ls -la node_modules/react || echo "React not found"

# 构建应用
RUN npm run build

# 生产阶段 - 使用 Nginx 提供静态文件服务
FROM nginx:alpine

# 复制构建产物到 Nginx 目录
COPY --from=builder /app/dist /usr/share/nginx/html

# 复制 Nginx 配置文件（如果需要自定义配置）
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露 80 端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]

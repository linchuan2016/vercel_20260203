# 同步镜像到阿里云 ACR（个人版）

## 1. 在阿里云控制台准备

1. 打开 [容器镜像服务 ACR](https://cr.console.aliyun.com/)（个人版）
2. 地域：**深圳 (cn-shenzhen)**
3. 创建 **命名空间**（若没有），例如：`aliyun-20260202`
4. 在命名空间下创建 **镜像仓库**，名称：`figma-download-web`（或使用“本地仓库”自动创建）
5. 在 ACR 控制台 **访问凭证** 中设置并记住「镜像仓库登录密码」

## 2. 登录 ACR（个人版）

**在服务器上（Linux）：**

```bash
sudo docker login --username=491356605@qq.com crpi-r7qju4rykt1lw8mk.cn-shenzhen.personal.cr.aliyuncs.com
# 按提示输入 ACR 访问凭证中的「镜像仓库登录密码」
```

**在本地 Windows（PowerShell）：**

```powershell
docker login --username=491356605@qq.com crpi-r7qju4rykt1lw8mk.cn-shenzhen.personal.cr.aliyuncs.com
# 按提示输入镜像仓库登录密码
```

## 3. 本地更新（构建 + 推送）

改完代码后，在本地执行**构建并推送**，服务器再拉取新镜像并重启容器，域名页面就会更新。

**方式一：一键脚本（推荐）**

```powershell
cd d:\Aliyun\figma-code-aliyun
.\build-and-push.ps1
```

若报错「禁止运行脚本」，先执行以下之一再运行上面命令：
- 临时绕过：`powershell -ExecutionPolicy Bypass -File .\build-and-push.ps1`
- 或放宽策略（一次设置即可）：`Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`

脚本会依次：构建镜像 `figma-download-web:latest` → 推送到阿里云 ACR。执行完后按提示在服务器上拉取并重启容器。

**方式二：分步命令**

```powershell
cd d:\Aliyun\figma-code-aliyun

# 1. 构建镜像
docker build -t figma-download-web:latest .

# 2. 推送到 ACR（需已 docker login）
.\push-to-aliyun.ps1
```

**方式三：仅推送（未改代码、只重新推送已有镜像时）**

```powershell
cd d:\Aliyun\figma-code-aliyun
.\push-to-aliyun.ps1
```

或手动：
```powershell
$NS = "aliyun-20260202"
$REG = "crpi-r7qju4rykt1lw8mk.cn-shenzhen.personal.cr.aliyuncs.com"
docker tag figma-download-web:latest ${REG}/${NS}/figma-download-web:latest
docker push ${REG}/${NS}/figma-download-web:latest
```

## 4. 服务器拉取并运行

在阿里云 ECS 上（已用上面命令登录个人版 ACR 后）。若当前用户无 Docker 权限，命令前加 `sudo`：

```bash
sudo docker pull crpi-r7qju4rykt1lw8mk.cn-shenzhen.personal.cr.aliyuncs.com/aliyun-20260202/figma-download-web:latest
sudo docker run -d --name figma-download-web -p 8081:80 crpi-r7qju4rykt1lw8mk.cn-shenzhen.personal.cr.aliyuncs.com/aliyun-20260202/figma-download-web:latest
```

（若希望不加 sudo，可执行 `sudo usermod -aG docker $USER` 后重新登录 SSH。）

**若已存在同名容器，先删再起：**
```bash
sudo docker stop figma-download-web
sudo docker rm figma-download-web
# 再执行上面的 pull 和 run
```

---

## 5. 域名 + HTTPS（备案通过后）

已绑定域名且备案通过后，用 Nginx 做反向代理，让站点通过 `https://你的域名` 访问。

### 5.1 确认 DNS 解析

- 在域名服务商（或阿里云云解析）添加 **A 记录**：主机记录 `@` 和 `www`，记录值填 **服务器公网 IP**。

### 5.2 服务器上安装 Nginx

```bash
# 阿里云 Linux / CentOS
sudo yum install -y nginx
sudo systemctl enable nginx
```

### 5.3 上传 SSL 证书到服务器

- 将域名的证书（`.pem` 或 `.crt`）和私钥（`.key`）上传到服务器，例如：
  - `/etc/nginx/ssl/你的域名.pem`
  - `/etc/nginx/ssl/你的域名.key`
- 本地有 `ssl/linchuan.tech.pem` 和 `ssl/linchuan.tech.key` 时，可上传为 `linchuan.tech.pem` / `linchuan.tech.key`。

```bash
# 在服务器上创建目录
sudo mkdir -p /etc/nginx/ssl
# 用 scp 或 SFTP 上传后，设置权限
sudo chmod 644 /etc/nginx/ssl/你的域名.pem
sudo chmod 600 /etc/nginx/ssl/你的域名.key
```

### 5.4 配置 Nginx

- 项目里已提供示例：`nginx-domain-ssl.conf`。复制到服务器并**把“你的域名”和证书路径改成你的实际值**。

```bash
# 在服务器上创建配置（把 你的域名 替换成真实域名，如 linchuan.tech）
sudo nano /etc/nginx/conf.d/figma-domain.conf
```

内容参考（替换 `你的域名` 和证书路径）：

```nginx
server {
    listen 80;
    server_name 你的域名 www.你的域名;
    return 301 https://$server_name$request_uri;
}
server {
    listen 443 ssl http2;
    server_name 你的域名 www.你的域名;
    ssl_certificate     /etc/nginx/ssl/你的域名.pem;
    ssl_certificate_key /etc/nginx/ssl/你的域名.key;
    ssl_session_timeout 5m;
    ssl_protocols TLSv1.2 TLSv1.3;
    location / {
        proxy_pass http://127.0.0.1:8081;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 5.5 检查并重启 Nginx

```bash
sudo nginx -t
sudo systemctl restart nginx
```

### 5.6 防火墙放行 80/443

- 阿里云 ECS：安全组入方向放行 **80**、**443**。
- 若服务器本机有 firewalld：`sudo firewall-cmd --permanent --add-service=http --add-service=https && sudo firewall-cmd --reload`

完成后用 `https://你的域名` 访问即可；HTTP 会自动跳转到 HTTPS。

### 5.7 若出现 502 Bad Gateway

502 表示 Nginx 在运行，但**后端 Docker 容器（8081）未响应**。在服务器上依次检查：

```bash
# 1. 看容器是否在跑
sudo docker ps -a | grep figma-download-web
# 若 STATUS 不是 Up，说明容器停了

# 2. 测本机 8081 是否通
curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:8081
# 正常应返回 200

# 3. 若容器已停，启动它
sudo docker start figma-download-web

# 4. 若容器被删了，重新拉取并运行
sudo docker pull crpi-r7qju4rykt1lw8mk.cn-shenzhen.personal.cr.aliyuncs.com/aliyun-20260202/figma-download-web:latest
sudo docker run -d --name figma-download-web -p 8081:80 crpi-r7qju4rykt1lw8mk.cn-shenzhen.personal.cr.aliyuncs.com/aliyun-20260202/figma-download-web:latest
```

再访问 `https://linchuan.tech` 应恢复正常。

---

**镜像地址**（个人版，命名空间 aliyun-20260202）：
- `crpi-r7qju4rykt1lw8mk.cn-shenzhen.personal.cr.aliyuncs.com/aliyun-20260202/figma-download-web:latest`

若你的 ACR 命名空间是别的名字，请先 `docker login`，再设置 `$env:ACR_NAMESPACE` 后执行 `.\push-to-aliyun.ps1`，或按上面“方式二”替换命名空间后执行 `docker push`。

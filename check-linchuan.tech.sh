#!/bin/bash
# 在服务器上执行，排查 linchuan.tech 无法访问
# 用法：sudo bash check-linchuan.tech.sh 或 chmod +x check-linchuan.tech.sh && sudo ./check-linchuan.tech.sh

echo "========== 1. Nginx 状态 =========="
systemctl status nginx --no-pager 2>/dev/null | head -5 || echo "Nginx 未安装或未运行"

echo ""
echo "========== 2. Docker 容器 figma-download-web =========="
docker ps -a --filter "name=figma-download-web" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

echo ""
echo "========== 3. 端口监听 (80/443/8081) =========="
ss -tlnp | grep -E ':80 |:443 |:8081 ' || netstat -tlnp 2>/dev/null | grep -E ':80 |:443 |:8081 '

echo ""
echo "========== 4. Nginx 配置测试 =========="
nginx -t 2>&1

echo ""
echo "========== 5. 本机访问 8081 =========="
curl -s -o /dev/null -w "HTTP %{http_code}\n" http://127.0.0.1:8081/ || echo "连接 127.0.0.1:8081 失败"

echo ""
echo "========== 6. 本机 80/443 =========="
curl -s -o /dev/null -w "80: HTTP %{http_code}\n" http://127.0.0.1:80/ 2>/dev/null || echo "80 连接失败"
curl -sk -o /dev/null -w "443: HTTP %{http_code}\n" https://127.0.0.1:443/ 2>/dev/null || echo "443 连接失败"

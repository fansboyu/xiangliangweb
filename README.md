# 向量增长前端

Vite + React 前端项目。服务器只需要安装 Node.js、npm 和 Caddy，即可从源码构建并部署静态文件。

## 本地开发

```bash
npm install
npm run dev
```

默认开发地址为 `http://localhost:5173`。

## 服务器源码部署：Docker + Caddy

1. 安装依赖环境：

```bash
node -v
npm -v
caddy version
```

2. 拉取源码：

```bash
git clone https://github.com/fansboyu/xiangliangweb.git
cd xiangliangweb
```

3. 使用 Docker 构建并启动前端：

```bash
docker compose up -d --build
```

容器会监听宿主机本地端口 `127.0.0.1:18080`。

4. 配置宿主机 Caddy：

将 `Caddyfile.example` 中的域名和路径按服务器实际情况调整后写入 `/etc/caddy/Caddyfile`。

5. 重载宿主机 Caddy：

```bash
sudo caddy fmt --overwrite /etc/caddy/Caddyfile
sudo systemctl reload caddy
```

## 接口配置

默认使用内置 mock 数据。需要连接后端时，在构建前创建 `.env.production`：

```bash
VITE_USE_MOCK=false
VITE_API_BASE_URL=/api
```

如果后端不在同域名下，可以将 `VITE_API_BASE_URL` 改为实际后端地址，或在 Caddy 中配置 `/api/*` 反向代理。

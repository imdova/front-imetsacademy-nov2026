# Deploying the IMETS Academy web app to the VPS (test.imetsacademy.com)

Target: Ubuntu VPS, Node 20+, served behind Nginx + Let's Encrypt, managed by PM2.
Next.js runs on `127.0.0.1:3000`; Nginx terminates TLS for `test.imetsacademy.com`.

> The UI currently renders with built-in mock data, so it runs standalone. When we
> wire it to the backend, set `NEXT_PUBLIC_API_URL` (see below) and rebuild.

---

## 1. One-time server setup

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs nginx
sudo npm i -g pnpm pm2
```

## 2. Get the code

```bash
sudo mkdir -p /var/www && cd /var/www
git clone https://github.com/imdova/front-imetsacademy-nov2026.git imets-web
cd imets-web
git checkout main
pnpm install
```

## 3. Environment (optional for now)

```bash
cp deploy/env.production.example .env.production
nano .env.production   # NEXT_PUBLIC_API_URL=https://api.imetsacademy.com/api/v1
```

## 4. Build & start

```bash
pnpm build
pm2 start ecosystem.config.js
pm2 save
pm2 startup            # run the command it prints, to survive reboots
```

Check locally: `curl -I http://127.0.0.1:3000` → `200 OK`.

## 5. Nginx + HTTPS

```bash
sudo cp deploy/nginx-web.conf /etc/nginx/sites-available/test.imetsacademy.com
sudo ln -s /etc/nginx/sites-available/test.imetsacademy.com /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d test.imetsacademy.com
```

Open `https://test.imetsacademy.com`.

---

## Updating later

```bash
cd /var/www/imets-web
git pull
pnpm install
pnpm build
pm2 reload imets-web
```

## DNS

Point both A records at the VPS before running certbot:
`test.imetsacademy.com` and `api.imetsacademy.com` → the server's public IP.

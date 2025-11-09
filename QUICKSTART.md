# Quick Deployment Guide

## روی سرور (یکبار انجام دهید):

```bash
# 1. نصب پیش‌نیازها
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo bash -
sudo apt update && sudo apt install -y nodejs postgresql nginx git
sudo npm install -g pm2

# 2. Setup PostgreSQL
sudo -u postgres psql -c "CREATE DATABASE maxcv;"
sudo -u postgres psql -c "CREATE USER maxcv WITH ENCRYPTED PASSWORD 'YOUR_PASSWORD';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE maxcv TO maxcv;"

# 3. ساخت دایرکتوری‌ها
sudo mkdir -p /var/www/maxcv /var/repos/maxcv.git
sudo chown -R $USER:$USER /var/www/maxcv /var/repos/maxcv.git

# 4. Setup Git Repository
cd /var/repos/maxcv.git
git init --bare
cat > hooks/post-receive << 'EOF'
#!/bin/bash
/var/www/maxcv/deploy.sh
EOF
chmod +x hooks/post-receive

# 5. ساخت فایل .env
cd /var/www/maxcv
cat > .env << 'EOF'
DATABASE_URL="postgresql://maxcv:YOUR_PASSWORD@localhost:5432/maxcv?schema=public"
OPENAI_API_KEY="your-openai-key"
NEXTAUTH_SECRET="$(openssl rand -base64 32)"
NEXTAUTH_URL="https://cv.maxhmd.dev"
NODE_ENV="production"
EOF

# 6. Setup Nginx
sudo tee /etc/nginx/sites-available/maxcv << 'EOF'
server {
    listen 80;
    server_name cv.maxhmd.dev;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

sudo ln -s /etc/nginx/sites-available/maxcv /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl restart nginx

# 7. SSL با Let's Encrypt
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d cv.maxhmd.dev
```

---

## روی کامپیوتر محلی شما:

```bash
cd /path/to/maxcv

# اضافه کردن remote
git remote add production YOUR_USERNAME@YOUR_SERVER_IP:/var/repos/maxcv.git

# اولین push (ممکن است چند دقیقه طول بکشد)
git push production main
```

---

## Deploy کردن تغییرات بعدی:

```bash
git add .
git commit -m "your message"
git push production main
```

تمام! 🚀

---

## دستورات مفید:

```bash
# مشاهده logs
ssh YOUR_SERVER "pm2 logs maxcv"

# Restart
ssh YOUR_SERVER "pm2 restart maxcv"

# وضعیت
ssh YOUR_SERVER "pm2 status"
```

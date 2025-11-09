# MaxCV Deployment Guide - Hetzner Server

این راهنما برای deploy کردن MaxCV روی سرور Hetzner با دامنه `cv.maxhmd.dev` است.

## پیش‌نیازها

- سرور Hetzner (Ubuntu 22.04 LTS توصیه می‌شود)
- دسترسی SSH به سرور
- دامنه `cv.maxhmd.dev` که به IP سرور متصل شده باشد

---

## مرحله 1: اتصال به سرور

```bash
ssh root@YOUR_SERVER_IP
```

---

## مرحله 2: نصب Node.js و ابزارهای مورد نیاز

```bash
# Update system
apt update && apt upgrade -y

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Install PM2 globally
npm install -g pm2

# Install Nginx
apt install -y nginx

# Install PostgreSQL
apt install -y postgresql postgresql-contrib

# Install Git
apt install -y git
```

---

## مرحله 3: ساخت کاربر برای deployment

```bash
# Create deploy user
adduser deploy
usermod -aG sudo deploy

# Switch to deploy user
su - deploy
```

---

## مرحله 4: Setup PostgreSQL Database

```bash
# Switch to postgres user
sudo -u postgres psql

# در PostgreSQL console:
CREATE DATABASE maxcv;
CREATE USER maxcv WITH ENCRYPTED PASSWORD 'YOUR_STRONG_PASSWORD_HERE';
GRANT ALL PRIVILEGES ON DATABASE maxcv TO maxcv;
\q
```

---

## مرحله 5: Setup Git Repository روی سرور

```bash
# Create directories
sudo mkdir -p /var/www/maxcv
sudo mkdir -p /var/repos/maxcv.git

# Set ownership
sudo chown -R deploy:deploy /var/www/maxcv
sudo chown -R deploy:deploy /var/repos/maxcv.git

# Initialize bare git repository
cd /var/repos/maxcv.git
git init --bare

# Create post-receive hook
cat > hooks/post-receive << 'EOF'
#!/bin/bash
/var/www/maxcv/deploy.sh
EOF

chmod +x hooks/post-receive
```

---

## مرحله 6: Clone کردن اولیه پروژه

```bash
cd /var/www/maxcv
git clone /var/repos/maxcv.git .
```

---

## مرحله 7: ساخت فایل .env روی سرور

```bash
cd /var/www/maxcv
nano .env
```

محتویات:
```env
# Database
DATABASE_URL="postgresql://maxcv:YOUR_STRONG_PASSWORD_HERE@localhost:5432/maxcv?schema=public"

# OpenAI
OPENAI_API_KEY="your-openai-api-key-here"

# Next Auth
NEXTAUTH_SECRET="your-random-secret-here-use-openssl-rand-base64-32"
NEXTAUTH_URL="https://cv.maxhmd.dev"

# Environment
NODE_ENV="production"
```

برای ساخت NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

---

## مرحله 8: اولین Build و Setup

```bash
cd /var/www/maxcv

# Install dependencies
npm install

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Build application
npm run build

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

---

## مرحله 9: Setup Nginx

```bash
sudo nano /etc/nginx/sites-available/maxcv
```

محتویات:
```nginx
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
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

فعال کردن config:
```bash
sudo ln -s /etc/nginx/sites-available/maxcv /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## مرحله 10: نصب SSL با Let's Encrypt

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d cv.maxhmd.dev

# Test auto-renewal
sudo certbot renew --dry-run
```

---

## مرحله 11: Setup Git Remote روی کامپیوتر محلی

در کامپیوتر محلی خودتان:

```bash
cd /path/to/maxcv

# Add production remote
git remote add production deploy@YOUR_SERVER_IP:/var/repos/maxcv.git

# Push to production
git push production main
```

---

## مرحله 12: تنظیم Firewall

```bash
# Install UFW
sudo apt install -y ufw

# Allow SSH, HTTP, HTTPS
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443

# Enable firewall
sudo ufw enable
```

---

## دستورات مفید

### Deploy کردن تغییرات جدید:
```bash
git push production main
```

### مشاهده logs:
```bash
pm2 logs maxcv
```

### Restart کردن application:
```bash
pm2 restart maxcv
```

### وضعیت application:
```bash
pm2 status
```

### مشاهده Nginx logs:
```bash
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

### Backup کردن database:
```bash
pg_dump -U maxcv maxcv > backup-$(date +%Y%m%d).sql
```

### Restore کردن database:
```bash
psql -U maxcv maxcv < backup-YYYYMMDD.sql
```

---

## Troubleshooting

### اگر deployment موفق نبود:
```bash
# بررسی logs
pm2 logs maxcv --lines 100

# بررسی Nginx
sudo nginx -t
sudo systemctl status nginx

# بررسی PostgreSQL
sudo systemctl status postgresql
```

### اگر database migration مشکل داشت:
```bash
cd /var/www/maxcv
npx prisma migrate reset
npx prisma migrate deploy
```

### اگر build مشکل داشت:
```bash
cd /var/www/maxcv
rm -rf .next
npm run build
pm2 restart maxcv
```

---

## نکات امنیتی

1. ✅ همیشه از passwords قوی استفاده کنید
2. ✅ SSH keys را به جای password استفاده کنید
3. ✅ فایل `.env` را هرگز commit نکنید
4. ✅ Firewall را فعال نگه دارید
5. ✅ به‌طور منظم backup بگیرید
6. ✅ به‌طور منظم سیستم را update کنید

---

## Monitoring

### Setup PM2 Monitoring:
```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

---

تمام! حالا می‌توانید با `git push production main` پروژه را deploy کنید. 🚀

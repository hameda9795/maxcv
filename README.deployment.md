# MaxCV - Deployment با Git Push

این پروژه برای deploy کردن روی سرور Hetzner با دامنه `cv.maxhmd.dev` آماده شده است.

## روش سریع (Recommended)

### 1. روی سرور Hetzner:

```bash
# کپی کردن اسکریپت setup به سرور
scp server-setup.sh root@YOUR_SERVER_IP:/root/

# اجرا کردن اسکریپت
ssh root@YOUR_SERVER_IP
chmod +x /root/server-setup.sh
./server-setup.sh
```

اسکریپت از شما می‌پرسد:
- Database password
- OpenAI API key
- Domain name (cv.maxhmd.dev)

### 2. روی کامپیوتر محلی:

```bash
# اضافه کردن remote
git remote add production root@YOUR_SERVER_IP:/var/repos/maxcv.git

# Push کردن
git push production main
```

تمام! 🎉

---

## Deploy کردن تغییرات جدید

بعد از هر تغییر در کد:

```bash
git add .
git commit -m "your changes"
git push production main
```

سیستم به طور خودکار:
1. ✅ Dependencies را نصب می‌کند
2. ✅ Database migration را اجرا می‌کند
3. ✅ Build می‌کند
4. ✅ Application را restart می‌کند

---

## دستورات مفید

```bash
# مشاهده logs
ssh root@YOUR_SERVER_IP "pm2 logs maxcv"

# Restart application
ssh root@YOUR_SERVER_IP "pm2 restart maxcv"

# وضعیت application
ssh root@YOUR_SERVER_IP "pm2 status"

# مشاهده Nginx logs
ssh root@YOUR_SERVER_IP "tail -f /var/log/nginx/error.log"

# Connect به database
ssh root@YOUR_SERVER_IP "psql -U maxcv maxcv"
```

---

## فایل‌های مهم

- `deploy.sh` - اسکریپت deployment که بعد از هر git push اجرا می‌شود
- `ecosystem.config.js` - تنظیمات PM2
- `server-setup.sh` - اسکریپت setup اولیه سرور
- `DEPLOYMENT.md` - راهنمای کامل deployment
- `QUICKSTART.md` - راهنمای سریع

---

## Architecture

```
Local Machine          Hetzner Server
    │
    │ git push
    │ production main
    ▼
┌─────────────┐      ┌──────────────────────┐
│ Git Repo    │─────▶│ /var/repos/maxcv.git │
└─────────────┘      └──────────────────────┘
                              │
                              │ post-receive hook
                              ▼
                     ┌──────────────────────┐
                     │ /var/www/maxcv       │
                     │ - npm install        │
                     │ - prisma migrate     │
                     │ - npm build          │
                     │ - pm2 restart        │
                     └──────────────────────┘
                              │
                              ▼
                     ┌──────────────────────┐
                     │ PM2 (Port 3000)      │
                     └──────────────────────┘
                              │
                              ▼
                     ┌──────────────────────┐
                     │ Nginx (Port 80/443)  │
                     └──────────────────────┘
                              │
                              ▼
                     cv.maxhmd.dev (SSL)
```

---

## Environment Variables

فایل `.env` روی سرور در `/var/www/maxcv/.env`:

```env
DATABASE_URL="postgresql://maxcv:PASSWORD@localhost:5432/maxcv"
OPENAI_API_KEY="sk-..."
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="https://cv.maxhmd.dev"
NODE_ENV="production"
```

---

## Troubleshooting

### Deployment موفق نشد؟

```bash
# بررسی logs
ssh root@YOUR_SERVER_IP "pm2 logs maxcv --lines 50"

# اجرای دستی
ssh root@YOUR_SERVER_IP "cd /var/www/maxcv && ./deploy.sh"
```

### Application start نمی‌شود؟

```bash
# بررسی .env
ssh root@YOUR_SERVER_IP "cat /var/www/maxcv/.env"

# بررسی dependencies
ssh root@YOUR_SERVER_IP "cd /var/www/maxcv && npm install"

# بررسی build
ssh root@YOUR_SERVER_IP "cd /var/www/maxcv && npm run build"
```

### Database مشکل دارد؟

```bash
# بررسی PostgreSQL
ssh root@YOUR_SERVER_IP "sudo systemctl status postgresql"

# اجرای migrations
ssh root@YOUR_SERVER_IP "cd /var/www/maxcv && npx prisma migrate deploy"
```

---

## Security Checklist

- ✅ فایل `.env` در `.gitignore` است
- ✅ SSL certificate نصب شده است
- ✅ Firewall فعال است (فقط ports 22, 80, 443)
- ✅ Database password قوی است
- ✅ NEXTAUTH_SECRET random است

---

## Backup

### Database Backup:

```bash
# روی سرور
pg_dump -U maxcv maxcv > /backup/maxcv-$(date +%Y%m%d).sql

# Download به local
scp root@YOUR_SERVER_IP:/backup/maxcv-*.sql ./
```

### Application Backup:

```bash
# همه چیز در Git است، فقط push کنید:
git push origin main
```

---

## Performance Tips

1. **PM2 Cluster Mode**: برای traffic بیشتر
```javascript
// در ecosystem.config.js
instances: 'max',
exec_mode: 'cluster'
```

2. **Nginx Caching**: برای static files
3. **CDN**: برای assets
4. **Database Connection Pooling**: در Prisma

---

برای سوالات: راهنمای کامل در `DEPLOYMENT.md`

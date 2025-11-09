#!/bin/bash

# MaxCV Server Setup Script
# این اسکریپت را روی سرور Hetzner اجرا کنید

set -e

echo "🚀 MaxCV Server Setup Starting..."
echo "=================================="

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get server IP
SERVER_IP=$(hostname -I | awk '{print $1}')

echo -e "${GREEN}Server IP: $SERVER_IP${NC}"
echo ""

# Get user inputs
read -p "Enter database password for user 'maxcv': " DB_PASSWORD
read -p "Enter your OpenAI API key: " OPENAI_KEY
read -p "Enter server domain (e.g., cv.maxhmd.dev): " DOMAIN

echo ""
echo -e "${YELLOW}Installing required packages...${NC}"

# Update system
apt update && apt upgrade -y

# Install Node.js 20.x
echo -e "${YELLOW}Installing Node.js...${NC}"
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Install PM2
echo -e "${YELLOW}Installing PM2...${NC}"
npm install -g pm2

# Install Nginx
echo -e "${YELLOW}Installing Nginx...${NC}"
apt install -y nginx

# Install PostgreSQL
echo -e "${YELLOW}Installing PostgreSQL...${NC}"
apt install -y postgresql postgresql-contrib

# Install Git
apt install -y git

# Setup PostgreSQL
echo -e "${YELLOW}Setting up PostgreSQL...${NC}"
sudo -u postgres psql -c "CREATE DATABASE maxcv;" 2>/dev/null || echo "Database already exists"
sudo -u postgres psql -c "CREATE USER maxcv WITH ENCRYPTED PASSWORD '$DB_PASSWORD';" 2>/dev/null || echo "User already exists"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE maxcv TO maxcv;"

# Create directories
echo -e "${YELLOW}Creating directories...${NC}"
mkdir -p /var/www/maxcv
mkdir -p /var/repos/maxcv.git

# Setup Git bare repository
echo -e "${YELLOW}Setting up Git repository...${NC}"
cd /var/repos/maxcv.git
git init --bare

# Create post-receive hook
cat > hooks/post-receive << 'HOOK_EOF'
#!/bin/bash
/var/www/maxcv/deploy.sh
HOOK_EOF

chmod +x hooks/post-receive

# Create .env file
echo -e "${YELLOW}Creating .env file...${NC}"
NEXTAUTH_SECRET=$(openssl rand -base64 32)

cat > /var/www/maxcv/.env << ENV_EOF
DATABASE_URL="postgresql://maxcv:${DB_PASSWORD}@localhost:5432/maxcv?schema=public"
OPENAI_API_KEY="${OPENAI_KEY}"
NEXTAUTH_SECRET="${NEXTAUTH_SECRET}"
NEXTAUTH_URL="https://${DOMAIN}"
NODE_ENV="production"
ENV_EOF

# Setup Nginx
echo -e "${YELLOW}Setting up Nginx...${NC}"
cat > /etc/nginx/sites-available/maxcv << NGINX_EOF
server {
    listen 80;
    server_name ${DOMAIN};

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
NGINX_EOF

ln -sf /etc/nginx/sites-available/maxcv /etc/nginx/sites-enabled/
nginx -t && systemctl restart nginx

# Setup Firewall
echo -e "${YELLOW}Setting up Firewall...${NC}"
apt install -y ufw
ufw allow 22
ufw allow 80
ufw allow 443
echo "y" | ufw enable

# Install SSL Certificate
echo -e "${YELLOW}Installing SSL certificate...${NC}"
apt install -y certbot python3-certbot-nginx
certbot --nginx -d ${DOMAIN} --non-interactive --agree-tos --email admin@${DOMAIN} || echo "SSL setup skipped"

echo ""
echo -e "${GREEN}=================================="
echo "✅ Server Setup Complete!"
echo "=================================="
echo ""
echo "Next steps:"
echo "1. On your local machine, add remote:"
echo "   git remote add production root@${SERVER_IP}:/var/repos/maxcv.git"
echo ""
echo "2. Push your code:"
echo "   git push production main"
echo ""
echo "3. Your application will be available at:"
echo "   https://${DOMAIN}"
echo ""
echo -e "${YELLOW}Note: First deployment may take a few minutes.${NC}"
echo ""

#!/bin/bash

# MaxCV Deployment Script
# This script will be executed on the server after git push

set -e

echo "🚀 Starting deployment..."

# Navigate to project directory
cd /var/www/maxcv

# Pull latest changes
echo "📥 Pulling latest changes..."
git --git-dir=/var/www/maxcv.git --work-tree=/var/www/maxcv checkout -f

# Install dependencies
echo "📦 Installing dependencies..."
npm install --production=false

# Generate Prisma Client
echo "🔧 Generating Prisma Client..."
npx prisma generate

# Run database migrations
echo "🗄️ Running database migrations..."
npx prisma migrate deploy

# Build Next.js application
echo "🏗️ Building Next.js application..."
npm run build

# Restart application with PM2
echo "♻️ Restarting application..."
pm2 restart maxcv || pm2 start ecosystem.config.js

echo "✅ Deployment completed successfully!"
echo "🌐 Application is running at https://cv.maxhmd.dev"

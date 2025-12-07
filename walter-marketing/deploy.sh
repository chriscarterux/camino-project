#!/bin/bash

# Deploy Walter Marketing to Hostinger VPS
# Usage: ./deploy.sh

set -e  # Exit on error

echo "🚀 Starting deployment to Hostinger VPS..."
echo ""

# VPS Configuration
VPS_HOST="46.202.93.22"
VPS_USER="root"
VPS_DIR="/root/walter-marketing"
PROJECT_NAME="walter-marketing"

echo "📦 Step 1: Building Docker image locally..."
cd /Users/howdycarter/Documents/projects/camino-project/walter-marketing
docker build -t ${PROJECT_NAME}:latest .

echo ""
echo "💾 Step 2: Saving Docker image to tar..."
docker save ${PROJECT_NAME}:latest > /tmp/${PROJECT_NAME}.tar

echo ""
echo "📤 Step 3: Transferring image to VPS..."
scp /tmp/${PROJECT_NAME}.tar ${VPS_USER}@${VPS_HOST}:/tmp/

echo ""
echo "📤 Step 4: Transferring docker-compose.prod.yml..."
scp docker-compose.prod.yml ${VPS_USER}@${VPS_HOST}:${VPS_DIR}/docker-compose.yml

echo ""
echo "📤 Step 5: Transferring .env.production..."
scp .env.production ${VPS_USER}@${VPS_HOST}:${VPS_DIR}/.env

echo ""
echo "🔄 Step 6: Loading image and starting containers on VPS..."
ssh ${VPS_USER}@${VPS_HOST} << 'ENDSSH'
cd /root/walter-marketing

# Load the Docker image
echo "Loading Docker image..."
docker load < /tmp/walter-marketing.tar

# Stop and remove old containers
echo "Stopping old containers..."
docker-compose down || true

# Start new containers
echo "Starting new containers..."
docker-compose up -d

# Wait for health check
echo "Waiting for service to be healthy..."
sleep 10

# Check status
docker-compose ps

# Clean up
rm /tmp/walter-marketing.tar

echo ""
echo "✅ Deployment complete!"
ENDSSH

echo ""
echo "🧹 Step 7: Cleaning up local files..."
rm /tmp/${PROJECT_NAME}.tar

echo ""
echo "✅ Deployment successful!"
echo "🌐 Service should be running on http://46.202.93.22:3002"
echo ""
echo "To check logs: ssh ${VPS_USER}@${VPS_HOST} 'cd ${VPS_DIR} && docker-compose logs -f'"
echo "To check status: ssh ${VPS_USER}@${VPS_HOST} 'cd ${VPS_DIR} && docker-compose ps'"

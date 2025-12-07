#!/bin/bash

# Walter Marketing - VPS Deployment Script
# Usage: ./deploy-to-vps.sh

set -e

VPS_HOST="root@46.202.93.22"
VPS_DIR="/root/walter-marketing"
LOCAL_DIR="/Users/howdycarter/Documents/projects/camino-project/walter-marketing"

echo "🚀 Deploying Walter Marketing to VPS..."
echo ""

# Step 1: Test SSH connection
echo "1️⃣  Testing SSH connection..."
if ssh -o ConnectTimeout=5 "$VPS_HOST" "echo '✅ SSH connected'" 2>/dev/null; then
    echo "✅ SSH connection successful"
else
    echo "❌ SSH connection failed"
    echo "Please ensure you can connect manually: ssh $VPS_HOST"
    exit 1
fi
echo ""

# Step 2: Create deployment directory
echo "2️⃣  Creating deployment directory on VPS..."
ssh "$VPS_HOST" "mkdir -p $VPS_DIR"
echo "✅ Directory created: $VPS_DIR"
echo ""

# Step 3: Transfer files
echo "3️⃣  Transferring files to VPS..."
rsync -avz --progress \
  --exclude 'node_modules' \
  --exclude '.next' \
  --exclude '.git' \
  --exclude 'tests' \
  --exclude '.env.local' \
  --exclude '.env' \
  --exclude 'coverage' \
  --exclude '*.log' \
  "$LOCAL_DIR/" \
  "$VPS_HOST:$VPS_DIR/"

echo "✅ Files transferred"
echo ""

# Step 4: Copy production environment file
echo "4️⃣  Setting up environment..."
scp "$LOCAL_DIR/.env.production" "$VPS_HOST:$VPS_DIR/.env"
echo "✅ Environment configured"
echo ""

# Step 5: Rename docker-compose file
echo "5️⃣  Preparing Docker Compose..."
ssh "$VPS_HOST" "cd $VPS_DIR && cp docker-compose.prod.yml docker-compose.yml"
echo "✅ Docker Compose file ready"
echo ""

# Step 6: Build and start container
echo "6️⃣  Building and starting Docker container..."
ssh "$VPS_HOST" "cd $VPS_DIR && docker compose down && docker compose up -d --build"
echo ""

# Step 7: Wait for container to start
echo "⏳ Waiting for container to start..."
sleep 5

# Step 8: Check container status
echo ""
echo "7️⃣  Checking deployment status..."
ssh "$VPS_HOST" "cd $VPS_DIR && docker compose ps"
echo ""

# Step 9: Test the deployment
echo "8️⃣  Testing deployment..."
if curl -f -s -o /dev/null http://46.202.93.22:3002; then
    echo "✅ Deployment successful! App is running at http://46.202.93.22:3002"
else
    echo "⚠️  Container started but app not responding yet"
    echo "Check logs with: ssh $VPS_HOST 'cd $VPS_DIR && docker compose logs -f walter-web'"
fi
echo ""

# Step 10: Show logs
echo "📋 Recent logs:"
ssh "$VPS_HOST" "cd $VPS_DIR && docker compose logs --tail=20 walter-web"
echo ""

echo "✅ Deployment complete!"
echo ""
echo "📌 Useful commands:"
echo "   View logs:     ssh $VPS_HOST 'cd $VPS_DIR && docker compose logs -f walter-web'"
echo "   Restart:       ssh $VPS_HOST 'cd $VPS_DIR && docker compose restart walter-web'"
echo "   Stop:          ssh $VPS_HOST 'cd $VPS_DIR && docker compose down'"
echo "   Access shell:  ssh $VPS_HOST 'docker exec -it walter-marketing sh'"
echo ""
echo "🌐 Application URL: http://46.202.93.22:3002"

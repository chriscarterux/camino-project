#!/bin/bash
# Deploy Camino Marketing to Hostinger VPS
# Run this script on your VPS: ssh root@46.202.93.22

set -e

echo "🚀 Deploying Camino Marketing to Hostinger VPS"
echo "================================================"

# Install Docker if not present
if ! command -v docker &> /dev/null; then
    echo "📦 Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    systemctl start docker
    systemctl enable docker
    rm get-docker.sh
fi

# Install Docker Compose if not present
if ! command -v docker-compose &> /dev/null; then
    echo "📦 Installing Docker Compose..."
    curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
fi

# Clone repository
echo "📥 Updating Camino project..."
cd /root
if [ -d "walter-project" ]; then
    cd walter-project
    git fetch origin
    git reset --hard origin/main
else
    git clone https://github.com/chriscarterux/walter-project.git
    cd walter-project
fi

# Navigate to marketing site
cd walter-marketing

# Create production .env file
echo "⚙️ Setting up environment variables..."
cat > .env.production << EOF
NODE_ENV=production

# Stripe
STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY:-sk_test_placeholder}
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=${NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:-pk_test_placeholder}

# Supabase
NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL:-}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY:-}
SUPABASE_SERVICE_ROLE_KEY=${SUPABASE_SERVICE_ROLE_KEY:-}

# Resend
RESEND_API_KEY=${RESEND_API_KEY:-}
RESEND_FROM_EMAIL=${RESEND_FROM_EMAIL:-noreply@camino.app}

# LMS API
LMS_API_URL=${LMS_API_URL:-http://lms.localhost:8000}
EOF

# Build and start container
echo "🐳 Building Docker image..."
docker build -t walter-marketing:latest .

echo "🚀 Starting Walter Marketing..."
docker stop walter-marketing 2>/dev/null || true
docker rm walter-marketing 2>/dev/null || true

docker run -d \
  --name walter-marketing \
  --restart unless-stopped \
  -p 3000:3000 \
  --env-file .env.production \
  walter-marketing:latest

# Wait for container to start
echo "⏳ Waiting for container to start..."
sleep 10

# Check status
if docker ps | grep -q walter-marketing; then
    echo "✅ Camino Marketing deployed successfully!"
    echo ""
    echo "Access your site at:"
    echo "  - http://46.202.93.22:3000"
    echo "  - http://srv929014.hstgr.cloud:3000"
    echo ""
    echo "Container logs:"
    docker logs walter-marketing --tail 50
else
    echo "❌ Deployment failed. Check logs:"
    docker logs walter-marketing
    exit 1
fi

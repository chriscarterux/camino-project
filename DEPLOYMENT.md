# Walter Deployment Guide - Hostinger VPS

## VPS Information

- **IP Address:** 46.202.93.22
- **Hostname:** srv929014.hstgr.cloud
- **OS:** Ubuntu 22.04 LTS
- **Resources:** 8GB RAM, 2 CPUs, 100GB Disk

---

## Quick Deploy (SSH Method)

### Step 1: SSH into VPS

```bash
ssh root@46.202.93.22
```

### Step 2: Run Deployment Script

```bash
# Download and run deployment script
curl -sSL https://raw.githubusercontent.com/chriscarterux/walter-project/main/deploy-to-hostinger.sh | bash
```

Or manually:

```bash
# Clone repository
cd /root
git clone https://github.com/chriscarterux/walter-project.git
cd walter-project

# Run deployment script
chmod +x deploy-to-hostinger.sh
./deploy-to-hostinger.sh
```

### Step 3: Access Your Site

Once deployed, Walter will be available at:
- **http://46.202.93.22:3000**
- **http://srv929014.hstgr.cloud:3000**

---

## Manual Deployment (Step by Step)

### 1. Install Docker

```bash
ssh root@46.202.93.22

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
systemctl start docker
systemctl enable docker

# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Verify installation
docker --version
docker-compose --version
```

### 2. Clone Repository

```bash
cd /root
git clone https://github.com/chriscarterux/walter-project.git
cd walter-project/walter-marketing
```

### 3. Set Environment Variables

```bash
# Create production environment file
cat > .env.production << EOF
NODE_ENV=production
STRIPE_SECRET_KEY=your_actual_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_actual_publishable_key
LMS_API_URL=http://lms.localhost:8000
EOF
```

### 4. Build Docker Image

```bash
docker build -t walter-marketing:latest .
```

### 5. Run Container

```bash
docker run -d \
  --name walter-marketing \
  --restart unless-stopped \
  -p 3000:3000 \
  --env-file .env.production \
  walter-marketing:latest
```

### 6. Verify Deployment

```bash
# Check container status
docker ps

# View logs
docker logs walter-marketing

# Test the site
curl -I http://localhost:3000
```

---

## Using Docker Compose (Alternative)

```bash
cd /root/walter-project/walter-marketing

# Start with Docker Compose
docker-compose -f deploy-compose.yml up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

---

## Configure Firewall

```bash
# Allow HTTP traffic on port 3000
ufw allow 3000/tcp
ufw reload
```

---

## Setup Domain (Optional)

### Option 1: Use Hostinger's Domain Management

Update DNS A record:
- **Host:** walter (or @)
- **Points to:** 46.202.93.22
- **TTL:** 3600

### Option 2: Use Cloudflare

1. Add A record: `walter.yourdomain.com` → `46.202.93.22`
2. Enable Cloudflare proxy (orange cloud)
3. SSL/TLS → Full

Then update in container:
```bash
docker stop walter-marketing
docker run -d \
  --name walter-marketing \
  --restart unless-stopped \
  -p 80:3000 \
  --env-file .env.production \
  walter-marketing:latest
```

---

## Maintenance Commands

```bash
# SSH into VPS
ssh root@46.202.93.22

# View logs
docker logs -f walter-marketing

# Restart container
docker restart walter-marketing

# Update deployment
cd /root/walter-project
git pull origin main
cd walter-marketing
docker build -t walter-marketing:latest .
docker stop walter-marketing
docker rm walter-marketing
docker run -d --name walter-marketing --restart unless-stopped -p 3000:3000 --env-file .env.production walter-marketing:latest

# Check resource usage
docker stats walter-marketing

# Remove old images
docker image prune -a
```

---

## Add SSL with Nginx (Production Ready)

```bash
# Install Nginx
apt update && apt install nginx certbot python3-certbot-nginx -y

# Configure Nginx reverse proxy
cat > /etc/nginx/sites-available/walter << 'EOF'
server {
    listen 80;
    server_name walter.yourdomain.com 46.202.93.22;

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

# Enable site
ln -s /etc/nginx/sites-available/walter /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx

# Get SSL certificate (if domain configured)
certbot --nginx -d walter.yourdomain.com
```

---

## Monitoring

```bash
# Install monitoring tools
docker run -d \
  --name cadvisor \
  -p 8080:8080 \
  --volume=/:/rootfs:ro \
  --volume=/var/run:/var/run:ro \
  --volume=/sys:/sys:ro \
  --volume=/var/lib/docker/:/var/lib/docker:ro \
  google/cadvisor:latest

# Access monitoring: http://46.202.93.22:8080
```

---

## Troubleshooting

### Container won't start
```bash
docker logs walter-marketing
docker inspect walter-marketing
```

### Port already in use
```bash
lsof -i :3000
kill -9 <PID>
```

### Out of disk space
```bash
docker system prune -a
df -h
```

### Check Node.js errors
```bash
docker exec -it walter-marketing sh
cd /app
ls -la
```

---

## Current Status

- **Repository:** https://github.com/chriscarterux/walter-project
- **VPS IP:** 46.202.93.22
- **Container Port:** 3000
- **Status:** Ready to deploy

## Next Steps

1. SSH into VPS: `ssh root@46.202.93.22`
2. Run deployment script
3. Access site at `http://46.202.93.22:3000`
4. Configure your Stripe keys in `.env.production`
5. (Optional) Set up domain and SSL

---

**Note:** Replace `sk_test_placeholder` and `pk_test_placeholder` with your actual Stripe keys in `.env.production` on the VPS.

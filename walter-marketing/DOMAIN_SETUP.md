# Domain Setup Guide for Camino

## Current Status

**Services Running:**
- ✅ Camino Marketing: http://46.202.93.22:3003
- ✅ Frappe LMS: http://46.202.93.22:8000
- ✅ Nginx Proxy Manager: http://46.202.93.22:81

**New Domain:** camino.to 🎉

## Quick Setup (Using Nginx Proxy Manager)

### Step 1: Configure DNS (In Your Domain Registrar)

**Add These DNS A Records:**

```
Type: A
Host: @
Points to: 46.202.93.22
TTL: 3600 (or Auto)

Type: A
Host: www
Points to: 46.202.93.22
TTL: 3600

Type: A
Host: lms
Points to: 46.202.93.22
TTL: 3600
```

**Check DNS propagation:** https://dnschecker.org

**Wait 5-60 minutes for DNS to propagate worldwide**

### Step 2: Access Nginx Proxy Manager

🌐 **URL:** http://46.202.93.22:81

**Default Login:**
- Email: `admin@example.com`
- Password: `changeme`

(Change password on first login!)

### Step 3: Add Camino Main Site in NPM

**In Nginx Proxy Manager:**

1. Click **"Proxy Hosts"** → **"Add Proxy Host"**

2. **Details Tab:**
   - Domain Names: `camino.to`, `www.camino.to`
   - Scheme: `http`
   - Forward Hostname/IP: `walter-marketing`
   - Forward Port: `3000` (internal Docker port, not 3003!)
   - Cache Assets: ✓
   - Block Common Exploits: ✓
   - Websockets Support: ✓

3. **SSL Tab:**
   - SSL Certificate: "Request a new SSL Certificate"
   - Force SSL: ✓
   - HTTP/2 Support: ✓
   - HSTS Enabled: ✓
   - Email: your@email.com
   - Agree to Let's Encrypt Terms: ✓

4. Click **Save**

### Step 4: Add LMS Subdomain in NPM

1. Click **"Add Proxy Host"**

2. **Details Tab:**
   - Domain Names: `lms.camino.to`
   - Scheme: `http`
   - Forward Hostname/IP: `lms-frappe-1`
   - Forward Port: `8000`
   - Block Common Exploits: ✓
   - Websockets Support: ✓

3. **SSL Tab:**
   - SSL Certificate: "Request a new SSL Certificate"
   - Force SSL: ✓
   - HTTP/2 Support: ✓
   - HSTS Enabled: ✓
   - Email: your@email.com
   - Agree to Let's Encrypt Terms: ✓

4. Click **Save**

### Step 5: Update Environment Variables on VPS

SSH into VPS and update the app URL:

```bash
ssh root@46.202.93.22
cd /root/walter-project/walter-marketing

# Add to .env.production or update existing
echo "NEXT_PUBLIC_APP_URL=https://camino.to" >> .env.production

# Rebuild and restart
docker compose up -d --build
```

### Step 6: Update Supabase Redirect URLs

In Supabase Dashboard → Authentication → URL Configuration:

**Add:**
- https://camino.to/auth/callback
- https://camino.to/**
- https://www.camino.to/auth/callback
- https://www.camino.to/**

**Update Site URL to:** `https://camino.to`

### Step 7: Update Resend Domain (Optional)

In Resend Dashboard → Domains:

**Add domain:** `camino.to`

**Add DNS records** (from Resend):
- SPF record
- DKIM record
- DMARC record
- Return-Path CNAME

Then update `.env.production` on VPS:
```bash
RESEND_FROM_EMAIL=hello@camino.to
```

---

## After Setup, You'll Have:

✅ **https://camino.to** - Main marketing site (SSL secured)
✅ **https://www.camino.to** - Redirects to main
✅ **https://lms.camino.to** - LMS admin (SSL secured, internal use)

All with free SSL certificates from Let's Encrypt, auto-renewed!

---

## Troubleshooting

**DNS not resolving?**
- Check DNS propagation: https://dnschecker.org
- Wait 5-60 minutes after adding DNS records
- Clear local DNS cache: `sudo dscacheutil -flushcache` (Mac) or `ipconfig /flushdns` (Windows)

**SSL certificate failed?**
- Ensure domain DNS is resolving to VPS IP first
- Check ports 80 and 443 are accessible
- Verify email address is valid
- Let's Encrypt has rate limits (5 certs per domain per week)

**502 Bad Gateway?**
- Check containers are running: `docker ps`
- Restart container: `docker compose restart walter-marketing`
- Check logs: `docker logs walter-marketing --tail 100`

**Authentication not working after domain change?**
- Verify Supabase redirect URLs include new domain
- Clear browser cookies and cache
- Check NEXT_PUBLIC_APP_URL is set correctly on VPS

---

## Quick Test Checklist

After setup is complete:

- [ ] DNS resolves to 46.202.93.22: `dig camino.to +short`
- [ ] HTTP redirects to HTTPS
- [ ] SSL certificate is valid (green lock icon)
- [ ] www subdomain redirects to main domain
- [ ] Homepage loads correctly
- [ ] User authentication works
- [ ] LMS subdomain is accessible (if configured)

---

**Once setup, Camino will be live at https://camino.to with free SSL!** 🎉

**Need help?** Check container logs:
```bash
docker logs walter-marketing --tail 100
docker logs nginx-proxy-manager --tail 100
docker logs lms-frappe-1 --tail 100
```

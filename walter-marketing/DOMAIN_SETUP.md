# Domain Setup Guide for Camino

## Current Status

**Services Running:**
- ✅ Camino Marketing: http://46.202.93.22:3003
- ✅ Frappe LMS: http://46.202.93.22:8000
- ✅ Nginx Proxy Manager: http://46.202.93.22:81

**Domain Structure:**
```
camino.to          → Marketing site (/, /about, /pricing, etc.)
app.camino.to      → User dashboard and learning (/app, /journey)
lms.camino.to      → LMS admin backend (Frappe)
```

## Quick Setup (Using Nginx Proxy Manager)

### Step 1: Configure DNS ✅ COMPLETED

**DNS A Records Added:**

```
Type: A
Host: @
Points to: 46.202.93.22
TTL: 3600

Type: A
Host: www
Points to: 46.202.93.22
TTL: 3600

Type: A
Host: app
Points to: 46.202.93.22
TTL: 3600

Type: A
Host: lms
Points to: 46.202.93.22
TTL: 3600
```

**Check DNS propagation:** https://dnschecker.org

**Status:** DNS propagating (5-60 minutes)

### Step 2: Access Nginx Proxy Manager

🌐 **URL:** http://46.202.93.22:81

**Default Login:**
- Email: `admin@example.com`
- Password: `changeme`

(Change password on first login!)

### Step 3: Configure Proxy Hosts in NPM

You need to create **3 proxy hosts** in Nginx Proxy Manager:

---

#### **Host 1: Marketing Site (camino.to)**

1. Click **"Proxy Hosts"** → **"Add Proxy Host"**

2. **Details Tab:**
   - Domain Names: `camino.to`, `www.camino.to`
   - Scheme: `http`
   - Forward Hostname/IP: `walter-marketing`
   - Forward Port: `3000`
   - ✅ Cache Assets
   - ✅ Block Common Exploits
   - ✅ Websockets Support
   - Access List: Publicly Accessible

3. **Custom locations Tab:** Leave empty

4. **SSL Tab:**
   - SSL Certificate: "Request a new SSL Certificate"
   - ✅ Force SSL
   - ✅ HTTP/2 Support
   - ✅ HSTS Enabled
   - ✅ HSTS Subdomains
   - Email: your@email.com
   - ✅ Agree to Let's Encrypt Terms

5. **Advanced Tab:** Leave empty

6. Click **Save**

---

#### **Host 2: User App (app.camino.to)**

1. Click **"Add Proxy Host"**

2. **Details Tab:**
   - Domain Names: `app.camino.to`
   - Scheme: `http`
   - Forward Hostname/IP: `walter-marketing`
   - Forward Port: `3000`
   - ✅ Cache Assets
   - ✅ Block Common Exploits
   - ✅ Websockets Support
   - Access List: Publicly Accessible

3. **Custom locations Tab:** Leave empty

4. **SSL Tab:**
   - SSL Certificate: "Request a new SSL Certificate"
   - ✅ Force SSL
   - ✅ HTTP/2 Support
   - ✅ HSTS Enabled
   - ✅ HSTS Subdomains
   - Email: your@email.com
   - ✅ Agree to Let's Encrypt Terms

5. **Advanced Tab:** Leave empty

6. Click **Save**

---

#### **Host 3: LMS Admin (lms.camino.to)**

1. Click **"Add Proxy Host"**

2. **Details Tab:**
   - Domain Names: `lms.camino.to`
   - Scheme: `http`
   - Forward Hostname/IP: `lms-frappe-1`
   - Forward Port: `8000`
   - ✅ Block Common Exploits
   - ✅ Websockets Support
   - Access List: Publicly Accessible

3. **Custom locations Tab:** Leave empty

4. **SSL Tab:**
   - SSL Certificate: "Request a new SSL Certificate"
   - ✅ Force SSL
   - ✅ HTTP/2 Support
   - ✅ HSTS Enabled
   - Email: your@email.com
   - ✅ Agree to Let's Encrypt Terms

5. **Advanced Tab:** Leave empty

6. Click **Save**

### Step 4: Update Environment Variables on VPS

SSH into VPS and add production environment variables:

```bash
ssh root@46.202.93.22
cd /root/walter-project/walter-marketing

# Create or edit .env.production
cat > .env.production << 'EOF'
# Production Domain URLs
NEXT_PUBLIC_SITE_URL=https://camino.to
NEXT_PUBLIC_APP_URL=https://app.camino.to
NODE_ENV=production

# LMS API (use Docker container name for internal communication)
LMS_API_URL=http://lms-frappe-1:8000
LMS_API_KEY=3e9dcebf84360ba
LMS_API_SECRET=0de5e13607bcc4d

# Supabase (keep your existing values)
NEXT_PUBLIC_SUPABASE_URL=https://cjechozcgxrjbsumltho.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Resend Email
RESEND_API_KEY=re_XQe3C3tf_MtXLv8NcABE3uHqe9HNFbVkD
RESEND_FROM_EMAIL=hello@camino.to

# Stripe (add your production keys)
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
EOF

# Rebuild and restart container
docker compose up -d --build
```

### Step 5: Update Supabase Redirect URLs

Go to: https://supabase.com/dashboard/project/cjechozcgxrjbsumltho/auth/url-configuration

**Site URL:** Set to `https://camino.to`

**Redirect URLs:** Add these URLs:
- `https://camino.to/auth/callback`
- `https://camino.to/**`
- `https://www.camino.to/auth/callback`
- `https://www.camino.to/**`
- `https://app.camino.to/auth/callback`
- `https://app.camino.to/**`

This allows authentication to work across all your subdomains.

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

## 🎉 After Setup, You'll Have:

✅ **https://camino.to** - Marketing site (/, /about, /pricing, etc.)
✅ **https://www.camino.to** - Redirects to camino.to
✅ **https://app.camino.to** - User dashboard and learning (/app, /journey, etc.)
✅ **https://lms.camino.to** - LMS admin backend (Frappe)

**Features:**
- Free SSL certificates from Let's Encrypt (auto-renewed)
- Cross-subdomain authentication (seamless login across camino.to and app.camino.to)
- HTTP/2 enabled for better performance
- HSTS security headers
- Professional domain structure

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

## ✅ Testing Checklist

After setup is complete, test each domain:

**DNS Resolution:**
- [ ] `dig camino.to +short` returns 46.202.93.22
- [ ] `dig app.camino.to +short` returns 46.202.93.22
- [ ] `dig lms.camino.to +short` returns 46.202.93.22

**Marketing Site (camino.to):**
- [ ] https://camino.to loads homepage
- [ ] HTTP redirects to HTTPS
- [ ] SSL certificate is valid (green lock icon)
- [ ] www.camino.to redirects to camino.to
- [ ] /about, /pricing, /how-it-works pages load

**User App (app.camino.to):**
- [ ] https://app.camino.to loads
- [ ] /app pages accessible
- [ ] /journey pages accessible
- [ ] User login works from camino.to
- [ ] User login persists when navigating to app.camino.to
- [ ] Cookies work across subdomains

**LMS Admin (lms.camino.to):**
- [ ] https://lms.camino.to loads Frappe interface
- [ ] Administrator login works
- [ ] Course management accessible

**Cross-Domain Testing:**
- [ ] Login on camino.to → navigate to app.camino.to (should stay logged in)
- [ ] Login on app.camino.to → navigate to camino.to (should stay logged in)

---

**Once setup, Camino will be live at https://camino.to with free SSL!** 🎉

**Need help?** Check container logs:
```bash
docker logs walter-marketing --tail 100
docker logs nginx-proxy-manager --tail 100
docker logs lms-frappe-1 --tail 100
```

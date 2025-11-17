# 🌐 Connect athidhi.food Domain - Complete Guide

## 🎯 Your Setup

**Domain:** athidhi.food (from GoDaddy)
**Website:** Full-stack restaurant with frontend + backend
**Goal:** Connect domain to your live website

---

## 📋 What You Need

### 1. Domain (You Have This!)
- ✅ athidhi.food from GoDaddy

### 2. Hosting Service (Choose One)
You need a hosting service that can run your backend. Best options:

**Recommended: Render.com (Free)**
- ✅ Hosts frontend + backend
- ✅ Free tier available
- ✅ Easy custom domain setup
- ✅ SSL certificate included

**Alternative: Railway.app (Free)**
- ✅ Similar to Render
- ✅ Easy deployment
- ✅ Custom domain support

---

## 🚀 Complete Setup Guide

### Step 1: Deploy Your Website to Render

**1.1 Push Code to GitHub**
```bash
git init
git add .
git commit -m "Athidhi Restaurant Website"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

**1.2 Create Render Account**
- Go to https://render.com
- Sign up (free)
- Connect your GitHub account

**1.3 Deploy Backend**
1. Click "New +" → "Web Service"
2. Select your GitHub repository
3. Configure:
   ```
   Name: athidhi-restaurant-api
   Environment: Node
   Build Command: npm install
   Start Command: npm run server
   ```
4. Click "Create Web Service"
5. Wait for deployment (5-10 minutes)
6. Note your backend URL: `https://athidhi-restaurant-api.onrender.com`

**1.4 Deploy Frontend**
1. Click "New +" → "Static Site"
2. Select same GitHub repository
3. Configure:
   ```
   Name: athidhi-restaurant
   Build Command: npm run build
   Publish Directory: dist
   ```
4. Add environment variable:
   ```
   VITE_API_URL=https://athidhi-restaurant-api.onrender.com
   ```
5. Click "Create Static Site"
6. Wait for deployment
7. Note your frontend URL: `https://athidhi-restaurant.onrender.com`

---

### Step 2: Update Frontend to Use Backend URL

**2.1 Create Environment File**

Create `client/.env.production`:
```env
VITE_API_URL=https://athidhi-restaurant-api.onrender.com
```

**2.2 Update API Calls**

I'll create a config file for you:

Create `client/src/config.ts`:
```typescript
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
```

**2.3 Update All API Calls**

In all your pages, change:
```typescript
// Before
fetch('/api/menu')

// After
import { API_URL } from '../config';
fetch(`${API_URL}/api/menu`)
```

---

### Step 3: Connect Domain to Render

**3.1 In Render Dashboard**
1. Go to your frontend service (athidhi-restaurant)
2. Click "Settings"
3. Scroll to "Custom Domain"
4. Click "Add Custom Domain"
5. Enter: `athidhi.food`
6. Click "Save"

**3.2 Render Will Show DNS Records**

Render will show you something like:
```
Type: A
Name: @
Value: 216.24.57.1

Type: CNAME
Name: www
Value: athidhi-restaurant.onrender.com
```

**Note these down!**

---

### Step 4: Configure DNS in GoDaddy

**4.1 Login to GoDaddy**
- Go to https://godaddy.com
- Login to your account
- Go to "My Products"
- Find "athidhi.food"
- Click "DNS"

**4.2 Add DNS Records**

**For Root Domain (athidhi.food):**
1. Click "Add" button
2. Select "A" record
3. Fill in:
   ```
   Type: A
   Name: @
   Value: [IP from Render]
   TTL: 600 seconds
   ```
4. Click "Save"

**For WWW (www.athidhi.food):**
1. Click "Add" button
2. Select "CNAME" record
3. Fill in:
   ```
   Type: CNAME
   Name: www
   Value: athidhi-restaurant.onrender.com
   TTL: 1 Hour
   ```
4. Click "Save"

**4.3 Remove Default Records (If Any)**
- Delete any existing A or CNAME records for @ and www
- Keep only the new ones you just added

---

### Step 5: Setup API Subdomain (Optional but Recommended)

**For Better Organization:**
- Frontend: `athidhi.food` or `www.athidhi.food`
- Backend API: `api.athidhi.food`

**5.1 In Render (Backend Service)**
1. Go to backend service settings
2. Add custom domain: `api.athidhi.food`
3. Note the DNS records

**5.2 In GoDaddy**
1. Add CNAME record:
   ```
   Type: CNAME
   Name: api
   Value: athidhi-restaurant-api.onrender.com
   TTL: 1 Hour
   ```
2. Save

**5.3 Update Frontend Config**
```env
VITE_API_URL=https://api.athidhi.food
```

---

### Step 6: Wait for DNS Propagation

**DNS changes take time:**
- Minimum: 10-30 minutes
- Maximum: 24-48 hours
- Usually: 1-2 hours

**Check Status:**
- Visit https://dnschecker.org
- Enter: athidhi.food
- See if it points to Render's IP

---

### Step 7: Enable SSL (HTTPS)

**Render Automatically Provides SSL!**

Once DNS is configured:
1. Render detects your domain
2. Automatically gets SSL certificate (free)
3. Your site becomes HTTPS
4. Usually takes 10-30 minutes

**Your URLs will be:**
- ✅ https://athidhi.food (secure)
- ✅ https://www.athidhi.food (secure)
- ✅ https://api.athidhi.food (secure)

---

## 🎯 Final Setup Summary

### Your Domain Structure:

```
athidhi.food                    → Frontend (Customer website)
www.athidhi.food                → Frontend (same as above)
api.athidhi.food                → Backend (API server)
athidhi.food/admin              → Admin portal
```

### What Customers See:
- Visit: `https://athidhi.food`
- See: Restaurant website
- Can: Order food, make reservations, write reviews

### What You See:
- Visit: `https://athidhi.food/admin`
- Login with: admin / admin123
- Manage: Orders, reservations, menu, reviews

---

## 📝 Configuration Files to Update

### 1. Create `client/.env.production`
```env
VITE_API_URL=https://api.athidhi.food
```

### 2. Create `client/src/config.ts`
```typescript
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
```

### 3. Update `vite.config.ts`
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: 'client',
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
```

---

## 🔧 Alternative: All-in-One Deployment

### If You Want Simpler Setup:

**Deploy Both Frontend + Backend Together:**

**Option A: Use Render Web Service (Not Static Site)**
1. Deploy as single web service
2. Serve frontend from backend
3. Only one URL to configure
4. Simpler DNS setup

**Option B: Use Railway**
1. Deploy entire project
2. Railway handles everything
3. Connect domain in Railway dashboard
4. Done!

---

## 📊 Cost Breakdown

### Render.com (Recommended)
- **Free Tier:**
  - ✅ Frontend hosting: Free
  - ✅ Backend hosting: Free (with limitations)
  - ✅ SSL certificate: Free
  - ✅ Custom domain: Free
  - ⚠️ Backend sleeps after 15 min inactivity
  - ⚠️ 750 hours/month free

- **Paid Tier ($7/month):**
  - ✅ Backend always on
  - ✅ No sleep
  - ✅ Better performance

### Railway.app
- **Free Tier:**
  - ✅ $5 free credit/month
  - ✅ Usually enough for small restaurant
  - ✅ No sleep

- **Paid:** Pay as you go

### Your Domain (GoDaddy)
- Already paid ✅
- Renewal: ~$20-40/year

---

## 🎯 Step-by-Step Checklist

### Pre-Deployment:
- [ ] Code pushed to GitHub
- [ ] Environment files created
- [ ] API URL configured

### Render Setup:
- [ ] Account created
- [ ] Backend deployed
- [ ] Frontend deployed
- [ ] Both services running

### Domain Configuration:
- [ ] Custom domain added in Render
- [ ] DNS records noted
- [ ] A record added in GoDaddy
- [ ] CNAME record added in GoDaddy
- [ ] Old records removed

### Verification:
- [ ] DNS propagation complete
- [ ] SSL certificate active
- [ ] Website loads at athidhi.food
- [ ] Admin portal accessible
- [ ] API calls working

### Testing:
- [ ] Customer can view menu
- [ ] Customer can place order
- [ ] Customer can make reservation
- [ ] Customer can write review
- [ ] Admin can login
- [ ] Admin can manage everything

---

## 🆘 Troubleshooting

### Domain Not Working?
**Check:**
1. DNS records correct in GoDaddy
2. Wait 1-2 hours for propagation
3. Clear browser cache
4. Try incognito mode
5. Check https://dnschecker.org

### SSL Not Working?
**Wait:**
- SSL takes 10-30 minutes after DNS
- Render auto-generates certificate
- Check Render dashboard for status

### API Calls Failing?
**Check:**
1. Backend is deployed and running
2. API URL is correct in frontend
3. CORS is enabled in backend
4. Check browser console for errors

### Admin Portal Not Loading?
**Check:**
1. Frontend deployed correctly
2. Routes configured properly
3. Try: https://athidhi.food/admin/login

---

## 📞 Quick Reference

### Your URLs:
```
Main Website:    https://athidhi.food
Admin Portal:    https://athidhi.food/admin
API Endpoint:    https://api.athidhi.food
```

### GoDaddy DNS:
```
A Record:
  Name: @
  Value: [Render IP]

CNAME Record (www):
  Name: www
  Value: athidhi-restaurant.onrender.com

CNAME Record (api):
  Name: api
  Value: athidhi-restaurant-api.onrender.com
```

### Admin Login:
```
URL: https://athidhi.food/admin/login
Username: admin
Password: admin123
```

---

## ✅ Summary

**To connect athidhi.food domain:**

1. **Deploy to Render** (frontend + backend)
2. **Add custom domain** in Render dashboard
3. **Configure DNS** in GoDaddy with records from Render
4. **Wait for DNS** propagation (1-2 hours)
5. **SSL activates** automatically
6. **Your website is live!** 🎉

**Your restaurant website will be accessible at:**
- https://athidhi.food
- https://www.athidhi.food
- https://athidhi.food/admin (for you)

**Everything works: orders, reservations, reviews, admin portal!**

---

Need help with any step? Let me know! 🚀

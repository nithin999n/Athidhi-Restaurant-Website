# 🚂 Railway.app Deployment Guide - Super Easy!

## ✨ Why Railway?
- ✅ Easiest deployment (literally 2 clicks!)
- ✅ No sleep (unlike Render free tier)
- ✅ $5 free credit/month (usually enough)
- ✅ Custom domain support
- ✅ Automatic SSL
- ✅ Auto-deploys from GitHub

---

## 📋 Complete Step-by-Step Guide

### Step 1: Push Code to GitHub (If Not Done)

```bash
git add .
git commit -m "Ready for Railway deployment"
git push origin main
```

**Verify:** Visit https://github.com/nithin999n/Athidhi-Restaurant-Website
- All files should be there ✅

---

### Step 2: Sign Up on Railway (2 minutes)

1. **Go to:** https://railway.app
2. **Click:** "Login" (top right)
3. **Click:** "Login with GitHub"
4. **Authorize Railway** to access your GitHub
5. You'll see Railway Dashboard

---

### Step 3: Deploy Your Project (Literally 2 Clicks!)

#### 3.1 Create New Project

1. Click **"New Project"** button
2. Select **"Deploy from GitHub repo"**
3. You'll see a list of your repositories

#### 3.2 Select Your Repository

1. Find **"Athidhi-Restaurant-Website"**
2. Click on it
3. Railway will automatically:
   - ✅ Detect it's a Node.js project
   - ✅ Install dependencies
   - ✅ Build your project
   - ✅ Start the server

**That's it!** Railway does everything automatically! 🎉

#### 3.3 Wait for Deployment (5-10 minutes)

You'll see:
- "Building..." → "Deploying..." → "Active" ✅

---

### Step 4: Configure Environment Variables (1 minute)

1. Click on your service (the card that says "athidhi-restaurant-website")
2. Go to **"Variables"** tab
3. Click **"New Variable"**
4. Add:
   ```
   Variable: NODE_ENV
   Value: production
   ```
5. Click **"Add"**

Railway will automatically redeploy with the new variable.

---

### Step 5: Get Your URL (30 seconds)

1. Go to **"Settings"** tab
2. Scroll to **"Domains"** section
3. Click **"Generate Domain"**
4. Railway will give you a URL like:
   ```
   https://athidhi-restaurant-website-production.up.railway.app
   ```

**Copy this URL!**

---

### Step 6: Test Your Website (5 minutes)

#### 6.1 Test Homepage

Visit: `https://your-railway-url.up.railway.app`

**You should see:**
- ✅ Restaurant homepage
- ✅ Navigation menu
- ✅ Restaurant information

#### 6.2 Test Admin Portal

Visit: `https://your-railway-url.up.railway.app/admin/login`

**You should see:**
- ✅ Admin login page

**Login with:**
- Username: `admin`
- Password: `admin123`

**After login:**
- ✅ Admin dashboard
- ✅ All admin features working

#### 6.3 Test All Features

**Customer Side:**
- ✅ Menu page
- ✅ Order online
- ✅ Make reservation
- ✅ Write review

**Admin Side:**
- ✅ Add menu item
- ✅ Configure table
- ✅ View orders
- ✅ Manage reservations
- ✅ Approve reviews

**If everything works:** ✅ Continue to Step 7

---

### Step 7: Connect Your Domain (athidhi.food) (30 minutes)

#### 7.1 Add Custom Domain in Railway

1. In your Railway project, go to **"Settings"** tab
2. Scroll to **"Domains"** section
3. Click **"Custom Domain"**
4. Enter: `athidhi.food`
5. Click **"Add Domain"**

#### 7.2 Add WWW Subdomain

1. Click **"Custom Domain"** again
2. Enter: `www.athidhi.food`
3. Click **"Add Domain"**

#### 7.3 Note the DNS Records

Railway will show you:

**For athidhi.food:**
```
Type: CNAME
Name: @
Value: your-project.up.railway.app
```

**For www.athidhi.food:**
```
Type: CNAME
Name: www
Value: your-project.up.railway.app
```

**Write these down!**

---

### Step 8: Configure DNS in GoDaddy (15 minutes)

#### 8.1 Login to GoDaddy

1. Go to: https://godaddy.com
2. Login
3. Go to **"My Products"**
4. Find **"athidhi.food"**
5. Click **"DNS"**

#### 8.2 Delete Old Records

Delete these if they exist:
- A record with Name "@"
- CNAME record with Name "www"

**Keep:**
- MX records (email)
- TXT records
- NS records

#### 8.3 Add CNAME for Root Domain

**Note:** GoDaddy doesn't support CNAME for root (@), so we'll use ALIAS or A record.

**Option A: If GoDaddy supports ALIAS (recommended):**
```
Type: ALIAS
Name: @
Value: your-project.up.railway.app
TTL: 600 seconds
```

**Option B: Use A record (if no ALIAS):**

First, get Railway's IP:
1. Open terminal
2. Run: `nslookup your-project.up.railway.app`
3. Note the IP address

Then in GoDaddy:
```
Type: A
Name: @
Value: [IP from nslookup]
TTL: 600 seconds
```

#### 8.4 Add CNAME for WWW

```
Type: CNAME
Name: www
Value: your-project.up.railway.app
TTL: 1 Hour
```

Click **"Save"**

---

### Step 9: Wait for DNS Propagation (1-2 hours)

#### 9.1 DNS Takes Time

- **Minimum:** 30 minutes
- **Usually:** 1-2 hours
- **Maximum:** 24 hours

#### 9.2 Check DNS Status

Visit: https://dnschecker.org
- Enter: `athidhi.food`
- Check if it points to Railway

#### 9.3 While Waiting

- ✅ Add your menu items
- ✅ Configure tables
- ✅ Test all features
- ✅ Update restaurant info

---

### Step 10: SSL Certificate (Automatic) (10 minutes)

Railway automatically generates SSL certificates!

Once DNS is configured:
- Railway detects your domain
- Generates SSL certificate
- Your site becomes HTTPS
- Usually takes 10-30 minutes

**Check SSL Status:**
- In Railway Settings → Domains
- You'll see "SSL Active" ✅

---

### Step 11: Test Your Live Website (10 minutes)

#### 11.1 Test All URLs

**Main Domain:**
```
https://athidhi.food
```
✅ Should show homepage

**WWW:**
```
https://www.athidhi.food
```
✅ Should show homepage

**Admin:**
```
https://athidhi.food/admin/login
```
✅ Should show admin login

#### 11.2 Test Everything

**Customer Features:**
- ✅ Browse menu
- ✅ Place order
- ✅ Make reservation
- ✅ Write review

**Admin Features:**
- ✅ Login
- ✅ Manage orders
- ✅ Manage reservations
- ✅ Add menu items
- ✅ Approve reviews

---

## ✅ Deployment Complete!

### Your Live URLs:

```
Main Website:     https://athidhi.food
WWW:              https://www.athidhi.food
Admin Portal:     https://athidhi.food/admin
Railway URL:      https://your-project.up.railway.app
```

---

## 💰 Railway Pricing

### Free Tier:
- **$5 credit/month** (free)
- Usually enough for:
  - Small to medium restaurant
  - ~100-500 visitors/day
  - Normal usage

### If Credit Runs Out:
- Add payment method
- Pay only for what you use
- Usually $5-10/month for small restaurant

### Monitor Usage:
- Railway Dashboard → Usage tab
- See how much credit you've used
- Get alerts when low

---

## 🎯 Railway vs Render Comparison

| Feature | Railway | Render |
|---------|---------|--------|
| **Setup** | ✅ 2 clicks | ⚠️ More config |
| **Free Tier** | ✅ $5 credit | ✅ Free |
| **Sleep** | ✅ No sleep | ❌ Sleeps after 15min |
| **Speed** | ✅ Fast | ✅ Fast |
| **Custom Domain** | ✅ Easy | ✅ Easy |
| **SSL** | ✅ Auto | ✅ Auto |
| **Best For** | Small-medium | Any size |

**Railway is better for your restaurant!** ✅

---

## 🔧 Railway Features

### Auto-Deploy from GitHub

Every time you push to GitHub:
- Railway automatically detects changes
- Rebuilds your project
- Deploys new version
- Takes 2-5 minutes

**To update your website:**
```bash
# Make changes to your code
git add .
git commit -m "Update menu items"
git push origin main

# Railway auto-deploys! ✅
```

### Environment Variables

Add any environment variables:
1. Go to Variables tab
2. Click "New Variable"
3. Add key and value
4. Railway redeploys automatically

### Logs

View real-time logs:
1. Click on your service
2. Go to "Deployments" tab
3. Click on latest deployment
4. See build and runtime logs

### Metrics

Monitor your app:
1. Go to "Metrics" tab
2. See:
   - CPU usage
   - Memory usage
   - Network traffic
   - Request count

---

## 🆘 Troubleshooting

### If Deployment Fails:

1. **Check Logs:**
   - Deployments tab → Click deployment → View logs
   - Look for error messages

2. **Common Issues:**
   - Missing dependencies: Run `npm install` locally first
   - Build errors: Check `package.json` scripts
   - Port issues: Railway auto-assigns port

3. **Fix and Redeploy:**
   - Fix the issue in your code
   - Push to GitHub
   - Railway auto-redeploys

### If Domain Doesn't Work:

1. **Wait longer** (DNS can take 24 hours)
2. **Check DNS records** in GoDaddy
3. **Verify in Railway** Settings → Domains
4. **Clear browser cache**

### If Admin Page Shows "Not Found":

1. **Check build logs** for errors
2. **Verify `_redirects` file** exists
3. **Redeploy:** Settings → Redeploy

### If Running Out of Credit:

1. **Check usage:** Usage tab
2. **Optimize:**
   - Reduce unnecessary API calls
   - Cache static assets
   - Optimize images
3. **Add payment method** if needed

---

## 📊 What You Get

### With Railway Free Tier ($5 credit):

**Included:**
- ✅ Full-stack hosting
- ✅ Custom domain (athidhi.food)
- ✅ SSL certificate (HTTPS)
- ✅ Auto-deploy from GitHub
- ✅ No sleep (always on!)
- ✅ Metrics and logs
- ✅ Environment variables
- ✅ Persistent storage

**Limits:**
- $5 credit/month
- Usually enough for small restaurant
- Can add payment method if needed

---

## 🎉 Success Checklist

- [ ] Code pushed to GitHub
- [ ] Railway account created
- [ ] Project deployed on Railway
- [ ] Environment variables added
- [ ] Railway URL works
- [ ] Admin portal accessible
- [ ] Custom domain added in Railway
- [ ] DNS configured in GoDaddy
- [ ] DNS propagated
- [ ] SSL certificate active
- [ ] athidhi.food works
- [ ] www.athidhi.food works
- [ ] All features tested
- [ ] Menu items added
- [ ] Tables configured
- [ ] Admin password changed

---

## 🚀 Quick Commands

### Deploy to Railway:
```bash
# Just push to GitHub!
git add .
git commit -m "Update"
git push origin main

# Railway auto-deploys ✅
```

### Check Deployment:
- Visit Railway Dashboard
- Click on your project
- See deployment status

### View Logs:
- Railway Dashboard
- Deployments tab
- Click latest deployment

### Monitor Usage:
- Railway Dashboard
- Usage tab
- See credit remaining

---

## 💡 Pro Tips

### 1. Monitor Your Credit

Check usage weekly:
- Railway Dashboard → Usage
- See how much credit used
- Plan accordingly

### 2. Optimize for Free Tier

- Use efficient code
- Cache when possible
- Optimize images
- Reduce unnecessary requests

### 3. Backup Your Data

Regular backups:
- Admin Portal → Data → Create Backup
- Download backup files
- Store safely

### 4. Update Regularly

Keep your site updated:
- Add new menu items
- Update prices
- Respond to reviews
- Monitor orders

---

## 📞 Support

**Railway Documentation:**
- https://docs.railway.app

**Railway Discord:**
- https://discord.gg/railway

**Your Project:**
- GitHub: https://github.com/nithin999n/Athidhi-Restaurant-Website
- Railway: Check your dashboard

---

## ✨ Summary

**Railway.app is perfect for your restaurant website!**

**Why:**
- ✅ Super easy (2 clicks to deploy)
- ✅ No sleep (always fast)
- ✅ Free tier ($5 credit)
- ✅ Custom domain support
- ✅ Automatic SSL
- ✅ Auto-deploy from GitHub

**Your website will be live at athidhi.food in less than 1 hour!**

**Start now:** Go to https://railway.app and follow Step 2! 🚀

---

**Good luck with your restaurant!** 🍽️

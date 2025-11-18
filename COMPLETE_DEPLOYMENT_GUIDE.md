# 🚀 Complete Deployment Guide - From Scratch

## ✅ Fresh Start - Deploy to Render & Connect athidhi.food

Follow these steps **one by one** in order.

---

## 📋 Step 1: Make Sure Code is on GitHub (5 minutes)

### 1.1 Check if code is already pushed

Open terminal in your project folder and run:
```bash
git remote -v
```

**If you see the GitHub URL:** ✅ Skip to Step 2

**If you see nothing or error:** Continue below

### 1.2 Push code to GitHub

```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Athidhi Restaurant - Complete website ready for deployment"

# Add remote
git remote add origin https://github.com/nithin999n/Athidhi-Restaurant-Website.git

# Set branch
git branch -M main

# Push
git push -u origin main
```

**Verify:** Visit https://github.com/nithin999n/Athidhi-Restaurant-Website
- You should see all your files ✅

---

## 📋 Step 2: Create Render Account (2 minutes)

### 2.1 Sign up on Render

1. Go to: https://render.com
2. Click "Get Started for Free"
3. Sign up with GitHub (recommended)
4. Authorize Render to access your GitHub
5. You'll see the Render Dashboard

---

## 📋 Step 3: Deploy Your Website (10 minutes)

### 3.1 Create New Web Service

1. In Render Dashboard, click **"New +"** button (top right)
2. Select **"Web Service"**
3. You'll see "Create a new Web Service" page

### 3.2 Connect Your Repository

1. Find "Athidhi-Restaurant-Website" in the list
2. Click **"Connect"** button next to it
3. If you don't see it, click "Configure account" and give Render access

### 3.3 Configure the Service

Fill in these **exact** values:

**Name:**
```
athidhi-restaurant
```

**Region:**
```
Oregon (US West)
```
(or choose closest to you)

**Branch:**
```
main
```

**Root Directory:**
```
(leave empty)
```

**Environment:**
```
Node
```

**Build Command:**
```
npm install && npm run build
```

**Start Command:**
```
npm run server
```

### 3.4 Select Plan

- Choose **"Free"** plan
- Click **"Create Web Service"**

### 3.5 Add Environment Variable

1. After service is created, go to **"Environment"** tab (left sidebar)
2. Click **"Add Environment Variable"**
3. Add this:
   ```
   Key: NODE_ENV
   Value: production
   ```
4. Click **"Save Changes"**

### 3.6 Wait for Deployment

- You'll see build logs
- Wait 5-10 minutes
- Status will change from "Building" → "Live" ✅

### 3.7 Get Your URL

Once deployed, you'll see:
```
Your service is live at https://athidhi-restaurant.onrender.com
```

**Copy this URL!** You'll need it.

---

## 📋 Step 4: Test Your Website (5 minutes)

### 4.1 Test Main Website

Visit: `https://athidhi-restaurant.onrender.com`

**You should see:**
- ✅ Restaurant homepage
- ✅ Navigation menu (Home, Menu, Order Online, Reserve Table, Reviews)
- ✅ Restaurant information

### 4.2 Test Admin Portal

Visit: `https://athidhi-restaurant.onrender.com/admin/login`

**You should see:**
- ✅ Admin login page
- ✅ Username and password fields

**Login with:**
- Username: `admin`
- Password: `admin123`

**After login, you should see:**
- ✅ Admin dashboard
- ✅ Statistics (0 orders, 0 reservations, etc.)
- ✅ Navigation (Dashboard, Orders, Reservations, Menu, Tables, Reviews, Data)

### 4.3 Test Admin Features

Click through each section:
- ✅ **Menu** - Add a test menu item
- ✅ **Tables** - Add a test table
- ✅ **Orders** - Should be empty (no orders yet)
- ✅ **Reservations** - Should be empty
- ✅ **Reviews** - Should be empty
- ✅ **Data** - Shows data storage info

### 4.4 Test Customer Features

Go back to main site: `https://athidhi-restaurant.onrender.com`

- ✅ **Menu** - Should show the item you added
- ✅ **Order Online** - Try adding item to cart
- ✅ **Reserve Table** - Try making a reservation
- ✅ **Reviews** - Try writing a review

**If everything works:** ✅ Continue to Step 5

**If something doesn't work:** 
- Check Render logs (Logs tab in dashboard)
- Make sure build completed successfully
- Try "Manual Deploy" → "Clear build cache & deploy"

---

## 📋 Step 5: Connect Your Domain (athidhi.food) (30 minutes)

### 5.1 Add Custom Domain in Render

1. In your Render service, go to **"Settings"** tab
2. Scroll down to **"Custom Domain"** section
3. Click **"Add Custom Domain"**
4. Enter: `athidhi.food`
5. Click **"Save"**

### 5.2 Add WWW Subdomain

1. Click **"Add Custom Domain"** again
2. Enter: `www.athidhi.food`
3. Click **"Save"**

### 5.3 Note the DNS Records

Render will show you DNS records like:

**For athidhi.food:**
```
Type: A
Name: @
Value: 216.24.57.1
```

**For www.athidhi.food:**
```
Type: CNAME
Name: www
Value: athidhi-restaurant.onrender.com
```

**Write these down!** You'll need them for GoDaddy.

---

## 📋 Step 6: Configure DNS in GoDaddy (15 minutes)

### 6.1 Login to GoDaddy

1. Go to: https://godaddy.com
2. Login to your account
3. Click **"My Products"**
4. Find **"athidhi.food"**
5. Click **"DNS"** button

### 6.2 Delete Old Records

**Important:** Delete these if they exist:
- Any A record with Name "@"
- Any CNAME record with Name "www"

**Keep these:**
- MX records (email)
- TXT records (verification)
- NS records (nameservers)

### 6.3 Add New A Record (Root Domain)

1. Click **"Add"** button
2. Select **"A"** from dropdown
3. Fill in:
   ```
   Type: A
   Name: @
   Value: [IP from Render - e.g., 216.24.57.1]
   TTL: 600 seconds
   ```
4. Click **"Save"**

### 6.4 Add New CNAME Record (WWW)

1. Click **"Add"** button
2. Select **"CNAME"** from dropdown
3. Fill in:
   ```
   Type: CNAME
   Name: www
   Value: athidhi-restaurant.onrender.com
   TTL: 1 Hour
   ```
4. Click **"Save"**

### 6.5 Verify DNS Records

Your DNS should now have:
- ✅ A record: @ → [Render IP]
- ✅ CNAME record: www → athidhi-restaurant.onrender.com

---

## 📋 Step 7: Wait for DNS Propagation (1-2 hours)

### 7.1 DNS Takes Time

DNS changes take time to propagate worldwide:
- **Minimum:** 30 minutes
- **Usually:** 1-2 hours
- **Maximum:** 24-48 hours

### 7.2 Check DNS Status

Visit: https://dnschecker.org
- Enter: `athidhi.food`
- Click "Search"
- Wait until most locations show the correct IP

### 7.3 What to Do While Waiting

- ✅ Add your menu items in admin portal
- ✅ Configure your tables
- ✅ Update restaurant information
- ✅ Test all features
- ✅ Create a backup of your data

---

## 📋 Step 8: SSL Certificate (Automatic) (30 minutes)

### 8.1 Render Auto-Generates SSL

Once DNS is configured:
- Render detects your domain
- Automatically requests SSL certificate
- Usually takes 10-30 minutes
- You don't need to do anything!

### 8.2 Check SSL Status

In Render dashboard:
1. Go to your service
2. Click "Settings"
3. Scroll to "Custom Domain"
4. You'll see SSL status for each domain

**When ready:**
- ✅ Status: "SSL Certificate Active"
- ✅ Your site becomes HTTPS

---

## 📋 Step 9: Test Your Live Website (10 minutes)

### 9.1 Test All URLs

Once DNS and SSL are ready, test:

**Main Domain:**
```
https://athidhi.food
```
Should show: ✅ Restaurant homepage

**WWW:**
```
https://www.athidhi.food
```
Should show: ✅ Same homepage

**Admin Portal:**
```
https://athidhi.food/admin/login
```
Should show: ✅ Admin login page

**Menu:**
```
https://athidhi.food/menu
```
Should show: ✅ Your menu items

**Reviews:**
```
https://athidhi.food/reviews
```
Should show: ✅ Reviews page

### 9.2 Test Customer Features

1. ✅ Browse menu
2. ✅ Place a test order
3. ✅ Make a test reservation
4. ✅ Write a test review

### 9.3 Test Admin Features

1. ✅ Login to admin
2. ✅ See test order in Orders
3. ✅ See test reservation in Reservations
4. ✅ See test review in Reviews (pending)
5. ✅ Approve the review
6. ✅ Update order status
7. ✅ Create a data backup

---

## 📋 Step 10: Final Setup (15 minutes)

### 10.1 Change Admin Password

**Important for security!**

1. Open `server/index.ts` in your code
2. Find this line:
   ```typescript
   const ADMIN_USER = { username: 'admin', password: 'admin123' };
   ```
3. Change to:
   ```typescript
   const ADMIN_USER = { username: 'admin', password: 'YOUR_STRONG_PASSWORD' };
   ```
4. Save file
5. Push to GitHub:
   ```bash
   git add server/index.ts
   git commit -m "Change admin password"
   git push origin main
   ```
6. Render will auto-deploy (5 minutes)

### 10.2 Update Restaurant Information

Edit `client/src/pages/HomePage.tsx`:
- Restaurant address
- Phone number
- Email
- Opening hours

Push changes to GitHub.

### 10.3 Add Your Menu

1. Login to admin portal
2. Go to Menu section
3. Add all your dishes with:
   - Names
   - Descriptions
   - Prices
   - Categories
   - Images (optional)

### 10.4 Configure Tables

1. Go to Tables section
2. Add all your tables with:
   - Table numbers
   - Capacity
   - Location

### 10.5 Create Initial Backup

1. Go to Data section
2. Click "Create Backup"
3. Backup file is saved

---

## ✅ Deployment Complete!

### Your Live URLs:

```
Main Website:     https://athidhi.food
WWW:              https://www.athidhi.food
Admin Portal:     https://athidhi.food/admin
Admin Login:      https://athidhi.food/admin/login
```

### What Works:

**Customer Side:**
- ✅ View menu
- ✅ Order food online (COD)
- ✅ Make table reservations
- ✅ Write reviews with ratings
- ✅ See overall ratings

**Admin Side:**
- ✅ Manage orders
- ✅ Manage reservations
- ✅ Add/edit menu items
- ✅ Configure tables
- ✅ Approve reviews
- ✅ Backup data
- ✅ View statistics

**Technical:**
- ✅ Custom domain (athidhi.food)
- ✅ SSL/HTTPS secure
- ✅ Data persists (file storage)
- ✅ Auto-saves everything
- ✅ Mobile responsive

---

## 🎯 Quick Reference

### Render Service:
- **Name:** athidhi-restaurant
- **URL:** https://athidhi-restaurant.onrender.com
- **Type:** Web Service (Node)
- **Plan:** Free

### Domain:
- **Domain:** athidhi.food (GoDaddy)
- **DNS:** Configured to point to Render
- **SSL:** Auto-generated by Render

### Admin Access:
- **URL:** https://athidhi.food/admin/login
- **Username:** admin
- **Password:** [Your password]

### GitHub:
- **Repo:** https://github.com/nithin999n/Athidhi-Restaurant-Website
- **Branch:** main
- **Auto-deploy:** Enabled (pushes trigger redeploy)

---

## 🆘 Troubleshooting

### If Website Doesn't Load:
1. Check Render service status (should be "Live")
2. Check build logs for errors
3. Try "Manual Deploy" → "Clear build cache & deploy"

### If Domain Doesn't Work:
1. Wait longer (DNS can take 24 hours)
2. Check DNS records in GoDaddy
3. Use https://dnschecker.org to verify
4. Clear browser cache

### If Admin Page Shows "Not Found":
1. Check that build completed successfully
2. Verify `_redirects` file exists in `client/public/`
3. Redeploy service

### If Data Doesn't Save:
1. Check Render logs for errors
2. Verify `data` folder has write permissions
3. Check Data Management page in admin

---

## 💰 Cost Summary

**Monthly Costs:**
- Domain (athidhi.food): ~$2-3/month (already paid annually)
- Hosting (Render Free): $0/month
- SSL Certificate: $0 (included)
- **Total: FREE!** 🎉

**Optional Upgrade:**
- Render Paid ($7/month): No sleep, better performance

---

## 📞 Support

**If you need help:**
1. Check Render logs (Logs tab)
2. Check browser console (F12)
3. Review this guide again
4. Check TROUBLESHOOTING.md

---

## 🎉 Congratulations!

Your restaurant website is now live at **athidhi.food**!

**Next Steps:**
1. Share with customers
2. Start taking orders
3. Manage reservations
4. Collect reviews
5. Grow your business!

**Good luck with your restaurant!** 🍽️

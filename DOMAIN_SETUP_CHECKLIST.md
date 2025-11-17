# ✅ athidhi.food Domain Setup - Quick Checklist

## 🎯 Goal
Connect your GoDaddy domain `athidhi.food` to your restaurant website

---

## 📋 Step-by-Step Checklist

### Phase 1: Prepare Code (5 minutes)

- [ ] **1. Update production API URL**
  - Open `client/.env.production`
  - Change to: `VITE_API_URL=https://api.athidhi.food`
  - Save file

- [ ] **2. Push code to GitHub**
  ```bash
  git init
  git add .
  git commit -m "Athidhi Restaurant - Ready for deployment"
  git remote add origin YOUR_GITHUB_REPO_URL
  git push -u origin main
  ```

---

### Phase 2: Deploy Backend (10 minutes)

- [ ] **3. Create Render account**
  - Go to https://render.com
  - Sign up (free)
  - Connect GitHub

- [ ] **4. Deploy backend API**
  - Click "New +" → "Web Service"
  - Select your repository
  - Name: `athidhi-restaurant-api`
  - Build: `npm install`
  - Start: `npm run server`
  - Click "Create Web Service"
  - Wait for deployment ⏳

- [ ] **5. Note backend URL**
  - Copy URL: `https://athidhi-restaurant-api.onrender.com`
  - Save it somewhere

---

### Phase 3: Deploy Frontend (10 minutes)

- [ ] **6. Deploy frontend**
  - Click "New +" → "Static Site"
  - Select same repository
  - Name: `athidhi-restaurant`
  - Build: `npm run build`
  - Publish: `dist`
  - Click "Create Static Site"
  - Wait for deployment ⏳

- [ ] **7. Note frontend URL**
  - Copy URL: `https://athidhi-restaurant.onrender.com`
  - Test it - website should load!

---

### Phase 4: Connect Domain - Backend (15 minutes)

- [ ] **8. Add custom domain to backend**
  - Go to backend service in Render
  - Click "Settings"
  - Scroll to "Custom Domain"
  - Add: `api.athidhi.food`
  - Click "Save"

- [ ] **9. Note DNS records for API**
  - Render shows: `CNAME: api → athidhi-restaurant-api.onrender.com`
  - Write this down! 📝

---

### Phase 5: Connect Domain - Frontend (15 minutes)

- [ ] **10. Add custom domain to frontend**
  - Go to frontend service in Render
  - Click "Settings"
  - Scroll to "Custom Domain"
  - Add: `athidhi.food`
  - Click "Save"

- [ ] **11. Add www subdomain**
  - Click "Add Custom Domain" again
  - Add: `www.athidhi.food`
  - Click "Save"

- [ ] **12. Note DNS records**
  - Render shows something like:
    ```
    A Record: @ → 216.24.57.1
    CNAME: www → athidhi-restaurant.onrender.com
    ```
  - Write these down! 📝

---

### Phase 6: Configure GoDaddy DNS (10 minutes)

- [ ] **13. Login to GoDaddy**
  - Go to https://godaddy.com
  - Login
  - Go to "My Products"
  - Find "athidhi.food"
  - Click "DNS"

- [ ] **14. Delete old records**
  - Delete existing A record for @
  - Delete existing CNAME for www
  - (Keep MX records if any)

- [ ] **15. Add new A record (root domain)**
  ```
  Type: A
  Name: @
  Value: [IP from Render - step 12]
  TTL: 600 seconds
  ```
  - Click "Save"

- [ ] **16. Add CNAME for www**
  ```
  Type: CNAME
  Name: www
  Value: athidhi-restaurant.onrender.com
  TTL: 1 Hour
  ```
  - Click "Save"

- [ ] **17. Add CNAME for api**
  ```
  Type: CNAME
  Name: api
  Value: athidhi-restaurant-api.onrender.com
  TTL: 1 Hour
  ```
  - Click "Save"

---

### Phase 7: Wait & Verify (1-2 hours)

- [ ] **18. Wait for DNS propagation**
  - Minimum: 30 minutes
  - Usually: 1-2 hours
  - Maximum: 24 hours

- [ ] **19. Check DNS status**
  - Go to https://dnschecker.org
  - Enter: `athidhi.food`
  - Should show Render's IP
  - Check multiple locations

- [ ] **20. Wait for SSL**
  - Render auto-generates SSL certificate
  - Takes 10-30 minutes after DNS
  - Check Render dashboard for status

---

### Phase 8: Test Everything (10 minutes)

- [ ] **21. Test main website**
  - Visit: `https://athidhi.food`
  - Should load your restaurant website ✅

- [ ] **22. Test www**
  - Visit: `https://www.athidhi.food`
  - Should redirect to main site ✅

- [ ] **23. Test customer features**
  - [ ] View menu
  - [ ] Place test order
  - [ ] Make test reservation
  - [ ] Write test review

- [ ] **24. Test admin portal**
  - Visit: `https://athidhi.food/admin/login`
  - Login: admin / admin123
  - Should see admin dashboard ✅

- [ ] **25. Test admin features**
  - [ ] View orders
  - [ ] View reservations
  - [ ] Add menu item
  - [ ] Manage reviews
  - [ ] Check data management

- [ ] **26. Test API**
  - Visit: `https://api.athidhi.food/api/menu`
  - Should show JSON data ✅

---

## 🎉 Success Checklist

### Your website is live when:

- ✅ `https://athidhi.food` loads
- ✅ `https://www.athidhi.food` works
- ✅ SSL certificate active (🔒 in browser)
- ✅ Customer can order food
- ✅ Customer can make reservations
- ✅ Customer can write reviews
- ✅ Admin portal accessible
- ✅ Admin can manage everything
- ✅ Data persists (saved to file)

---

## 📊 Your Final URLs

```
Main Website:     https://athidhi.food
WWW:              https://www.athidhi.food
Admin Portal:     https://athidhi.food/admin
Admin Login:      https://athidhi.food/admin/login
API Endpoint:     https://api.athidhi.food
```

---

## 🆘 Troubleshooting

### If domain doesn't work:
1. ⏰ Wait longer (DNS can take 24 hours)
2. 🔍 Check DNS records in GoDaddy
3. 🧹 Clear browser cache
4. 🕵️ Try incognito mode
5. 📊 Check https://dnschecker.org

### If SSL doesn't work:
1. ⏰ Wait 30 minutes after DNS
2. 🔄 Check Render dashboard
3. 🔒 Render auto-generates SSL

### If API calls fail:
1. ✅ Check backend is running
2. 🔗 Verify API URL in `.env.production`
3. 🌐 Check CORS settings
4. 🔍 Check browser console

---

## 💰 Cost Summary

**Total Monthly Cost:**
- Domain (GoDaddy): Already paid ✅
- Hosting (Render Free): $0/month
- SSL Certificate: $0 (included)

**Total: FREE!** 🎉

**Optional Upgrade:**
- Render Paid ($7/month): Backend always on, no sleep

---

## 📞 Quick Commands

### Check DNS:
```bash
nslookup athidhi.food
```

### Test API:
```bash
curl https://api.athidhi.food/api/menu
```

### View SSL:
```bash
# In browser, click the lock icon 🔒
```

---

## ✅ Final Check

Before going live, verify:

- [ ] All menu items added
- [ ] Tables configured
- [ ] Admin password changed (security!)
- [ ] Restaurant info updated (homepage)
- [ ] Contact details correct
- [ ] Test orders work
- [ ] Test reservations work
- [ ] Reviews system works
- [ ] Data is saving
- [ ] Backups created

---

## 🎯 Time Estimate

**Total Time: ~1-3 hours**

- Code prep: 5 min
- Deploy backend: 10 min
- Deploy frontend: 10 min
- Domain setup: 30 min
- DNS wait: 1-2 hours ⏰
- Testing: 10 min

**Most time is waiting for DNS!**

---

## 🚀 You're Ready!

Follow this checklist step by step, and your restaurant website will be live at **athidhi.food**!

**Good luck!** 🎉

---

**Need help? Check:**
- GODADDY_DOMAIN_SETUP.md (detailed guide)
- DEPLOYMENT_GUIDE.md (deployment options)
- TROUBLESHOOTING.md (common issues)

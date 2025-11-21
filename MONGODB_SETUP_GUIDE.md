# 🗄️ MongoDB & Cloudinary Setup Guide

## ✅ Backend is Ready!
Your server is already configured with:
- ✅ MongoDB database
- ✅ JWT authentication
- ✅ Cloudinary image uploads
- ✅ Protected admin routes

## 🔧 What You Need to Do

### Step 1: Create MongoDB Atlas Account (FREE)

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up for free account
3. Create a **FREE M0 Cluster** (512MB storage)
4. Choose AWS as provider
5. Choose region closest to you (e.g., Mumbai for India)
6. Click "Create Cluster" (takes 3-5 minutes)

### Step 2: Get MongoDB Connection String

1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string (looks like):
   ```
   mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
4. Replace `<password>` with your actual password
5. Add database name at the end:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/athidhi_restaurant?retryWrites=true&w=majority
   ```

### Step 3: Create Cloudinary Account (FREE)

1. Go to https://cloudinary.com/users/register/free
2. Sign up for free account (25GB storage, 25GB bandwidth/month)
3. Go to Dashboard
4. Copy these 3 values:
   - Cloud Name
   - API Key
   - API Secret

### Step 4: Add Environment Variables to Render

1. Go to your Render dashboard
2. Click on your web service
3. Go to "Environment" tab
4. Add these variables:

```
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/athidhi_restaurant?retryWrites=true&w=majority

CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here

JWT_SECRET=your_random_secret_key_here_make_it_long_and_random

NODE_ENV=production
```

5. Click "Save Changes"
6. Render will automatically redeploy

### Step 5: Test Everything

After deployment:

1. **Test Data Persistence:**
   - Add a menu item
   - Restart your Render service
   - Check if the item is still there ✅

2. **Test Admin Login:**
   - Go to `/admin/login`
   - Username: `admin`
   - Password: `admin123`
   - Should log you in ✅

3. **Test Image Upload:**
   - Try adding a menu item with image
   - Image should upload to Cloudinary ✅

## 🔐 Security Features

Your admin portal now has:
- ✅ JWT token authentication
- ✅ Protected routes (can't access without login)
- ✅ Token expires after 24 hours
- ✅ Hashed passwords (bcrypt)

## 📊 New Features Available

1. **Analytics Dashboard** - `/api/admin/stats`
   - Filter by date range
   - Total orders, revenue, reviews
   - Average rating

2. **Image Uploads** - `/api/upload`
   - Upload from device (not URL)
   - Stored on Cloudinary
   - Automatic optimization

3. **Secure Admin** - All admin routes protected
   - Must be logged in
   - Token-based authentication

## 🚨 Important Notes

1. **Change Default Password!**
   - After first login, change admin password
   - Default is `admin123` (not secure!)

2. **Keep Secrets Safe**
   - Never commit `.env` file to Git
   - JWT_SECRET should be random and long

3. **MongoDB Free Tier Limits**
   - 512MB storage
   - Shared CPU
   - Good for 1000s of orders/reviews

4. **Cloudinary Free Tier Limits**
   - 25GB storage
   - 25GB bandwidth/month
   - 25,000 transformations/month

## ✅ Checklist

- [ ] MongoDB Atlas account created
- [ ] Cluster created and running
- [ ] Connection string copied
- [ ] Cloudinary account created
- [ ] Cloud name, API key, API secret copied
- [ ] All environment variables added to Render
- [ ] Service redeployed
- [ ] Admin login tested
- [ ] Data persistence tested
- [ ] Image upload tested

## 🎉 Once Complete

Your restaurant website will have:
- ✅ Permanent data storage (never loses data)
- ✅ Secure admin access (only you can access)
- ✅ Image uploads from device (no more URLs)
- ✅ Professional cloud infrastructure
- ✅ Scalable for growth

---

**Need Help?** Check the error logs in Render dashboard if something doesn't work.

# 🖼️ Image Upload Fix

## ✅ What I Fixed:

1. **Added authentication token** to image upload requests
2. **Fixed field names** to match backend (snake_case)
3. **Added better error logging** to see what's failing

---

## 🔧 Why It Was Failing:

**Problem 1:** Upload endpoint requires authentication
- The `/api/upload` endpoint needs a Bearer token
- Frontend wasn't sending it
- **Fixed:** Now sends `Authorization: Bearer ${token}`

**Problem 2:** Field names mismatch
- Backend expects `image_url` (snake_case)
- Frontend was sending `imageUrl` (camelCase)
- **Fixed:** Now sends correct field names

---

## ✅ What Should Work Now:

After the deployment finishes (3-5 minutes):

### Admin Menu - Add Item with Image:
1. Login to admin portal
2. Click "Add New Item"
3. Fill in details
4. Click "Choose File" to upload image
5. See preview
6. Click "Save"
7. Should work! ✅

### User Reviews - Add Review with Image:
1. Go to Reviews page
2. Click "Write a Review"
3. Fill in name, rating, review text
4. Click "Choose File" to upload image
5. See preview
6. Click "Submit"
7. Should work! ✅

---

## 🆘 If Still Not Working:

### Check 1: Are Cloudinary credentials set?
Go to Render → Environment and verify:
- `CLOUDINARY_CLOUD_NAME` is set
- `CLOUDINARY_API_KEY` is set
- `CLOUDINARY_API_SECRET` is set

### Check 2: Is admin logged in?
- Make sure you're logged in to admin portal
- Token is stored in localStorage
- Try logging out and back in

### Check 3: Check browser console
- Open browser DevTools (F12)
- Go to Console tab
- Try uploading image
- Look for error messages
- Send me the error if you see one

### Check 4: Check Render logs
- Go to Render dashboard
- Click on your service
- Click "Logs"
- Try uploading image
- Look for errors in logs

---

## 🎯 Common Errors & Solutions:

**Error: "Image upload failed"**
- **Cause:** Cloudinary credentials not set or wrong
- **Fix:** Double-check credentials in Render environment

**Error: "Access denied"**
- **Cause:** Not logged in or token expired
- **Fix:** Log out and log back in

**Error: "Failed to save menu item"**
- **Cause:** Backend error or database issue
- **Fix:** Check Render logs for details

**Error: "Network error"**
- **Cause:** Server not responding
- **Fix:** Check if Render service is running

---

## 📝 Test Checklist:

After deployment:
- [ ] Admin login works
- [ ] Can add menu item WITHOUT image
- [ ] Can add menu item WITH image
- [ ] Image preview shows before upload
- [ ] Image appears in menu after save
- [ ] Can submit review WITHOUT image
- [ ] Can submit review WITH image
- [ ] Image appears in admin reviews

---

## 💡 Quick Test:

1. Go to https://athidhi.food/admin/login
2. Login: admin / admin123
3. Click "Menu Management"
4. Click "Add New Item"
5. Fill in:
   - Name: Test Item
   - Description: Test
   - Price: 100
   - Category: Starters
6. Click "Choose File" → Select any image
7. Click "Save"
8. If it works → ✅ Success!
9. If it fails → Check console/logs and let me know the error

---

**The fix is deployed! Wait 3-5 minutes for Render to finish deploying, then test!** 🚀

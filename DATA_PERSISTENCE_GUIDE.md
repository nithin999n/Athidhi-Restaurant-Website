# 🔒 Data Persistence Guide - CRITICAL

## ⚠️ PROBLEM: Data Loss on Deployment

Your data was being lost on every deployment because Render's persistent disk wasn't configured.

## ✅ SOLUTION APPLIED

### 1. Updated `render.yaml` with Persistent Disk

```yaml
disk:
  name: athidhi-data
  mountPath: /opt/render/project/src/data
  sizeGB: 1
```

This creates a **1GB persistent disk** that survives deployments.

### 2. Database Location

- **Production:** `/opt/render/project/src/data/restaurant.db`
- **Local:** `./data/restaurant.db`

## 🚀 DEPLOYMENT STEPS (IMPORTANT!)

### First Time Setup (Do This Once):

1. **Go to Render Dashboard**
   - Open your service: `athidhi-restaurant`
   - Go to "Settings" tab
   - Scroll to "Disks" section
   - You should see: `athidhi-data` disk mounted at `/opt/render/project/src/data`

2. **Deploy the Updated Configuration**
   ```bash
   git add render.yaml
   git commit -m "Add persistent disk for data"
   git push
   ```

3. **Wait for Deployment** (2-3 minutes)

4. **Verify Data Persistence**
   - Add a menu item or place an order
   - Deploy again (make any small change and push)
   - Check if data is still there ✅

## 📊 How It Works

### Before (Data Lost):
```
Deploy → New Container → Empty /data folder → Data Gone ❌
```

### After (Data Persists):
```
Deploy → New Container → Mounts Persistent Disk → Data Saved ✅
```

## 🔍 Verify Data Persistence

### Check if Disk is Mounted:
1. Login to admin portal
2. Go to "Raw Data" page
3. Check database location shows: `/opt/render/project/src/data/restaurant.db`
4. Note the record counts

### Test Persistence:
1. Add a test menu item
2. Make a small code change (add a comment)
3. Push to GitHub
4. Wait for deployment
5. Check if test menu item is still there ✅

## 🆘 If Data is Still Lost

### Option 1: Manual Disk Creation
1. Go to Render Dashboard
2. Click your service
3. Go to "Disks" tab
4. Click "Add Disk"
5. Name: `athidhi-data`
6. Mount Path: `/opt/render/project/src/data`
7. Size: 1 GB
8. Click "Create"

### Option 2: Backup & Restore
1. Before deployment, download data:
   - Login to admin portal
   - Go to "Raw Data"
   - Click "Download All Data (JSON)"
2. After deployment, restore data:
   - Use the "Data Management" page
   - Upload the JSON backup

## 📝 Important Notes

1. **Free Tier Limitation**: Render's free tier persistent disks are limited
2. **Backup Regularly**: Use the "Download All Data" feature weekly
3. **Database File**: The SQLite file is at `/opt/render/project/src/data/restaurant.db`
4. **Uploads**: Images are also stored in the persistent disk

## 🎯 Current Status

✅ Persistent disk configured in `render.yaml`
✅ Database path points to persistent location
✅ Directory auto-created if missing
✅ Data should survive deployments

## 🔐 Data Backup Strategy

### Automatic (Built-in):
- Persistent disk keeps data between deployments

### Manual (Recommended):
1. Weekly: Download JSON backup from admin portal
2. Before major changes: Download backup
3. Store backups in Google Drive or similar

### Emergency Recovery:
If data is lost, you can restore from JSON backup using the Data Management page.

## 📞 Support

If data is still being lost after this fix:
1. Check Render logs for disk mount errors
2. Verify disk is created in Render dashboard
3. Check database file path in logs
4. Contact Render support about persistent disk issues

# 🚀 Push to GitHub - Quick Guide

## Your Repository
https://github.com/nithin999n/Athidhi-Restaurant-Website

---

## 📋 Commands to Run

### Step 1: Initialize Git (if not already done)
```bash
git init
```

### Step 2: Add All Files
```bash
git add .
```

### Step 3: Commit Your Code
```bash
git commit -m "Initial commit - Athidhi Restaurant Website with full features"
```

### Step 4: Add Remote Repository
```bash
git remote add origin https://github.com/nithin999n/Athidhi-Restaurant-Website.git
```

### Step 5: Set Branch Name
```bash
git branch -M main
```

### Step 6: Push to GitHub
```bash
git push -u origin main
```

---

## ✅ That's It!

Your code will be on GitHub at:
https://github.com/nithin999n/Athidhi-Restaurant-Website

---

## 🔧 If You Get Errors

### Error: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/nithin999n/Athidhi-Restaurant-Website.git
```

### Error: "Authentication failed"
You need to authenticate with GitHub:

**Option 1: Use GitHub CLI**
```bash
gh auth login
```

**Option 2: Use Personal Access Token**
1. Go to GitHub Settings → Developer Settings → Personal Access Tokens
2. Generate new token
3. Use token as password when pushing

**Option 3: Use SSH**
```bash
git remote set-url origin git@github.com:nithin999n/Athidhi-Restaurant-Website.git
```

---

## 📝 What Gets Pushed

✅ All your code
✅ Frontend (React app)
✅ Backend (Express server)
✅ Configuration files
✅ Documentation

❌ node_modules (excluded by .gitignore)
❌ data folder (excluded by .gitignore)
❌ .env files (excluded by .gitignore)

---

## 🎯 Next Steps After Pushing

1. ✅ Code is on GitHub
2. Go to Render.com
3. Connect your GitHub repo
4. Deploy!

See **DOMAIN_SETUP_CHECKLIST.md** for complete deployment guide.

---

## 🔍 Verify Upload

After pushing, visit:
https://github.com/nithin999n/Athidhi-Restaurant-Website

You should see all your files!

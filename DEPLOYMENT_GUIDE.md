# Deployment Guide - Athidhi Restaurant

## ⚠️ Important: Your Project Has Two Parts

Your restaurant website has:
1. **Frontend** (Customer website + Admin portal) - Can deploy to Netlify
2. **Backend** (API server + Data storage) - Needs a different service

**Netlify only hosts static websites (frontend).** Your backend needs to run on a server.

---

## 🎯 Recommended Deployment Options

### Option 1: Split Deployment (Recommended for Demo)

**Frontend on Netlify (Free):**
- Customer website
- Admin portal UI
- Fast and free

**Backend on Render/Railway (Free tier):**
- API server
- Data storage
- Always running

### Option 2: Full-Stack Hosting (Easiest)

**Both on Render.com (Free tier):**
- Frontend + Backend together
- One deployment
- Simpler setup

### Option 3: Local Demo (Quickest)

**Use ngrok to share your local server:**
- No deployment needed
- Share a temporary URL
- Perfect for quick demos

---

## 🚀 Quick Demo Solution: Use ngrok

### This is the FASTEST way to show your website!

**Step 1: Install ngrok**
- Download from: https://ngrok.com/download
- Or use: `npm install -g ngrok`

**Step 2: Start your servers**
```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
npm run server
```

**Step 3: Expose frontend with ngrok**
```bash
# Terminal 3
ngrok http 5173
```

**Step 4: Share the URL**
- ngrok will give you a URL like: `https://abc123.ngrok.io`
- Share this URL with anyone
- They can access your website!

**Pros:**
- ✅ Takes 2 minutes
- ✅ No deployment needed
- ✅ Works with backend
- ✅ Perfect for demos

**Cons:**
- ⚠️ URL changes each time
- ⚠️ Only works while your computer is on
- ⚠️ Free tier has limits

---

## 📦 Option 1: Deploy to Netlify + Render

### Part A: Deploy Frontend to Netlify

**Step 1: Prepare for Netlify**

I've already created:
- `.nvmrc` file (sets Node version to 18)
- `netlify.toml` (Netlify configuration)
- Updated `package.json` with engines

**Step 2: Build Frontend**
```bash
npm run build
```

This creates a `dist` folder with your frontend.

**Step 3: Deploy to Netlify**

**Option A: Netlify CLI**
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

**Option B: Netlify Website**
1. Go to https://app.netlify.com
2. Drag and drop the `dist` folder
3. Done!

**Step 4: Update API URL**

After deploying backend (next step), update frontend to use backend URL:

In `vite.config.ts`:
```typescript
server: {
  proxy: {
    '/api': {
      target: 'https://your-backend-url.onrender.com', // Update this
      changeOrigin: true,
    },
  },
}
```

### Part B: Deploy Backend to Render

**Step 1: Create Render Account**
- Go to https://render.com
- Sign up (free)

**Step 2: Create New Web Service**
1. Click "New +"
2. Select "Web Service"
3. Connect your GitHub repo (or upload code)

**Step 3: Configure Service**
```
Name: athidhi-restaurant-api
Environment: Node
Build Command: npm install
Start Command: npm run server
```

**Step 4: Add Environment Variables**
```
PORT=3000
NODE_ENV=production
```

**Step 5: Deploy**
- Click "Create Web Service"
- Wait for deployment
- Get your backend URL

**Step 6: Update Frontend**
- Update API URL in frontend
- Redeploy frontend to Netlify

---

## 🎨 Option 2: Deploy Everything to Render

### Easiest Full-Stack Deployment

**Step 1: Create Render Account**
- Go to https://render.com
- Sign up (free)

**Step 2: Create render.yaml**

I'll create this file for you:

```yaml
services:
  # Backend API
  - type: web
    name: athidhi-api
    env: node
    buildCommand: npm install
    startCommand: npm run server
    
  # Frontend
  - type: web
    name: athidhi-frontend
    env: static
    buildCommand: npm run build
    staticPublishPath: ./dist
```

**Step 3: Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin your-github-repo-url
git push -u origin main
```

**Step 4: Deploy on Render**
1. Go to Render dashboard
2. Click "New +"
3. Select "Blueprint"
4. Connect your GitHub repo
5. Render will deploy both frontend and backend!

---

## 🔧 Option 3: Deploy to Railway

### Another Easy Option

**Step 1: Create Railway Account**
- Go to https://railway.app
- Sign up with GitHub

**Step 2: Create New Project**
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your repository

**Step 3: Configure**
Railway will auto-detect your Node.js app and deploy it!

**Step 4: Get URL**
- Railway gives you a URL
- Share it with anyone

---

## 📝 Files I Created for Deployment

### 1. `.nvmrc`
```
18
```
Tells Netlify/Render to use Node 18.

### 2. `netlify.toml`
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```
Configures Netlify deployment.

### 3. Updated `package.json`
Added:
```json
"engines": {
  "node": "18.x"
}
```

---

## 🎯 My Recommendation

### For Quick Demo (Today):
**Use ngrok** - Takes 2 minutes, works perfectly!

```bash
# Start servers
npm run dev      # Terminal 1
npm run server   # Terminal 2
ngrok http 5173  # Terminal 3

# Share the ngrok URL!
```

### For Permanent Deployment:
**Use Render.com** - Free tier, easy setup, hosts everything!

1. Push code to GitHub
2. Connect to Render
3. Deploy with one click
4. Get permanent URL

---

## ⚠️ Important Notes

### About Netlify

**Netlify is ONLY for frontend:**
- ✅ Can host your React app
- ❌ Cannot run your backend server
- ❌ Cannot store data
- ❌ Cannot handle API requests

**You need TWO deployments:**
1. Frontend on Netlify
2. Backend on Render/Railway/Heroku

### About Data Storage

**Current file-based storage:**
- ✅ Works great locally
- ⚠️ May not persist on free hosting (some services reset files)
- 💡 For production, consider PostgreSQL database

**Free hosting services that support file storage:**
- ✅ Render.com (persistent disk)
- ✅ Railway.app (persistent volumes)
- ⚠️ Heroku (ephemeral filesystem - files reset)

---

## 🚀 Quick Start: ngrok Demo

### Fastest way to show your website RIGHT NOW:

**1. Install ngrok:**
```bash
# Download from https://ngrok.com/download
# Or install with npm
npm install -g ngrok
```

**2. Start your app:**
```bash
# Terminal 1
npm run dev

# Terminal 2  
npm run server
```

**3. Expose with ngrok:**
```bash
# Terminal 3
ngrok http 5173
```

**4. Share the URL:**
```
Forwarding: https://abc123.ngrok.io -> http://localhost:5173
```

**Give this URL to anyone!** They can access your website.

---

## 📊 Comparison

| Service | Frontend | Backend | Data Storage | Free Tier | Setup Time |
|---------|----------|---------|--------------|-----------|------------|
| **ngrok** | ✅ | ✅ | ✅ | ✅ Yes | 2 minutes |
| **Netlify + Render** | ✅ | ✅ | ✅ | ✅ Yes | 30 minutes |
| **Render (Full)** | ✅ | ✅ | ✅ | ✅ Yes | 15 minutes |
| **Railway** | ✅ | ✅ | ✅ | ✅ Yes | 10 minutes |
| **Vercel + Backend** | ✅ | ✅ | ⚠️ | ✅ Yes | 30 minutes |

---

## 🎓 Step-by-Step: Render Deployment

### Complete Guide for Render.com

**Step 1: Push to GitHub**
```bash
git init
git add .
git commit -m "Restaurant website"
git branch -M main
git remote add origin https://github.com/yourusername/athidhi-restaurant.git
git push -u origin main
```

**Step 2: Create Render Account**
- Go to https://render.com
- Click "Get Started"
- Sign up with GitHub

**Step 3: Create Web Service**
1. Click "New +"
2. Select "Web Service"
3. Connect GitHub repository
4. Select your repo

**Step 4: Configure**
```
Name: athidhi-restaurant
Environment: Node
Region: Choose closest to you
Branch: main
Build Command: npm install
Start Command: npm run server
```

**Step 5: Add Environment Variables**
Click "Advanced" and add:
```
NODE_ENV=production
```

**Step 6: Deploy**
- Click "Create Web Service"
- Wait 5-10 minutes
- Get your URL: `https://athidhi-restaurant.onrender.com`

**Step 7: Test**
- Visit your URL
- Your website is live!

---

## ✅ Summary

**For Quick Demo:**
→ Use **ngrok** (2 minutes)

**For Permanent Hosting:**
→ Use **Render.com** (15 minutes)

**Netlify Alone Won't Work:**
→ Need backend hosting too

**I've prepared your project for deployment:**
- ✅ Node version fixed
- ✅ Build configuration ready
- ✅ Deployment files created

**Choose your option and follow the guide above!** 🚀

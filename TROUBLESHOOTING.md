# Troubleshooting Guide

## Common Issues and Solutions

### 1. CSS/Tailwind Errors

**Error:** `The 'border-border' class does not exist`

**Solution:** This has been fixed in `client/src/index.css`. If you still see this error:
- Delete `node_modules` folder
- Run `npm install` again
- Restart the dev server

### 2. Module Not Found Errors

**Error:** `Cannot find module './pages/HomePage'`

**Solution:** 
- Make sure all files are saved
- Restart your IDE/editor
- The `tsconfig.json` has been updated to properly resolve modules

### 3. Port Already in Use

**Error:** `Port 5173 is already in use` or `Port 3000 is already in use`

**Solution:**

**For Frontend (Port 5173):**
- Find and kill the process using port 5173
- Or change the port in `vite.config.ts`:
```typescript
server: {
  port: 5174, // Change to any available port
  proxy: { ... }
}
```

**For Backend (Port 3000):**
- Find and kill the process using port 3000
- Or change the PORT in `server/index.ts`:
```typescript
const PORT = 3001; // Change to any available port
```

### 4. Dependencies Installation Issues

**Error:** npm install fails or takes too long

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete existing files
rmdir /s /q node_modules
del package-lock.json

# Reinstall
npm install
```

### 5. TypeScript Errors

**Error:** Various TypeScript compilation errors

**Solution:**
- Make sure you're using Node.js v18 or higher
- Check that all files in `client/src` are saved
- Restart TypeScript server in your IDE
- Run: `npm run build` to see detailed errors

### 6. Vite Dev Server Not Starting

**Error:** Vite fails to start or shows blank page

**Solution:**
1. Check that `client/index.html` exists
2. Check that `client/src/main.tsx` exists
3. Clear Vite cache:
```bash
rmdir /s /q node_modules\.vite
```
4. Restart the dev server

### 7. API Calls Failing

**Error:** 404 errors when making API calls

**Solution:**
- Make sure BOTH servers are running:
  - Terminal 1: `npm run dev` (Frontend)
  - Terminal 2: `npm run server` (Backend)
- Check that backend is running on port 3000
- Check browser console for CORS errors

### 8. Admin Login Not Working

**Error:** Cannot login to admin portal

**Solution:**
- Use correct credentials:
  - Username: `admin`
  - Password: `admin123`
- Make sure backend server is running
- Check browser console for errors
- Try clearing browser cache/cookies

### 9. Images Not Loading

**Error:** Menu item images not displaying

**Solution:**
- Make sure image URLs are valid and accessible
- Use full URLs (e.g., `https://example.com/image.jpg`)
- Check browser console for 404 errors
- Images are optional - items will display without them

### 10. Database Connection Issues

**Error:** PostgreSQL connection errors

**Solution:**
- The app uses in-memory storage by default (no database needed)
- For production with PostgreSQL:
  1. Install PostgreSQL
  2. Create database: `athidhi_restaurant`
  3. Copy `.env.example` to `.env`
  4. Update database credentials in `.env`
  5. Uncomment database code in `server/index.ts`

## Still Having Issues?

1. **Check Node.js version:**
```bash
node --version
```
Should be v18 or higher

2. **Check npm version:**
```bash
npm --version
```
Should be v9 or higher

3. **Verify all files exist:**
- Check that all files from the project structure are present
- Make sure no files are corrupted

4. **Clean install:**
```bash
# Remove everything
rmdir /s /q node_modules
rmdir /s /q dist
del package-lock.json

# Fresh install
npm install

# Try running again
npm run dev
```

5. **Check browser console:**
- Open browser DevTools (F12)
- Check Console tab for JavaScript errors
- Check Network tab for failed API calls

## Getting Help

If none of these solutions work:
1. Note the exact error message
2. Check which command you were running
3. Check browser console for additional errors
4. Verify both frontend and backend servers are running

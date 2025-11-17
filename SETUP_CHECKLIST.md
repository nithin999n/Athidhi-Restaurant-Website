# Setup Checklist - Athidhi Family Restaurant

Follow these steps in order for a smooth setup:

## ☐ Prerequisites

- [ ] Node.js v18 or higher installed
  - Check: `node --version`
  - Download: https://nodejs.org/

- [ ] npm v9 or higher installed
  - Check: `npm --version`
  - Comes with Node.js

## ☐ Installation

- [ ] Navigate to project folder in terminal
- [ ] Run: `npm install`
- [ ] Wait for all dependencies to install (may take 2-5 minutes)
- [ ] Check for any error messages

**If errors occur:** See TROUBLESHOOTING.md

## ☐ Starting the Application

### Option 1: Automatic (Windows)
- [ ] Double-click `start-dev.bat`
- [ ] Two command windows will open automatically

### Option 2: Manual (All platforms)
- [ ] Open Terminal 1
  - [ ] Run: `npm run dev`
  - [ ] Wait for "Local: http://localhost:5173"
  
- [ ] Open Terminal 2
  - [ ] Run: `npm run server`
  - [ ] Wait for "Server running on http://localhost:3000"

## ☐ Verify Installation

- [ ] Open browser to http://localhost:5173
- [ ] You should see the Athidhi Family Restaurant homepage
- [ ] Click "Menu" - should show empty menu (normal)
- [ ] Click "Order Online" - should show order page
- [ ] Click "Reserve Table" - should show reservation form

## ☐ Admin Portal Setup

- [ ] Go to http://localhost:5173/admin/login
- [ ] Login with:
  - Username: `admin`
  - Password: `admin123`
- [ ] You should see the admin dashboard

## ☐ Add Your First Menu Item

- [ ] In admin portal, click "Menu" in navigation
- [ ] Click "Add New Item" button
- [ ] Fill in the form:
  - Name: e.g., "Butter Chicken"
  - Category: e.g., "Main Course"
  - Description: e.g., "Tender chicken in rich tomato sauce"
  - Price: e.g., 12.99
  - Image URL: (optional) paste any image URL
  - Check "Available for ordering"
- [ ] Click "Add Item"
- [ ] Item should appear in the menu list

## ☐ Configure Your First Table

- [ ] In admin portal, click "Tables" in navigation
- [ ] Click "Add New Table" button
- [ ] Fill in the form:
  - Table Number: e.g., "T1"
  - Capacity: e.g., 4
  - Location: e.g., "Window"
  - Check "Available for reservations"
- [ ] Click "Add Table"
- [ ] Table should appear in the list

## ☐ Test Customer Features

- [ ] Go back to homepage (click logo or go to http://localhost:5173)
- [ ] Click "Menu" - your added item should appear
- [ ] Click "Order Online"
  - [ ] Add item to cart
  - [ ] Fill in customer details
  - [ ] Place order (COD)
  - [ ] Should see success message

- [ ] Click "Reserve Table"
  - [ ] Fill in reservation form
  - [ ] Submit reservation
  - [ ] Should see success message

## ☐ Test Admin Management

- [ ] Go to admin portal (http://localhost:5173/admin)
- [ ] Click "Orders"
  - [ ] Your test order should appear
  - [ ] Try changing status to "Preparing"
  
- [ ] Click "Reservations"
  - [ ] Your test reservation should appear
  - [ ] Try confirming the reservation

## ✅ Setup Complete!

Your restaurant website is now fully functional. You can:

- Add more menu items
- Configure more tables
- Receive and manage orders
- Handle table reservations
- Update menu and availability anytime

## 📝 Next Steps

1. **Customize Restaurant Info:**
   - Edit `client/src/pages/HomePage.tsx`
   - Update restaurant name, address, phone, hours

2. **Add Your Menu:**
   - Use admin portal to add all your dishes
   - Organize by categories (Appetizers, Main Course, Desserts, etc.)
   - Add images for better presentation

3. **Configure Tables:**
   - Add all your restaurant tables
   - Set capacities and locations
   - Mark unavailable tables when needed

4. **Test Everything:**
   - Place test orders
   - Make test reservations
   - Practice managing orders and reservations

5. **Go Live:**
   - When ready for production, see README.md for deployment instructions
   - Set up PostgreSQL for persistent data storage

## 🆘 Need Help?

- **Errors during setup:** See TROUBLESHOOTING.md
- **Understanding the code:** See DEPENDENCIES.md
- **Quick reference:** See QUICKSTART.md
- **Recent fixes:** See FIXES_APPLIED.md

---

**Important Notes:**

⚠️ Data is stored in memory (resets when server restarts)
⚠️ For production, configure PostgreSQL database
⚠️ Change admin password before going live
⚠️ Only COD (Cash on Delivery) payment is supported

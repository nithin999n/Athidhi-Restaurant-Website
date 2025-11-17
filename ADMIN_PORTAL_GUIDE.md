# Admin Portal - Complete Guide

## 🔐 Accessing the Admin Portal

**URL:** http://localhost:5173/admin/login

**Default Credentials:**
- Username: `admin`
- Password: `admin123`

⚠️ **Important:** Change these credentials before going live!

---

## 📊 Dashboard Overview

The dashboard shows you everything at a glance:

### Real-Time Statistics
- **Total Orders** - All orders received (with pending count)
- **Reservations** - All table bookings (with pending count)
- **Menu Items** - Total items in your menu
- **System Status** - Overall system health

### Features
✅ **Auto-refresh** - Updates every 30 seconds automatically
✅ **Alerts** - Yellow notification when you have pending orders/reservations
✅ **Recent Activity** - See the 5 most recent orders and reservations
✅ **Quick Actions** - One-click access to all management pages

---

## 🍽️ Menu Management

**Access:** Admin Portal → Menu

### What You Can Do:

#### ➕ Add New Menu Items
1. Click "Add New Item" button
2. Fill in the form:
   - **Item Name** (required) - e.g., "Butter Chicken"
   - **Category** (required) - e.g., "Main Course", "Appetizer", "Dessert"
   - **Description** (required) - Describe the dish
   - **Price** (required) - In dollars (e.g., 12.99)
   - **Image URL** (optional) - Paste any image URL
   - **Available** - Check to make it available for ordering
3. Click "Add Item"

#### ✏️ Edit Existing Items
1. Find the item in the list
2. Click "Edit" button
3. Update any fields
4. Click "Update Item"

#### 🗑️ Delete Items
1. Find the item in the list
2. Click "Delete" button
3. Confirm deletion

#### 👁️ View Menu Items
- See all items with images, prices, and availability
- Filter by category
- See which items are available/unavailable

### 💡 Tips:
- Use clear, descriptive names
- Add high-quality images for better presentation
- Organize items by categories (Appetizers, Main Course, Desserts, Beverages, etc.)
- Mark items as unavailable instead of deleting them
- Update prices anytime - changes reflect immediately on customer site

---

## 📦 Order Management

**Access:** Admin Portal → Orders

### What You Can Do:

#### View All Orders
- See customer name, phone, and address
- View ordered items and quantities
- See total amount (COD)
- Check order status and time

#### Filter Orders
Click filter buttons to view:
- **All** - Every order
- **Pending** - New orders waiting for action
- **Preparing** - Orders being prepared
- **Ready** - Orders ready for delivery
- **Delivered** - Completed orders

#### Update Order Status
Orders flow through these stages:

1. **Pending** (New order arrives)
   - Click "Start Preparing" → Changes to Preparing
   - Click "Cancel" → Cancels the order

2. **Preparing** (Kitchen is working on it)
   - Click "Mark as Ready" → Changes to Ready

3. **Ready** (Order is ready for pickup/delivery)
   - Click "Mark as Delivered" → Changes to Delivered

4. **Delivered** (Order completed)
   - No further action needed

### 💡 Tips:
- Check orders frequently for new pending orders
- Update status promptly so customers know their order progress
- Keep customer phone numbers handy for delivery coordination
- Review delivery addresses carefully

---

## 📅 Reservation Management

**Access:** Admin Portal → Reservations

### What You Can Do:

#### View All Reservations
- See customer name, phone, and email
- View date, time, and number of guests
- Check special requests
- See reservation status

#### Filter Reservations
Click filter buttons to view:
- **All** - Every reservation
- **Pending** - New reservations waiting for confirmation
- **Confirmed** - Approved reservations
- **Completed** - Past reservations
- **Cancelled** - Cancelled bookings

#### Manage Reservations

1. **Pending Reservations**
   - Click "Confirm" → Confirms the booking
   - Click "Cancel" → Cancels the booking

2. **Confirmed Reservations**
   - Click "Mark as Completed" → After guests have dined

### 💡 Tips:
- Confirm reservations quickly (within 24 hours)
- Check special requests for dietary restrictions or occasions
- Call customers to confirm large group bookings
- Review table availability before confirming

---

## 🪑 Table Management

**Access:** Admin Portal → Tables

### What You Can Do:

#### ➕ Add New Tables
1. Click "Add New Table" button
2. Fill in the form:
   - **Table Number** (required) - e.g., "T1", "A5", "Window-1"
   - **Capacity** (required) - Number of seats (1-20)
   - **Location** (required) - e.g., "Window", "Patio", "Indoor", "VIP"
   - **Available** - Check to make it available for reservations
3. Click "Add Table"

#### ✏️ Edit Tables
1. Find the table in the list
2. Click "Edit" button
3. Update capacity, location, or availability
4. Click "Update Table"

#### 🗑️ Delete Tables
1. Find the table in the list
2. Click "Delete" button
3. Confirm deletion

#### View Table Configuration
- See all tables with their numbers and capacities
- Check which tables are available
- View table locations

### 💡 Tips:
- Use clear table numbering (T1, T2, T3 or A1, B1, C1)
- Group tables by location (Window, Patio, Indoor)
- Mark tables as unavailable temporarily (maintenance, reserved for events)
- Set accurate capacities for better reservation management

---

## 🔄 How Changes Sync to Customer Website

### Instant Updates ✨

Everything you change in the admin portal updates the customer website **immediately**:

#### Menu Changes
- **Add item** → Appears on customer menu page and order page
- **Edit price** → New price shows on customer site
- **Mark unavailable** → Item hidden from ordering (still visible on menu)
- **Delete item** → Removed from customer site

#### Order Updates
- **Change status** → Customer sees updated status (if you add status tracking)
- **New orders** → Appear in admin dashboard instantly

#### Reservation Updates
- **Confirm/Cancel** → Customer gets updated status
- **New reservations** → Appear in admin dashboard instantly

#### Table Configuration
- **Add tables** → Available for customer reservations
- **Mark unavailable** → Not shown in reservation options
- **Update capacity** → Affects reservation availability

### No Refresh Needed! 🎉
- Customers see changes immediately
- No need to restart servers
- No cache clearing required
- Changes are live as soon as you save

---

## 📱 Admin Portal Features Summary

### ✅ What's Included:

1. **Dashboard**
   - Real-time statistics
   - Recent orders and reservations
   - Pending item alerts
   - Auto-refresh every 30 seconds
   - Quick action buttons

2. **Menu Management**
   - Add/Edit/Delete menu items
   - Upload images (via URL)
   - Set prices
   - Toggle availability
   - Organize by categories

3. **Order Management**
   - View all orders
   - Filter by status
   - Update order status (pending → preparing → ready → delivered)
   - See customer details
   - View order items and totals

4. **Reservation Management**
   - View all reservations
   - Filter by status
   - Confirm/Cancel bookings
   - See customer details and special requests
   - Mark as completed

5. **Table Management**
   - Add/Edit/Delete tables
   - Set capacity and location
   - Toggle availability
   - View all table configurations

6. **Security**
   - Secure login system
   - Admin authentication
   - Protected routes

---

## 🎯 Daily Workflow Example

### Morning Routine:
1. Login to admin portal
2. Check dashboard for pending orders/reservations
3. Confirm today's reservations
4. Update menu availability (mark items as unavailable if ingredients are low)

### During Service:
1. Monitor new orders (dashboard auto-refreshes)
2. Update order status as kitchen prepares food
3. Check new reservations
4. Mark tables as unavailable if needed

### End of Day:
1. Mark delivered orders as completed
2. Mark completed reservations
3. Review tomorrow's reservations
4. Update menu for next day

---

## 🆘 Common Questions

**Q: How do I change the admin password?**
A: Currently using default credentials. For production, update the authentication in `server/index.ts`

**Q: Can I add multiple admins?**
A: Yes, you can extend the system to support multiple admin users with different permissions

**Q: Do changes save permanently?**
A: Currently using in-memory storage (resets on restart). For production, configure PostgreSQL database

**Q: Can customers see order status?**
A: Currently no, but you can add a "Track Order" feature on the customer site

**Q: How do I add images?**
A: Use image URLs from your hosting service or image hosting sites like Imgur, Cloudinary, etc.

**Q: Can I export order data?**
A: Not currently, but you can add export functionality for reports

---

## 🚀 Next Steps

1. **Add Your Menu** - Start by adding all your dishes
2. **Configure Tables** - Set up your restaurant's seating
3. **Test Everything** - Place test orders and reservations
4. **Customize** - Update restaurant info on homepage
5. **Go Live** - When ready, deploy to production with database

---

## 📞 Support

For technical issues, see:
- **TROUBLESHOOTING.md** - Common problems and solutions
- **SETUP_CHECKLIST.md** - Setup verification
- **README.md** - Project overview

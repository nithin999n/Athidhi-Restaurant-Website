# Quick Reference Card

## 🔗 URLs

| Page | URL |
|------|-----|
| **Customer Homepage** | http://localhost:5173 |
| **Menu** | http://localhost:5173/menu |
| **Order Online** | http://localhost:5173/order |
| **Reserve Table** | http://localhost:5173/reservation |
| **Reviews** | http://localhost:5173/reviews |
| **Admin Login** | http://localhost:5173/admin/login |
| **Admin Dashboard** | http://localhost:5173/admin |
| **Manage Orders** | http://localhost:5173/admin/orders |
| **Manage Reservations** | http://localhost:5173/admin/reservations |
| **Manage Menu** | http://localhost:5173/admin/menu |
| **Manage Tables** | http://localhost:5173/admin/tables |
| **Manage Reviews** | http://localhost:5173/admin/reviews |

## 🔐 Admin Credentials

```
Username: admin
Password: admin123
```

## 🚀 Start Commands

```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
npm run server

# Or use the batch file (Windows)
start-dev.bat
```

## 📋 Admin Tasks Cheat Sheet

### Add Menu Item
1. Go to Admin → Menu
2. Click "Add New Item"
3. Fill: Name, Category, Description, Price, Image URL
4. Check "Available for ordering"
5. Click "Add Item"

### Manage Order
1. Go to Admin → Orders
2. Find the order
3. Click status button:
   - "Start Preparing" (pending → preparing)
   - "Mark as Ready" (preparing → ready)
   - "Mark as Delivered" (ready → delivered)

### Confirm Reservation
1. Go to Admin → Reservations
2. Find the reservation
3. Click "Confirm" or "Cancel"

### Add Table
1. Go to Admin → Tables
2. Click "Add New Table"
3. Fill: Table Number, Capacity, Location
4. Check "Available for reservations"
5. Click "Add Table"

## 🎯 Common Actions

| Task | Steps |
|------|-------|
| **Change menu price** | Admin → Menu → Edit item → Update price → Save |
| **Mark item unavailable** | Admin → Menu → Edit item → Uncheck "Available" → Save |
| **Check new orders** | Admin → Dashboard (auto-refreshes) or Orders page |
| **View customer details** | Admin → Orders or Reservations → See details |
| **Update order status** | Admin → Orders → Click status button |

## 📊 Order Status Flow

```
Pending → Preparing → Ready → Delivered
   ↓
Cancelled
```

## 📅 Reservation Status Flow

```
Pending → Confirmed → Completed
   ↓
Cancelled
```

## 🔄 Auto-Refresh

- Dashboard refreshes every **30 seconds**
- No manual refresh needed
- New orders/reservations appear automatically

## 💡 Quick Tips

- ✅ Add images using public URLs (Imgur, Cloudinary, etc.)
- ✅ Use clear categories (Appetizers, Main Course, Desserts, Beverages)
- ✅ Mark items unavailable instead of deleting
- ✅ Check dashboard regularly for pending items
- ✅ Update order status promptly
- ✅ Confirm reservations within 24 hours

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| Can't login | Use admin/admin123 |
| Menu not showing | Add items in Admin → Menu |
| Orders not appearing | Make sure backend is running (npm run server) |
| Changes not visible | Refresh customer page |
| Port in use | Change port in config or kill process |

## 📚 Documentation Files

- **ADMIN_FEATURES_SUMMARY.md** - Complete feature list
- **ADMIN_PORTAL_GUIDE.md** - Detailed admin guide
- **HOW_IT_WORKS.md** - System architecture
- **SETUP_CHECKLIST.md** - Setup steps
- **TROUBLESHOOTING.md** - Common issues
- **QUICKSTART.md** - Quick start guide

## 🎨 Color Coding

### Order Status Colors
- 🟡 **Yellow** - Pending
- 🔵 **Blue** - Preparing
- 🟢 **Green** - Ready
- ⚫ **Gray** - Delivered
- 🔴 **Red** - Cancelled

### Reservation Status Colors
- 🟡 **Yellow** - Pending
- 🟢 **Green** - Confirmed
- ⚫ **Gray** - Completed
- 🔴 **Red** - Cancelled

## 📱 Mobile Access

- Customer site is mobile-responsive
- Admin portal works on tablets
- Best viewed on desktop for admin tasks

## 💾 Data Storage

- **Current:** In-memory (resets on restart)
- **Production:** Configure PostgreSQL for persistence

## 🔒 Security Notes

- Change admin password before going live
- Use HTTPS in production
- Keep backend port (3000) private
- Only expose frontend port (5173/80/443)

---

**Print this page for quick reference!** 📄

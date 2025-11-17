# Data Storage Guide - Where Your Data Goes

## 📊 Current Setup (Development Mode)

### ⚠️ Important: Data is Stored IN-MEMORY

Right now, all your data is stored **in the server's memory** (RAM). This means:

```
❌ Data RESETS when you restart the server
❌ Data is LOST if server crashes
❌ Data is TEMPORARY - not saved to disk
✅ Good for TESTING and DEVELOPMENT
✅ Fast and easy to use
✅ No database setup needed
```

### What Gets Stored in Memory

**All of these are temporary:**
- 🍽️ Menu items (food items you add)
- 📦 Orders (customer orders)
- 📅 Reservations (table bookings)
- 🪑 Tables (table configurations)
- ⭐ Reviews (customer reviews)

### Where It's Stored

**File:** `server/index.ts`

```javascript
// In-memory storage (line 10-14)
let menuItems: any[] = [];      // Your menu items
let orders: any[] = [];          // Customer orders
let reservations: any[] = [];    // Table reservations
let tables: any[] = [];          // Table configurations
let reviews: any[] = [];         // Customer reviews
```

These are just JavaScript arrays in the server's memory!

---

## 🔄 What Happens When You Restart

### Scenario: Server Restart

```
1. You add 10 menu items
2. Customers place 5 orders
3. You get 3 reviews
         ↓
4. You stop the server (Ctrl+C)
         ↓
5. All data is LOST! ❌
         ↓
6. You start the server again
         ↓
7. Everything is EMPTY again
   - Menu: 0 items
   - Orders: 0 orders
   - Reviews: 0 reviews
```

### Why This Happens

When you stop the server:
- The Node.js process ends
- Memory is cleared
- Arrays are destroyed
- Data disappears

---

## 💾 Solution: PostgreSQL Database (Production)

### For Permanent Data Storage

To keep your data **permanently**, you need to set up a **PostgreSQL database**.

### What Changes with Database

```
✅ Data PERSISTS when server restarts
✅ Data is SAVED to disk
✅ Data is PERMANENT
✅ Data survives crashes
✅ Can handle thousands of records
✅ Professional and reliable
```

### Database Tables Already Prepared

I've already created the database schema for you in `server/db.ts`:

**Tables:**
1. **menu_items** - Stores all your food items
2. **orders** - Stores customer orders
3. **reservations** - Stores table bookings
4. **tables** - Stores table configurations
5. **reviews** - Stores customer reviews
6. **admin_users** - Stores admin login credentials

---

## 🚀 How to Set Up PostgreSQL (Production)

### Step 1: Install PostgreSQL

**Windows:**
1. Download from: https://www.postgresql.org/download/windows/
2. Run installer
3. Remember the password you set!
4. Default port: 5432

**Mac:**
```bash
brew install postgresql
brew services start postgresql
```

**Linux:**
```bash
sudo apt-get install postgresql
sudo service postgresql start
```

### Step 2: Create Database

Open PostgreSQL command line (psql):

```sql
-- Create database
CREATE DATABASE athidhi_restaurant;

-- Connect to it
\c athidhi_restaurant

-- Database is ready!
```

### Step 3: Configure Environment Variables

Create a `.env` file in your project root:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=athidhi_restaurant
DB_USER=postgres
DB_PASSWORD=your_password_here

# Server Configuration
PORT=3000
```

### Step 4: Update Server Code

**Current code (in-memory):**
```javascript
// server/index.ts
let menuItems: any[] = [];  // Temporary!
```

**Production code (database):**
```javascript
// server/index.ts
import pool from './db';

// Get menu items from database
app.get('/api/menu', async (req, res) => {
  const result = await pool.query('SELECT * FROM menu_items');
  res.json(result.rows);
});

// Add menu item to database
app.post('/api/menu', async (req, res) => {
  const { name, description, price, category, imageUrl, available } = req.body;
  const result = await pool.query(
    'INSERT INTO menu_items (name, description, price, category, image_url, available) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [name, description, price, category, imageUrl, available]
  );
  res.json(result.rows[0]);
});
```

### Step 5: Initialize Database

Run this once to create all tables:

```javascript
// In server/index.ts, add at startup:
import { initDatabase } from './db';

// Initialize database on server start
initDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
```

---

## 📊 Data Flow Comparison

### Current (In-Memory)

```
Customer places order
         ↓
POST /api/orders
         ↓
Server receives data
         ↓
Adds to orders array in RAM
         ↓
Returns success
         ↓
❌ Data lost on restart
```

### With Database (Production)

```
Customer places order
         ↓
POST /api/orders
         ↓
Server receives data
         ↓
Saves to PostgreSQL database
         ↓
Data written to disk
         ↓
Returns success
         ↓
✅ Data persists forever
```

---

## 🔍 How to Check Your Current Data

### While Server is Running

**Option 1: Use Admin Portal**
- Go to http://localhost:5173/admin
- See all your current data
- This shows what's in memory right now

**Option 2: Check Server Console**
You can add console logs to see data:

```javascript
// In server/index.ts
console.log('Current menu items:', menuItems.length);
console.log('Current orders:', orders.length);
console.log('Current reviews:', reviews.length);
```

**Option 3: Use API Endpoints**
Open browser and visit:
- http://localhost:3000/api/menu
- http://localhost:3000/api/orders
- http://localhost:3000/api/reviews

---

## ⚡ Quick Test: See Data Reset

### Try This:

1. **Add some data:**
   - Go to admin portal
   - Add 2-3 menu items
   - Note how many items you have

2. **Stop the server:**
   - Press `Ctrl+C` in the terminal running `npm run server`

3. **Start the server again:**
   - Run `npm run server`

4. **Check admin portal:**
   - Go to Admin → Menu
   - All items are GONE! ❌

This proves data is in memory only!

---

## 💡 Recommendations

### For Development/Testing (Current Setup)
✅ **Keep using in-memory storage**
- Fast and easy
- No setup needed
- Perfect for testing features
- Good for learning

### For Production (Real Restaurant)
✅ **Switch to PostgreSQL database**
- Data persists permanently
- Professional and reliable
- Can handle real customers
- Required for live website

---

## 🎯 When to Switch to Database

**Keep in-memory if:**
- ✅ You're still testing
- ✅ You're learning the system
- ✅ You're adding features
- ✅ You don't mind data resetting

**Switch to database when:**
- ✅ You're ready to go live
- ✅ You need to keep customer data
- ✅ You want order history
- ✅ You need permanent reviews
- ✅ You're opening to real customers

---

## 📝 Summary Table

| Feature | In-Memory (Current) | PostgreSQL (Production) |
|---------|-------------------|------------------------|
| **Setup** | ✅ None needed | ⚠️ Requires installation |
| **Speed** | ✅ Very fast | ✅ Fast |
| **Data Persistence** | ❌ Lost on restart | ✅ Permanent |
| **Reliability** | ❌ Data can be lost | ✅ Very reliable |
| **Scalability** | ❌ Limited | ✅ Unlimited |
| **Best For** | Testing/Development | Production/Live site |
| **Cost** | ✅ Free | ✅ Free (self-hosted) |

---

## 🔧 Current Data Lifecycle

### Example: Adding a Menu Item

```
1. Admin adds "Butter Chicken" via admin portal
         ↓
2. Frontend sends POST request to /api/menu
         ↓
3. Backend receives data
         ↓
4. Backend adds to menuItems array in RAM:
   menuItems.push({
     id: Date.now(),
     name: "Butter Chicken",
     price: 12.99,
     ...
   })
         ↓
5. Backend returns success
         ↓
6. Item appears in admin portal ✅
7. Item appears on customer menu ✅
         ↓
8. Server keeps running = Data stays ✅
         ↓
9. Server restarts = Data LOST ❌
```

---

## 🎓 Understanding the Code

### Where Data Lives

**File:** `server/index.ts`

```javascript
// Line 10-14: Data storage
let menuItems: any[] = [];      // Empty array
let orders: any[] = [];          // Empty array
let reservations: any[] = [];    // Empty array
let tables: any[] = [];          // Empty array
let reviews: any[] = [];         // Empty array

// When you add data:
app.post('/api/menu', (req, res) => {
  const item = { id: Date.now(), ...req.body };
  menuItems.push(item);  // Adds to array in RAM
  res.json(item);
});

// When you get data:
app.get('/api/menu', (req, res) => {
  res.json(menuItems);  // Returns array from RAM
});
```

### What Happens in Memory

```
Server starts:
  menuItems = []  (empty)

Admin adds item:
  menuItems = [{ id: 1, name: "Item 1", ... }]

Admin adds another:
  menuItems = [
    { id: 1, name: "Item 1", ... },
    { id: 2, name: "Item 2", ... }
  ]

Server stops:
  menuItems = undefined (destroyed)

Server starts again:
  menuItems = []  (empty again!)
```

---

## 🚀 Next Steps

### For Now (Development)
1. ✅ Keep using current setup
2. ✅ Test all features
3. ✅ Add your menu items
4. ✅ Test orders and reviews
5. ✅ Don't worry about data loss

### When Ready for Production
1. 📦 Install PostgreSQL
2. 🔧 Create database
3. ⚙️ Configure environment variables
4. 💻 Update server code to use database
5. 🧪 Test database connection
6. 🚀 Deploy to live server

---

## 📚 Additional Resources

**PostgreSQL Installation:**
- Windows: https://www.postgresql.org/download/windows/
- Mac: https://postgresapp.com/
- Linux: https://www.postgresql.org/download/linux/

**Database GUI Tools:**
- pgAdmin: https://www.pgadmin.org/
- DBeaver: https://dbeaver.io/
- TablePlus: https://tableplus.com/

**Tutorials:**
- PostgreSQL Basics: https://www.postgresql.org/docs/
- Node.js + PostgreSQL: https://node-postgres.com/

---

## ❓ FAQ

**Q: Will I lose my data if I close my browser?**
A: No! Data is on the server, not in your browser. Closing browser is fine.

**Q: Will I lose data if I restart my computer?**
A: Yes, if the server stops. The server needs to keep running.

**Q: How long does data last?**
A: As long as the server keeps running without restart.

**Q: Can I backup my data?**
A: Not easily with in-memory storage. With database, yes!

**Q: Is in-memory storage bad?**
A: No! It's perfect for development and testing. Just not for production.

**Q: When should I switch to database?**
A: When you're ready to go live with real customers.

**Q: Is it hard to switch to database?**
A: Not too hard! The schema is already prepared. Just need to install PostgreSQL and update a few lines of code.

---

## ✅ Summary

**Current Setup:**
- 📝 Data stored in server memory (RAM)
- ⚡ Fast and easy for development
- ❌ Data resets when server restarts
- ✅ Perfect for testing

**Production Setup:**
- 💾 Data stored in PostgreSQL database
- 💪 Permanent and reliable
- ✅ Data persists forever
- 🚀 Required for live website

**Your data is safe as long as the server keeps running!**

For now, enjoy testing the system. When you're ready to go live, we'll set up the database! 🎉

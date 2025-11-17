# Quick Start Guide - Athidhi Family Restaurant

## Installation

1. **Install Node.js** (v18 or higher)
   - Download from: https://nodejs.org/

2. **Install dependencies:**
   ```bash
   npm install
   ```
   
   **Note:** If you see any errors during installation, see TROUBLESHOOTING.md

## Running the Application

You need to run TWO terminals simultaneously:

### Terminal 1 - Frontend (React)
```bash
npm run dev
```
This starts the frontend on `http://localhost:5173`

### Terminal 2 - Backend (Express API)
```bash
npm run server
```
This starts the backend API on `http://localhost:3000`

## Accessing the Application

### Customer Website
- **Homepage:** http://localhost:5173
- **Menu:** http://localhost:5173/menu
- **Order Online:** http://localhost:5173/order
- **Reserve Table:** http://localhost:5173/reservation

### Admin Portal
- **Login:** http://localhost:5173/admin/login
- **Dashboard:** http://localhost:5173/admin
- **Orders:** http://localhost:5173/admin/orders
- **Reservations:** http://localhost:5173/admin/reservations
- **Menu Management:** http://localhost:5173/admin/menu
- **Table Management:** http://localhost:5173/admin/tables

### Admin Credentials
```
Username: admin
Password: admin123
```

## Features Overview

### Customer Features
✅ Browse restaurant menu with categories
✅ Place online orders (Cash on Delivery only)
✅ Reserve tables with date/time selection
✅ Mobile-responsive design

### Admin Features
✅ Dashboard with real-time statistics
✅ Manage orders (pending → preparing → ready → delivered)
✅ Manage reservations (pending → confirmed → completed)
✅ Add/Edit/Delete menu items with images and prices
✅ Configure tables with capacity and location
✅ Secure admin authentication

## Current Setup

- **Data Storage:** In-memory (resets on server restart)
- **Payment:** Cash on Delivery (COD) only
- **Database:** PostgreSQL ready (see server/db.ts to configure)

## Next Steps

1. **Add Menu Items:** Go to Admin → Menu Management
2. **Configure Tables:** Go to Admin → Table Management
3. **Test Ordering:** Place a test order from the customer site
4. **Test Reservations:** Make a test reservation

## Production Deployment

To use persistent storage:

1. Set up PostgreSQL database
2. Update environment variables in `.env`:
   ```
   DB_HOST=your_host
   DB_PORT=5432
   DB_NAME=athidhi_restaurant
   DB_USER=your_user
   DB_PASSWORD=your_password
   ```
3. Run database initialization (see server/db.ts)
4. Build for production: `npm run build`

## Troubleshooting

**Port already in use?**
- Frontend: Change port in `vite.config.ts`
- Backend: Change PORT in `server/index.ts`

**Dependencies not installing?**
- Delete `node_modules` folder
- Delete `package-lock.json`
- Run `npm install` again

**API not connecting?**
- Make sure both terminals are running
- Check that backend is on port 3000
- Check browser console for errors

## Support

For issues or questions, check:
- README.md - Project overview
- DEPENDENCIES.md - Detailed package information
- package.json - All available scripts

# 🍽️ Athidhi Family Restaurant - Complete Website

A full-stack restaurant website with online ordering, table reservations, customer reviews, and a comprehensive admin portal.

**Live Website:** [athidhi.food](https://athidhi.food) *(coming soon)*

---

## ✨ Features

### Customer Features
- 🏠 **Homepage** - Restaurant information and overview
- 📋 **Menu** - Browse food items with categories, prices, and images
- 🛒 **Online Ordering** - Order food for delivery (Cash on Delivery)
- 📅 **Table Reservations** - Book tables with date, time, and guest count
- ⭐ **Reviews System** - Write reviews with ratings (1-5 stars) and photos
- 📊 **Overall Ratings** - See average ratings and star distribution

### Admin Features
- 🔐 **Secure Login** - Admin authentication system
- 📊 **Dashboard** - Real-time statistics and recent activity
- 📦 **Order Management** - View and update order status
- 📅 **Reservation Management** - Confirm or cancel bookings
- 🍽️ **Menu Management** - Add, edit, delete menu items with images
- 🪑 **Table Management** - Configure tables with capacity and location
- ⭐ **Review Management** - Approve or reject customer reviews
- 💾 **Data Management** - Backup and manage all data

---

## 🛠️ Technology Stack

### Frontend
- **React** with TypeScript
- **Tailwind CSS** for styling
- **Vite** for build tooling
- **Wouter** for routing
- **Lucide React** for icons

### Backend
- **Express.js** (Node.js)
- **TypeScript**
- **File-based storage** (JSON)
- **CORS** enabled

### Deployment
- **Render.com** for hosting
- **GoDaddy** for domain
- **Automatic SSL** (HTTPS)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18.x or higher
- npm 9.x or higher

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nithin999n/Athidhi-Restaurant-Website.git
   cd Athidhi-Restaurant-Website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development servers**
   
   **Terminal 1 - Frontend:**
   ```bash
   npm run dev
   ```
   
   **Terminal 2 - Backend:**
   ```bash
   npm run server
   ```

4. **Access the application**
   - Customer Website: http://localhost:5173
   - Admin Portal: http://localhost:5173/admin/login

### Admin Credentials
```
Username: admin
Password: admin123
```
⚠️ Change these before going live!

---

## 📂 Project Structure

```
athidhi-restaurant/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   │   ├── admin/    # Admin portal pages
│   │   │   └── ...       # Customer pages
│   │   ├── lib/          # Utilities
│   │   └── config.ts     # API configuration
│   └── index.html
├── server/                # Backend Express API
│   ├── index.ts          # Server entry point
│   ├── storage.ts        # File storage system
│   └── db.ts             # Database schema (PostgreSQL ready)
├── data/                  # Data storage (auto-created)
│   └── restaurant-data.json
└── package.json
```

---

## 🌐 Deployment

### Deploy to Render.com

1. **Push code to GitHub** (already done!)

2. **Create Render account**
   - Go to https://render.com
   - Sign up with GitHub

3. **Deploy Backend**
   - New Web Service
   - Build: `npm install`
   - Start: `npm run server`

4. **Deploy Frontend**
   - New Static Site
   - Build: `npm run build`
   - Publish: `dist`

5. **Connect Domain**
   - Add custom domain in Render
   - Configure DNS in GoDaddy
   - Wait for SSL activation

**Detailed Guide:** See [DOMAIN_SETUP_CHECKLIST.md](./DOMAIN_SETUP_CHECKLIST.md)

---

## 📖 Documentation

- **[QUICKSTART.md](./QUICKSTART.md)** - Quick start guide
- **[DOMAIN_SETUP_CHECKLIST.md](./DOMAIN_SETUP_CHECKLIST.md)** - Domain setup guide
- **[ADMIN_PORTAL_GUIDE.md](./ADMIN_PORTAL_GUIDE.md)** - Admin portal features
- **[REVIEW_SYSTEM_GUIDE.md](./REVIEW_SYSTEM_GUIDE.md)** - Review system details
- **[PERMANENT_STORAGE_GUIDE.md](./PERMANENT_STORAGE_GUIDE.md)** - Data storage info
- **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** - Common issues and solutions

---

## 🎯 Key Features Explained

### Online Ordering (COD Only)
- Customers add items to cart
- Fill delivery details
- Place order (Cash on Delivery)
- Admin receives order in dashboard
- Admin updates order status (pending → preparing → ready → delivered)

### Table Reservations
- Customers select date, time, and guest count
- Add special requests
- Submit reservation
- Admin confirms or cancels
- Status tracking

### Review System
- Customers rate 1-5 stars
- Write 10-200 word reviews
- Upload photos (via URL)
- Admin approves before publishing
- Automatic overall rating calculation
- Star distribution chart

### Data Storage
- All data saved to JSON file
- Automatic saving on every change
- Survives server restarts
- One-click backups
- Easy data management

---

## 🔒 Security Features

- Admin authentication required
- Protected admin routes
- CORS enabled for API
- Environment variables for sensitive data
- SSL/HTTPS in production

---

## 💾 Data Management

### Current Setup
- File-based storage (JSON)
- Automatic saving
- Persistent data
- Easy backups

### Production Ready
- PostgreSQL schema included
- Easy migration path
- Scalable architecture

---

## 🎨 Customization

### Update Restaurant Information
Edit `client/src/pages/HomePage.tsx`:
- Restaurant name
- Address
- Phone number
- Email
- Opening hours

### Change Admin Password
Edit `server/index.ts`:
```typescript
const ADMIN_USER = { 
  username: 'admin', 
  password: 'your-new-password' 
};
```

### Update Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: {
    // Your color scheme
  }
}
```

---

## 📊 API Endpoints

### Public Endpoints
- `GET /api/menu` - Get all menu items
- `POST /api/orders` - Place new order
- `POST /api/reservations` - Make reservation
- `GET /api/reviews` - Get approved reviews
- `POST /api/reviews` - Submit review

### Admin Endpoints
- `POST /api/admin/login` - Admin login
- `GET /api/orders` - Get all orders
- `PUT /api/orders/:id` - Update order status
- `GET /api/reservations` - Get all reservations
- `PUT /api/reservations/:id` - Update reservation
- `POST /api/menu` - Add menu item
- `PUT /api/menu/:id` - Update menu item
- `DELETE /api/menu/:id` - Delete menu item
- `PUT /api/reviews/:id` - Approve/reject review
- `POST /api/admin/backup` - Create data backup

---

## 🧪 Testing

### Test Customer Features
1. Visit http://localhost:5173
2. Browse menu
3. Place test order
4. Make test reservation
5. Write test review

### Test Admin Features
1. Visit http://localhost:5173/admin/login
2. Login with admin credentials
3. Check dashboard
4. Manage test order
5. Approve test review
6. Add menu item

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5173
npx kill-port 5173

# Kill process on port 3000
npx kill-port 3000
```

### Dependencies Issues
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Data Not Saving
- Check `data` folder exists
- Check file permissions
- See server console for errors

**More help:** See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

---

## 📈 Future Enhancements

- [ ] Online payment integration
- [ ] Email notifications
- [ ] SMS notifications for orders
- [ ] Customer accounts
- [ ] Order tracking
- [ ] Loyalty program
- [ ] Multiple restaurant locations
- [ ] Mobile app

---

## 🤝 Contributing

This is a private restaurant website. For issues or suggestions, contact the owner.

---

## 📄 License

Private - Athidhi Family Restaurant

---

## 👨‍💻 Developer

Built with ❤️ for Athidhi Family Restaurant

---

## 📞 Support

For technical support or questions:
- Check documentation in the repo
- See troubleshooting guide
- Contact: [Your contact info]

---

## 🎉 Acknowledgments

- React Team for React
- Tailwind CSS for styling
- Render.com for hosting
- All open-source contributors

---

**⭐ Star this repo if you find it useful!**

**🍽️ Enjoy your meal at Athidhi Family Restaurant!**

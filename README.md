# Athidhi Family Restaurant

A complete restaurant website with online ordering (COD only), table reservations, and a comprehensive admin portal for managing all operations.

## Features

### Customer Website
- 🏠 Homepage with restaurant information
- 📋 Interactive menu display
- 🛒 Online food ordering (Cash on Delivery only)
- 📅 Table reservation system
- 📱 Mobile-responsive design

### Admin Portal
- 🔐 Secure admin authentication
- 📊 Dashboard with real-time stats
- 🍽️ Menu management (add/edit/delete items)
- 📦 Order management (view, update status)
- 🪑 Reservation management (view, confirm, cancel)
- 🎯 Table configuration

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development servers:**
   ```bash
   # Terminal 1 - Frontend
   npm run dev

   # Terminal 2 - Backend
   npm run server
   ```

3. **Access the application:**
   - Customer website: `http://localhost:5173`
   - Admin portal: `http://localhost:5173/admin/login`

## Admin Access

Default admin credentials (change these in production):
- **Username:** admin
- **Password:** admin123

## Project Structure

```
athidhi-restaurant/
├── client/              # Frontend React application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── lib/         # Utilities and helpers
│   │   └── App.tsx      # Main app component
├── server/              # Backend Express API
│   ├── index.ts         # Server entry point
│   └── db.ts            # Database configuration
├── public/              # Static assets
└── package.json         # Dependencies
```

## Technology Stack

- **Frontend:** React + TypeScript + Tailwind CSS
- **Backend:** Express.js + Node.js
- **Database:** PostgreSQL (ready to configure)
- **Build Tool:** Vite

## Documentation

See [DEPENDENCIES.md](./DEPENDENCIES.md) for detailed information about all packages and installation instructions.

## License

Private - Athidhi Family Restaurant

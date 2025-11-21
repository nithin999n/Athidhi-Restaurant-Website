import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadData, saveData } from './storage.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Load data on startup
let data = loadData();

// Ensure all required properties exist
if (!data.menuItems) data.menuItems = [];
if (!data.orders) data.orders = [];
if (!data.reservations) data.reservations = [];
if (!data.tables) data.tables = [];
if (!data.reviews) data.reviews = [];

// CORS configuration for production
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://athidhi-restaurant-website.onrender.com',
    'https://athidhi.food',
    'https://www.athidhi.food'
  ],
  credentials: true
}));
app.use(express.json());

// Serve static files from dist folder in production
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '../dist');
  app.use(express.static(distPath));
}

// Admin credentials (in production, use database with hashed passwords)
const ADMIN_USER = { username: 'admin', password: 'admin123' };

// Auth endpoint
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USER.username && password === ADMIN_USER.password) {
    res.json({ success: true, token: 'admin-token-123' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Menu endpoints
app.get('/api/menu', (req, res) => {
  try {
    res.json(data.menuItems || []);
  } catch (error) {
    console.error('Error fetching menu:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/menu', (req, res) => {
  const { name, description, price, category, image_url, available } = req.body;
  try {
    const newItem = {
      id: Date.now(),
      name,
      description,
      price,
      category,
      imageUrl: image_url,
      available: available ?? true
    };
    data.menuItems.push(newItem);
    saveData(data);
    res.json(newItem);
  } catch (error) {
    console.error('Error creating menu item:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.put('/api/menu/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, description, price, category, image_url, available } = req.body;
  try {
    const index = data.menuItems.findIndex((item: any) => item.id === id);
    if (index !== -1) {
      data.menuItems[index] = { ...data.menuItems[index], name, description, price, category, imageUrl: image_url, available };
      saveData(data);
      res.json(data.menuItems[index]);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    console.error('Error updating menu item:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/api/menu/:id', (req, res) => {
  const id = parseInt(req.params.id);
  try {
    data.menuItems = data.menuItems.filter((item: any) => item.id !== id);
    saveData(data);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting menu item:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Order endpoints
app.get('/api/orders', (req, res) => {
  try {
    res.json(data.orders || []);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/orders', (req, res) => {
  const { customer_name, customer_phone, customer_address, items, total_amount } = req.body;
  try {
    const newOrder = {
      id: Date.now(),
      customerName: customer_name,
      customerPhone: customer_phone,
      customerAddress: customer_address,
      items,
      totalAmount: total_amount,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    data.orders.push(newOrder);
    saveData(data);
    res.json(newOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.put('/api/orders/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;
  try {
    const index = data.orders.findIndex((order: any) => order.id === id);
    if (index !== -1) {
      data.orders[index].status = status;
      saveData(data);
      res.json(data.orders[index]);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Reservation endpoints
app.get('/api/reservations', (req, res) => {
  try {
    res.json(data.reservations || []);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/reservations', (req, res) => {
  const { customer_name, customer_phone, customer_email, date, time, guests, special_requests } = req.body;
  try {
    const newReservation = {
      id: Date.now(),
      customerName: customer_name,
      customerPhone: customer_phone,
      customerEmail: customer_email,
      date,
      time,
      guests,
      specialRequests: special_requests,
      status: 'pending',
      tableId: null,
      createdAt: new Date().toISOString()
    };
    data.reservations.push(newReservation);
    saveData(data);
    res.json(newReservation);
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.put('/api/reservations/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { status, table_id } = req.body;
  try {
    const index = data.reservations.findIndex((res: any) => res.id === id);
    if (index !== -1) {
      if (status) data.reservations[index].status = status;
      if (table_id) data.reservations[index].tableId = table_id;
      saveData(data);
      res.json(data.reservations[index]);
    } else {
      res.status(404).json({ message: 'Reservation not found' });
    }
  } catch (error) {
    console.error('Error updating reservation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Table endpoints
app.get('/api/tables', (req, res) => {
  try {
    res.json(data.tables || []);
  } catch (error) {
    console.error('Error fetching tables:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/tables', (req, res) => {
  const { table_number, capacity, location, available } = req.body;
  try {
    const newTable = {
      id: Date.now(),
      tableNumber: table_number,
      capacity,
      location,
      available: available ?? true
    };
    data.tables.push(newTable);
    saveData(data);
    res.json(newTable);
  } catch (error) {
    console.error('Error creating table:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.put('/api/tables/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { table_number, capacity, location, available } = req.body;
  try {
    const index = data.tables.findIndex((table: any) => table.id === id);
    if (index !== -1) {
      data.tables[index] = { ...data.tables[index], tableNumber: table_number, capacity, location, available };
      saveData(data);
      res.json(data.tables[index]);
    } else {
      res.status(404).json({ message: 'Table not found' });
    }
  } catch (error) {
    console.error('Error updating table:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/api/tables/:id', (req, res) => {
  const id = parseInt(req.params.id);
  try {
    data.tables = data.tables.filter((table: any) => table.id !== id);
    saveData(data);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting table:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Review endpoints
app.get('/api/reviews', (req, res) => {
  try {
    const reviews = data.reviews || [];
    const totalRating = reviews.reduce((sum: number, review: any) => sum + review.rating, 0);
    const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;
    
    res.json({
      reviews: reviews,
      overallRating: averageRating,
      totalReviews: reviews.length
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/reviews', (req, res) => {
  const { customer_name, rating, review_text, image_url } = req.body;
  try {
    const newReview = {
      id: Date.now(),
      customerName: customer_name,
      rating,
      reviewText: review_text,
      imageUrl: image_url,
      approved: false,
      createdAt: new Date().toISOString()
    };
    data.reviews.push(newReview);
    saveData(data);
    res.json(newReview);
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.put('/api/reviews/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { approved } = req.body;
  try {
    const index = data.reviews.findIndex((review: any) => review.id === id);
    if (index !== -1) {
      data.reviews[index].approved = approved;
      saveData(data);
      res.json(data.reviews[index]);
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/api/reviews/:id', (req, res) => {
  const id = parseInt(req.params.id);
  try {
    data.reviews = data.reviews.filter((review: any) => review.id !== id);
    saveData(data);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Admin data management endpoints
app.get('/api/admin/data-info', (req, res) => {
  try {
    res.json({
      database: 'File-based storage',
      counts: {
        menuItems: data.menuItems?.length || 0,
        orders: data.orders?.length || 0,
        reservations: data.reservations?.length || 0,
        tables: data.tables?.length || 0,
        reviews: data.reviews?.length || 0,
      }
    });
  } catch (error) {
    console.error('Error fetching data info:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Serve frontend for all other routes (must be last!)
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log(`💾 Storage: File-based (${process.env.NODE_ENV === 'production' ? '/tmp' : 'local data folder'})`);
  if (process.env.NODE_ENV === 'production') {
    console.log(`📦 Serving frontend from dist folder\n`);
  }
});

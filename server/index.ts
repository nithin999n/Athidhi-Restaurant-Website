import express from 'express';
import cors from 'cors';
import { loadData, saveData, getDataFilePath, clearAllData, backupData } from './storage';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Load data from file on startup
let data = loadData();
console.log('📂 Data file location:', getDataFilePath());
console.log('📊 Loaded data:', {
  menuItems: data.menuItems.length,
  orders: data.orders.length,
  reservations: data.reservations.length,
  tables: data.tables.length,
  reviews: data.reviews.length,
});

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
  res.json(data.menuItems);
});

app.post('/api/menu', (req, res) => {
  const item = { id: Date.now(), ...req.body };
  data.menuItems.push(item);
  saveData(data);
  res.json(item);
});

app.put('/api/menu/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = data.menuItems.findIndex(item => item.id === id);
  if (index !== -1) {
    data.menuItems[index] = { ...data.menuItems[index], ...req.body };
    saveData(data);
    res.json(data.menuItems[index]);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

app.delete('/api/menu/:id', (req, res) => {
  const id = parseInt(req.params.id);
  data.menuItems = data.menuItems.filter(item => item.id !== id);
  saveData(data);
  res.json({ success: true });
});

// Order endpoints
app.get('/api/orders', (req, res) => {
  res.json(data.orders);
});

app.post('/api/orders', (req, res) => {
  const order = {
    id: Date.now(),
    ...req.body,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  data.orders.push(order);
  saveData(data);
  res.json(order);
});

app.put('/api/orders/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = data.orders.findIndex(order => order.id === id);
  if (index !== -1) {
    data.orders[index] = { ...data.orders[index], ...req.body };
    saveData(data);
    res.json(data.orders[index]);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
});

// Reservation endpoints
app.get('/api/reservations', (req, res) => {
  res.json(data.reservations);
});

app.post('/api/reservations', (req, res) => {
  const reservation = {
    id: Date.now(),
    ...req.body,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  data.reservations.push(reservation);
  saveData(data);
  res.json(reservation);
});

app.put('/api/reservations/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = data.reservations.findIndex(res => res.id === id);
  if (index !== -1) {
    data.reservations[index] = { ...data.reservations[index], ...req.body };
    saveData(data);
    res.json(data.reservations[index]);
  } else {
    res.status(404).json({ message: 'Reservation not found' });
  }
});

// Table endpoints
app.get('/api/tables', (req, res) => {
  res.json(data.tables);
});

app.post('/api/tables', (req, res) => {
  const table = { id: Date.now(), ...req.body };
  data.tables.push(table);
  saveData(data);
  res.json(table);
});

app.put('/api/tables/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = data.tables.findIndex(table => table.id === id);
  if (index !== -1) {
    data.tables[index] = { ...data.tables[index], ...req.body };
    saveData(data);
    res.json(data.tables[index]);
  } else {
    res.status(404).json({ message: 'Table not found' });
  }
});

app.delete('/api/tables/:id', (req, res) => {
  const id = parseInt(req.params.id);
  data.tables = data.tables.filter(table => table.id !== id);
  saveData(data);
  res.json({ success: true });
});

// Review endpoints
app.get('/api/reviews', (req, res) => {
  // Sort by newest first and include calculated overall rating
  const sortedReviews = data.reviews.sort((a, b) => b.id - a.id);
  const totalRating = data.reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = data.reviews.length > 0 ? totalRating / data.reviews.length : 0;
  
  res.json({
    reviews: sortedReviews,
    overallRating: averageRating,
    totalReviews: data.reviews.length
  });
});

app.post('/api/reviews', (req, res) => {
  const review = {
    id: Date.now(),
    ...req.body,
    createdAt: new Date().toISOString(),
    approved: false // Reviews need admin approval
  };
  data.reviews.push(review);
  saveData(data);
  res.json(review);
});

app.put('/api/reviews/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = data.reviews.findIndex(review => review.id === id);
  if (index !== -1) {
    data.reviews[index] = { ...data.reviews[index], ...req.body };
    saveData(data);
    res.json(data.reviews[index]);
  } else {
    res.status(404).json({ message: 'Review not found' });
  }
});

app.delete('/api/reviews/:id', (req, res) => {
  const id = parseInt(req.params.id);
  data.reviews = data.reviews.filter(review => review.id !== id);
  saveData(data);
  res.json({ success: true });
});

// Admin data management endpoints
app.post('/api/admin/backup', (req, res) => {
  const backupFile = backupData();
  if (backupFile) {
    res.json({ success: true, file: backupFile });
  } else {
    res.status(500).json({ success: false, message: 'Backup failed' });
  }
});

app.post('/api/admin/clear-all', (req, res) => {
  const success = clearAllData();
  if (success) {
    data = loadData(); // Reload empty data
    res.json({ success: true, message: 'All data cleared' });
  } else {
    res.status(500).json({ success: false, message: 'Clear failed' });
  }
});

app.get('/api/admin/data-info', (req, res) => {
  res.json({
    dataFile: getDataFilePath(),
    counts: {
      menuItems: data.menuItems.length,
      orders: data.orders.length,
      reservations: data.reservations.length,
      tables: data.tables.length,
      reviews: data.reviews.length,
    }
  });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log(`💾 Data is being saved to: ${getDataFilePath()}`);
  console.log(`✅ All changes are automatically saved!\n`);
});

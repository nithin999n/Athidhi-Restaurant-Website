import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db, { initDatabase } from './db-sqlite.js';
import { upload, uploadToCloudinary } from './upload.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware
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

// Initialize database
initDatabase();

// Create default admin if not exists
const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get() as { count: number };
if (userCount.count === 0) {
  const hashedPassword = bcrypt.hashSync('admin123', 10);
  db.prepare('INSERT INTO users (username, password) VALUES (?, ?)').run('admin', hashedPassword);
  console.log('👤 Default admin user created (admin/admin123)');
}

// Serve static files
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
}

// Auth middleware
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied' });
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

// --- AUTH ROUTES ---

app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  try {
    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username) as any;
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// --- UPLOAD ROUTE ---

app.post('/api/upload', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    console.log('📥 Upload request received');
    
    if (!req.file) {
      console.error('❌ No file in request');
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    console.log('📥 File received:', {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.buffer.length
    });
    
    const imageUrl = await uploadToCloudinary(req.file.buffer, req.file.originalname);
    console.log('✅ Upload complete, returning URL:', imageUrl);
    res.json({ url: imageUrl });
  } catch (error: any) {
    console.error('❌ Upload endpoint error:', error);
    res.status(500).json({ 
      message: 'Upload failed', 
      error: error.message || 'Unknown error',
      details: error.stack
    });
  }
});

// --- MENU ROUTES ---

app.get('/api/menu', (req, res) => {
  try {
    const items = db.prepare('SELECT * FROM menu_items ORDER BY category, name').all() as any[];
    const formatted = items.map(item => ({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      imageUrl: item.image_url,
      available: Boolean(item.available)
    }));
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menu' });
  }
});

app.post('/api/menu', authenticateToken, (req, res) => {
  const { name, description, price, category, image_url, available } = req.body;
  try {
    const result = db.prepare(
      'INSERT INTO menu_items (name, description, price, category, image_url, available) VALUES (?, ?, ?, ?, ?, ?)'
    ).run(name, description, price, category, image_url, available ? 1 : 0);
    
    const item = db.prepare('SELECT * FROM menu_items WHERE id = ?').get(result.lastInsertRowid) as any;
    res.json({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      imageUrl: item.image_url,
      available: Boolean(item.available)
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating menu item' });
  }
});

app.put('/api/menu/:id', authenticateToken, (req, res) => {
  const { name, description, price, category, image_url, available } = req.body;
  try {
    db.prepare(
      'UPDATE menu_items SET name = ?, description = ?, price = ?, category = ?, image_url = ?, available = ? WHERE id = ?'
    ).run(name, description, price, category, image_url, available ? 1 : 0, req.params.id);
    
    const item = db.prepare('SELECT * FROM menu_items WHERE id = ?').get(req.params.id) as any;
    if (!item) return res.status(404).json({ message: 'Item not found' });
    
    res.json({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      imageUrl: item.image_url,
      available: Boolean(item.available)
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating menu item' });
  }
});

app.delete('/api/menu/:id', authenticateToken, (req, res) => {
  try {
    db.prepare('DELETE FROM menu_items WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting menu item' });
  }
});

// --- ORDER ROUTES ---

app.get('/api/orders', (req, res) => {
  try {
    const orders = db.prepare('SELECT * FROM orders ORDER BY created_at DESC').all() as any[];
    const formatted = orders.map(order => ({
      id: order.id,
      customerName: order.customer_name,
      customerPhone: order.customer_phone,
      customerAddress: order.customer_address,
      items: JSON.parse(order.items),
      totalAmount: order.total_amount,
      status: order.status,
      createdAt: order.created_at
    }));
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

app.post('/api/orders', (req, res) => {
  const { customer_name, customer_phone, customer_address, items, total_amount } = req.body;
  try {
    const result = db.prepare(
      'INSERT INTO orders (customer_name, customer_phone, customer_address, items, total_amount, status) VALUES (?, ?, ?, ?, ?, ?)'
    ).run(customer_name, customer_phone, customer_address, JSON.stringify(items), total_amount, 'pending');
    
    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(result.lastInsertRowid) as any;
    res.json({
      id: order.id,
      customerName: order.customer_name,
      customerPhone: order.customer_phone,
      customerAddress: order.customer_address,
      items: JSON.parse(order.items),
      totalAmount: order.total_amount,
      status: order.status,
      createdAt: order.created_at
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating order' });
  }
});

app.put('/api/orders/:id', authenticateToken, (req, res) => {
  const { status } = req.body;
  try {
    db.prepare('UPDATE orders SET status = ? WHERE id = ?').run(status, req.params.id);
    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id) as any;
    if (!order) return res.status(404).json({ message: 'Order not found' });
    
    res.json({
      id: order.id,
      customerName: order.customer_name,
      customerPhone: order.customer_phone,
      customerAddress: order.customer_address,
      items: JSON.parse(order.items),
      totalAmount: order.total_amount,
      status: order.status,
      createdAt: order.created_at
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating order' });
  }
});

// --- RESERVATION ROUTES ---

app.get('/api/reservations', (req, res) => {
  try {
    const reservations = db.prepare('SELECT * FROM reservations ORDER BY date, time').all() as any[];
    const formatted = reservations.map(r => ({
      id: r.id,
      customerName: r.customer_name,
      customerPhone: r.customer_phone,
      customerEmail: r.customer_email,
      date: r.date,
      time: r.time,
      guests: r.guests,
      specialRequests: r.special_requests,
      status: r.status,
      tableId: r.table_id,
      createdAt: r.created_at
    }));
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reservations' });
  }
});

app.post('/api/reservations', (req, res) => {
  const { customer_name, customer_phone, customer_email, date, time, guests, special_requests } = req.body;
  try {
    const result = db.prepare(
      'INSERT INTO reservations (customer_name, customer_phone, customer_email, date, time, guests, special_requests, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    ).run(customer_name, customer_phone, customer_email, date, time, guests, special_requests, 'pending');
    
    const r = db.prepare('SELECT * FROM reservations WHERE id = ?').get(result.lastInsertRowid) as any;
    res.json({
      id: r.id,
      customerName: r.customer_name,
      customerPhone: r.customer_phone,
      customerEmail: r.customer_email,
      date: r.date,
      time: r.time,
      guests: r.guests,
      specialRequests: r.special_requests,
      status: r.status,
      tableId: r.table_id,
      createdAt: r.created_at
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating reservation' });
  }
});

app.put('/api/reservations/:id', authenticateToken, (req, res) => {
  const { status, table_id } = req.body;
  try {
    if (status) db.prepare('UPDATE reservations SET status = ? WHERE id = ?').run(status, req.params.id);
    if (table_id) db.prepare('UPDATE reservations SET table_id = ? WHERE id = ?').run(table_id, req.params.id);
    
    const r = db.prepare('SELECT * FROM reservations WHERE id = ?').get(req.params.id) as any;
    if (!r) return res.status(404).json({ message: 'Reservation not found' });
    
    res.json({
      id: r.id,
      customerName: r.customer_name,
      customerPhone: r.customer_phone,
      customerEmail: r.customer_email,
      date: r.date,
      time: r.time,
      guests: r.guests,
      specialRequests: r.special_requests,
      status: r.status,
      tableId: r.table_id,
      createdAt: r.created_at
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating reservation' });
  }
});

// --- REVIEW ROUTES ---

app.get('/api/reviews', (req, res) => {
  try {
    const approved = db.prepare('SELECT * FROM reviews WHERE approved = 1 ORDER BY created_at DESC').all() as any[];
    const all = db.prepare('SELECT * FROM reviews').all() as any[];
    
    const totalRating = all.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = all.length > 0 ? totalRating / all.length : 0;
    
    const reviews = approved.map(r => ({
      id: r.id,
      customerName: r.customer_name,
      rating: r.rating,
      reviewText: r.review_text,
      imageUrl: r.image_url,
      approved: Boolean(r.approved),
      createdAt: r.created_at
    }));
    
    res.json({
      reviews,
      overallRating: averageRating,
      totalReviews: all.length
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews' });
  }
});

app.get('/api/admin/reviews', authenticateToken, (req, res) => {
  try {
    const all = db.prepare('SELECT * FROM reviews ORDER BY created_at DESC').all() as any[];
    
    const totalRating = all.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = all.length > 0 ? totalRating / all.length : 0;
    
    const reviews = all.map(r => ({
      id: r.id,
      customerName: r.customer_name,
      rating: r.rating,
      reviewText: r.review_text,
      imageUrl: r.image_url,
      approved: Boolean(r.approved),
      createdAt: r.created_at
    }));
    
    res.json({
      reviews,
      overallRating: averageRating,
      totalReviews: all.length
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admin reviews' });
  }
});

app.post('/api/reviews', upload.single('image'), async (req, res) => {
  try {
    let imageUrl = req.body.image_url;
    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file.buffer);
    }

    const result = db.prepare(
      'INSERT INTO reviews (customer_name, rating, review_text, image_url, approved) VALUES (?, ?, ?, ?, ?)'
    ).run(req.body.customer_name, req.body.rating, req.body.review_text, imageUrl, 0);
    
    const r = db.prepare('SELECT * FROM reviews WHERE id = ?').get(result.lastInsertRowid) as any;
    res.json({
      id: r.id,
      customerName: r.customer_name,
      rating: r.rating,
      reviewText: r.review_text,
      imageUrl: r.image_url,
      approved: Boolean(r.approved),
      createdAt: r.created_at
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating review' });
  }
});

app.put('/api/reviews/:id', authenticateToken, (req, res) => {
  const { approved } = req.body;
  try {
    db.prepare('UPDATE reviews SET approved = ? WHERE id = ?').run(approved ? 1 : 0, req.params.id);
    const r = db.prepare('SELECT * FROM reviews WHERE id = ?').get(req.params.id) as any;
    if (!r) return res.status(404).json({ message: 'Review not found' });
    
    res.json({
      id: r.id,
      customerName: r.customer_name,
      rating: r.rating,
      reviewText: r.review_text,
      imageUrl: r.image_url,
      approved: Boolean(r.approved),
      createdAt: r.created_at
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating review' });
  }
});

app.delete('/api/reviews/:id', authenticateToken, (req, res) => {
  try {
    db.prepare('DELETE FROM reviews WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting review' });
  }
});

// --- RAW DATA VIEWER ---

app.get('/api/admin/raw-data', authenticateToken, (req, res) => {
  try {
    const menuItems = db.prepare('SELECT * FROM menu_items').all();
    const orders = db.prepare('SELECT * FROM orders').all();
    const reservations = db.prepare('SELECT * FROM reservations').all();
    const reviews = db.prepare('SELECT * FROM reviews').all();
    const tables = db.prepare('SELECT * FROM tables').all();
    const users = db.prepare('SELECT id, username, created_at FROM users').all(); // Don't expose passwords
    
    res.json({
      database_file: '/opt/render/project/src/data/restaurant.db',
      tables: {
        menu_items: menuItems,
        orders: orders,
        reservations: reservations,
        reviews: reviews,
        tables: tables,
        users: users
      },
      counts: {
        menu_items: menuItems.length,
        orders: orders.length,
        reservations: reservations.length,
        reviews: reviews.length,
        tables: tables.length,
        users: users.length
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching raw data' });
  }
});

// --- STATS ROUTE ---

app.get('/api/admin/stats', authenticateToken, (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    let dateFilter = '';
    if (startDate && endDate) {
      dateFilter = `WHERE created_at >= '${startDate}' AND created_at <= '${endDate}'`;
    }

    const ordersResult = db.prepare(`SELECT COUNT(*) as count FROM orders ${dateFilter}`).get() as any;
    const revenueResult = db.prepare(`SELECT SUM(total_amount) as total FROM orders ${dateFilter} AND status != 'cancelled'`).get() as any;
    const reviewsResult = db.prepare(`SELECT COUNT(*) as count, AVG(rating) as avg FROM reviews ${dateFilter}`).get() as any;

    res.json({
      orders: ordersResult.count || 0,
      revenue: revenueResult.total || 0,
      reviews: reviewsResult.count || 0,
      averageRating: reviewsResult.avg || 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stats' });
  }
});

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log(`💾 Database: SQLite (file-based, persistent)`);
});

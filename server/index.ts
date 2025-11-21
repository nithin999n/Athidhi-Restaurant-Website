import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool, { initDatabase } from './db-postgres.js';
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
if (process.env.DATABASE_URL) {
  initDatabase().then(async () => {
    // Create default admin if not exists
    const result = await pool.query('SELECT COUNT(*) FROM users');
    if (parseInt(result.rows[0].count) === 0) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', ['admin', hashedPassword]);
      console.log('👤 Default admin user created (admin/admin123)');
    }
  });
} else {
  console.warn('⚠️  DATABASE_URL not found - please add PostgreSQL database');
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

app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
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
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const imageUrl = await uploadToCloudinary(req.file.buffer);
    res.json({ url: imageUrl });
  } catch (error) {
    res.status(500).json({ message: 'Upload failed' });
  }
});

// --- MENU ROUTES ---

app.get('/api/menu', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM menu_items ORDER BY category, name');
    const items = result.rows.map(item => ({
      id: item.id,
      name: item.name,
      description: item.description,
      price: parseFloat(item.price),
      category: item.category,
      imageUrl: item.image_url,
      available: item.available
    }));
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menu' });
  }
});

app.post('/api/menu', authenticateToken, async (req, res) => {
  const { name, description, price, category, image_url, available } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO menu_items (name, description, price, category, image_url, available) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, description, price, category, image_url, available ?? true]
    );
    const item = result.rows[0];
    res.json({ id: item.id, name: item.name, description: item.description, price: parseFloat(item.price), category: item.category, imageUrl: item.image_url, available: item.available });
  } catch (error) {
    res.status(500).json({ message: 'Error creating menu item' });
  }
});

app.put('/api/menu/:id', authenticateToken, async (req, res) => {
  const { name, description, price, category, image_url, available } = req.body;
  try {
    const result = await pool.query(
      'UPDATE menu_items SET name = $1, description = $2, price = $3, category = $4, image_url = $5, available = $6 WHERE id = $7 RETURNING *',
      [name, description, price, category, image_url, available, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'Item not found' });
    const item = result.rows[0];
    res.json({ id: item.id, name: item.name, description: item.description, price: parseFloat(item.price), category: item.category, imageUrl: item.image_url, available: item.available });
  } catch (error) {
    res.status(500).json({ message: 'Error updating menu item' });
  }
});

app.delete('/api/menu/:id', authenticateToken, async (req, res) => {
  try {
    await pool.query('DELETE FROM menu_items WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting menu item' });
  }
});

// --- ORDER ROUTES ---

app.get('/api/orders', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
    const orders = result.rows.map(order => ({
      id: order.id,
      customerName: order.customer_name,
      customerPhone: order.customer_phone,
      customerAddress: order.customer_address,
      items: order.items,
      totalAmount: parseFloat(order.total_amount),
      status: order.status,
      createdAt: order.created_at
    }));
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

app.post('/api/orders', async (req, res) => {
  const { customer_name, customer_phone, customer_address, items, total_amount } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO orders (customer_name, customer_phone, customer_address, items, total_amount, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [customer_name, customer_phone, customer_address, JSON.stringify(items), total_amount, 'pending']
    );
    const order = result.rows[0];
    res.json({
      id: order.id,
      customerName: order.customer_name,
      customerPhone: order.customer_phone,
      customerAddress: order.customer_address,
      items: order.items,
      totalAmount: parseFloat(order.total_amount),
      status: order.status,
      createdAt: order.created_at
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating order' });
  }
});

app.put('/api/orders/:id', authenticateToken, async (req, res) => {
  const { status } = req.body;
  try {
    const result = await pool.query(
      'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *',
      [status, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'Order not found' });
    const order = result.rows[0];
    res.json({
      id: order.id,
      customerName: order.customer_name,
      customerPhone: order.customer_phone,
      customerAddress: order.customer_address,
      items: order.items,
      totalAmount: parseFloat(order.total_amount),
      status: order.status,
      createdAt: order.created_at
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating order' });
  }
});

// --- RESERVATION ROUTES ---

app.get('/api/reservations', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM reservations ORDER BY date, time');
    const reservations = result.rows.map(r => ({
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
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reservations' });
  }
});

app.post('/api/reservations', async (req, res) => {
  const { customer_name, customer_phone, customer_email, date, time, guests, special_requests } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO reservations (customer_name, customer_phone, customer_email, date, time, guests, special_requests, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [customer_name, customer_phone, customer_email, date, time, guests, special_requests, 'pending']
    );
    const r = result.rows[0];
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

app.put('/api/reservations/:id', authenticateToken, async (req, res) => {
  const { status, table_id } = req.body;
  try {
    const result = await pool.query(
      'UPDATE reservations SET status = COALESCE($1, status), table_id = COALESCE($2, table_id) WHERE id = $3 RETURNING *',
      [status, table_id, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'Reservation not found' });
    const r = result.rows[0];
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

app.get('/api/reviews', async (req, res) => {
  try {
    const approved = await pool.query('SELECT * FROM reviews WHERE approved = true ORDER BY created_at DESC');
    const all = await pool.query('SELECT * FROM reviews');
    
    const totalRating = all.rows.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = all.rows.length > 0 ? totalRating / all.rows.length : 0;
    
    const reviews = approved.rows.map(r => ({
      id: r.id,
      customerName: r.customer_name,
      rating: r.rating,
      reviewText: r.review_text,
      imageUrl: r.image_url,
      approved: r.approved,
      createdAt: r.created_at
    }));
    
    res.json({
      reviews,
      overallRating: averageRating,
      totalReviews: all.rows.length
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews' });
  }
});

app.get('/api/admin/reviews', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM reviews ORDER BY created_at DESC');
    const reviews = result.rows.map(r => ({
      id: r.id,
      customerName: r.customer_name,
      rating: r.rating,
      reviewText: r.review_text,
      imageUrl: r.image_url,
      approved: r.approved,
      createdAt: r.created_at
    }));
    
    const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;
    
    res.json({
      reviews,
      overallRating: averageRating,
      totalReviews: reviews.length
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

    const result = await pool.query(
      'INSERT INTO reviews (customer_name, rating, review_text, image_url, approved) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [req.body.customer_name, req.body.rating, req.body.review_text, imageUrl, false]
    );
    const r = result.rows[0];
    res.json({
      id: r.id,
      customerName: r.customer_name,
      rating: r.rating,
      reviewText: r.review_text,
      imageUrl: r.image_url,
      approved: r.approved,
      createdAt: r.created_at
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating review' });
  }
});

app.put('/api/reviews/:id', authenticateToken, async (req, res) => {
  const { approved } = req.body;
  try {
    const result = await pool.query(
      'UPDATE reviews SET approved = $1 WHERE id = $2 RETURNING *',
      [approved, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'Review not found' });
    const r = result.rows[0];
    res.json({
      id: r.id,
      customerName: r.customer_name,
      rating: r.rating,
      reviewText: r.review_text,
      imageUrl: r.image_url,
      approved: r.approved,
      createdAt: r.created_at
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating review' });
  }
});

app.delete('/api/reviews/:id', authenticateToken, async (req, res) => {
  try {
    await pool.query('DELETE FROM reviews WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting review' });
  }
});

// --- STATS ROUTE ---

app.get('/api/admin/stats', authenticateToken, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    let dateFilter = '';
    const params: any[] = [];
    
    if (startDate && endDate) {
      dateFilter = 'WHERE created_at >= $1 AND created_at <= $2';
      params.push(startDate, endDate);
    }

    const ordersResult = await pool.query(`SELECT COUNT(*) as count FROM orders ${dateFilter}`, params);
    const revenueResult = await pool.query(`SELECT SUM(total_amount) as total FROM orders ${dateFilter} AND status != 'cancelled'`, params);
    const reviewsResult = await pool.query(`SELECT COUNT(*) as count, AVG(rating) as avg FROM reviews ${dateFilter}`, params);

    res.json({
      orders: parseInt(ordersResult.rows[0].count),
      revenue: parseFloat(revenueResult.rows[0].total || 0),
      reviews: parseInt(reviewsResult.rows[0].count),
      averageRating: parseFloat(reviewsResult.rows[0].avg || 0)
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
  console.log(`💾 Database: PostgreSQL ${process.env.DATABASE_URL ? '(Connected)' : '(Not configured)'}`);
});

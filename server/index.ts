import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import pool, { initDatabase } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

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

// Initialize database on startup
initDatabase().catch(console.error);

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
app.get('/api/menu', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM menu_items ORDER BY category, name');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching menu:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/menu', async (req, res) => {
  const { name, description, price, category, image_url, available } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO menu_items (name, description, price, category, image_url, available) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, description, price, category, image_url, available ?? true]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error creating menu item:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.put('/api/menu/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, description, price, category, image_url, available } = req.body;
  try {
    const result = await pool.query(
      'UPDATE menu_items SET name = $1, description = $2, price = $3, category = $4, image_url = $5, available = $6 WHERE id = $7 RETURNING *',
      [name, description, price, category, image_url, available, id]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    console.error('Error updating menu item:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/api/menu/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await pool.query('DELETE FROM menu_items WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting menu item:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Order endpoints
app.get('/api/orders', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/orders', async (req, res) => {
  const { customer_name, customer_phone, customer_address, items, total_amount } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO orders (customer_name, customer_phone, customer_address, items, total_amount, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [customer_name, customer_phone, customer_address, JSON.stringify(items), total_amount, 'pending']
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.put('/api/orders/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;
  try {
    const result = await pool.query(
      'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Reservation endpoints
app.get('/api/reservations', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM reservations ORDER BY date, time');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/reservations', async (req, res) => {
  const { customer_name, customer_phone, customer_email, date, time, guests, special_requests } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO reservations (customer_name, customer_phone, customer_email, date, time, guests, special_requests, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [customer_name, customer_phone, customer_email, date, time, guests, special_requests, 'pending']
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.put('/api/reservations/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { status, table_id } = req.body;
  try {
    const result = await pool.query(
      'UPDATE reservations SET status = COALESCE($1, status), table_id = COALESCE($2, table_id) WHERE id = $3 RETURNING *',
      [status, table_id, id]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Reservation not found' });
    }
  } catch (error) {
    console.error('Error updating reservation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Table endpoints
app.get('/api/tables', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tables ORDER BY table_number');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching tables:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/tables', async (req, res) => {
  const { table_number, capacity, location, available } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO tables (table_number, capacity, location, available) VALUES ($1, $2, $3, $4) RETURNING *',
      [table_number, capacity, location, available ?? true]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error creating table:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.put('/api/tables/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { table_number, capacity, location, available } = req.body;
  try {
    const result = await pool.query(
      'UPDATE tables SET table_number = $1, capacity = $2, location = $3, available = $4 WHERE id = $5 RETURNING *',
      [table_number, capacity, location, available, id]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Table not found' });
    }
  } catch (error) {
    console.error('Error updating table:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/api/tables/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await pool.query('DELETE FROM tables WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting table:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Review endpoints
app.get('/api/reviews', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM reviews ORDER BY created_at DESC');
    const reviews = result.rows;
    
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
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

app.post('/api/reviews', async (req, res) => {
  const { customer_name, rating, review_text, image_url } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO reviews (customer_name, rating, review_text, image_url, approved) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [customer_name, rating, review_text, image_url, false]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.put('/api/reviews/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { approved } = req.body;
  try {
    const result = await pool.query(
      'UPDATE reviews SET approved = $1 WHERE id = $2 RETURNING *',
      [approved, id]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/api/reviews/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await pool.query('DELETE FROM reviews WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Admin data management endpoints
app.get('/api/admin/data-info', async (req, res) => {
  try {
    const [menu, orders, reservations, tables, reviews] = await Promise.all([
      pool.query('SELECT COUNT(*) FROM menu_items'),
      pool.query('SELECT COUNT(*) FROM orders'),
      pool.query('SELECT COUNT(*) FROM reservations'),
      pool.query('SELECT COUNT(*) FROM tables'),
      pool.query('SELECT COUNT(*) FROM reviews')
    ]);

    res.json({
      database: process.env.DB_NAME || 'athidhi_restaurant',
      counts: {
        menuItems: parseInt(menu.rows[0].count),
        orders: parseInt(orders.rows[0].count),
        reservations: parseInt(reservations.rows[0].count),
        tables: parseInt(tables.rows[0].count),
        reviews: parseInt(reviews.rows[0].count),
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
  console.log(`🗄️  Database: ${process.env.DB_NAME || 'athidhi_restaurant'}`);
  if (process.env.NODE_ENV === 'production') {
    console.log(`📦 Serving frontend from dist folder\n`);
  }
});

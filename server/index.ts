import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { User } from './models/User.js';
import { Menu } from './models/Menu.js';
import { Order } from './models/Order.js';
import { Review } from './models/Review.js';
import { Reservation } from './models/Reservation.js';
import { upload, uploadToCloudinary } from './upload.js';
import { authenticateToken, AuthRequest } from './middleware/auth.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

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

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI;
if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI)
    .then(async () => {
      console.log('✅ Connected to MongoDB');
      // Create default admin if not exists
      const adminCount = await User.countDocuments();
      if (adminCount === 0) {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        await User.create({
          username: 'admin',
          password: hashedPassword
        });
        console.log('👤 Default admin user created');
      }
    })
    .catch(err => console.error('❌ MongoDB connection error:', err));
} else {
  console.warn('⚠️ MONGODB_URI not found in environment variables');
}

// Serve static files from dist folder in production
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '../dist');
  app.use(express.static(distPath));
}

// --- Auth Routes ---

app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET || 'secret', { expiresIn: '24h' });
    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/admin/check-auth', authenticateToken, (req, res) => {
  res.json({ success: true, user: (req as any).user });
});

// --- Upload Route ---

app.post('/api/upload', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const imageUrl = await uploadToCloudinary(req.file.buffer);
    res.json({ url: imageUrl });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Upload failed' });
  }
});

// --- Menu Routes ---

app.get('/api/menu', async (req, res) => {
  try {
    const items = await Menu.find().sort({ category: 1, name: 1 });
    // Map _id to id for frontend compatibility
    const formattedItems = items.map(item => ({ ...item.toObject(), id: item._id }));
    res.json(formattedItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menu' });
  }
});

app.post('/api/menu', authenticateToken, async (req, res) => {
  try {
    const newItem = await Menu.create(req.body);
    res.json({ ...newItem.toObject(), id: newItem._id });
  } catch (error) {
    res.status(500).json({ message: 'Error creating menu item' });
  }
});

app.put('/api/menu/:id', authenticateToken, async (req, res) => {
  try {
    const updatedItem = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
    res.json({ ...updatedItem.toObject(), id: updatedItem._id });
  } catch (error) {
    res.status(500).json({ message: 'Error updating menu item' });
  }
});

app.delete('/api/menu/:id', authenticateToken, async (req, res) => {
  try {
    await Menu.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting menu item' });
  }
});

// --- Order Routes ---

app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    const formattedOrders = orders.map(order => ({ ...order.toObject(), id: order._id }));
    res.json(formattedOrders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);
    res.json({ ...newOrder.toObject(), id: newOrder._id });
  } catch (error) {
    res.status(500).json({ message: 'Error creating order' });
  }
});

app.put('/api/orders/:id', authenticateToken, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
    res.json({ ...updatedOrder.toObject(), id: updatedOrder._id });
  } catch (error) {
    res.status(500).json({ message: 'Error updating order' });
  }
});

// --- Reservation Routes ---

app.get('/api/reservations', async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ date: 1, time: 1 });
    const formattedReservations = reservations.map(res => ({ ...res.toObject(), id: res._id }));
    res.json(formattedReservations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reservations' });
  }
});

app.post('/api/reservations', async (req, res) => {
  try {
    const newReservation = await Reservation.create(req.body);
    res.json({ ...newReservation.toObject(), id: newReservation._id });
  } catch (error) {
    res.status(500).json({ message: 'Error creating reservation' });
  }
});

app.put('/api/reservations/:id', authenticateToken, async (req, res) => {
  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedReservation) return res.status(404).json({ message: 'Reservation not found' });
    res.json({ ...updatedReservation.toObject(), id: updatedReservation._id });
  } catch (error) {
    res.status(500).json({ message: 'Error updating reservation' });
  }
});

// --- Review Routes ---

app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Review.find({ approved: true }).sort({ createdAt: -1 });
    const allReviews = await Review.find(); // For calculation
    
    const totalRating = allReviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = allReviews.length > 0 ? totalRating / allReviews.length : 0;
    
    const formattedReviews = reviews.map(review => ({ ...review.toObject(), id: review._id }));
    
    res.json({
      reviews: formattedReviews,
      overallRating: averageRating,
      totalReviews: allReviews.length
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews' });
  }
});

// Admin route to get ALL reviews (including unapproved)
app.get('/api/admin/reviews', authenticateToken, async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    const formattedReviews = reviews.map(review => ({ ...review.toObject(), id: review._id }));
    res.json(formattedReviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admin reviews' });
  }
});

app.post('/api/reviews', upload.single('image'), async (req, res) => {
  try {
    let imageUrl = req.body.image_url; // From URL input if any
    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file.buffer);
    }

    const reviewData = {
      customerName: req.body.customer_name,
      rating: Number(req.body.rating),
      reviewText: req.body.review_text,
      imageUrl: imageUrl,
      approved: false
    };

    const newReview = await Review.create(reviewData);
    res.json({ ...newReview.toObject(), id: newReview._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating review' });
  }
});

app.put('/api/reviews/:id', authenticateToken, async (req, res) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedReview) return res.status(404).json({ message: 'Review not found' });
    res.json({ ...updatedReview.toObject(), id: updatedReview._id });
  } catch (error) {
    res.status(500).json({ message: 'Error updating review' });
  }
});

app.delete('/api/reviews/:id', authenticateToken, async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting review' });
  }
});

// --- Admin Stats Routes ---

app.get('/api/admin/stats', authenticateToken, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    let dateFilter: any = {};
    if (startDate && endDate) {
      dateFilter = {
        createdAt: {
          $gte: new Date(startDate as string),
          $lte: new Date(endDate as string)
        }
      };
    }

    const totalOrders = await Order.countDocuments(dateFilter);
    const totalRevenueResult = await Order.aggregate([
      { $match: { ...dateFilter, status: { $ne: 'cancelled' } } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);
    const totalRevenue = totalRevenueResult[0]?.total || 0;

    const totalReviews = await Review.countDocuments(dateFilter);
    const reviews = await Review.find(dateFilter);
    const avgRating = reviews.length > 0 
      ? reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length 
      : 0;

    res.json({
      orders: totalOrders,
      revenue: totalRevenue,
      reviews: totalReviews,
      averageRating: avgRating
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stats' });
  }
});

app.get('/api/admin/data-info', authenticateToken, async (req, res) => {
  try {
    const counts = {
      menuItems: await Menu.countDocuments(),
      orders: await Order.countDocuments(),
      reservations: await Reservation.countDocuments(),
      reviews: await Review.countDocuments(),
    };
    res.json({
      database: 'MongoDB Atlas',
      counts
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data info' });
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
});

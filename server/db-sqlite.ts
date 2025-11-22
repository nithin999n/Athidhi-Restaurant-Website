import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use persistent storage directory
const DATA_DIR = process.env.NODE_ENV === 'production' 
  ? '/opt/render/project/src/data'  // Render persistent disk
  : path.join(process.cwd(), 'data');

console.log('📁 Data directory:', DATA_DIR);
console.log('🌍 Environment:', process.env.NODE_ENV || 'development');

// Ensure directory exists
if (!fs.existsSync(DATA_DIR)) {
  console.log('📂 Creating data directory...');
  fs.mkdirSync(DATA_DIR, { recursive: true });
  console.log('✅ Data directory created');
} else {
  console.log('✅ Data directory exists');
}

const DB_PATH = path.join(DATA_DIR, 'restaurant.db');
console.log('💾 Database path:', DB_PATH);

// Create database connection
const db: Database.Database = new Database(DB_PATH);
db.pragma('journal_mode = WAL'); // Better performance

// Initialize tables
export const initDatabase = () => {
  try {
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS menu_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        price REAL NOT NULL,
        category TEXT,
        image_url TEXT,
        available INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_name TEXT NOT NULL,
        customer_phone TEXT NOT NULL,
        customer_address TEXT NOT NULL,
        items TEXT NOT NULL,
        total_amount REAL NOT NULL,
        status TEXT DEFAULT 'pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS reservations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_name TEXT NOT NULL,
        customer_phone TEXT NOT NULL,
        customer_email TEXT,
        date TEXT NOT NULL,
        time TEXT NOT NULL,
        guests INTEGER NOT NULL,
        special_requests TEXT,
        status TEXT DEFAULT 'pending',
        table_id INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS tables (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        table_number INTEGER NOT NULL,
        capacity INTEGER NOT NULL,
        location TEXT,
        available INTEGER DEFAULT 1
      );

      CREATE TABLE IF NOT EXISTS reviews (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_name TEXT NOT NULL,
        rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
        review_text TEXT NOT NULL,
        image_url TEXT,
        approved INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('✅ SQLite database initialized at:', DB_PATH);
  } catch (error) {
    console.error('❌ Error initializing database:', error);
  }
};

export default db;

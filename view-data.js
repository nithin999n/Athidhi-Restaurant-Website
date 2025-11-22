import Database from 'better-sqlite3';

const db = new Database('./data/restaurant.db');

console.log('\n📊 DATABASE CONTENTS\n');

// Menu Items
const menuItems = db.prepare('SELECT * FROM menu_items').all();
console.log('🍽️  MENU ITEMS:', menuItems.length);
console.log(menuItems);

// Orders
const orders = db.prepare('SELECT * FROM orders').all();
console.log('\n📦 ORDERS:', orders.length);
console.log(orders);

// Reservations
const reservations = db.prepare('SELECT * FROM reservations').all();
console.log('\n📅 RESERVATIONS:', reservations.length);
console.log(reservations);

// Reviews
const reviews = db.prepare('SELECT * FROM reviews').all();
console.log('\n⭐ REVIEWS:', reviews.length);
console.log(reviews);

// Users
const users = db.prepare('SELECT id, username, created_at FROM users').all();
console.log('\n👤 USERS:', users.length);
console.log(users);

// Tables
const tables = db.prepare('SELECT * FROM tables').all();
console.log('\n🪑 TABLES:', tables.length);
console.log(tables);

db.close();

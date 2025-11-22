import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';

const db = new Database('./data/restaurant.db');

console.log('\n🧪 Testing Login Process\n');

const username = 'admin';
const password = 'mymoney@999';

console.log('Attempting login with:');
console.log('   Username:', username);
console.log('   Password:', password);
console.log('');

// Get user from database
const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);

if (!user) {
  console.log('❌ User not found!');
  db.close();
  process.exit(1);
}

console.log('✅ User found in database');
console.log('   Stored hash:', user.password);
console.log('');

// Compare password
const isMatch = bcrypt.compareSync(password, user.password);

console.log('Password comparison result:', isMatch ? '✅ MATCH' : '❌ NO MATCH');

if (isMatch) {
  console.log('\n✅ Login should work with these credentials!');
  console.log('   Username: admin');
  console.log('   Password: mymoney@999');
} else {
  console.log('\n❌ Password does not match!');
}

db.close();

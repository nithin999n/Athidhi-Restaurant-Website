import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';

const db = new Database('./data/restaurant.db');

console.log('\n🔍 Checking Admin User...\n');

const user = db.prepare('SELECT * FROM users WHERE username = ?').get('admin');

if (user) {
  console.log('✅ Admin user found:');
  console.log('   Username:', user.username);
  console.log('   Password Hash:', user.password);
  console.log('   Created:', user.created_at);
  
  console.log('\n🔐 Testing passwords:\n');
  
  // Test admin123
  const isAdmin123 = bcrypt.compareSync('admin123', user.password);
  console.log('   admin123:', isAdmin123 ? '✅ WORKS' : '❌ Does not work');
  
  // Test mymoney@999
  const isMyMoney = bcrypt.compareSync('mymoney@999', user.password);
  console.log('   mymoney@999:', isMyMoney ? '✅ WORKS' : '❌ Does not work');
  
  console.log('\n');
} else {
  console.log('❌ No admin user found!');
}

db.close();

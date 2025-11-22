import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';

const db = new Database('./data/restaurant.db');

console.log('\n🔄 Resetting Admin Password\n');

// Set password to admin123 (default)
const newPassword = 'admin123';
const hashedPassword = bcrypt.hashSync(newPassword, 10);

try {
  db.prepare('UPDATE users SET password = ? WHERE username = ?').run(hashedPassword, 'admin');
  console.log('✅ Admin password reset successfully!');
  console.log('');
  console.log('📝 New credentials:');
  console.log('   Username: admin');
  console.log('   Password: admin123');
  console.log('');
  console.log('⚠️  Remember to restart your server!');
} catch (error) {
  console.error('❌ Error resetting password:', error);
}

db.close();

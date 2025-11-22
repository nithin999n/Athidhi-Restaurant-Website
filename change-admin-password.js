import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import readline from 'readline';

const db = new Database('./data/restaurant.db');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\n🔐 Change Admin Password\n');

rl.question('Enter new password: ', (newPassword) => {
  if (newPassword.length < 6) {
    console.log('❌ Password must be at least 6 characters long');
    rl.close();
    db.close();
    return;
  }

  const hashedPassword = bcrypt.hashSync(newPassword, 10);
  
  try {
    db.prepare('UPDATE users SET password = ? WHERE username = ?').run(hashedPassword, 'admin');
    console.log('✅ Admin password updated successfully!');
    console.log('🔒 New password:', newPassword);
  } catch (error) {
    console.error('❌ Error updating password:', error);
  }

  rl.close();
  db.close();
});

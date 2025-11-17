import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'restaurant-data.json');

// Default empty data structure
const DEFAULT_DATA = {
  menuItems: [],
  orders: [],
  reservations: [],
  tables: [],
  reviews: [],
};

// Ensure data directory exists
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    console.log('✅ Created data directory');
  }
}

// Load data from file
export function loadData() {
  ensureDataDir();
  
  try {
    if (fs.existsSync(DATA_FILE)) {
      const fileContent = fs.readFileSync(DATA_FILE, 'utf-8');
      const data = JSON.parse(fileContent);
      console.log('✅ Data loaded from file');
      return data;
    } else {
      console.log('📝 No data file found, creating new one');
      saveData(DEFAULT_DATA);
      return DEFAULT_DATA;
    }
  } catch (error) {
    console.error('❌ Error loading data:', error);
    return DEFAULT_DATA;
  }
}

// Save data to file
export function saveData(data: any) {
  ensureDataDir();
  
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    console.log('💾 Data saved to file');
    return true;
  } catch (error) {
    console.error('❌ Error saving data:', error);
    return false;
  }
}

// Get current data file path (for reference)
export function getDataFilePath() {
  return DATA_FILE;
}

// Clear all data (reset to empty)
export function clearAllData() {
  try {
    saveData(DEFAULT_DATA);
    console.log('🗑️ All data cleared');
    return true;
  } catch (error) {
    console.error('❌ Error clearing data:', error);
    return false;
  }
}

// Backup data
export function backupData() {
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFile = path.join(DATA_DIR, `backup-${timestamp}.json`);
    const data = loadData();
    fs.writeFileSync(backupFile, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`📦 Backup created: ${backupFile}`);
    return backupFile;
  } catch (error) {
    console.error('❌ Error creating backup:', error);
    return null;
  }
}

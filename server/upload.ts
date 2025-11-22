import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// Configure Cloudinary (if credentials are available)
const useCloudinary = !!(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET);

if (useCloudinary) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
  console.log('✅ Cloudinary configured');
} else {
  console.log('⚠️  Cloudinary not configured, using local storage');
}

// Multer config
const storage = multer.memoryStorage();
export const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG and WebP are allowed.'));
    }
  }
});

// Upload helper
export const uploadToCloudinary = async (fileBuffer: Buffer, filename: string = 'image'): Promise<string> => {
  // If Cloudinary is configured, use it
  if (useCloudinary) {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'athidhi-restaurant' },
        (error, result) => {
          if (error) {
            console.error('Cloudinary Upload Error:', error);
            reject(error);
          } else {
            console.log('Cloudinary Upload Success:', result?.secure_url);
            resolve(result?.secure_url || '');
          }
        }
      );
      uploadStream.end(fileBuffer);
    });
  }
  
  // Otherwise, save locally
  try {
    const uploadsDir = path.join(__dirname, '../client/public/uploads');
    
    // Create uploads directory if it doesn't exist
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    
    // Generate unique filename
    const timestamp = Date.now();
    const ext = filename.split('.').pop() || 'jpg';
    const newFilename = `menu-${timestamp}.${ext}`;
    const filepath = path.join(uploadsDir, newFilename);
    
    // Write file
    fs.writeFileSync(filepath, fileBuffer);
    
    // Return public URL
    const publicUrl = `/uploads/${newFilename}`;
    console.log('✅ Local upload success:', publicUrl);
    return publicUrl;
  } catch (error) {
    console.error('Local upload error:', error);
    throw error;
  }
};

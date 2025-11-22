import multer from 'multer';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// Check which upload service to use
const imgbbApiKey = process.env.IMGBB_API_KEY?.trim();
const useImgBB = !!(imgbbApiKey && imgbbApiKey.length > 0);

if (useImgBB) {
  console.log('✅ ImgBB configured for image uploads');
} else {
  console.log('⚠️  ImgBB not configured, using local storage for images');
}

// Multer config
const storage = multer.memoryStorage();
export const upload = multer({ 
  storage,
  limits: { fileSize: 32 * 1024 * 1024 }, // 32MB limit (ImgBB max)
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, WebP and GIF are allowed.'));
    }
  }
});

// Upload to ImgBB using https module
const uploadToImgBB = async (fileBuffer: Buffer): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const base64Image = fileBuffer.toString('base64');
      const formData = `key=${encodeURIComponent(imgbbApiKey!)}&image=${encodeURIComponent(base64Image)}`;
      
      const options = {
        hostname: 'api.imgbb.com',
        path: '/1/upload',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(formData)
        }
      };
      
      const req = https.request(options, (res: any) => {
        let data = '';
        
        res.on('data', (chunk: any) => {
          data += chunk;
        });
        
        res.on('end', () => {
          try {
            const jsonData = JSON.parse(data);
            if (jsonData.success && jsonData.data?.url) {
              console.log('✅ ImgBB upload success:', jsonData.data.url);
              resolve(jsonData.data.url);
            } else {
              console.error('ImgBB error:', jsonData);
              reject(new Error('ImgBB upload failed'));
            }
          } catch (error) {
            console.error('ImgBB parse error:', error);
            reject(error);
          }
        });
      });
      
      req.on('error', (error: any) => {
        console.error('ImgBB request error:', error);
        reject(error);
      });
      
      req.write(formData);
      req.end();
    } catch (error) {
      console.error('ImgBB upload error:', error);
      reject(error);
    }
  });
};

// Upload helper (main function)
export const uploadToCloudinary = async (fileBuffer: Buffer, filename: string = 'image'): Promise<string> => {
  console.log('📤 Upload started, file size:', fileBuffer.length, 'bytes');
  console.log('📤 Using ImgBB:', useImgBB);
  
  // If ImgBB is configured, use it
  if (useImgBB) {
    try {
      console.log('📤 Attempting ImgBB upload...');
      const url = await uploadToImgBB(fileBuffer);
      console.log('✅ ImgBB upload complete:', url);
      return url;
    } catch (error) {
      console.error('❌ ImgBB upload failed:', error);
      console.log('⚠️  Falling back to local storage...');
      // Fall through to local storage
    }
  }
  
  // Otherwise, save locally (or fallback)
  try {
    console.log('📤 Attempting local storage upload...');
    const uploadsDir = path.join(__dirname, '../client/public/uploads');
    
    // Create uploads directory if it doesn't exist
    if (!fs.existsSync(uploadsDir)) {
      console.log('📁 Creating uploads directory:', uploadsDir);
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
    console.error('❌ Local upload error:', error);
    throw new Error(`Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

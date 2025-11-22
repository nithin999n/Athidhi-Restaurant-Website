import multer from 'multer';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
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

// Upload to ImgBB
const uploadToImgBB = async (fileBuffer: Buffer): Promise<string> => {
  try {
    const base64Image = fileBuffer.toString('base64');
    
    const formData = new URLSearchParams();
    formData.append('key', imgbbApiKey!);
    formData.append('image', base64Image);
    
    const response = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('ImgBB Upload Error:', errorText);
      throw new Error('ImgBB upload failed');
    }
    
    const data = await response.json();
    
    if (data.success && data.data?.url) {
      console.log('✅ ImgBB upload success:', data.data.url);
      return data.data.url;
    } else {
      throw new Error('ImgBB response invalid');
    }
  } catch (error) {
    console.error('ImgBB upload error:', error);
    throw error;
  }
};

// Upload helper (main function)
export const uploadToCloudinary = async (fileBuffer: Buffer, filename: string = 'image'): Promise<string> => {
  // If ImgBB is configured, use it
  if (useImgBB) {
    return await uploadToImgBB(fileBuffer);
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

import dotenv from "dotenv";

dotenv.config();

// MongoDB
export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/testdb";

// Server
export const PORT = process.env.PORT || 4000;

// Cloudinary
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

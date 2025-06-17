import mongoose from 'mongoose';
import dotenv from 'dotenv';

export default async () => {
  dotenv.config({ path: '.env.test' }); // optional
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/test-db');
};
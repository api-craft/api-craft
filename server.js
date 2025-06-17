import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import apiRoutes from './routes.js';
import { corsMiddleware } from './config/cors.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use(corsMiddleware)

app.use("/api",apiRoutes);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
import express from 'express';
import { corsMiddleware } from './config/cors.js';
import apiRoutes from './routes.js';

const app = express();
app.use(corsMiddleware)
app.use(express.json());
app.use('/api', apiRoutes);

export default app;
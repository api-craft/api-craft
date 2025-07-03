import express from 'express';
import { corsMiddleware } from './config/cors.js';
import apiRoutes from './routes.js';
import cacheMiddleware from '@api-craft/cache'

const app = express();

// Middleware & routes
app.use(corsMiddleware);
app.use(cacheMiddleware({
    storeType: "memory",
    prefix: "/api/",
    ttlSeconds:"52"
}))
app.use(express.json());
app.use('/api', apiRoutes);

export default app;

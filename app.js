import express from 'express';
import { corsMiddleware } from './config/cors.js';
import apiRoutes from './routes.js';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// Workaround for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load the YAML file
const yaml_path = path.join(__dirname, 'swagger.yaml');
const swaggerDocument = YAML.load(yaml_path);

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware & routes
app.use(corsMiddleware);
app.use(express.json());
app.use('/api', apiRoutes);

export default app;

import express from 'express';
import helmet from "helmet";
import healthRouter from './routes/health.js';
import { errorHandler } from './middleware/errorHandler.js';
import { requestLogger } from './middleware/requestLogger.js';
import { pool } from './config/db.js';
import userRouter from './routes/user.js';
import dotenv from 'dotenv';


const app = express();

app.use(express.json());
app.use(requestLogger);

// Add security headers
app.use(helmet());
dotenv.config();

pool
  .query('SELECT NOW()')
  .then((res) => console.log('DB Time:', res.rows[0]))
  .catch((err) => console.error('DB connection error', err));

app.use('/health', healthRouter);
app.use('/users', userRouter);

app.use(errorHandler);

export default app;

import express from 'express';
import healthRouter from './routes/health.js';
import { requestLogger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import { pool } from './config/db.js';
import userRouter from './routes/user.js';


const app = express();

app.use(express.json());
app.use(requestLogger);

pool.query('SELECT NOW()')
  .then(res => console.log('DB Time:', res.rows[0]))
  .catch(err => console.error('DB connection error', err));

app.use('/health', healthRouter);
app.use('/users', userRouter);

app.use(errorHandler);

export default app;

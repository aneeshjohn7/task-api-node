import express from 'express';
import healthRouter from './routes/health.js';
import { requestLogger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';


const app = express();

app.use(express.json());
app.use(requestLogger);


app.use('/health', healthRouter);

app.use(errorHandler);

export default app;

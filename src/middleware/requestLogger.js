import { v4 as uuidv4 } from 'uuid';

export const requestLogger = (req, res, next) => {
  const requestId = uuidv4();
  req.id = requestId;
  res.setHeader('X-Request-ID', requestId);
  const log = `[${new Date().toISOString()}] [${req.id}] ${req.method} ${req.originalUrl}`;
  console.log(log);

  next();
};

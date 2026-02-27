export const requestLogger = (req, res, next) => {
  const requestId = Math.random().toString(36).substring(2, 10);

  console.log(`[${new Date().toISOString()}] 
  ID:${requestId} 
  ${req.method} 
  ${req.url}`);

  next();
};

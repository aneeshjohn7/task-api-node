export const requestLogger = (req, res, next) => {
  const { method, url } = req;
  console.log(`[${new Date().toISOString()}] ${method} ${url}`);
  next(); // continue to next middleware
};
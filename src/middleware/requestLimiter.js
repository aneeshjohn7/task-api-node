import rateLimit from "express-rate-limit";

// Rate limiting middleware
export const apiLimiter = (wind, max) => rateLimit({
  windowMs: wind * 60 * 1000, // 15 minutes
  max: max, // max requests per IP
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false, // Disable deprecated headers
  message: {
    status: "error",
    message: "Too many requests, please try again later",
  },
});


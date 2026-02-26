// src/middleware/validateIdParam.js
export const validateIdParam = (req, res, next) => {
  const { id } = req.params;

  if (!/^\d+$/.test(id)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid ID. Must be a number."
    });
  }

  next();
};

export const paginationMiddleware = (req, res, next) => {
  const page = req.query.page ? Number(req.query.page) : 1;
  const limit = req.query.limit ? Number(req.query.limit) : 10;

  if (isNaN(page) || !Number.isInteger(page) || page < 1) {
    const err = new Error("Invalid page number");
    err.status = 400;
    return next(err);
  }

  if (isNaN(limit) || !Number.isInteger(limit) || limit < 1) {
    const err = new Error("Invalid limit number");
    err.status = 400;
    return next(err);
  }

  req.pagination = { page, limit };
  next();
};
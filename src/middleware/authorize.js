export const authorize = (roles) => {
  return (req, res, next) => {
    console.log(req.user.role);
    if (roles.includes(req.user.role)) next();
    else {
      return res.status(403).json({ message: 'Unauthorized' });
    }
  };
};

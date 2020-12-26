exports.authRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(res.send(`${req.user.role} not authorized`).status(401));
    }
  };
};

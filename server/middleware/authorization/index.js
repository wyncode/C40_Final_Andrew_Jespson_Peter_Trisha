exports.isChef = () => {
  return (req, res, next) => {
    if (!req.user.isChef) {
      return res.status(401).json({ error: 'access denied' });
    }
    next();
  };
};

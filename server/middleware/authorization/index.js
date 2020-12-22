exports.isChef = () => {
  return (req, res, next) => {
    if (!req.user.chef) {
      return res.status(401).json({ error: 'access denied' });
    }
    next();
  };
};

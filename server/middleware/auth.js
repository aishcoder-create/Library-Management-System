const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'No token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  } catch (err) {
    // if access token expired provide clear message
    if (err.name === 'TokenExpiredError') return res.status(401).json({ msg: 'Access token expired' });
    return res.status(401).json({ msg: 'Invalid token' });
  }
};

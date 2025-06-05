import jwt from 'jsonwebtoken';

/**
 * Middleware to verify JWT token and attach user data to the request.
 */
const authenticateToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.replace('Bearer ', '');
  console.log('Token from header:', token);

  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');

    if (typeof decoded !== 'object' || decoded === null || !('id' in decoded)) {
      res.status(403).json({ message: 'Invalid token structure' });
      return;
    }

    req.user = decoded;
    console.log('Token valid, user:', req.user);

    next();
  } catch (err) {
    console.error('Token verification error:', err);
    res.status(403).json({ message: 'Invalid token' });
  }
};

export default authenticateToken;

import jwt from 'jsonwebtoken';
import AuthUser from '../models/AuthUser.js';

export const requireAuth = async (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await AuthUser.findById(payload.sub);
    if (!user) return res.status(401).json({ message: 'Unauthorized' });
    req.user = { id: user._id, email: user.email, role: user.role };
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

export const authorize = (roles) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
  if (!roles.includes(req.user.role)) return res.status(403).json({ message: 'Forbidden' });
  next();
};

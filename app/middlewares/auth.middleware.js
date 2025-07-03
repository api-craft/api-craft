import jwt from 'jsonwebtoken';
import { Token } from '../models/token.model.js';

export const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer '))
    return res.status(401).json({ message: 'Token missing' });

  const token = authHeader.split(' ')[1];

  const tokenDoc = await Token.findOne({ token });
  if (!tokenDoc) return res.status(401).json({ message: 'Token invalid or expired' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    await Token.deleteOne({ token });
    return res.status(401).json({ message: 'Token expired' });
  }
};

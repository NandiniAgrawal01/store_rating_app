import jwt from 'jsonwebtoken';
import pool from '../db/pool.js';

export const authMiddleware = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const [user] = await pool.query('SELECT * FROM users WHERE id = ?', [decoded.id]);
    if (!user.length) return res.status(401).json({ message: 'User not found' });

    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

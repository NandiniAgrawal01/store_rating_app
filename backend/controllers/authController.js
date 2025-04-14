import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db/pool.js';

export const login = async (req, res) => {
  const { email, password } = req.body;
  const [user] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

  if (!user.length) return res.status(400).json({ message: 'Invalid credentials' });

  const match = await bcrypt.compare(password, user[0].password);
  if (!match) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user[0].id, role: user[0].role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token, role: user[0].role });
};

export const updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user.id;

  const [[user]] = await pool.query('SELECT password FROM users WHERE id = ?', [userId]);
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Old password is incorrect' });

  const hashed = await bcrypt.hash(newPassword, 10);
  await pool.query('UPDATE users SET password = ? WHERE id = ?', [hashed, userId]);

  res.json({ message: 'Password updated successfully' });
};

export const register = async (req, res) => {
  const { name, email, password, address } = req.body;

  if (!name || !email || !address || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const [existingUser] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
  if (existingUser.length > 0) {
    return res.status(400).json({ message: 'User already exists with this email' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const role = 'user';

  const [result] = await pool.query(
    'INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)',
    [name, email, hashedPassword, address, role]
  );

  const userId = result.insertId;

  const token = jwt.sign({ id: userId, role }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.status(201).json({ message: 'User registered successfully', token });
};
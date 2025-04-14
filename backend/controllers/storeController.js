import pool from '../db/pool.js';

export const getRatings = async (req, res) => {
  const userId = req.user.id;

  // Get store owned by this user
  const [store] = await pool.query('SELECT id FROM stores WHERE userId = ?', [userId]);
  if (!store.length) return res.status(404).json({ message: 'Store not found' });

  const storeId = store[0].id;

  // Get user ratings for that store
  const [users] = await pool.query(`
    SELECT u.name, u.email, r.rating
    FROM ratings r
    JOIN users u ON r.userId = u.id
    WHERE r.storeId = ?
  `, [storeId]);

  const [avg] = await pool.query(
    'SELECT AVG(rating) AS averageRating FROM ratings WHERE storeId = ?',
    [storeId]
  );

  res.json({ users, averageRating: avg[0].averageRating });
};
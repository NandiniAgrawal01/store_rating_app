import pool from '../db/pool.js';

export const getStores = async (req, res) => {
  const [stores] = await pool.query('SELECT s.*, AVG(r.rating) AS averageRating FROM stores s LEFT JOIN ratings r ON s.id = r.storeId GROUP BY s.id');
  res.json(stores);
};

export const getUserRatings = async (req, res) => {
  const userId = req.user.id;
  const [ratings] = await pool.query('SELECT storeId, rating FROM ratings WHERE userId = ?', [userId]);
  res.json(ratings);
};

export const rateStore = async (req, res) => {
  const { storeId, rating } = req.body;
  const userId = req.user.id;

  await pool.query(
    'INSERT INTO ratings (userId, storeId, rating) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE rating = VALUES(rating)',
    [userId, storeId, rating]
  );

  res.json({ message: 'Rating submitted' });
};

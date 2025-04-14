const db = require('../db/pool');

exports.rateStore = async (req, res) => {
  const { store_id, rating } = req.body;

  if (rating < 1 || rating > 5) return res.status(400).json({ message: 'Invalid rating' });

  const [existing] = await db.query(
    'SELECT * FROM ratings WHERE store_id = ? AND user_id = ?',
    [store_id, req.user.id]
  );

  if (existing.length) {
    await db.query('UPDATE ratings SET rating = ? WHERE store_id = ? AND user_id = ?', [
      rating,
      store_id,
      req.user.id,
    ]);
  } else {
    await db.query('INSERT INTO ratings (store_id, user_id, rating) VALUES (?, ?, ?)', [
      store_id,
      req.user.id,
      rating,
    ]);
  }

  res.json({ message: 'Rating saved' });
};

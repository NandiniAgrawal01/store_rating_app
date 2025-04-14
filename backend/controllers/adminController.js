import pool from "../db/pool.js";
import bcrypt from "bcrypt";

export const getDashboardStats = async (req, res) => {
  const [[{ totalUsers }]] = await pool.query(
    "SELECT COUNT(*) AS totalUsers FROM users"
  );
  const [[{ totalStores }]] = await pool.query(
    "SELECT COUNT(*) AS totalStores FROM stores"
  );
  const [[{ totalRatings }]] = await pool.query(
    "SELECT COUNT(*) AS totalRatings FROM ratings"
  );

  res.json({ totalUsers, totalStores, totalRatings });
};

export const addUser = async (req, res) => {
  const { name, email, password, address, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  await pool.query(
    "INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)",
    [name, email, hashed, address, role]
  );
  res.json({ message: "User created" });
};

export const addStore = async (req, res) => {
  const { name, email, address, userId } = req.body;
  await pool.query(
    "INSERT INTO stores (name, email, address, userId) VALUES (?, ?, ?, ?)",
    [name, email, address, userId]
  );
  res.json({ message: "Store added" });
};

export const getUsers = async (req, res) => {
  const { name = "", email = "", address = "", role = "" } = req.query;
  const [users] = await pool.query(
    `SELECT id, name, email, address, role FROM users 
     WHERE name LIKE ? AND email LIKE ? AND address LIKE ? AND role LIKE ?`,
    [`%${name}%`, `%${email}%`, `%${address}%`, `%${role}%`]
  );
  res.json(users);
};

export const getStores = async (req, res) => {
  const { name = "", email = "", address = "" } = req.query;
  const [stores] = await pool.query(
    `SELECT s.id, s.name, s.email, s.address, 
       ROUND(IFNULL(AVG(r.rating), 0), 1) as rating 
FROM stores s 
LEFT JOIN ratings r ON s.id = r.storeId 
WHERE s.name LIKE ? AND s.email LIKE ? AND s.address LIKE ?
GROUP BY s.id`,
    [`%${name}%`, `%${email}%`, `%${address}%`]
  );
  res.json(stores);
};

export const getUserDetails = async (req, res) => {
  const { id } = req.params;
  const [[user]] = await pool.query(
    `SELECT 
      u.id, 
      u.name, 
      u.email, 
      u.address, 
      u.role, 
      ROUND(IFNULL(AVG(r.rating), 0), 1) AS rating
    FROM users u
    LEFT JOIN stores s ON u.id = s.userId
    LEFT JOIN ratings r ON s.id = r.storeId
    WHERE u.id = ?
    GROUP BY u.id`,
    [id]
  );
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

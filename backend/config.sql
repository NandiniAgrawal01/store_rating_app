-- CREATE DATABASE store_rating;

-- USE store_rating;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(60) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  address VARCHAR(400),
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user', 'store_owner') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE stores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100),
  address VARCHAR(400),
  userId INT,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE ratings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  storeId INT,
  userId INT,
  rating INT CHECK (rating BETWEEN 1 AND 5),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (storeId) REFERENCES stores(id),
  FOREIGN KEY (userId) REFERENCES users(id),
  UNIQUE KEY (storeId, userId)
);

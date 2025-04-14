# 🛠️ FullStack Role-Based Store Rating System

This is a full-stack web application built with the **MERN stack** (MySQL + Express.js + React + Node.js) featuring a **role-based rating system**. It supports three user roles: `Admin`, `Store Owner`, and `Normal User`. The application allows for user management, store creation, and store rating with secure access and a dynamic UI.

---

## ✨ Features

- 🔐 **Role-Based Access Control**: Admin, Store Owner, Normal User
- 📊 **Store Ratings**: Users can rate stores, store owners can view ratings
- 🧑‍💼 **Admin Panel**: Create/update users and stores, view details with expandable panels
- 🧩 **Componentized UI**: Built with **React** and **Material UI (MUI)**
- ⚙️ **Backend API**: Built with **Express.js** and **MySQL**
- 🛡️ **Authentication**: JWT-based login
- ✅ **Validation**: Form input validation using regex and constraints

---

## 🧑‍💻 Tech Stack

| Layer     | Tech                              |
|-----------|-----------------------------------|
| Frontend  | React.js, Material UI (MUI)       |
| Backend   | Node.js, Express.js               |
| Database  | MySQL                             |
| Auth      | JWT (JSON Web Token)              |
| Styling   | CSS + MUI                         |

---

## 🚀 Getting Started

### 1. Clone the Repository
- git clone https://github.com/NandiniAgrawal01/store_rating_app.git
- cd store_rating_app

### 2. Setup Environment Variables
Create .env files in backend directories.

📁 backend/.env
- PORT=5000
- DB_HOST=localhost
- DB_USER=your_mysql_user
- DB_PASSWORD=your_mysql_password
- DB_NAME=your_database_name
- JWT_SECRET=your_jwt_secret

### 3. Install Dependencies
📦 Backend
- cd backend
- npm install

💻 Frontend
- cd frontend
- npm install

### 4. Initialize the Database
Make sure MySQL is running. Then execute the schema in your SQL client or terminal:
- CREATE DATABASE your_database_name;
- USE your_database_name;

- Add your user, store, and rating tables here
- You can use backend/config.sql file for the table queries

### 5. Run the Application
🔧 Start Backend Server
- cd backend
- npm run dev
- Runs on http://localhost:5000

💻 Start Frontend
- cd frontend
- npm start
- Runs on http://localhost:3000

---

## 🧪 Using the Application

### 👩‍💼 Admin Features
- View total users, stores and ratings count
- View all users and stores
- Create or update users/stores
- Expand user details
- See ratings for store owners

### 🛍️ Store Owner Features
- View own store average rating
- View list of users who rated their store
- Update password

### 👤 Normal User Features
- View list of all registered stores
- Add or update ratings in different stores
- Update password

---

## 📚 Project Structure Summary

- frontennd/ – React + MUI frontend
- backend/ – Node.js and Express.js backend with routing and MySQL integration
- README.md – Full documentation
- .env – Secrets and configuration

---

### 🤝 Contributing
Feel free to fork and open pull requests! If you encounter bugs or want to suggest improvements, submit an issue.

### 📄 License
This project is licensed under the MIT License.

### 🧑‍🏫 Author
Nandini Agrawal
📧 nandiniagrawal139@gmail.com
🔗 https://www.linkedin.com/in/nandini-agrawal-874132245/ 

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import PrivateRoute from './auth/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardAdmin from './pages/DashboardAdmin';
import DashboardUser from './pages/DashboardUser';
import DashboardOwner from './pages/DashboardStoreOwner';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<PrivateRoute allowedRoles={['admin']}><DashboardAdmin /></PrivateRoute>} />
          <Route path="/user" element={<PrivateRoute allowedRoles={['user']}><DashboardUser /></PrivateRoute>} />
          <Route path="/store" element={<PrivateRoute allowedRoles={['store']}><DashboardOwner /></PrivateRoute>} />
          <Route path="/unauthorized" element={<h2>Access Denied</h2>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

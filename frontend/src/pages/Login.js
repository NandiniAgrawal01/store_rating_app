import React, { useState } from 'react';
import {
  Container, TextField, Button, Typography, Box, Alert
} from '@mui/material';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', form);
      login(res.data);

      const role = res.data.role;
      if (role === 'admin') navigate('/admin');
      else if (role === 'user') navigate('/user');
      else if (role === 'storeowner') navigate('/store');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={10} p={4} boxShadow={3} borderRadius={2}>
        <Typography variant="h5" gutterBottom>Login</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email" name="email" fullWidth margin="normal"
            value={form.email} onChange={handleChange} required
          />
          <TextField
            label="Password" name="password" type="password" fullWidth
            margin="normal" value={form.password} onChange={handleChange} required
          />
          <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>
            Login
          </Button>
        </form>
        <Button onClick={() => navigate('/register')} sx={{ mt: 2 }}>
          Don’t have an account? Register
        </Button>
      </Box>
    </Container>
  );
};

export default Login;

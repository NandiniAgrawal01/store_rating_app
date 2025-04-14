import React, { useState } from 'react';
import {
  Container, TextField, Button, Typography, Box, Alert
} from '@mui/material';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', address: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (form.name.length < 20 || form.name.length > 60)
      return setError('Name must be 20-60 characters long');
    if (form.address.length > 400)
      return setError('Address must be within 400 characters');
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])/;
    if (!passwordRegex.test(form.password) || form.password.length < 8 || form.password.length > 16)
      return setError('Password must be 8-16 characters with 1 uppercase & 1 special char');

    try {
      await axios.post('/auth/register', form);
      setSuccess('Registration successful! You can now login.');
      setForm({ name: '', email: '', address: '', password: '' });
      setError('');
    } catch (err) {
      console.error('Register error:', err);
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8} p={4} boxShadow={3} borderRadius={2}>
        <Typography variant="h5" gutterBottom>Register</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Full Name" name="name" fullWidth margin="normal"
            value={form.name} onChange={handleChange} required
          />
          <TextField
            label="Email" name="email" fullWidth margin="normal"
            value={form.email} onChange={handleChange} required
          />
          <TextField
            label="Address" name="address" fullWidth margin="normal"
            value={form.address} onChange={handleChange} required
          />
          <TextField
            label="Password" name="password" type="password" fullWidth
            margin="normal" value={form.password} onChange={handleChange} required
          />
          <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>
            Register
          </Button>
        </form>
        <Button onClick={() => navigate('/')} sx={{ mt: 2 }}>
          Already have an account? Login
        </Button>
      </Box>
    </Container>
  );
};

export default Register;

import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Card, CardContent, Table, TableHead,
  TableRow, TableCell, TableBody, Box, TextField, Button, Rating
} from '@mui/material';
import axios from '../api/axios';
import Navbar from '../components/Navbar';

const DashboardStoreOwner = () => {
  const [ratings, setRatings] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [passwordData, setPasswordData] = useState({ oldPassword: '', newPassword: '' });

  const fetchRatings = async () => {
    try {
      const res = await axios.get('/store/ratings');
      setRatings(res.data.users);
      setAvgRating(res.data.averageRating || 0);
    } catch (err) {
      alert('Failed to fetch ratings');
    }
  };

  const updatePassword = async () => {
    try {
      await axios.put('/auth/update-password', passwordData);
      alert('Password updated successfully!');
      setPasswordData({ oldPassword: '', newPassword: '' });
    } catch (err) {
      alert(err.response?.data?.message || 'Password update failed');
    }
  };

  const handleInput = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchRatings();
  }, []);

  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ my: 3 }}>Store Owner Dashboard</Typography>

        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6">Average Store Rating</Typography>
            <Rating value={avgRating} readOnly precision={0.5} />
          </CardContent>
        </Card>

        <Typography variant="h6">Users Who Rated Your Store</Typography>
        <Table sx={{ mt: 2 }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Rating</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ratings.map((users) => (
              <TableRow key={users.id}>
                <TableCell>{users.name}</TableCell>
                <TableCell>{users.email}</TableCell>
                <TableCell>
                  <Rating value={users.rating} readOnly />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Password Update */}
        <Box sx={{ mt: 5 }}>
          <Typography variant="h6">Update Password</Typography>
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <TextField
              label="Old Password" name="oldPassword"
              value={passwordData.oldPassword}
              onChange={handleInput}
              type="password" fullWidth
            />
            <TextField
              label="New Password" name="newPassword"
              value={passwordData.newPassword}
              onChange={handleInput}
              type="password" fullWidth
            />
            <Button variant="contained" onClick={updatePassword}>
              Update
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default DashboardStoreOwner;

import React, { useEffect, useState } from 'react';
import {
  Container, Typography, TextField, Card, CardContent, Grid, Rating, Button, Box
} from '@mui/material';
import axios from '../api/axios';
import Navbar from '../components/Navbar';

const DashboardUser = () => {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState('');
  const [myRatings, setMyRatings] = useState({});
  const [passwordData, setPasswordData] = useState({ oldPassword: '', newPassword: '' });

  const fetchStores = async () => {
    const res = await axios.get('/user/stores');
    setStores(res.data);
  };

  const fetchMyRatings = async () => {
    const res = await axios.get('/user/my-ratings');
    const ratingsMap = {};
    res.data.forEach((r) => (ratingsMap[r.storeId] = r.rating));
    setMyRatings(ratingsMap);
  };

  const handleRatingChange = (storeId, newValue) => {
    setMyRatings({ ...myRatings, [storeId]: newValue });
  };

  const submitRating = async (storeId) => {
    try {
      await axios.post('/user/rate', {
        storeId,
        rating: myRatings[storeId],
      });
      alert('Rating submitted!');
      fetchStores();
    } catch (err) {
      alert(err.response?.data?.message || 'Rating failed');
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
    fetchStores();
    fetchMyRatings();
  }, []);

  const filteredStores = stores.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ my: 3 }}>
          Store Ratings
        </Typography>

        <TextField
          label="Search Stores by Name or Address"
          fullWidth
          sx={{ mb: 3 }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Grid container spacing={3}>
          {filteredStores.map((store) => (
            <Grid item xs={12} md={6} key={store.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{store.name}</Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Address: {store.address}
                  </Typography>
                  <Typography variant="body2">
                    Overall Rating:{' '}
                    <Rating value={store.averageRating || 0} precision={0.5} readOnly />
                  </Typography>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Your Rating:
                    </Typography>
                    <Rating
                      name={`user-rating-${store.id}`}
                      value={myRatings[store.id] || 0}
                      onChange={(_, newVal) => handleRatingChange(store.id, newVal)}
                    />
                    <Button
                      variant="contained"
                      sx={{ mt: 1 }}
                      onClick={() => submitRating(store.id)}
                      disabled={!myRatings[store.id]}
                    >
                      {myRatings[store.id] ? 'Submit / Update' : 'Select Rating'}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
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

export default DashboardUser;

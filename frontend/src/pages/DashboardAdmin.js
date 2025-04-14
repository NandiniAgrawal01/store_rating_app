import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Box,
  MenuItem,
  Alert,
} from "@mui/material";
import axios from "../api/axios";
import Navbar from "../components/Navbar";
import UserTable from "../components/UserTable";
import StoreTable from "../components/StoreTable";

const DashboardAdmin = () => {
  const [stats, setStats] = useState({ users: 0, stores: 0, ratings: 0 });
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    role: "user",
  });
  const [storeForm, setStoreForm] = useState({
    name: "",
    email: "",
    address: "",
    userId: "",
  });
  const [selectedUser, setSelectedUser] = useState(null);
  const [userError, setUserError] = useState("");
  const [storeError, setStoreError] = useState("");
  const [userSuccess, setUserSuccess] = useState("");
  const [storeSuccess, setStoreSuccess] = useState("");

  const fetchStats = async () => {
    try {
      const res = await axios.get("/admin/summary");
      setStats({
        users: res.data.totalUsers,
        stores: res.data.totalStores,
        ratings: res.data.totalRatings,
      });
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const fetchStores = async () => {
    try {
      const res = await axios.get("/admin/stores");
      setStores(res.data);
    } catch (err) {
      console.error("Error fetching stores:", err);
    }
  };

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleStoreInput = (e) => {
    setStoreForm({ ...storeForm, [e.target.name]: e.target.value });
  };

  const validateUserForm = (formData) => {
    const { name, email, password, address } = formData;

    if (name.length < 20 || name.length > 60) {
      return "Name must be between 20 and 60 characters";
    }

    if (address.length > 400) {
      return "Address must be within 400 characters";
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])/;
    if (
      !passwordRegex.test(password) ||
      password.length < 8 ||
      password.length > 16
    ) {
      return "Password must be 8-16 characters with 1 uppercase & 1 special character";
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }

    return "";
  };

  const validateStoreForm = (storeData) => {
    const { email, address } = storeData;

    if (address.length > 400) {
      return "Address must be within 400 characters";
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }

    return "";
  };

  const createUser = async () => {
    const validationError = validateUserForm(form);
    if (validationError) {
      setUserError(validationError);
      return;
    }

    try {
      await axios.post("/admin/add-user", form);
      setForm({ name: "", email: "", password: "", address: "", role: "user" });
      fetchUsers();
      fetchStats();
      setUserSuccess("User created successfully!");
      setUserError("");
    } catch (err) {
      setUserError(err.response?.data?.message || "Error adding user");
    }
  };

  const createStore = async () => {
    const validationError = validateStoreForm(storeForm);
    if (validationError) {
      setStoreError(validationError);
      return;
    }

    try {
      await axios.post("/admin/add-store", storeForm);
      setStoreForm({ name: "", email: "", address: "", userId: "" });
      fetchStores();
      fetchStats();
      setStoreSuccess("Store created successfully!");
      setStoreError("");
    } catch (err) {
      setStoreError(err.response?.data?.message || "Error adding store");
    }
  };

  useEffect(() => {
    fetchStats();
    fetchUsers();
    fetchStores();
  }, []);

  return (
    <>
      <Navbar />
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ my: 3 }}>
          Admin Dashboard
        </Typography>

        {/* Metrics */}
        <Grid container spacing={3}>
          {["Users", "Stores", "Ratings"].map((label, idx) => (
            <Grid item xs={12} md={4} key={label}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{label}</Typography>
                  <Typography variant="h4">
                    {label === "Users"
                      ? stats.users
                      : label === "Stores"
                      ? stats.stores
                      : stats.ratings}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Add user form */}
        <Box sx={{ mt: 5 }}>
          <Typography variant="h6">Add New User</Typography>
          {userError && <Alert severity="error">{userError}</Alert>}
          {userSuccess && <Alert severity="success">{userSuccess}</Alert>}
          <Grid container spacing={2}>
            {["name", "email", "password", "address"].map((field) => (
              <Grid item xs={12} md={3} key={field}>
                <TextField
                  fullWidth
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  name={field}
                  value={form[field]}
                  onChange={handleInput}
                />
              </Grid>
            ))}
            <Grid item xs={12} md={2}>
              <TextField
                select
                fullWidth
                label="Role"
                name="role"
                value={form.role}
                onChange={handleInput}
              >
                <MenuItem value="user">Normal User</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={1}>
              <Button
                fullWidth
                variant="contained"
                onClick={createUser}
                sx={{ height: "100%" }}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Add store form */}
        <Box sx={{ mt: 5 }}>
          <Typography variant="h6">Add New Store</Typography>
          {storeError && <Alert severity="error">{storeError}</Alert>}
          {storeSuccess && <Alert severity="success">{storeSuccess}</Alert>}
          <Grid container spacing={2}>
            {["name", "email", "address", "userId"].map((field) => (
              <Grid item xs={12} md={3} key={field}>
                <TextField
                  fullWidth
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  name={field}
                  value={storeForm[field]}
                  onChange={handleStoreInput}
                />
              </Grid>
            ))}
            <Grid item xs={12} md={2}>
              <Button fullWidth variant="contained" onClick={createStore}>
                Add Store
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Tables */}
        <Box sx={{ mt: 5 }}>
          <UserTable
            users={users}
            selectedUser={selectedUser}
            onViewDetails={async (userId) => {
              try {
                const res = await axios.get(`/admin/user/${userId}`);
                setSelectedUser(res.data);
              } catch (err) {
                console.error("Error fetching user details:", err);
              }
            }}
          />
          <Box mt={4}>
            <StoreTable stores={stores} />
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default DashboardAdmin;

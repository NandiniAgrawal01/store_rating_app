import express from 'express';
import {
  getDashboardStats,
  addUser,
  addStore,
  getUsers,
  getStores,
  getUserDetails,
} from '../controllers/adminController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/summary', getDashboardStats);
router.post('/add-user', addUser);
router.post('/add-store', addStore);
router.get('/users', getUsers);
router.get('/stores', getStores);
router.get('/user/:id', getUserDetails);

export default router;

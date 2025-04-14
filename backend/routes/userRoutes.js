import express from 'express';
import { getStores, getUserRatings, rateStore } from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/stores', authMiddleware, getStores);
router.get('/my-ratings', authMiddleware, getUserRatings);
router.post('/rate', authMiddleware, rateStore);

export default router;

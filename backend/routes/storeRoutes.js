import express from 'express';
import { getRatings } from '../controllers/storeController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/ratings', authMiddleware, getRatings);

export default router;

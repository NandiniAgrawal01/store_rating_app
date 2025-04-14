const express = require('express');
const { rateStore } = require('../controllers/ratingController');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authenticate);

router.post('/', authorizeRoles('user'), rateStore);

module.exports = router;

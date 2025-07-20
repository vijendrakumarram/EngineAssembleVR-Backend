const express = require('express');
const router = express.Router();
const { submitAnalytics } = require('../controllers/analyticsController');
const { authenticate } = require('../middleware/authMiddleware');

router.post('/', authenticate, submitAnalytics);

module.exports = router;

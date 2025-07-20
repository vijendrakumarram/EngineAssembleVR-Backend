const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logAnalytics } = require('../controllers/authController');

// Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/analytics', logAnalytics);

module.exports = router;

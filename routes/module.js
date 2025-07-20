const express = require('express');
const router = express.Router();
const Module = require('../models/Module');
const User = require('../models/User');

// Add a new module
router.post('/add', async (req, res) => {
  const { name, url } = req.body;
  try {
    const newModule = new Module({ name, url });
    await newModule.save();
    res.status(201).json({ message: 'Module created', module: newModule });
  } catch (err) {
    res.status(500).json({ message: 'Error creating module', error: err.message });
  }
});

// Assign module(s) to user
router.post('/assign', async (req, res) => {
  const { userId, moduleIds } = req.body; // moduleIds = array of module _id(s)
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.modules = [...new Set([...user.modules, ...moduleIds])]; // avoid duplicates
    await user.save();

    res.json({ message: 'Modules assigned to user', user });
  } catch (err) {
    res.status(500).json({ message: 'Error assigning modules', error: err.message });
  }
});

module.exports = router;

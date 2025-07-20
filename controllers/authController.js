const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Register API
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Hash password and create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });

    const savedUser = await newUser.save();

    res.status(201).json({
      id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

// Login API
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user and populate modules
    const user = await User.findOne({ email }).populate('modules');
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    // Convert mongoose doc to plain object
    const userObj = user.toObject();
    delete userObj.__v; // Remove version key

    /*
    res.status(200).json({
      id: userObj._id,
      name: userObj.name,
      email: userObj.email,
      modules: userObj.modules,
    });
    */

  res.status(200).json({
  id: userObj._id,
  name: userObj.name,
  email: userObj.email,
  modules: userObj.modules.map(module => ({
    _id: module._id,
    name: module.name,
    url: module.url
  })),
});




  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

// User Analytics API (placeholder)
const logAnalytics = async (req, res) => {
  try {
    const { userId, action } = req.body;

    console.log(`User ${userId} performed: ${action}`);
    res.status(200).json({ message: 'Analytics logged successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging analytics', error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logAnalytics
};

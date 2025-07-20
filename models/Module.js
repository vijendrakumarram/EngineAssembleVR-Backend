const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
  name: String,
  url: String,
});

module.exports = mongoose.model('Module', moduleSchema);

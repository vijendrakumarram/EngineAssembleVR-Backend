const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    event: String,
    timestamp: { type: Date, default: Date.now },
    meta: Object
});

module.exports = mongoose.model('Analytics', analyticsSchema);

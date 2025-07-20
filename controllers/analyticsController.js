const Analytics = require('../models/Analytics');

exports.submitAnalytics = async (req, res) => {
    try {
        const { event, meta } = req.body;
        const newEntry = new Analytics({ userId: req.user.id, event, meta });
        await newEntry.save();
        res.json({ message: 'Analytics recorded' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const mongoose = require('mongoose');

const DelaySchema = new mongoose.Schema({
    duration:  { type: Number, required: true, default: 0.00 },
    nextNodeId: { type: Number, required: false, default: null },
    nodeType: "DELAY",
});

module.exports = mongoose.model('delay', DelaySchema);

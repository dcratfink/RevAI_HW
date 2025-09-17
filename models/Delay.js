const mongoose = require('mongoose');

const DelaySchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    duration:  { type: Number, required: true, default: 0.00 },
    next_node_id: { type: Number, required: false, default: null },
    node_type: "DELAY",
});

module.exports = mongoose.model('Delay', DelaySchema);

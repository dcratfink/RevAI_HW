const mongoose = require('mongoose');

const ActionSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    message:  { type: String, required: false, default: "" },
    next_node_id: { type: Number, required: false, default: null },
    node_type: "MESSAGE",
});

module.exports = mongoose.model('Action', ActionSchema);

const mongoose = require('mongoose');

const ActionSchema = new mongoose.Schema({
    message:  { type: String, required: false, default: "" },
    nextNodeId: { type: Number, required: false, default: null },
    nodeType: "MESSAGE",
});

module.exports = mongoose.model('action', ActionSchema);

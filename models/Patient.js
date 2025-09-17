const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    age:   { type: Number, required: false, default: null },
    language: { type: String, required: false, default: "en" },
    next_node_id: { type: Number, required: false, default: null },
    condition: { type: String, required: false, default: "unknown" },
});

module.exports = mongoose.model('Patient', PatientSchema);

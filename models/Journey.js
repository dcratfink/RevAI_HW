const mongoose = require('mongoose');

const JourneySchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    patient_id:  { type: Number, required: true },
    name: { type: String, required: false, default: "" },
    start_node_id: { type: Number, required: false, default: null },
});

module.exports = mongoose.model('Journey', JourneySchema);
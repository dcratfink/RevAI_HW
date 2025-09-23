const mongoose = require('mongoose');

const JourneySchema = new mongoose.Schema({
    patientId:  { type: Number, required: true },
    name: { type: String, required: false, default: "" },
    startNodeId: { type: Number, required: false, default: null },
    journeyNodes: { type: Array, required: true, default: [] },
});

module.exports = mongoose.model('journey', JourneySchema);
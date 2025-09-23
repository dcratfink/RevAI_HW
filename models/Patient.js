const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    patientId: { type: String, required: true, default: "" },
    firstName: { type: String, required: true, default: "" },
    lastName: { type: String, required: true, default: "" },
    middleName: { type: String, required: false, default: "" },
    dateOfBirth: { type: String, required: true, default: "MM/DD/YYYY" },
    age:   { type: Number, required: false, default: null },
    language: { type: String, required: false, default: "en" },
    diseaseSite: { type: String, required: false, default: "unknown" },
});

module.exports = mongoose.model('patient', PatientSchema);

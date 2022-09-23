const mongoose = require('mongoose');

// Schema for the students to be created
const studentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    option: { type: String, required: true },
    math: { type: Number, required: true },
    physique: { type: Number, required: true },
    science: { type: Number, required: true },
    anglais: { type: Number, required: true },
    francais: { type: Number, required: true },
    stage: { type: String, required: true }
});

module.exports = mongoose.model('Student', studentSchema);
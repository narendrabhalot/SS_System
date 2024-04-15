const { object, string } = require('joi');
const mongoose = require('mongoose');
const registrationSchema = new mongoose.Schema({
    emailId: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    otp: {
        type: String
    }
}, { "timestamps": true });

module.exports = mongoose.model('UserRegistration', registrationSchema);


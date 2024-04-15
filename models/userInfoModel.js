const { object } = require('joi');
const mongoose = require('mongoose');
const userInfoSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
    },
    userMobile: {
        type: String,
        required: true,
        trim: true,
    },
    userId: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
}, { "timestamps": true });

const Registration = mongoose.model('userInfo', userInfoSchema);
module.exports = Registration;

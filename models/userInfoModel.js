const { object } = require('joi');
const mongoose = require('mongoose');
const userInfoSchema = new mongoose.Schema({
    refUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserRegistration' },
    userName: {
        type: String,
        required: true,
        trim: true,
    },
    mobileNumber: {
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
    userStatus: {
        type: String,
        enum: ["1", "2"],
        trim: true,
        default: "1"
    }
}, { "timestamps": true });

module.exports = mongoose.model('userInfo', userInfoSchema);

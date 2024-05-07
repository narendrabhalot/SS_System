const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    userData: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserRegistration",
        required: true
    },
    image: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    imageStatus: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },

}, { timestamps: true });

module.exports = mongoose.model('Image', imageSchema);

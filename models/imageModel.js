const mongoose = require('mongoose');
const imageSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
    },
    userName: {
        type: String,
        required: true,
        trim: true,
    },
    userName: {
        type: String,
        required: true,
        trim: true,
    },
    imageStatus: {
        type: String,
        enum: ["Pending", "Processing", "Success", "Reject"],
        trim: true,
        default: "Pending"
    }
}, { timestamps: true });


module.exports = mongoose.model('image', imageSchema);

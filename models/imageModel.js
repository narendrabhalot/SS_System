const mongoose = require('mongoose');
const imageSchema = new mongoose.Schema({
    userId: String,
    image: String,
    path: String,
    imageStatus: {
        type: String,
        enum: ["Pending", "Processing", "Success", "Reject"],
        default: "Pending"
    }
}, { timestamps: true });


module.exports = mongoose.model('image', imageSchema);

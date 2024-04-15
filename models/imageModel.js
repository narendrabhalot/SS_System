const mongoose = require('mongoose');


const imageSchema = new mongoose.Schema({
    image: String,
    path: String,
}, { timestamps: true });


module.exports = mongoose.model('image', imageSchema);

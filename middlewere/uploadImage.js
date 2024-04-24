const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.urlencoded({ extended: true }));
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, '../uploads'); // Adjust path as needed
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniquePrefix + '-' + path.basename(file.originalname)); // Use original filename with prefix
    },
});
const customMulterImageUpload = multer({ storage: storage }).fields([
    { name: 'image', maxCount: 10 } // Specify key 'image' and limit to 10 images
]);
module.exports = { customMulterImageUpload }
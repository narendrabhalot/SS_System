const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.urlencoded({ extended: true }));



// Configure storage for uploaded files (replace 'uploads' with your desired path)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("req by android developer :- ", req)
        console.log("file by android developer :- ", file)
        cb(null, 'uploads/'); // Change 'uploads' to your preferred upload directory
    },
    filename: (req, file, cb) => {
        const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniquePrefix + '-' + path.basename(file.originalname));
    },
});

// Define upload limits (optional, adjust as needed)
const uploadLimits = {

    files: 10,
};

// Create a Multer middleware instance with limitations
const customMulterImageUpload = multer({ storage: storage, limits: uploadLimits }).fields('image');

module.exports = { customMulterImageUpload }
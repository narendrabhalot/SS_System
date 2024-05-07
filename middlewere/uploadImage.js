const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.urlencoded({ extended: true }));

// Configure storage for uploaded files (replace 'uploads' with your desired path)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Change 'uploads' to your preferred upload directory
    },
    filename: function (req, file, cb) {
        const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniquePrefix + '-' + file.originalname);
    },
});

const uploadLimits = {
    files: 30,
};

// Create a Multer middleware instance with limitations
const customMulterImageUpload = multer({ storage: storage, limits: uploadLimits }).fields(
    // Define 30 image fields
    Array.from({ length: 30 }, (_, i) => ({ name: `image${i}`, maxCount: 1 }))
);

module.exports = { customMulterImageUpload }

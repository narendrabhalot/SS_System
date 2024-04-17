const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.urlencoded({ extended: true }));
const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join('uploads');
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniquePrefix + '-' + file.originalname);
    },
});
const uploadImage = multer({ storage: imageStorage });
const imageUpload = uploadImage.array("image");

module.exports = { imageUpload }
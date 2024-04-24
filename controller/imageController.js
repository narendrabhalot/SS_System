const express = require('express');
const multer = require('multer'); // Import Multer for file uploads (optional)
const path = require('path'); // Import path for file path manipulation
const fs = require('fs').promises; // Import fs.promises for asynchronous file operations (optional)

const imageModel = require('../models/imageModel');


const uploadImage = async (req, res) => {

    console.log('Files uploaded:', req.files);
    res.send('Files uploaded successfully.');
    // const userId = req.params.id;
    // const imagePaths = req.body.image;

    // if (!imagePaths || !Array.isArray(imagePaths)) {
    //     return res.status(400).json({ error: 'No images provided or invalid format' });
    // }

    // try {
    //     const savedImages = [];
    //     for (const imagePath of imagePaths) {
    //         const filename = path.basename(imagePath);
    //         const newImage = new imageModel({
    //             userId: userId,
    //             image: filename,
    //             path: imagePath
    //         });
    //         const savedImage = await newImage.save();
    //         savedImages.push(savedImage);
    //     }
    //     res.send({ message: 'Images uploaded successfully!', data: savedImages }); // Improved response
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ error: 'Internal Server Error' });
    // }
}













// const imageModel = require('../models/imageModel')
// const uploadImage = async (req, res) => {
//     const contentType = req.headers['content-type'];
//     if (!contentType || !contentType.startsWith('multipart/form-data')) {
//         return res.status(400).send('Invalid request format. Expected multipart/form-data');
//     }
//     let files = req.files
//     console.log(files)
//     let userId = req.params.id
//     try {
//         if (files.length == 0) {
//             return res.status(400).json({ error: 'Please select a file! ' });
//         }
//         for (const file of files) {
//             const newImage = new imageModel({
//                 userId: userId,
//                 image: file.originalname,
//                 path: file.path,
//             });
//             await newImage.save();
//         }
//         return res.send({ msg: 'File uploaded successfully', });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

module.exports = { uploadImage }
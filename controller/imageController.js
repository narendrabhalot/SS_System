const express = require('express');
const multer = require('multer'); // Import Multer for file uploads (optional)
const path = require('path'); // Import path for file path manipulation
const fs = require('fs').promises; // Import fs.promises for asynchronous file operations (optional)
const { customMulterImageUpload } = require('../middlewere/uploadImage')
const imageModel = require('../models/imageModel');



const uploadImage = async (req, res) => {
    try {
        console.log(" only console req.file", req.files)
        let userId = req.params.id
        let userIds = req.body.userId 
        console.log("req.body .userId inside the controler  ",userIds)
        console.log("req.params.id inside the controler  ",req.params.id)
        let files = req.files
        console.log(files)
        if (files.length == 0) {
            return res.status(400).json({ error: 'Please select a file! ' });
        }
        for (const file of files) {
            const newImage = new imageModel({
                userId: userId,
                image: file.originalname,
                path: file.path,
            });
            await newImage.save();
        }
        return res.send({ msg: 'File uploaded successfully', });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// function convertToJSON(inputString) {
//     // Remove curly braces and split the string into key-value pairs
//     const keyValuePairs = inputString
//         .slice(1, -1) // Remove curly braces
//         .split('='); // Split by "="

//     // Extract key and value
//     const key = keyValuePairs[0].trim();
//     const value = keyValuePairs[1].replace('[', '').replace(']', '').split(',').map(item => item.trim());

//     // Construct JSON object
//     const jsonObject = {};
//     jsonObject[key] = value;

//     return JSON.stringify(jsonObject, null, 4); // Convert object to JSON with indentation
// }
// const uploadImage = async (req, res) => {
//     try {
//         console.log(req);

//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal server error'); // Generic error for unexpected issues
//     }
// };
// // console.log(req.body)
// //     const userId = req.params.id;
// //     const imagePaths = req.body.image;

// //     if (!imagePaths || !Array.isArray(imagePaths)) {
// //         return res.status(400).json({ error: 'No images provided or invalid format' });
// //     }

// //     try {
// //         const savedImages = [];
// //         for (const imagePath of imagePaths) {
// //             const filename = path.basename(imagePath);
// //             const newImage = new imageModel({
// //                 userId: userId,
// //                 image: filename,
// //                 path: imagePath
// //             });
// //             const savedImage = await newImage.save();
// //             savedImages.push(savedImage);
// //         }
// //         res.send({ message: 'Images uploaded successfully!', data: savedImages }); // Improved response
// //     } catch (error) {
// //         console.error(error);
// //         res.status(500).json({ error: 'Internal Server Error' });
// //     }














// // const imageModel = require('../models/imageModel')
// // const uploadImage = async (req, res) => {
// //     const contentType = req.headers['content-type'];
// //     if (!contentType || !contentType.startsWith('multipart/form-data')) {
// //         return res.status(400).send('Invalid request format. Expected multipart/form-data');
// //     }
// //     let files = req.files
// //     console.log(files)
// //     let userId = req.params.id
// //     try {
// //         if (files.length == 0) {
// //             return res.status(400).json({ error: 'Please select a file! ' });
// //         }
// //         for (const file of files) {
// //             const newImage = new imageModel({
// //                 userId: userId,
// //                 image: file.originalname,
// //                 path: file.path,
// //             });
// //             await newImage.save();
// //         }
// //         return res.send({ msg: 'File uploaded successfully', });
// //     } catch (error) {
// //         console.error(error);
// //         res.status(500).json({ error: 'Internal Server Error' });
// //     }
// // };

module.exports = { uploadImage }
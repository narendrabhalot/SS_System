const express = require('express');
const multer = require('multer'); // Import Multer for file uploads (optional)
const path = require('path'); // Import path for file path manipulation
const fs = require('fs').promises; // Import fs.promises for asynchronous file operations (optional)
const { customMulterImageUpload } = require('../middlewere/uploadImage')
const imageModel = require('../models/imageModel');



const uploadImage = async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ error: 'Please select a file!' });
        }

        const files = req.files;
        let userId = req.params.id;


        for (const imageKey in files) {
            const imageList = files[imageKey]; // Array of file objects
            for (const file of imageList) {
                const newImage = new imageModel({
                    userId: userId,
                    image: file.originalname,
                    path: file.path,
                });
                await newImage.save();
            }
        }
        console.log("'File(s) uploaded successfully'")
        return res.send({ msg: 'File(s) uploaded successfully', });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



const getImages = async (req, res) => {
    try {
        const images = await imageModel.find()
        if (images.length > 0) {
            return res.send({
                status: true, msg: "image get successfully ", data: images
            })

        } else {
            return res.status(404).send({ status: false, msg: "image not found " })
        }

    } catch (err) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }



}


module.exports = { uploadImage, getImages }
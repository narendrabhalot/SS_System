const express = require('express');
const multer = require('multer'); // Import Multer for file uploads (optional)
const path = require('path'); // Import path for file path manipulation
const { isValidObjectId } = require('../util/validate')
const fs = require('fs').promises; // Import fs.promises for asynchronous file operations (optional)

const imageModel = require('../models/imageModel');
const uploadImage = async (req, res) => {

    let geturl = "https://ss-system-g6qb.onrender.com/"
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
                    path: geturl + file.path,
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



const getImagesbyImageStatus = async (req, res) => {
    try {
        const imageStatus = req.params.ImageStatus
        const images = await imageModel.find({ imageStatus: imageStatus })
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


const getImagesbyIdAndImageStatus = async (req, res) => {
    try {
        const userId = req.params.userId
        const imageStatus = req.params.imageStatus
        if (!userId) {
            return res.status(400).send({ status: false, msg: "UserId required ." });
        }
        if (!isValidObjectId(userId)) {
            return res.status(404).send({ status: false, msg: "Valid userId required." });
        }
        const images = await imageModel.find({ userId: userId, imageStatus: imageStatus })
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

module.exports = { uploadImage, getImagesbyImageStatus, getImagesbyIdAndImageStatus }
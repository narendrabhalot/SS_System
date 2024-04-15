const imageModel = require('../models/imageModel')
const uploadImage = async (req, res) => {
    let files = req.files
    try {
        if (files.length == 0) {
            return res.status(400).json({ error: 'Please select a file! ' });
        }
        console.log(req.files)
        for (const file of files) {
            const newImage = new imageModel({
                image: file.originalname,
                path: file.path,
            });
            await newImage.save();
        }
        return res.send({ message: 'File uploaded successfully', });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { uploadImage }
const moment = require('moment-timezone');
const path = require('path'); // Import path for file path manipulation
const { isValidObjectId } = require('../util/validate')
const fs = require('fs').promises; // Import fs.promises for asynchronous file operations (optional)
const imageModel = require('../models/imageModel');
const userInfoModel = require('../models/userInfoModel');
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
                    userData: userId,
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
        res.status(500).json({ error: 'Internal Server Error', error: error.message });
    }
};

const getImagesbyImageStatus = async (req, res) => {
    try {
        const imageStatus = req.params.ImageStatus;
        const images = await imageModel.aggregate([
            {
                $match: {
                    imageStatus: imageStatus
                }
            },
            {
                $lookup: {
                    from: "userinfos",
                    localField: "userData",
                    foreignField: "refUserId",
                    as: "userInfo"
                }
            },
            {
                $project: {
                    image: 1,
                    path: 1,
                    "userInfo.userName": 1, // Include specific fields from the userInfo array
                    "userInfo.userId": 1
                }
            }

        ]);
        if (images.length > 0) {
            return res.send({
                status: true, msg: "image get successfully ", data: images
            })
        } else {
            return res.status(400).send({ status: false, msg: "image not found " })
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getImagesbyIdAndImageStatus = async (req, res) => {
    try {
        const userId = req.params.userId;
        const imageStatus = req.params.imageStatus;
        console.log(userId, imageStatus);

        if (!userId) {
            return res.status(400).send({ status: false, msg: "UserId required ." });
        }

        if (!isValidObjectId(userId)) {
            return res.status(404).send({ status: false, msg: "Valid userId required." });
        }

        const images = await imageModel.find({ userData: userId, imageStatus: imageStatus });
        console.log("images is ", images);

        if (images.length > 0) {
            const imagesWithIST = images.map((image) => {
                const utcTime = moment.utc(image.updatedAt);


                const istTime = utcTime.tz('Asia/Kolkata');

                // Format the IST time (optional)
                const formattedISTTime = istTime.format('YYYY-MM-DD HH:mm:ss.SSS Z h:mm A');
                // Use toJSON for cleaner response (if using Mongoose models)
                if (image.toJSON) {
                    const sanitizedImage = image.toJSON();
                    sanitizedImage.istUpdatedAt = formattedISTTime
                    return sanitizedImage;
                } else {
                    // Manual transformation (if not using Mongoose models)
                    return {
                        _id: image._id,
                        userData: image.userData,
                        image: image.image,
                        path: image.path,
                        imageStatus: image.imageStatus,
                        createdAt: image.createdAt,
                        updatedAt: image.updatedAt,
                        istUpdatedAt: formattedISTTime
                    };
                }
            });

            return res.send({
                status: true,
                msg: "Images retrieved successfully",
                data: imagesWithIST,
            });
        } else {
            return res.status(404).send({ status: false, msg: "Images not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// const moment = require('moment-timezone'); // Install with npm install moment-timezone

const updateImageById = async (req, res) => {
    try {
        // 1. Validate Image ID
        const imageId = req.params.imageId;
        if (!isValidObjectId(imageId)) { // Replace with your ID validation logic
            return res.status(400).send({ status: false, error: 'Invalid image ID format' });
        }

        // 2. Validate Image Status
        const updateImageStatus = req.body.imageStatus;
        const validStatuses = ['Processing', 'Success', 'Reject', 'Pending'];
        if (!validStatuses.includes(updateImageStatus)) {
            return res.status(400).send({ status: false, error: 'Invalid image status' });
        }
        // 3. Find Image Document
        const imageDoc = await imageModel.findById(imageId);
        if (!imageDoc) {
            return res.status(404).send({ status: false, error: 'Image not found' });
        }
        const updatedImage = await imageModel.findByIdAndUpdate(
            imageId,
            {
                $set: {
                    imageStatus: updateImageStatus,
                },
            },
            { new: true, runValidators: true }
        );

        if (!updatedImage) {
            // Handle potential validation errors or other update failures
            return res.status(500).send({ status: false, error: 'Failed to update image' });
        }
        return res.status(200).send({
            status: true,
            msg: "Image updated successfully",

        });
    } catch (error) {
        console.error('Error updating image:', error);
        return res.status(500).send({ status: false, error: 'Internal server error', error: error.message });
    }
};

const deleteImageById = async (req, res) => {
    try {
        const imageId = req.params.imageId;

        if (!isValidObjectId(imageId)) {
            return res.status(400).send({ status: false, msg: "Invalid image id" });
        }
        const deleteImage = await imageModel.findByIdAndDelete(imageId);
        if (!deleteImage) {
            return res.status(404).send({ status: false, msg: `Image not found with ID: ${imageId}` });
        }
        let deletedpath = "uploads";
        let url = deleteImage.path
        console.log("url is", url)

        const pathSegments = url.split('/');
        console.log(pathSegments)
        const filename = pathSegments.pop(); // Extract the filename
        console.log(filename)

        deletedpath = path.join(deletedpath, filename);

        // data = data.split('/');
        // for (let i = 3; i < path.length; i++) {
        //     deletedpath = path.join(deletedpath, path[i])

        // }
        console.log(deletedpath)

        if (deleteImage) {
            try {
                await fs.unlink(deletedpath); // Use asynchronous file deletion
                console.log('Image file deleted successfully.');
            } catch (err) {
                console.log('Error deleting image file:', err);
                // Handle specific errors (e.g., file not found, permission issues) and send appropriate error response to client
            }
        }

        return res.status(200).send({ status: true, msg: "User and associated image deleted successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: false, msg: "Error deleting user" }); // Inform client of a general error
    }
};


module.exports = { uploadImage, getImagesbyImageStatus, getImagesbyIdAndImageStatus, updateImageById, deleteImageById }
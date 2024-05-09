const multer = require('multer');

const upload = multer();
const express = require("express");
const router = express.Router()
const { createUser, userLogin, updateUser, getUsers } = require('../controller/userController')
const { forgetPassword, verifyOTP } = require('../controller/forgetPasswordController')

const { uploadImage, getImagesbyIdAndImageStatus, getImagesbyImageStatus, updateImageById, deleteImageById } = require('../controller/imageController')
const { customMulterImageUpload } = require('../middlewere/uploadImage')
const { createUserInfo, getAllUserInfo, deleteUserInfoById, updateUserInfo } = require('../controller/userInfoController')
router.post('/signUp', createUser)
router.get('/user', getUsers)
router.post('/forget-password', forgetPassword)
router.post('/verify-otp', verifyOTP)
router.put('/update-user/:id', updateUser)
router.post('/logIn', userLogin)
router.post('/userInfo', createUserInfo)
router.get('/userInfo', getAllUserInfo)
router.put('/userInfo/:userInfoId', updateUserInfo)
router.delete('/userInfo/:userInfoId', deleteUserInfoById)
router.post('/image/:id', customMulterImageUpload, uploadImage)
router.get('/images/:ImageStatus', getImagesbyImageStatus);
router.get('/images/:userId/:imageStatus', getImagesbyIdAndImageStatus);
router.put('/images/:imageId', updateImageById);
router.delete('/image/:imageId', deleteImageById);
module.exports = router
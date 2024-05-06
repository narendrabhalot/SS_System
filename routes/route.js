const multer = require('multer');

const upload = multer();
const express = require("express");
const router = express.Router()
const { createUser, userLogin, updateUser, getUsers } = require('../controller/userController')
const { forgetPassword, verifyOTP } = require('../controller/forgetPasswordController')
const { authentication } = require('../middlewere/auth')
const { uploadImage, getImagesbyId, getImagesbyImageStatus } = require('../controller/imageController')
const { customMulterImageUpload } = require('../middlewere/uploadImage')
const { createUserInfo,getAllUserInfo } = require('../controller/userInfoController')
router.post('/signUp', createUser)
router.get('/user', getUsers)
router.post('/forget-password', forgetPassword)
router.post('/verify-otp', verifyOTP)
router.put('/update-user/:id', updateUser)
router.post('/logIn', userLogin)
router.post('/userInfo', createUserInfo)
router.get('/userInfo', getAllUserInfo)
router.post('/image/:id', customMulterImageUpload, uploadImage)
router.get('/images/:userId', getImagesbyId);
router.get('/images/:userId/:imageStatus', getImagesbyImageStatus);
module.exports = router
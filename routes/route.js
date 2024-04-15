const express = require("express");
const router = express.Router()
const { createUser, userLogin } = require('../controller/userController')
const { forgetPassword } = require('../controller/forgetPasswordController')
const { uploadImage } = require('../controller/imageController')
const { imageUpload } = require('../middlewere/uploadImage')
const { createUserInfo } = require('../controller/userInfoController')
router.post('/signUp', createUser)
router.post('/forget-password', forgetPassword)
router.post('/logIn', userLogin)
router.post('/userInfo', createUserInfo)
router.post('/image', imageUpload, uploadImage)
module.exports = router
const express = require("express");
const router = express.Router()
const { createUser, userLogin, updateUserPassword } = require('../controller/userController')
const { forgetPassword } = require('../controller/forgetPasswordController')
const { authentication } = require('../middlewere/auth')
const { uploadImage } = require('../controller/imageController')
const { imageUpload } = require('../middlewere/uploadImage')
const { createUserInfo } = require('../controller/userInfoController')
router.post('/signUp', createUser)
router.post('/forget-password', forgetPassword)
router.post('/verify-otp', forgetPassword)
router.put('/update-password/:id', updateUserPassword)
router.post('/logIn', userLogin)
router.post('/userInfo', createUserInfo)
router.post('/image', imageUpload, uploadImage)

module.exports = router
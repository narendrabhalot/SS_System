const userInfoModel = require('../models/userInfoModel')
const userModel = require('../models/signUpModel')

const { userInfoValidation, isValidObjectId } = require('../util/validate')
const createUserInfo = async (req, res) => {
    try {
        const { refUserId, userId, userName, mobileNumber, password } = req.body;
        const validationResult = await userInfoValidation(req.body);
        if (validationResult.error) {
            return res.status(400).send({
                status: false,
                msg: validationResult.error.message,
            });
        }
        const existingUser = await userInfoModel.findOne({ userId, userName, mobileNumber, password });
        if (existingUser) {
            return res.status(400).send({
                status: false,
                msg: "User has already submitted the information",
            });
        }
        const userInfo = new userInfoModel({
            refUserId, userId, userName, mobileNumber, password,

        })
        await userInfo.save()
        return res.status(201).send({
            status: true,
            msg: 'User information created successfully!',
            data: userInfo,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            msg: 'Error registering user!',
            error: error.message
        });
    }
};
const getAllUserInfo = async (req, res) => {
    try {
        let user = await userInfoModel.find()
        if (user.length > 0) {
            return res.status(200).send({ status: true, msg: "User find successfully ", data: user })
        } else {
            return res.status(200).send({ status: false, msg: "None of the users are registered." })
        }
    } catch (error) {
        return res.status(500).send({ status: false, msg: "server error during thegetting user ", error: error.message })
    }
}


const updateUserInfo = async (req, res) => {
    try {
        const userInfoId = req.params.userInfoId;
        const updateFields = req.body
        if (Object.keys(updateFields).length > 0) {
            return res.status(400).send({ status: false, msg: "upadte field required" })
        }
        if (!isValidObjectId(userInfoId)) {
            console.log('Invalid userInfoId format');
            return res.status(400).send({ status: false, msg: "Invalid UserInfo id" });
        }
        const checkUserInfoExist = await userInfoModel.findById(userInfoId);
        if (!checkUserInfoExist) {
            console.log(`User not found with id: ${userInfoId}`);
            return res.status(404).send({ status: false, msg: `User not found with id: ${userInfoId}` });
        }

        const updateUser = await userInfoModel.findByIdAndUpdate(userInfoId, updateFields, { new: true, insert: true });
        console.log(updateUser)
        res.status(200).send({ status: true, msg: "User update successfully" });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).send({ status: false, msg: "Error deleting user" }); // Inform client of a general error
    }
}
const deleteUserInfoById = async (req, res) => {
    try {
        const userInfoId = req.params.userInfoId;
        if (!isValidObjectId(userInfoId)) {
            console.log('Invalid userInfoId format');
            return res.status(400).send({ status: false, msg: "Invalid UserInfo id" });
        }
        const checkUserInfoExist = await userInfoModel.findById(userInfoId);
        if (!checkUserInfoExist) {
            console.log(`User not found with id: ${userInfoId}`);
            return res.status(404).send({ status: false, msg: `User not found with id: ${userInfoId}` });
        }

        const deleteUser = await userInfoModel.findByIdAndDelete(userInfoId);
        console.log(deleteUser)
        res.status(200).send({ status: true, msg: "User deleted successfully" });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).send({ status: false, msg: "Error deleting user" }); // Inform client of a general error
    }
};

module.exports = { createUserInfo, getAllUserInfo, deleteUserInfoById, updateUserInfo }
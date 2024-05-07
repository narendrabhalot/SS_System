const userInfoModel = require('../models/userInfoModel')

const { userInfoValidation } = require('../util/validate')
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


module.exports = { createUserInfo, getAllUserInfo }
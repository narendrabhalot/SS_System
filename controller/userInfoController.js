const userInfoModel = require('../models/userInfoModel')

const { userInfoValidation } = require('../util/validate')
const createUserInfo = async (req, res) => {
    try {
        const { userId, userName, mobileNumber, password } = req.body;
        const validationResult = await userInfoValidation(req.body);
        if (validationResult.error) {
            return res.status(400).send({
                status: false,
                msg: validationResult.error.message,
            });
        }
        const existingUser = await userInfoModel.findOne({ mobileNumber });
        if (existingUser) {
            return res.status(400).send({
                status: false,
                msg: "User has already submitted the form",
            });
        }
        const userInfo = await userInfoModel.create(req.body);
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
        });
    }
};


module.exports = { createUserInfo }
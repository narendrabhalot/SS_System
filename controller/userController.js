const { userValidation } = require('../util/validate')
const jwt = require('jsonwebtoken')
const signUpModel = require('../models/signUpModel')

const createUser = async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const validationResult = await userValidation(req.body);
        if (validationResult.error) {
            return res.status(400).send({
                status: false,
                msg: validationResult.error.message,
            });
        }
        // 2. Check for Existing User with Mobile Number (Unique)
        const existingUser = await signUpModel.findOne({ emailId });
        if (existingUser) {
            return res.status(400).send({
                status: false,
                msg: "user is already registered.",
            });
        }
        // 3. Create New User
        const user = await signUpModel.create(req.body);
        // 4. Send Successful Response with User Data
        return res.status(201).send({
            status: true,
            msg: 'User signup successful!',
            data: user,
        });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({
            status: false,
            message: 'Error registering user!',
        });
    }
};


const userLogin = async (req, res) => {
    try {
        const { userId, password } = req.body;
        if (!userId || !password) {
            return res.status(401).send({ status: false, msg: "userId or password required" });
        }
        const user = await signUpModel.findOne({ userId, password }).exec();
        if (!user) {
            return res.status(401).send({ status: false, msg: "Incorrect userId or password" });
        }
        const token = jwt.sign({ userId: user._id.toString() }, process.env.JWT_SECRET);
        return res.status(200).send({ status: true, message: "User logIn successfully ", token });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).send({ status: false, msg: "Error logging in" });
    }
};


module.exports = { createUser, userLogin }
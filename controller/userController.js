const { userValidation, isValidObjectId } = require('../util/validate')
const jwt = require('jsonwebtoken')
const signUpModel = require('../models/signUpModel');



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

        // Check for Existing User with Email (Unique)
        const existingUser = await signUpModel.findOne({ emailId });
        if (existingUser) {
            return res.status(400).send({
                status: false,
                msg: "User is already registered.",
            });
        }

        // Create New User
        const newUser = await signUpModel.create(req.body);

        // Generate Token
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET,);

        // Send Successful Response with Token and User Data
        return res.status(201).send({
            status: true,
            msg: 'User signup successful!',
            token: token,
            data: newUser,
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
        const { emailId, password } = req.body;
        if (!emailId || !password) {
            return res.status(401).send({ status: false, msg: "Email id  or password required" });
        }
        const user = await signUpModel.findOne({ emailId, password }).exec();
        if (!user) {
            return res.status(401).send({ status: false, msg: "Incorrect userId or password" });
        }
        const token = jwt.sign({ userId: user._id.toString() }, process.env.JWT_SECRET);
        return res.status(201).send({
            status: true,
            msg: 'User login  successfully!',
            token: token,
            data: user,
        });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).send({ status: false, msg: "Error logging in" });
    }
};

const updateUserPassword = async (req, res) => {
    try {
        const userId = req.params.id;
        const password = req.body.password;

        // Check if userId is a valid ObjectId
        if (!isValidObjectId(userId)) {
            return res.status(400).send({ status: false, msg: "Invalid object Id" });
        }

        // Check if userId matches the userId from the token (if you're using authentication middleware)
        if (userId !== req.userId) {
            return res.status(401).send({ status: false, msg: "Invalid user" });
        }

        try {
            // Update the user's password and exclude 'otp' field from the updated document
            const updatedUser = await signUpModel.findOneAndUpdate(
                { _id: userId },
                { $set: { password }, $unset: { otp: "" } },
                { new: true, upsert: true }
            );

            // Check if the user was found
            if (!updatedUser) {
                return res.status(400).send({ status: false, msg: "User update failed" });
            }

            // Send response indicating successful password update
            return res.status(200).send({ status: true, msg: "Password updated successfully" });
        } catch (error) {
            console.error("Error updating user password:", error);
            return res.status(500).send({ status: false, msg: "Internal server error" });
        }
    } catch (error) {
        console.error("Error processing update request:", error);
        return res.status(500).send({ status: false, msg: "Internal server error" });
    }
};





module.exports = { createUser, userLogin, updateUserPassword }
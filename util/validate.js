const Joi = require('joi');
const mongoose= require('mongoose')
const userValidation = (data) => {
    const userSchema = Joi.object({
        emailId: Joi.string().trim().required().messages({
            'any.required': " emailId is required",
        }),
        password: Joi.string().trim().required().messages({
            'any.required': "User password  is required",
        }),
        otp: Joi.string().trim().optional()
    });
    return userSchema.validate(data);
};
const userInfoValidation = (data) => {
    const userSchema = Joi.object({
        userId: Joi.string().trim().required().messages({
            'any.required': "userId is required",
        }),
        userName: Joi.string().trim().required().messages({
            'any.required': "User Name is required",
        }),
        mobileNumber: Joi.string().trim().required().messages({
            'any.required': "user mobile Number is required",
        }),
        password: Joi.string().trim().required().messages({
            'any.required': "user password  is required",
        }),
    });
    return userSchema.validate(data);
};
const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId);
};

module.exports = { userValidation, isValidObjectId, userInfoValidation }
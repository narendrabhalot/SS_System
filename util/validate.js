const Joi = require('joi');
const mongoose = require('mongoose')
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
        mobileNumber: Joi.string()
            .trim()
            .pattern(/^[6-9][0-9]{9}$/)
            .required()
            .messages({
                'any.required': "User mobile number is required",
                'string.pattern.base': "Invalid mobile number. Please enter a 10-digit number without spaces or special characters."
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
const otpValidation = (data) => {
    const otpSchema = Joi.object({
        otp: Joi.string().trim().min(4).max(4).required().messages({
            'any.required': "otp is required",
            "string.min": " otp length must be less than or equal to 4 digit long",
            "string.max": " otp length must be less than or equal to 4  digit  long",
        }),
    })
    return otpSchema.validate(data)
}
module.exports = { userValidation, isValidObjectId, userInfoValidation, otpValidation }
const signUpModel = require('../models/signUpModel')
const { sendEmail } = require('../util/sendEmail')
function generateOTP() {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < 6; i++) {
        otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
}
const forgetPassword = async (req, res) => {
    try {
        const { emailId } = req.body;
        if (!emailId) {
            return res.status(400).send({
                status: false,
                msg: "Email id required ",
            })
        }
        const existingUser = await signUpModel.findOne({ emailId: emailId });
        if (!existingUser) {
            return res.status(404).send({
                status: false,
                msg: "this eamil id not registered",
            });
        }
        let otp = generateOTP();
        existingUser.otp = otp
        otp = `ss system otp : ${otp}`
        await existingUser.save();
        await sendEmail(emailId, "otp", otp);
        // 4. Send Successful Response with User Data
        return res.status(200).send({
            status: true,
            msg: `OTP  send successfully on this ${emailId} `,
        });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({
            status: false,
            message: error.message,
        });
    }
};
module.exports = { forgetPassword }
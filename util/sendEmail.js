const nodemailer = require("nodemailer");
const sendEmail = async (email, subject, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            }
        });
        let result = await transporter.sendMail({
            from: '"SS System" <process.env.EMAIL_ADDRESS>',
            to: email,
            subject: subject,
            text: `Your One-Time Password (OTP) for SS_SYSYEM is: ${otp}`,
            html: `<b>Your One-Time Password (OTP) for SS_SYSTEM is: ${otp}</b>`,
        });

    } catch (error) {

        console.log("Error during sending email", error.message)
    }
};

module.exports = { sendEmail };
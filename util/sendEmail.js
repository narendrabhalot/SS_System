const nodemailer = require("nodemailer");
const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'nk580585@gmail.com',
                pass: 'piya xjtg wndi updu'
            }
        });
        let result = await transporter.sendMail({
            from: 'nk580585@gmail.com',
            to: email,
            subject: subject,
            text: text,
        });
        console.log(result, "email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = { sendEmail };
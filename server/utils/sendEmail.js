const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.EMAIL_SERVICE,
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_NAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_ADDRESS,
            to: email,
            subject: subject,
            text: text,
        });
        
        console.log("email sent successfully");
        return {"message": "Email Sent", "success": true}

    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = sendEmail;
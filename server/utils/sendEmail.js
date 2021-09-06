const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, body, embed) => {
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
            from: process.env.EMAIL_NAME,
            to: email,
            subject: subject,
            html: body,
            attachments: embed
        });
        
        console.log("email sent successfully");
        return {"message": "Email Sent", "success": true}

    } catch (error) {
        console.log(error, "email not sent");
        return {"message": "Email Not Sent", "success": false}
        
    }
};

module.exports = sendEmail;
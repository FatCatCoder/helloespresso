
const router = require('express').Router();
const path = require("path");
const pool = require('../../db');
const nodemailer = require('nodemailer');
const jwtGenerator = require('../utils/jwtGenerator');
require('dotenv').config();

const sendEmail = require("../utils/sendEmail");
const emailJS = require('../views/email')

// this route sends email with dud password reset link
/*
router.post("/", async (req, res) => {
    const resetLink = "https://www.google.com/";
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'helloespresso.coffee@gmail.com',
            pass: '!3QeAdZc!' // naturally, replace both with your real credentials or an application-specific password
        }
    });

    const mailOptions = {
        from: 'helloespresso.coffee@gmail.com',
        to: 'christian75armand@gmail.com',
        subject: 'Password Reset',
        html: emailJS(resetLink),
        attachments: [
            {
                filename: 'logo.png',
                path: path.join(__dirname, "../views/images/logo.png"),
                cid: 'logo' //same cid value as in the html img src
            },
            {
                filename: 'facebook.png',
                path: path.join(__dirname, "../views/images/facebook.png"),
                cid: 'facebook' //same cid value as in the html img src
            },
            {
                filename: 'github.png',
                path: path.join(__dirname, "../views/images/github.png"),
                cid: 'github' //same cid value as in the html img src
            },
            {
                filename: 'twitter.png',
                path: path.join(__dirname, "../views/images/twitter.png"),
                cid: 'twitter' //same cid value as in the html img src
            },
            {
                filename: 'instagram.png',
                path: path.join(__dirname, "../views/images/instagram.png"),
                cid: 'instagram' //same cid value as in the html img src
            },
            {
                filename: 'linkedin.png',
                path: path.join(__dirname, "../views/images/linkedin.png"),
                cid: 'linkedin' //same cid value as in the html img src
            },
    ]
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            res.send('Whoah, bad move dude...')
            console.log(error);
        } else {
            res.status(200).send('Good Mail Client.');
            console.log('Email sent: ' + info.response);
        }
    });
})
*/

// function sendResetMail(toEmail, resetLink){
//     //const resetLink = "https://www.google.com/";
    
//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: 'helloespresso.coffee@gmail.com',
//             pass: '!3QeAdZc!' // naturally, replace both with your real credentials or an application-specific password
//         }
//     });

//     const mailOptions = {
//         from: 'helloespresso.coffee@gmail.com',
//         to: toEmail,
//         subject: 'Password Reset',
//         html: emailJS(resetLink),
//         attachments: [
//             {
//                 filename: 'logo.png',
//                 path: path.join(__dirname, "../views/images/logo.png"),
//                 cid: 'logo' //same cid value as in the html img src
//             },
//             {
//                 filename: 'facebook.png',
//                 path: path.join(__dirname, "../views/images/facebook.png"),
//                 cid: 'facebook' //same cid value as in the html img src
//             },
//             {
//                 filename: 'github.png',
//                 path: path.join(__dirname, "../views/images/github.png"),
//                 cid: 'github' //same cid value as in the html img src
//             },
//             {
//                 filename: 'twitter.png',
//                 path: path.join(__dirname, "../views/images/twitter.png"),
//                 cid: 'twitter' //same cid value as in the html img src
//             },
//             {
//                 filename: 'instagram.png',
//                 path: path.join(__dirname, "../views/images/instagram.png"),
//                 cid: 'instagram' //same cid value as in the html img src
//             },
//             {
//                 filename: 'linkedin.png',
//                 path: path.join(__dirname, "../views/images/linkedin.png"),
//                 cid: 'linkedin' //same cid value as in the html img src
//             },
//     ]
//     };

//     transporter.sendMail(mailOptions, function(error, info){
//         if (error) {
//             //res.send('Whoah, bad move dude...')
//             console.log(error);
//             return true
//         } else {
//             //res.status(200).send('Good Mail Client.');
//             console.log('Email sent: ' + info.response);
//             return false;
//         }
//     });
// }

router.post("/", async (req, res) => {
    try {
        const { usernameOrEmail } = req.body;

         // check user existence
         const user = await pool.query("SELECT * FROM users WHERE email = $1 OR name = $1", [usernameOrEmail.trim()]);

         if (user.rows.length === 0){
             return res.status(401).json({"message":"Email invalid", "boolean": false});
         }

        //create token, send email
        const token = jwtGenerator(user.rows[0].id);

        const link = `${process.env.URL}/password-reset/${token}`;
        //const sendingEmail = await sendResetMail(user.rows[0].email, link);
        const sendingEmail = await sendEmail(user.rows[0].email, "Password Reset", emailJS.passwordResetEmailTemplate(link), emailJS.passwordResetEmailAttachments);

        //await sendEmail(user.rows[0].email, "Password Reset", link);

        if(!sendingEmail.success){
            console.log('Bad sendingEmail');
            return res.send("password reset link sent to your email account");
        }
        
        console.log('Good sending email');
        res.send("password reset link sent to your email account");

    } catch (error) {
        console.log(error);
        res.send("An error occured");
    }
});

router.post("/:token", async (req, res) => {
    try {
        const { newPassword, token } = req.body;

        const payload = jwt.verify(token, process.env.SECRET);

        const user = await User.findById(req.params.userId);
        if (!user) return res.status(400).send("invalid link or expired");

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).send("Invalid link or expired");

        user.password = req.body.password;
        await user.save();
        await token.delete();

        res.send("password reset sucessfully.");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
});


module.exports = router;
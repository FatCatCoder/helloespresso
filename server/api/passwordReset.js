const router = require('express').Router();
const pool = require('../../db');
const jwtGenerator = require('../utils/jwtGenerator');
const argon2 = require('argon2');
require('dotenv').config();
const jwt = require("jsonwebtoken");
const { redisGetToken, redisSetToken } = require('../utils/redisToken');
const Joi = require('joi');

// views
const sendEmail = require("../utils/sendEmail");
const emailJS = require('../views/email');


router.post("/", async (req, res) => {
    try {
        const { usernameOrEmail } = req.body;

         // check user existence
         const user = await pool.query("SELECT * FROM users WHERE email = $1 OR name = $1", [usernameOrEmail.trim()]);

         if (user.rows.length === 0){
             return res.status(401).json({"message":"Email invalid", "success": false});
         }

        //create token, link, then send email
        const token = jwtGenerator(user.rows[0].id, '10m', process.env.PWD_RESET_SECRET);

        const link = `${process.env.URL}/password-reset/${token}`;
        
        const sendingEmail = await sendEmail(user.rows[0].email, "Password Reset", emailJS.passwordResetEmailTemplate(link), emailJS.passwordResetEmailAttachments);

        if(!sendingEmail.success){
            return res.send({"message" : "password reset link sent to your email account", "success": false});
        }
        
        res.send({"message" : "password reset link sent to your email account", "success": true});

    } catch (error) {
        console.log(error.name, error.message);
        res.send({"message" : "Error in email occurred ", "success": false});
    }
});

router.post("/:token", async (req, res) => {
    try {
        const { newPassword, newPasswordReEntry} = req.body;
        const { token } = req.params;
        
        const blacklisted = await redisGetToken(token);
        
        if(blacklisted){
            return res.send({"message": "Token Invalid", "success": false});
        }

        const payload = 
            jwt.verify(token, process.env.PWD_RESET_SECRET, function(err, decoded) {
                if (err) {
                    return res.send({"message": "Invalid Auth or Expired", "success": false})
                }
                else{
                    return decoded;
                }
          });

        const errorMsgs = {
            "string.pattern.base": "Must contain each: A number, An uppercase Letter, any of (-!@#$%^&*,.?;:)",
            "string.min": "Password too short",
            "string.max": "Password too long",
            "any.only": "Passwords don't match"
        };

        const schema = Joi.object({
            newPassword: Joi.string().min(8).max(30).pattern(new RegExp(/^(?!.*--).*(?=.*?[-!@#$%^&*,.?;:])+(?=.*?[A-Z])(?=.*?[0-9])/)).required().messages(errorMsgs),
            newPasswordReEntry: Joi.string().min(8).max(30).valid(Joi.ref('newPassword')).pattern(new RegExp(/^(?!.*--).*(?=.*?[-!@#$%^&*,.?;:])+(?=.*?[A-Z])(?=.*?[0-9])/)).required().messages(errorMsgs)
        })

        const validData = await schema.validateAsync({ newPassword, newPasswordReEntry});
        if(!validData){
            return res.send({"message": validData.details[0].message, "success": false})
        }
        

        // hash PWD
        const hash = await argon2.hash(newPassword, {type: argon2.argon2id});

        // update password
        const user = await pool.query("UPDATE users SET password = $1 WHERE id = $2", [hash, payload.user.id]);
        if(!user){
            return res.send({"message":"Password reset unsuccessful.", "success": false});
        }

        // invalidate token
        redisSetToken(token, process.env.PWD_RESET_SECRET);

        res.send({"message":"Password reset successful. You may login with your new password now.", "success": true});

    } catch (error) {
        console.log(error.name, error.message);
        if(error.name === "ValidationError"){
            return res.send({"message": error.message, "success": false}); 
        }
        res.send({"message":"error occurred.", "success": false});
    }
});


module.exports = router;

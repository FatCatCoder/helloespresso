const sendEmail = require("../utils/sendEmail");
const router = require('express').Router();
const pool = require('../../db');
const jwtGenerator = require('../utils/jwtGenerator');

router.post("/", async (req, res) => {
    try {
        const { email } = req.body;

         // check user existence
         const user = await pool.query("SELECT * FROM users WHERE email = $1 OR name = $1", [email.trim()]);

         if (user.rows.length === 0){
             return res.status(401).json({"message":"Email invalid", "boolean": false});
         }

        //create token, send email
        const token = jwtGenerator(user.rows[0].id);

        const link = `${process.env.MY_HOST}/password-reset/${token}`;
        await sendEmail(user.rows[0].email, "Password Reset", link);

        res.send("password reset link sent to your email account");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
});

/*
router.post("/:token", async (req, res) => {
    try {
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

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

*/

module.exports = router;
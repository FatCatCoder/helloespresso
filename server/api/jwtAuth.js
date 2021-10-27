const router = require('express').Router();
const pool = require('../../db');
const argon2 = require('argon2');
const jwtGenerator = require('../utils/jwtGenerator');
const jwtValidate = require('express-jwt');
const jwt = require('jsonwebtoken');
const blacklistCheck = require('../utils/blacklist');
const redisClient = require('../../redis')
require('dotenv').config({ path: '../../.env' })
const Joi = require('joi');


// logout
router.post('/logout', (req, res) => {
    try{
        const {token} = req.body;
        
        const tokenSplit = token.split(' ');
        const decoded = jwt.verify(tokenSplit[1], process.env.SECRET);
        const EXP = decoded.exp - Math.floor(new Date().getTime()/1000.0)

        redisClient.setex(tokenSplit[1], EXP, decoded.user.id, (error, data) => {
            if(error){
                res.send({"message": "logout error", "success": false});
            }
        })
        res.send({"message": "logged out", "success": true});
    }
    catch(error){
        console.log(error.name, error.message);
        res.send({"message": "error", "success": false});
    }
})

// login
router.post('/login', async(req, res) => {
    try {
        // destructor req.body 
        const { email, password } = req.body;

        // check user existence
        const user = await pool.query("SELECT * FROM users WHERE email = $1 OR name = $1", [email.trim()]);

        if (user.rows.length === 0){
            return res.status(401).json({"message":"Email or Password is invalid", "boolean": true});
        }

        // check pwd 

        const validatePwd = await argon2.verify(user.rows[0].password, password);

        if (!validatePwd){
            return res.status(401).json({"message":"Email or Password is invalid", "boolean": true});
        }

        // give jwt token
        const token = 'Bearer ' + jwtGenerator(user.rows[0].id, '1w');
        res.set('Authorization', token).send();


    } 
    catch (error) {
        console.error('login error', error.message);
        res.status(500).send({"message": "server error", "boolean": false}); 
    }
})

// register
router.post('/register', async(req, res) => {
    try {
        // destructor req.body
        const { name, email, password, passwordConfirm } = req.body;

        const errorMsgs = {
            "string.pattern.base": "Must contain each: A number, An uppercase Letter, any of (-!@#$%^&*,.?;:)",
            "string.min": "Password too short",
            "string.max": "Password too long",
            "any.only": "Passwords don't match"
        };

        const schema = Joi.object({
            name: Joi.string().min(3).max(15).required(),
            email: Joi.string().email(),
            password: Joi.string().min(8).max(30).pattern(new RegExp(/^(?!.*--).*(?=.*?[-!@#$%^&*,.?;:])+(?=.*?[A-Z])(?=.*?[0-9])/)).required().messages(errorMsgs),
            passwordConfirm: Joi.string().min(8).max(30).valid(Joi.ref('password')).pattern(new RegExp(/^(?!.*--).*(?=.*?[-!@#$%^&*,.?;:])+(?=.*?[A-Z])(?=.*?[0-9])/)).required().messages(errorMsgs)
        })

        const validData = await schema.validateAsync({ name, email, password, passwordConfirm });
        if(!validData){
            return res.send({"message": validData.details[0].message, "success": false})
        }

        // check if exists, ensures unique name and email
        const user = await pool.query("SELECT * FROM users WHERE name = $1 OR email = $2", [name, email])
        if (user.rows.length !== 0){
            return res.status(401).send('User Exists!');
        }
        // argon2id hash the password
        const hash = await argon2.hash(password, {type: argon2.argon2id});

        //add new user to db
        const newUser = await pool.query("INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *", [name, email, hash]);

        // generate jwt or just redirect to login
        const token = await 'Bearer ' + jwtGenerator(newUser.rows[0].user_id);
        res.set('Authorization', token).send({"success": true, "message": "Now Registed"});
    } 
    catch (error) {
        console.log(error.name, error.message);
        if(error.name === "ValidationError"){
            return res.send({"message": error.message, "success": false}); 
        }
        res.status(500).send("server error");  
    }
})

// verify Jwt auth
router.get("/verify-auth", blacklistCheck, jwtValidate({secret: process.env.SECRET, algorithms: ['HS256']}), async(req, res) => {
    try {
        res.json({"verified": true});
    } catch (error) {
        if (error.name === 'UnauthorizedError' ) {
            console.log(error.name, error.message);
            return res.status(401).json({"verified": false});
        }
        else if (error.name === 'TokenExpiredError' ) {
            console.log(error.name, error.message);
            return res.status(401).json({"verified": false});
        }
        else{
            console.log(error.name, error.message);
            return res.status(500).json({"verified": false})
        }
    }
})

module.exports = router;

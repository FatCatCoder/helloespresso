const router = require('express').Router();
const pool = require('../../db');
const argon2 = require('argon2');
const jwtGenerator = require('../utils/jwtGenerator');
const jwtValidate = require('express-jwt');
const jwt = require('jsonwebtoken');
const blacklistCheck = require('../utils/blacklist');
const redis = require("redis");
const redisClient = redis.createClient();
require('dotenv').config({ path: '../../.env' })


// logout
router.post('/logout', (req, res) => {
    try{
        const {token} = req.body;
        console.log(token)
        const tokenSplit = token.split(' ');
        const decoded = jwt.verify(tokenSplit[1], process.env.SECRET);
        console.log(decoded, decoded.user)
        const EXP = decoded.exp - Math.floor(new Date().getTime()/1000.0)

        redisClient.setex(tokenSplit[1], EXP, decoded.user.id, (error, data) => {
            if(error){
                console.log(error, data);
                res.send({error});
            }
        })

        res.send({"message": "logged out", "success": true});
    }
    catch(error){
        console.log(error);
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
        const token = 'Bearer ' + jwtGenerator(user.rows[0].id, '4h');
        res.set('Authorization', token).send();


    } 
    catch (error) {
        console.error('login error', error.message);
        res.status(500).send("server error"); 
    }
})

// register
router.post('/register', async(req, res) => {
    try {
        // destructor req.body
        const { name, email, password } = req.body;

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
        res.set('Authorization', token).send();
    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send("server error");  
    }
})

// verify Jwt auth
router.get("/verify-auth", blacklistCheck, jwtValidate({secret: process.env.SECRET, algorithms: ['HS256']}), async(req, res) => {
    try {
        console.log('verify-auth good');
        res.json({"verified": true});
    } catch (error) {
        if (err.name === 'UnauthorizedError'|| error.name === 'UnauthorizedError' ) {
        console.log('verify-auth error');
        //console.error(error.message);
        res.status(401).json({"verified": false});
        }
        else if (err.name == 'TokenExpiredError'|| error.name == 'TokenExpiredError' ) {
            console.log('verify-auth error');
            //console.error(error.message);
            res.status(401).json({"verified": false});
            }
        else{
            console.log('Verfiy Auth 500 Bad', error.message)
            res.status(500).json({"verified": false})
        }
    }
})

// get TTL on redis key // remove in production //
router.get('/ttl', (req, res) => {
    //const token = req.headers.authorization;
    const {token} = req.body;
    const tokenSplit = token.split(' ');
    const decoded = jwt.verify(tokenSplit[1], process.env.SECRET);

    redisClient.ttl(tokenSplit[1], (err, reply) =>{
        console.log(reply);
        res.send(reply)
    });
})


module.exports = router;

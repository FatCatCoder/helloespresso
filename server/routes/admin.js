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


const unauth = function(err, req, res, next) {
    if(err.name === 'UnauthorizedError') {
      return res.status(err.status).send('bad');
    }
  next();
  };

// router.get("/verify", jwtValidate({secret: process.env.ADMIN_SECRET, algorithms: ['HS256']}), unauth, (req, res) => {
//     console.log('admin hit');
//     // return res.sendStatus(200);
//     try {
//         console.log('verify-auth good');
//         return res.sendStatus(200).send('good');
//     } catch (error) {
//         if (err.name === 'UnauthorizedError'|| error.name === 'UnauthorizedError' ) {    
//             return res.sendStatus(403).send('bad');
//         }
//         else if (err.name == 'TokenExpiredError'|| error.name == 'TokenExpiredError' ) {
//             return res.sendStatus(403).send('bad');
//             }
//         else{
//             return res.sendStatus(500).send('bad');
//         }
//     }
// })

router.get("/verify", async(req, res) => {
    console.log('admin hit');
    try {
        const token = await req.headers['x-original-uri']
        const isValid = await jwt.verify(token.split('token=%20')[1], process.env.ADMIN_SECRET)

        // token method
        // const token = await req.headers.authorization;
        // const isValid = await jwt.verify(token.split('Bearer ')[1], process.env.ADMIN_SECRET)

        if(!isValid){
            console.log('verify-auth bad');
            return res.sendStatus(403).send('bad');
        }

        return res.sendStatus(200).send();

    } catch (error) {
        console.log(error);
        
        return res.sendStatus(500).send('bad');

    }
})
    

router.post('/login', async(req, res) => {
    try {
        // destructor req.body 
        const { name, password } = req.body;
        // check user existence
        const user = await pool.query("SELECT * FROM admins WHERE name = $1", [name.trim()]);
        if (user.rows.length === 0){
            return res.status(401).json({"message":"Email or Password is invalid", "success": false});
        }
        // check pwd 
        const validatePwd = await argon2.verify(user.rows[0].password, password);
        if (!validatePwd){
            return res.status(401).json({"message":"Email or Password is invalid", "success": false});
        }
        // give jwt token
        const token = 'Bearer ' + jwtGenerator('admin', '5m', process.env.ADMIN_SECRET);
        console.log(token);
        
        return res.setHeader('Authorization', token).status(200).send();
    } 
    catch (error) {
        res.status(500).send("server error"); 
    }
})

module.exports = router;

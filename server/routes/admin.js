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


// // logout
// router.post('/logout', (req, res) => {
//     try{
//         const {token} = req.body;
//         console.log(token)
//         const tokenSplit = token.split(' ');
//         const decoded = jwt.verify(tokenSplit[1], process.env.SECRET);
//         console.log(decoded, decoded.user)
//         const EXP = decoded.exp - Math.floor(new Date().getTime()/1000.0)

//         redisClient.setex(tokenSplit[1], EXP, decoded.user.id, (error, data) => {
//             if(error){
//                 console.log(error, data);
//                 res.send({error});
//             }
//         })

//         res.send({"message": "logged out", "success": true});
//     }
//     catch(error){
//         console.log(error);
//         res.send({"message": "error", "success": false});
//     }
// })

// // login
// router.post('/login', async(req, res) => {
//     try {
//         // destructor req.body 
//         const { email, password } = req.body;

//         // check user existence
//         const user = await pool.query("SELECT * FROM users WHERE email = $1 OR name = $1", [email.trim()]);

//         if (user.rows.length === 0){
//             return res.status(401).json({"message":"Email or Password is invalid", "boolean": true});
//         }

//         // check pwd 

//         const validatePwd = await argon2.verify(user.rows[0].password, password);

//         if (!validatePwd){
//             return res.status(401).json({"message":"Email or Password is invalid", "boolean": true});
//         }

//         // give jwt token
//         const token = 'Bearer ' + jwtGenerator(user.rows[0].id, '4h');
//         res.set('Authorization', token).send();


//     } 
//     catch (error) {
//         console.error('login error', error.message);
//         res.status(500).send("server error"); 
//     }
// })

// /* blacklistCheck, jwtValidate({secret: process.env.SECRET, algorithms: ['HS256']}), */ async
// verify Jwt auth
router.get("/", (req, res) => {
    console.log('admin hit');
    
    return res.sendStatus(200);
    // try {
    //     console.log('verify-auth good');
    //     res.status(200);
    // } catch (error) {
    //     if (err.name === 'UnauthorizedError'|| error.name === 'UnauthorizedError' ) {
    //     console.log('verify-auth error');
    //     //console.error(error.message);
    //     res.status(401).json({"verified": false});
    //     }
    //     else if (err.name == 'TokenExpiredError'|| error.name == 'TokenExpiredError' ) {
    //         console.log('verify-auth error');
    //         //console.error(error.message);
    //         res.status(401).json({"verified": false});
    //         }
    //     else{
    //         console.log('Verfiy Auth 500 Bad', error.message)
    //         res.status(500).json({"verified": false})
    //     }
    // }
})

module.exports = router;

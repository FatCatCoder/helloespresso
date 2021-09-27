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

// jwtValidate({secret: process.env.ADMIN_SECRET, algorithms: ['HS256']}),
router.get("/", (req, res) => {
    console.log('admin hit');
    return res.sendStatus(200);
    try {
        console.log('verify-auth good');
        return res.sendStatus(200);
    } catch (error) {
        if (err.name === 'UnauthorizedError'|| error.name === 'UnauthorizedError' ) {
        return res.sendStatus(403);
        }
        else if (err.name == 'TokenExpiredError'|| error.name == 'TokenExpiredError' ) {
            return res.sendStatus(403);
            }
        else{
            res.status(500)
        }
    }
})

router.post('/', async(req, res) => {
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
        const token = 'Bearer ' + jwtGenerator('admin', '1h', process.env.ADMIN_SECRET);
        return res.send('Authorization', token);
    } 
    catch (error) {
        res.status(500).send("server error"); 
    }
})

module.exports = router;

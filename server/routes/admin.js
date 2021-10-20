const router = require('express').Router();
const pool = require('../../db');
const argon2 = require('argon2');
const jwtGenerator = require('../utils/jwtGenerator');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../../.env' })

router.get("/verify", async(req, res) => {
    try {
        const token = await req.headers['x-original-uri']
        const isValid = await jwt.verify(token.split('token=%20')[1], process.env.ADMIN_SECRET)
        if(!isValid){
            console.log('verify-auth bad');
            return res.sendStatus(403).send('bad');
        }
        return res.sendStatus(200).send();
    } catch (error) {
        console.log(error.name, error.message);
        return res.sendStatus(500).send('bad');

    }
})  

router.post('/login', async(req, res) => {
    try {
        const { name, password } = req.body;

        const user = await pool.query("SELECT * FROM admins WHERE name = $1", [name.trim()]);
        if (user.rows.length === 0){
            return res.status(401).json({"message":"Email or Password is invalid", "success": false});
        }
        
        const validatePwd = await argon2.verify(user.rows[0].password, password);
        if (!validatePwd){
            return res.status(401).json({"message":"Email or Password is invalid", "success": false});
        }
        
        const token = 'Bearer ' + jwtGenerator('admin', '5m', process.env.ADMIN_SECRET);
        
        return res.setHeader('Authorization', token).status(200).send();
    } 
    catch (error) {
        console.log(error.name, error.message);
        return res.status(500).send("server error"); 
    }
})

module.exports = router;

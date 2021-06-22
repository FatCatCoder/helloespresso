const router = require('express').Router();
const pool = require('../../db');
const argon2 = require('argon2');
const jwtGenerator = require('../utils/jwtGenerator');
const jwtValidate = require('express-jwt');
require('dotenv').config({ path: '../../.env' })


// routes

router.get('/', async(req, res) => {
    res.send('authorized homepage');
})

router.post('/login', async(req, res) => {
    try {
        // destructor req.body 
        const { email, password } = req.body;

        // check user existence
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        if (user.rows.length === 0){
            return res.status(401).send("Email or Password is invalid");
        }

        // check pwd 

        const validatePwd = await argon2.verify(user.rows[0].password, password);

        if (!validatePwd){
            return res.status(401).send("Email or Password is invalid");
        }

        // give jwt token
        const token = 'Bearer ' + jwtGenerator(user.rows[0].id);
        res.set('Authorization', token).send();


    } 
    catch (error) {
        console.error('login error', error.message);
        res.status(500).send("server error"); 
    }
})

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
// jwtValidate({secret: process.env.SECRET, algorithms: ['HS256']})
router.get("/verify-auth", jwtValidate({secret: process.env.SECRET, algorithms: ['HS256']}), async(req, res) => {
    try {
        console.log('verify-auth good');
        res.json({"verified": true});
    } catch (error) {
        if (err.name === 'UnauthorizedError') {
        console.log('verify-auth error');
        //console.error(error.message);
        res.status(401).json({"verified": false});
        }
        else{
            res.status(500).json({"verified": false})
        }
    }
})


module.exports = router;

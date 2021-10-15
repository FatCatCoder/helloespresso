const jwt = require('jsonwebtoken');
const redis = require("redis");
const redisClient = redis.createClient();
require('dotenv').config({ path: '../../.env' })

// blacklist middleware

const blacklistCheck = (req, res, next) => {
    try{
        console.log('blacklist check middleware try');
        const token = req.headers.authorization;
            if(!token){throw new Error('noAuthHeader')}

        const tokenSplit = token.split(' ');

        const decoded = jwt.verify(tokenSplit[1], process.env.SECRET);
        console.log(decoded);

        if(decoded){
            console.log('blacklist check middleware try if true');
            redisClient.get(tokenSplit[1], (error, data) => {
                if(error){
                    console.log('Some randon try error', error);
                    return res.status(403).send({ error });
                }
                else if(data){
                    console.log('you are blacklisted', data)
                    return res.status(403).send({ error });
                }
                else if(!data){
                    console.log('valid token, not blacklisted, please continue!');
                    next();
                }
            });
        }
    }
    catch(err){
        console.log('blacklist check middleware catch');
        if (err.name === 'TokenExpiredError') {
            console.log('Blacklist Jwt auth error');
            res.status(401).send({"message": "Login Expired!", "verified": false});
        }
        else if(err.message === 'noAuthHeader'){
            res.status(401).send({"message": "Unauthorized.", "verified": false});
        }
        else{
            console.log('catched error, unknown', err);
            res.status(500).send({"message": "Uh oh! Something messed up.", "verified": false});
        }
    }
}

module.exports = blacklistCheck;
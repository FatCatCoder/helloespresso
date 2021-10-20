const jwt = require('jsonwebtoken');
const redis = require("redis");
const redisClient = redis.createClient();
require('dotenv').config({ path: '../../.env' })

// blacklist middleware

const blacklistCheck = (req, res, next) => {
    try{
        const token = req.headers.authorization;
            if(!token){throw new Error('noAuthHeader')}

        const tokenSplit = token.split(' ');

        const decoded = jwt.verify(tokenSplit[1], process.env.SECRET);

        if(decoded){
            redisClient.get(tokenSplit[1], (error, data) => {
                if(error){
                    return res.status(403).send({ "message": "Invalid Auth", "verified": false });
                }
                else if(data){
                    return res.status(403).send({ "message": "Invalid Auth", "verified": false });
                }
                else if(!data){
                    next();
                }
            });
        }
    }
    catch(err){
        if (err.name === 'TokenExpiredError') {
            res.status(401).send({"message": "Login Expired!", "verified": false});
        }
        else if(err.message === 'noAuthHeader'){
            res.status(401).send({"message": "Unauthorized.", "verified": false});
        }
        else{
            console.log(err.name, err.message);
            res.status(500).send({"message": "Uh oh! Something messed up.", "verified": false});
        }
    }
}

module.exports = blacklistCheck;
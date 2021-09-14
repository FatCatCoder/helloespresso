const jwt = require('jsonwebtoken');
const redis = require("redis");
const redisClient = redis.createClient();

require('dotenv').config({ path: '../../.env' })


// blacklist middleware

const blacklistCheck = (req, res, next) => {
    console.log('blacklist check middleware start');
    try{
        console.log('blacklist check middleware try');
        const token = req.headers.authorization;
        const tokenSplit = token.split(' ');

        const decoded = jwt.verify(tokenSplit[1], process.env.SECRET);
        console.log(decoded);

        if(decoded){
            console.log('blacklist check middleware try if true');
            redisClient.get(tokenSplit[1], (error, data) => {
                if(error){
                    console.log('1');
                    return res.status(403).send({ error });
                }
                else if(data){
                    console.log('2');
                    console.log('you are blacklisted', data)
                    return res.status(403).send({ error });
                }
                else if(!data){
                    console.log('3');
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

        else{
            res.status(500).send({"message": "Uh oh! Something messed up.", "verified": false});;
        }
    }
}

module.exports = blacklistCheck;
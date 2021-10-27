const { promisify } = require("util");
const redisClient = require('../../redis')
const jwt = require('jsonwebtoken');

// async wrappers
const getAsync = promisify(redisClient.get).bind(redisClient);

// Utils //

async function redisGetToken(token){
    return await getAsync(token);
}

function redisSetToken(token, secret){
    const decoded = jwt.verify(token, secret);
    const EXP = decoded.exp - Math.floor(new Date().getTime() / 1000.0)
    redisClient.setex(token, EXP, decoded.user.id)
}

module.exports = { redisGetToken, redisSetToken };
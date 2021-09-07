const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../../.env' });

// jwt gen
const generateToken = (user_id, expires = '30m', secretKey = process.env.SECRET) => {

    const payload = {
        user: {id: user_id}
    }
    return jwt.sign(payload, secretKey, {expiresIn: expires})
}

module.exports = generateToken;
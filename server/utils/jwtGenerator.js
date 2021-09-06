const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../../.env' });

// jwt gen
const generateToken = (user_id, expires = '10m') => {

    const payload = {
        user: {id: user_id}
    }
    return jwt.sign(payload, process.env.SECRET, {expiresIn: expires})
}

module.exports = generateToken;
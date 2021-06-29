const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../../.env' });

// jwt gen
const generateToken = (user_id) => {

    const payload = {
        user: {id: user_id}
    }
    return jwt.sign(payload, process.env.SECRET, {expiresIn: '20m'})
}

module.exports = generateToken;
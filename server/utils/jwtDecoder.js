const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../../.env' });

// accepts bearer token, returns payload
function decoder(bearer){
    const tokenSplit = bearer.split(' ');
    return jwt.verify(tokenSplit[1], process.env.SECRET);   
}
module.exports = decoder;
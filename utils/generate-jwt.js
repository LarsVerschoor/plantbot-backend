const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const privateKey = fs.readFileSync(path.join(__dirname, '../keys/private.key'), { encoding: 'utf-8' });

module.exports = (user) => {
    return jwt.sign({
        user_id: user.id,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60
    }, privateKey, { algorithm: 'RS256' });
}
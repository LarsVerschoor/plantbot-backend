const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

const { User } = require('../../database/models');

const publicKey = fs.readFileSync(path.join(__dirname, '../../keys/public.key'));

const authenticate = async (req, res, next) => {
    // Authorization header validation
    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader) return res.status(401).json({ error: 'Authorization header is missing' });

    const tokenParts = authorizationHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') return res.status(401).json({ error: 'Invalid Authorization header format' });

    const JsonWebToken = tokenParts[1];

    try {
        // Decode jwt then query user
        const { user_id } = jwt.verify(JsonWebToken, publicKey, { algorithms: ['RS256'] });
        req.user = await User.findByPk(user_id, null);
        if (!req.user) return res.status(401).json({ error: 'User not found' });
        next();
    } catch (error) {
        if (error.message === 'invalid signature') {
            return res.status(400).json({error: 'Invalid Token'});
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({error: 'Token expired'});
        }
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = authenticate;
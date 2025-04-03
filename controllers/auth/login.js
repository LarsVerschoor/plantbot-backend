const { User } = require('../../database/models');
const bcrypt = require('bcrypt');
const generateJsonWebToken = require('../../utils/generate-jwt');

const INVALID_CREDENTIALS_MESSAGE = 'Invalid credentials';

const login = async (req, res) => {
    const emailRaw = req.body?.email;
    const passwordRaw = req.body?.password;
    if (!emailRaw || !passwordRaw) return res.status(400).json({ error: 'Email and password are required' });
    if (typeof emailRaw !== 'string' || typeof passwordRaw !== 'string') return res.status(400).json({ error: 'Email and password must be of type string' });
    const email = emailRaw.trim();
    const password = passwordRaw.trim();

    try {
        const user = await User.scope('withPassword').findOne({ where: { email, email_verified: 1 } });
        if (!user) {
            // perform dummy hash to prevent timing-attacks
            await bcrypt.compare('dummy', '$10$GZFjgafhmGppC3Xedepii.eVffZ1z7XDaxtNwgxc9v9dWxO2Vd8eq');
            return res.status(400).json({ error: INVALID_CREDENTIALS_MESSAGE });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: INVALID_CREDENTIALS_MESSAGE });
        }
        const jwt = generateJsonWebToken(user);
        res.status(200).json({ token: jwt });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = login;
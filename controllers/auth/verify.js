const bcrypt = require('bcrypt');

const { User } = require('../../database/models');
const generateJsonWebToken = require('../../utils/generate-jwt');
const INVALID_CODE_MESSAGE = 'Invalid verification code';

const verify = async (req, res) => {
    // Validation
    const verificationCodeRaw = req.body?.code;
    const emailRaw = req.body?.email;
    if (!verificationCodeRaw || !emailRaw) return res.status(400).json({ error: 'Verification code or email is missing' });
    if (typeof verificationCodeRaw !== 'string' || typeof emailRaw !== 'string') return res.status(400).json({ error: 'Verification code and email must be of type \'string\'' });
    const verificationCode = verificationCodeRaw.trim();
    const email = emailRaw.trim();

    try {

        const user = await User.scope('withEmailVerificationCode').findOne({ where: { email } });
        if (!user) {
            // Perform comparison to prevent timing attacks and don't let client know that user doesn't exist
            await bcrypt.compare('dummy', '$10$GZFjgafhmGppC3Xedepii.eVffZ1z7XDaxtNwgxc9v9dWxO2Vd8eq');
            return res.status(400).json({ error: INVALID_CODE_MESSAGE });
        }

        const isMatch = await bcrypt.compare(verificationCode, user.email_verification_code);
        if (!isMatch) return res.status(400).json({ error: INVALID_CODE_MESSAGE });

        user.email_verified = 1;
        await user.save();

        const jwt = generateJsonWebToken(user);
        res.status(200).json({ token: jwt });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = verify;
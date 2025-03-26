const path = require('path');
const fs = require('fs').promises;
const bcrypt = require('bcrypt');

const hash = require('../../utils/hash');
const generateVerificationCode = require('../../utils/generate-verification-code');
const { User } = require('../../database/models');
const transporter = require(path.join(__dirname, '../../utils/nodemailer-transporter'));
const VERIFICATION_MESSAGE = 'We have sent an email with your verification code to {{EMAIL}}.';

const sendActivationEmail = async (email, code) => {
    try {
        const mailOptions = {
            from: 'plantbotserver@gmail.com',
            to: email,
            subject: 'Activation code for your account',
            html: (await fs.readFile(path.join(__dirname, '../../emails/verification.html'), 'utf8')).replace('{{VERIFICATION_CODE}}', code)
        }
        return await transporter.sendMail(mailOptions)
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
}

const sendExistsEmail = async (email, forgot_password_url) => {
    try {
        const mailOptions = {
            from: 'plantbotserver@gmail.com',
            to: email,
            subject: 'You already have an account',
            html: (await fs.readFile(path.join(__dirname, '../../emails/existing-user.html'), 'utf8')).replace('{{FORGOT_PASSWORD_URL}}', forgot_password_url)
        }
        return await transporter.sendMail(mailOptions)
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
}

const register = async (req, res) => {
    const { email, password } = req.body;

    // Input validation
    const badRequestErrors = [];
    if (!email) badRequestErrors.push('Email is a required field.');
    if (!password) badRequestErrors.push('Password is a required field.');
    if (typeof email !== 'string') badRequestErrors.push('Email must be of type \'string\'.');
    if (typeof password !== 'string') badRequestErrors.push('Password must be of type \'string\'.');
    if (badRequestErrors.length > 0) return res.status(400).json({ error: badRequestErrors.join(' ') });

    try {
        // Perform the hashing even when the user already exists to prevent timing attacks
        const passwordHash = await hash(password);
        const [verificationCode, hashedVerificationCode] = await generateVerificationCode();

        const existingUser = await User.scope('withPassword').findOne({ where: { email } });

        // If user already exists
        if (existingUser) {
            // Do not let the client know that the email is already in use.
            if (existingUser.email_verified) await sendExistsEmail(email, `${process.env.BASE_URL}/forgot-password`);

            // Sending response before comparing passwords to prevent timing-attacks
            res.status(201).json({ message: VERIFICATION_MESSAGE.replace('{{EMAIL}}', email), email });

            // If user is not yet verified, re-send a new code if password matches
            if (existingUser.email_verified) return;
            const isMatch = await bcrypt.compare(password, existingUser.password);
            if (!isMatch) return;
            existingUser.email_verification_code = hashedVerificationCode;
            await existingUser.save();
            await sendActivationEmail(email, verificationCode);
            return;
        }

        // If user does not yet exist
        await User.create({
            email: email,
            password: passwordHash,
            email_verified: 0,
            email_verification_code: hashedVerificationCode
        });

        await sendActivationEmail(email, verificationCode);
        return res.status(201).json({ message: VERIFICATION_MESSAGE.replace('{{EMAIL}}', email), email });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = register;
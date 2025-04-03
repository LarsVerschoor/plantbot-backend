const crypto = require('crypto');
const hash = require('./hash');

const generateVerificationCode = async () => {
    const verificationCode = crypto.randomBytes(3).toString('hex');
    return [verificationCode, await hash(verificationCode)];
}

module.exports = generateVerificationCode;
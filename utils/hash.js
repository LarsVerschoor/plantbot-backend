const bcrypt = require('bcrypt');

const saltRounds = parseInt(process.env['BCRYPT_HASH_ROUNDS'], 10) || 10;

const hash = async (plainText) => {
    try {
        return await bcrypt.hash(plainText, saltRounds);
    } catch(error) {
        console.error(error);
        throw new Error(error);
    }
}

module.exports = hash;
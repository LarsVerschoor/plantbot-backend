const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

(async () => {
    try {
        const { privateKey, publicKey } = await new Promise((resolve, reject) => {
            crypto.generateKeyPair('rsa', {
                modulusLength: 2048,
                publicKeyEncoding: { type: 'spki', format: 'pem' },
                privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
            }, (error, publicKey, privateKey) => {
                if (error) return reject(error);
                return resolve({ privateKey, publicKey });
            });
        });

        const keysDirectory = path.join(__dirname, '../keys');
        await fs.mkdir(keysDirectory, { recursive: true });
        await fs.writeFile(path.join(keysDirectory, 'private.key'), privateKey, { encoding: 'utf-8' });
        await fs.writeFile(path.join(keysDirectory, 'public.key'), publicKey, { encoding: 'utf-8' });

        console.log('RSA key pair for JWT generated successfully!');
    } catch (error) {
        console.error('Failed to generate keys: ', error);
    }
})();
const crypto = require('crypto');

class EasyAES {
    constructor(key, iv, algorithm = 'aes-256-cbc') {
        this.key = key;
        this.iv = iv;
        this.algorithm = algorithm;
    }

    encryptData(data) {
        const cipher = crypto.createCipheriv(this.algorithm, Buffer.from(this.key, 'base64'), Buffer.from(this.iv, 'base64'));
        let encryptedData = cipher.update(data, 'utf-8', 'base64');
        encryptedData += cipher.final('base64');
        return encryptedData;
    };

    decryptData(encryptedData) {
        const decipher = crypto.createDecipheriv(this.algorithm, Buffer.from(this.key, 'base64'), Buffer.from(this.iv, 'base64'));
        let decryptedData = decipher.update(encryptedData, 'base64', 'utf-8');
        decryptedData += decipher.final('utf-8');
        return decryptedData;
    };

    isStringEncrypted(encryptedString) {
        try {
            // Try to decrypt the string
            this.decryptData(encryptedString);
            // If decryption succeeds without error, return true
            return true;
        } catch (error) {
            // If decryption fails (error occurs), return false
            return false;
        }
    }

    generateKeyAndIv() {
        // Generate a random 32-byte key
        const key = crypto.randomBytes(32).toString('base64');
        // Generate a random 16-byte IV
        const iv = crypto.randomBytes(16).toString('base64');
        return { key, iv }
    }

}

module.exports = EasyAES;

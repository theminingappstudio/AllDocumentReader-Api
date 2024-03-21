// const EasyAES = require('../src/EasyAES.js');
const EasyAES = require('./EasyAES');
const Utils = require('./Utils');

class CryptoUtils {
    static key = Utils.KEY;
    static iv = Utils.IV;

    static setKeyAndIV(key, iv) {
        CryptoUtils.key = key;
        CryptoUtils.iv = iv;
    }

    static createAES() {
        return new EasyAES(CryptoUtils.key, CryptoUtils.iv);
    }

    static encryptString(plaintext) {
        const aes = this.createAES();
        return aes.encryptData(plaintext);
    }

    static decryptString(encryptedText) {
        const aes = this.createAES();
        return aes.decryptData(encryptedText);
    }

    static isStringEncrypted(encryptedText) {
        const aes = this.createAES();
        return aes.isStringEncrypted(encryptedText);
    }
}

module.exports = CryptoUtils;

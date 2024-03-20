const { on } = require("nodemon");
const OnlineConverter = require("../models/OnlineConverter");
const CryptoUtils = require("../utils/CryptoUtils");
const Utils = require("../utils/Utils");

CryptoUtils.setKeyAndIV(Utils.KEY, Utils.IV);

const getAllOnlineConverter = async (req, res) => {
    await handleData(req, res);
};

async function handleData(req, res) {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).send(CryptoUtils.encryptString(Utils.REQUEST_BODY_EMPTY));
        }

        const { deviceId, v, packageName } = req.body;

        if (!deviceId || !v || !packageName) {
            res.status(400).send(CryptoUtils.encryptString(Utils.REQUIRED_FILED_MESSING));
        }

        // Check if fields are encrypted
        if (!CryptoUtils.isStringEncrypted(deviceId) || !CryptoUtils.isStringEncrypted(v) || !CryptoUtils.isStringEncrypted(packageName)) {
            return res.status(400).send(Utils.PLEASE_SEND_ENCRYPTED_Value);
        }


        // Decrypt encrypted fields
        const decryptedDeviceId = CryptoUtils.decryptString(deviceId);
        const decryptedV = CryptoUtils.decryptString(v);
        const decryptedPackageName = CryptoUtils.decryptString(packageName);

        if (decryptedPackageName == CryptoUtils.decryptString(Utils.APP_PACKAGE_NAME)) {
            const onlineConverters = await OnlineConverter.find({});
            // Check if the query parameter dec is equal to 1
            if (req.query.dec === "1") {
                res.send(onlineConverters);
            } else {
                const onlineConvertersString = JSON.stringify(onlineConverters);
                const encryptedData = CryptoUtils.encryptString(onlineConvertersString); // Encrypt the string data
                res.send(CryptoUtils.encryptString(encryptedData));
            }
        }
    } catch (e) {
        console.error(e);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = getAllOnlineConverter;
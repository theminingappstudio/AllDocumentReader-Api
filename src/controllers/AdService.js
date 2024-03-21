const { json } = require("express");
const AdData = require("../models/AdData");
const CryptoUtils = require("../utils/CryptoUtils");
const Utils = require("../utils/Utils");

const getAllAdData = async (req, res) => {
    await handleAdServiceRequest(req, res);
};

async function handleAdServiceRequest(req, res) {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).send(CryptoUtils.encryptString(Utils.REQUEST_BODY_EMPTY));
        }

        const { deviceId, v, packageName } = req.body

        if (!deviceId || !v || !packageName) {
            res.status(400).send(CryptoUtils.encryptString(Utils.REQUIRED_FILED_MESSING));
        }

        if (!CryptoUtils.isStringEncrypted(deviceId) || !CryptoUtils.encryptString(v) || !CryptoUtils.encryptString(packageName)) {
            res.status(400).send(CryptoUtils.encryptString(Utils.PLEASE_SEND_ENCRYPTED_Value));
        }

        // Decrypt encrypted fields
        const decryptedDeviceId = CryptoUtils.decryptString(deviceId);
        const decryptedV = CryptoUtils.decryptString(v);
        const decryptedPackageName = CryptoUtils.decryptString(packageName);

        if (decryptedPackageName === CryptoUtils.decryptString(Utils.APP_PACKAGE_NAME)) {
            const AllAdData = await AdData.find({});

            if (req.body.dec === Utils.API_DEC_QUERY) {
                res.send(AllAdData);
            } else {
                const AllAdDataString = JSON.stringify(AllAdData);
                const encryptData = CryptoUtils.encryptString(AllAdDataString);
                res.send(encryptData);
            }
        }

    } catch (error) {
        res.status(500).send(CryptoUtils.encryptString(Utils.INTERNAL_SERVER_ERROR));
    }
};

module.exports = getAllAdData
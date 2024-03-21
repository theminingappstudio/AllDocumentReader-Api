const MonetizeProductData = require("../models/MonetizeProductData");
const CryptoUtils = require("../utils/CryptoUtils");
const Utils = require("../utils/Utils");

const getAllMonetizeProduct = async (req, res) => {
    await handleMonetizeProductRequest(req, res);
};

async function handleMonetizeProductRequest(req, res) {
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
        const decryptedPackageName = CryptoUtils.decryptString(packageName);

        if (decryptedPackageName === CryptoUtils.decryptString(Utils.APP_PACKAGE_NAME)) {
            const AllMonetizeProductData = await MonetizeProductData.find({});

            if (req.query.dec === Utils.API_DEC_QUERY) {
                res.send(AllMonetizeProductData);
            } else {
                const AllMonetizeProductDataString = JSON.stringify(AllMonetizeProductData);
                const encryptData = CryptoUtils.encryptString(AllMonetizeProductDataString);
                res.send(encryptData);
            }
        } else {
            res.status(400).send(CryptoUtils.encryptString(Utils.PLEASE_SEND_VAlid_DATA));
        }

    } catch (error) {
        res.status(500).send(CryptoUtils.encryptString(Utils.INTERNAL_SERVER_ERROR));
    }
};

module.exports = getAllMonetizeProduct;
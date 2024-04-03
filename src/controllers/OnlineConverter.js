const OnlineConverter = require("../models/OnlineConverter");
const CryptoUtils = require("../utils/CryptoUtils");
const Utils = require("../utils/Utils");

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
        const decryptedPackageName = CryptoUtils.decryptString(packageName);

        if (decryptedPackageName == CryptoUtils.decryptString(Utils.APP_PACKAGE_NAME)) {
            const onlineConverters = await OnlineConverter.find({});
            // Check if the query parameter dec is equal to 1
            if (req.query.dec === Utils.API_DEC_QUERY) {
                res.send(getStandardResponse(true, "", onlineConverters));
            } else {
                const onlineConvertersString = JSON.stringify(getStandardResponse(true, "", onlineConverters));
                const encryptedData = CryptoUtils.encryptString(onlineConvertersString); // Encrypt the string data
                res.send(encryptedData);
            }
        } else {
            res.status(400).send(CryptoUtils.encryptString(getStandardResponse(false, Utils.PLEASE_SEND_VAlid_DATA)));
        }

    } catch (e) {
        console.error(e);
        res.status(500).send(Utils.INTERNAL_SERVER_ERROR);
    }
}

const insertOnlineConverter = async (req, res) => {
    await handleInsertData(req, res);
};


async function handleInsertData(req, res) {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).send(CryptoUtils.encryptString(Utils.REQUEST_BODY_EMPTY));
        }

        const { converterName, actionUrl } = req.body;

        if (!converterName || !actionUrl) {
            res.status(400).send(CryptoUtils.encryptString(Utils.REQUIRED_FILED_MESSING));
        }

        // Check if fields are encrypted
        if (!CryptoUtils.isStringEncrypted(converterName) || !CryptoUtils.isStringEncrypted(actionUrl)) {
            return res.status(400).send(Utils.PLEASE_SEND_ENCRYPTED_Value);
        }

        const onlineConverterDataJson = {
            converterName: CryptoUtils.decryptString(converterName),
            actionUrl: CryptoUtils.decryptString(actionUrl)
        };

        onlineConverterDataSend(onlineConverterDataJson).then(async savedData => {
            const onlineConverters = await OnlineConverter.find({});
            // Check if the query parameter dec is equal to 1
            if (req.query.dec === Utils.API_DEC_QUERY) {
                res.status(201).send(getStandardResponse(true, "", onlineConverters));
            } else {
                const onlineConvertersString = JSON.stringify(getStandardResponse(true, "", onlineConverters));
                const encryptedData = CryptoUtils.encryptString(onlineConvertersString); // Encrypt the string data
                res.status(201).send(encryptedData);
            }
        }).catch(error => {
            res.status(500).send(CryptoUtils.encryptString(Utils.DATA_SAVING_ERROR));
        });


    } catch (e) {
        console.error(e);
        res.status(500).send(Utils.INTERNAL_SERVER_ERROR);
    }
}

const onlineConverterDataSend = async (onlineConverterDataJson) => {
    try {
        const savedData = await OnlineConverter.create(onlineConverterDataJson);
        return savedData;
    } catch (error) {
        console.error("Error:", error.message);
        return Promise.reject(error.message);
    }
};


function getStandardResponse(status, message, data) {
    return {
        success: status,
        message: message,
        data: data
    }
}

module.exports = { getAllOnlineConverter, insertOnlineConverter };
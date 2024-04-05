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
        const decryptedPackageName = CryptoUtils.decryptString(packageName);

        if (decryptedPackageName === CryptoUtils.decryptString(Utils.APP_PACKAGE_NAME)) {
            const AllAdData = await AdData.find({});

            if (req.query.dec === Utils.API_DEC_QUERY) {
                AllAdData.forEach(ad => {
                    res.json(getStandardResponse(true, "", ad));
                });
            } else {
                AllAdData.forEach(AdData => {
                    const AllAdDataString = JSON.stringify(getStandardResponse(true, "", AdData));
                    const encryptData = CryptoUtils.encryptString(AllAdDataString);
                    res.send(encryptData);
                });
            }
        } else {
            res.status(400).send(getStandardResponse(false, CryptoUtils.encryptString(Utils.PLEASE_SEND_VAlid_DATA)));
        }

    } catch (error) {
        res.status(500).send(CryptoUtils.encryptString(Utils.INTERNAL_SERVER_ERROR));
    }
};

const updateAdServiceData = async (req, res) => {
    await handleUpdateDataRequest(req, res);
};

async function handleUpdateDataRequest(req, res) {
    if (!req.body || !Object.keys(req.body).length === 0) {
        return res.status(400).send(CryptoUtils.encryptString(Utils.REQUEST_BODY_EMPTY));
    }

    console.log("responseBody => ", req.body);
    const { adServiceId } = req.body

    adServiceUpdateOneData(CryptoUtils.decryptString(adServiceId), req.body).then(async adData => {
        const AllAdData = await AdData.find({});

        if (req.query.dec === Utils.API_DEC_QUERY) {
            AllAdData.forEach(ad => {
                res.json(getStandardResponse(true, "", ad));
            });
        } else {
            AllAdData.forEach(AdData => {
                const AllAdDataString = JSON.stringify(getStandardResponse(true, "", AdData));
                const encryptData = CryptoUtils.encryptString(AllAdDataString);
                res.send(encryptData);
            });
        }
    }).catch(error => {
        res.status(500).send(CryptoUtils.encryptString(Utils.DATA_MODIFIED_ERROR));
    });
};

const adServiceUpdateOneData = async (adServiceId, requestBody) => {
    try {
        const _id = adServiceId;
        const decryptedRequestBody = {};
        for (const key in requestBody) {
            decryptedRequestBody[key] = CryptoUtils.decryptString(requestBody[key]);
        }
        const adData = await AdData.findByIdAndUpdate(_id, decryptedRequestBody);
        return adData;
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

module.exports = { getAllAdData, updateAdServiceData };
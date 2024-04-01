const SponsoredAdData = require("../models/SponsoredAdServiceData");
const CryptoUtils = require("../utils/CryptoUtils");
const Utils = require("../utils/Utils");
const multer = require("multer");

const getSponsoredAdService = async (req, res) => {
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
            const AllAdData = await SponsoredAdData.find({});

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

function getStandardResponse(status, message, data) {
    return {
        success: status,
        message: message,
        data: data
    }
}

const uploadSponsoredData = async (req, res) => {
    await handleUploadAdServiceDataRequest(req, res);
};

async function handleUploadAdServiceDataRequest(req, res) {
    try {

        if (!req.file) {
            return res.status(400).send(CryptoUtils.encryptString(Utils.REQUEST_FILE_EMPTY));
        }

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).send(CryptoUtils.encryptString(Utils.REQUEST_BODY_EMPTY));
        }

        const { adCallToActionUrl } = req.body
        const adMediaView = req.file.filename

        if (!adCallToActionUrl) {
            res.status(400).send(CryptoUtils.encryptString(Utils.REQUIRED_FILED_MESSING));
        }

        if (!CryptoUtils.isStringEncrypted(adCallToActionUrl)) {
            res.status(400).send(CryptoUtils.encryptString(Utils.PLEASE_SEND_ENCRYPTED_Value));
        }

        const requestDataJson = requestStanderResponse(`${Utils.API_IMAGE_ACCESS_BASIC_ROUTE}${adMediaView}`, CryptoUtils.decryptString(adCallToActionUrl));
        SponsoredAdServiceDataSend(requestDataJson)
            .then(savedData => {
                if (req.query.dec === Utils.API_DEC_QUERY) {
                    return res.status(201).json(getStandardResponse(true, "", savedData));
                } else {
                    const allAdDataString = JSON.stringify(getStandardResponse(true, "", savedData));
                    return res.status(201).json(CryptoUtils.encryptString(allAdDataString));
                }
            })
            .catch(error => {
                res.status(500).send(CryptoUtils.encryptString(Utils.DATA_SAVING_ERROR));
            });
    } catch (error) {
        res.status(500).send(CryptoUtils.encryptString(Utils.INTERNAL_SERVER_ERROR));
    }
};


const SponsoredAdServiceDataSend = async (SponsoredAdDataJson) => {
    try {
        await SponsoredAdData.deleteMany();
        const savedData = await SponsoredAdData.create(SponsoredAdDataJson);
        return savedData;
    } catch (error) {
        console.error("Error:", error.message);
        return Promise.reject(error.message);
    }
};


function requestStanderResponse(adMediaView, adCallToActionUrl) {
    return {
        adMediaView: adMediaView,
        adCallToAction: adCallToActionUrl
    }
}


module.exports = { getSponsoredAdService, uploadSponsoredData };
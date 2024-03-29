const SponsoredAdData = require("../models/SponsoredAdServiceData");
const CryptoUtils = require("../utils/CryptoUtils");
const Utils = require("../utils/Utils");
const multer = require("multer");

const getSponsoredAdServicer = async (req, res) => {
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
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).send(CryptoUtils.encryptString(Utils.REQUEST_BODY_EMPTY));
        }

        const { adCallToActionUrl } = req.body
        console.log("adCallToActionUrl =>", adCallToActionUrl)

        if (!adCallToActionUrl) {
            res.status(400).send(CryptoUtils.encryptString(Utils.REQUIRED_FILED_MESSING));
        }

        if (!CryptoUtils.isStringEncrypted(adCallToActionUrl)) {
            res.status(400).send(CryptoUtils.encryptString(Utils.PLEASE_SEND_ENCRYPTED_Value));
        }

        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                return cb(null, "./uploads/SponsoredAd");
            },

            filename: function (req, file, cb) {
                return cb(null, "SponsoredAdMedia");
            },

        });

        const upload = multer({ storage: storage }).fields('file');

        // upload(req, res, async function (err) {
        //     if (err instanceof multer.MulterError) {
        //         return res.status(400).send(CryptoUtils.encryptString(Utils.UNEXPECTED_FIELD));
        //     } else if (err) {
        //         return res.status(500).send(CryptoUtils.encryptString(Utils.INTERNAL_SERVER_ERROR));
        //     }


        const allAdData = await SponsoredAdData.find({});

        if (req.query.dec === Utils.API_DEC_QUERY) {
            return res.json(allAdData.map(ad => getStandardResponse(true, "", ad)));
        } else {
            return res.json(allAdData.map(adData => {
                const allAdDataString = JSON.stringify(getStandardResponse(true, "", adData));
                return CryptoUtils.encryptString(allAdDataString);
            }));
        }
        // });
    } catch (error) {
        res.status(500).send(CryptoUtils.encryptString(Utils.INTERNAL_SERVER_ERROR));
    }
};


module.exports = { getSponsoredAdServicer, uploadSponsoredData };
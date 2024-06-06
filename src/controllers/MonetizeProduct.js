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
            return res.status(400).send(CryptoUtils.encryptString(Utils.REQUIRED_FILED_MESSING));
        }

        if (!CryptoUtils.isStringEncrypted(deviceId) || !CryptoUtils.isStringEncrypted(v) || !CryptoUtils.isStringEncrypted(packageName)) {
            return res.status(400).send(CryptoUtils.encryptString(Utils.PLEASE_SEND_ENCRYPTED_Value));
        }

        // Decrypt encrypted fields
        const decryptedPackageName = CryptoUtils.decryptString(packageName);

        if (decryptedPackageName === CryptoUtils.decryptString(Utils.APP_PACKAGE_NAME)) {
            const AllMonetizeProductData = await MonetizeProductData.find({});

            if (req.query.dec === Utils.API_DEC_QUERY) {
                res.send(getStandardResponse(true, "", AllMonetizeProductData));
            } else {
                const AllMonetizeProductDataString = JSON.stringify(getStandardResponse(true, "", AllMonetizeProductData));
                const encryptData = CryptoUtils.encryptString(AllMonetizeProductDataString);
                res.send(encryptData);
            }
        
        } else {
            res.status(400).send(CryptoUtils.encryptString(getStandardResponse(true, Utils.PLEASE_SEND_VAlid_DATA)));
        }

    } catch (error) {
        res.status(500).send(CryptoUtils.encryptString(Utils.INTERNAL_SERVER_ERROR));
    }
};

const insertMonetizeProduct = async (req, res) => {
    await handleInsertData(req, res);
};


async function handleInsertData(req, res) {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).send(CryptoUtils.encryptString(Utils.REQUEST_BODY_EMPTY));
        }

        const { productId, productName, productType } = req.body;

        if (!productId || !productName || !productType) {
            return res.status(400).send(CryptoUtils.encryptString(Utils.REQUIRED_FILED_MESSING));
        }

        // Check if fields are encrypted
        if (!CryptoUtils.isStringEncrypted(productId) || !CryptoUtils.isStringEncrypted(productName) || !CryptoUtils.isStringEncrypted(productType)) {
            return res.status(400).send(CryptoUtils.encryptString(Utils.PLEASE_SEND_ENCRYPTED_Value));
        }

        const monetizeProductDataJson = {
            productId: CryptoUtils.decryptString(productId),
            productName: CryptoUtils.decryptString(productName),
            productType: CryptoUtils.decryptString(productType)
        };

        monetizeProductDataSend(monetizeProductDataJson).then(async savedData => {
            const AllMonetizeProductData = await MonetizeProductData.find({});
            // Check if the query parameter dec is equal to 1
            if (req.query.dec === Utils.API_DEC_QUERY) {
                res.status(201).send(getStandardResponse(true, "", AllMonetizeProductData));
            } else {
                const AllMonetizeProductDataString = JSON.stringify(getStandardResponse(true, "", AllMonetizeProductData));
                const encryptedData = CryptoUtils.encryptString(AllMonetizeProductDataString); // Encrypt the string data
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

const monetizeProductDataSend = async (monetizeProductDataJson) => {
    try {
        const savedData = await MonetizeProductData.create(monetizeProductDataJson);
        return savedData;
    } catch (error) {
        console.error("Error:", error.message);
        return Promise.reject(error.message);
    }
};

const removeMonetizeProduct = async (req, res) => {
    await handleRemoveOneData(req, res);
};

async function handleRemoveOneData(req, res) {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).send(CryptoUtils.encryptString(Utils.REQUEST_BODY_EMPTY));
        }

        const { productId } = req.body;

        if (!productId) {
            return res.status(400).send(CryptoUtils.encryptString(Utils.REQUIRED_FILED_MESSING));
        }

        // Check if fields are encrypted
        if (!CryptoUtils.isStringEncrypted(productId)) {
            return res.status(400).send(CryptoUtils.encryptString(Utils.PLEASE_SEND_ENCRYPTED_Value));
        }

        monetizeProductRemoveOneData(CryptoUtils.decryptString(productId)).then(async monetizeProductData => {
            const AllMonetizeProductData = await MonetizeProductData.find({});
            // Check if the query parameter dec is equal to 1
            if (req.query.dec === Utils.API_DEC_QUERY) {
                res.status(200).send(getStandardResponse(true, "", AllMonetizeProductData));
            } else {
                const AllMonetizeProductDataString = JSON.stringify(getStandardResponse(true, "", AllMonetizeProductData));
                const encryptedData = CryptoUtils.encryptString(AllMonetizeProductDataString); // Encrypt the string data
                res.status(200).send(encryptedData);
            }
        }).catch(error => {
            res.status(500).send(CryptoUtils.encryptString(Utils.DATA_REMOVE_ERROR));
        });


    } catch (e) {
        console.error(e);
        res.status(500).send(Utils.INTERNAL_SERVER_ERROR);
    }
}


const monetizeProductRemoveOneData = async (productId) => {
    try {
        const monetizeProductData = await MonetizeProductData.findByIdAndDelete({ _id: productId });
        return monetizeProductData;
    } catch (error) {
        console.error("Error:", error.message);
        return Promise.reject(error.message);
    }
};

const updateMonetizeProductData = async (req, res) => {
    await handleUpdateOneData(req, res);
};

async function handleUpdateOneData(req, res) {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).send(CryptoUtils.encryptString(Utils.REQUEST_BODY_EMPTY));
        }

        const { productDetailsId, productId, productName, productType } = req.body;

        if (!productDetailsId || !productId || !productName || !productType) {
            res.status(400).send(CryptoUtils.encryptString(Utils.REQUIRED_FILED_MESSING));
        }

        // Check if fields are encrypted
        if (!CryptoUtils.isStringEncrypted(productDetailsId) || !CryptoUtils.isStringEncrypted(productId) || !CryptoUtils.isStringEncrypted(productName) || !CryptoUtils.isStringEncrypted(productType)) {
            return res.status(400).send(CryptoUtils.encryptString(Utils.PLEASE_SEND_ENCRYPTED_Value));
        }

        monetizeProductUpdateOneData(CryptoUtils.decryptString(productDetailsId), CryptoUtils.decryptString(productId), CryptoUtils.decryptString(productName), CryptoUtils.decryptString(productType)).then(async monetizeProductData => {
            const AllMonetizeProductData = await MonetizeProductData.find({});
            // Check if the query parameter dec is equal to 1
            if (req.query.dec === Utils.API_DEC_QUERY) {
                res.status(200).send(getStandardResponse(true, "", AllMonetizeProductData));
            } else {
                const AllMonetizeProductDataString = JSON.stringify(getStandardResponse(true, "", AllMonetizeProductData));
                const encryptedData = CryptoUtils.encryptString(AllMonetizeProductDataString); // Encrypt the string data
                res.status(200).send(encryptedData);
            }
        }).catch(error => {
            res.status(500).send(CryptoUtils.encryptString(Utils.DATA_MODIFIED_ERROR));
        });


    } catch (e) {
        console.error(e);
        res.status(500).send(CryptoUtils.encryptString(Utils.INTERNAL_SERVER_ERROR));
    }
}

const monetizeProductUpdateOneData = async (productDetailsId, productId, productName, productType) => {
    try {
        const _id = productDetailsId;
        const updateData = { productId, productName, productType };
        const monetizeProductData = await MonetizeProductData.findByIdAndUpdate(_id, updateData);
        return monetizeProductData;
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

module.exports = { getAllMonetizeProduct, insertMonetizeProduct, removeMonetizeProduct, updateMonetizeProductData };
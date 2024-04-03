const connectDB = require("../db/connect");
const CryptoUtils = require("../utils/CryptoUtils");
const Utils = require("../utils/Utils");
const OnlineConverter = require("../models/OnlineConverter");
const OnlineConverterJson = require("./OnlineConverter.json");
const AdData = require("../models/AdData");
const AdDataJson = require("./AdData.json");
const MonetizeProduct = require("../models/MonetizeProductData");
const MonetizeProductJson = require("./MonetizeProductData.json");
const SponsoredAdService = require("../models/SponsoredAdServiceData");
const SponsoredAdDataJson = require("./SponsoredAdData.json");

const start = async () => {
    try {
        await connectDB(CryptoUtils.decryptString(Utils.MONGODB_URL));
        await OnlineConverter.deleteMany();
        await OnlineConverter.create(OnlineConverterJson);
        console.log(Utils.SEND_DATA_INTO_DATABASE);
    } catch (error) {
        console.error("Error:", error.message);
    }
};

const adDataSend = async () => {
    try {
        await connectDB(CryptoUtils.decryptString(Utils.MONGODB_URL));
        await AdData.deleteMany();
        await AdData.create(AdDataJson);
        console.log(Utils.SEND_DATA_INTO_DATABASE);
    } catch (error) {
        console.error("Error:", error.message);
    }
};

const MonetizeProductDataSend = async () => {
    try {
        await connectDB(CryptoUtils.decryptString(Utils.MONGODB_URL));
        await MonetizeProduct.deleteMany();
        await MonetizeProduct.create(MonetizeProductJson);
        console.log(Utils.SEND_DATA_INTO_DATABASE);
    } catch (error) {
        console.error("Error:", error.message);
    }
};

const SponsoredAdServiceDataSend = async () => {
    try {
        await connectDB(CryptoUtils.decryptString(Utils.MONGODB_URL));
        await SponsoredAdService.deleteMany();
        await SponsoredAdService.create(SponsoredAdDataJson);
        console.log(Utils.SEND_DATA_INTO_DATABASE);
    } catch (error) {
        console.error("Error:", error.message);
    }
};

start();
// adDataSend();
// MonetizeProductDataSend();
// SponsoredAdServiceDataSend();


require('dotenv').config();
const connectDB = require("./db/connect");
const OnlineConverter = require("./models/OnlineConverter");
const OnlineConverterJson = require("./OnlineConverter.json");
const AdData = require("./models/AdData");
const AdDataJson = require("./AdData.json");

const start = async () => {
    try {
        console.log(process.env.MONGODB_URL)
        await connectDB(process.env.MONGODB_URL);
        await OnlineConverter.deleteMany();
        await OnlineConverter.create(OnlineConverterJson);
        console.log("Success: Data seeded into the database.");
    } catch (error) {
        console.error("Error:", error.message);
    }
};

const adDataSend = async () => {
    try {
        console.log(process.env.MONGODB_URL)
        await connectDB(process.env.MONGODB_URL);
        await AdData.deleteMany();
        await AdData.create(AdDataJson);
        console.log("Success: Data seeded into the database.");
    } catch (error) {
        console.error("Error:", error.message);
    }
};

// start();

adDataSend();


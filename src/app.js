require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');
const CryptoUtils = require("../src/utils/CryptoUtils");
const connectDB = require("../src/db/connect");
const OnlineConverterRoutes = require("../src/routers/OnlineConverter");
const AdServiceRouters = require("../src/routers/AdService");
const MonetizeProductRouters = require("../src/routers/MonetizeProduct");
const SponsoredAdServiceRouters = require("../src/routers/SponsoredAdService");
const Utils = require('../src/utils/Utils');

const app = express();
const port = process.PORT || 3000;

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(Utils.API_COMMON_ROUTE, OnlineConverterRoutes);
app.use(Utils.API_COMMON_ROUTE, AdServiceRouters);
app.use(Utils.API_COMMON_ROUTE, MonetizeProductRouters);
app.use(Utils.API_COMMON_ROUTE, SponsoredAdServiceRouters);

app.get(Utils.API_SEPARATOR_ROUTE, async (req, res) => {
    res.send(CryptoUtils.encryptString(Utils.WELCOME_MESSAGE));
});

const start = async () => {
    try {
        await connectDB(CryptoUtils.decryptString(Utils.MONGODB_URL));
        app.listen(port, () => {
            console.log(Utils.CONNECTION_LIVE_PORT,port);
        });
    } catch (error) {
        console.log(error);
    }

};

start();
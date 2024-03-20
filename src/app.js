require('dotenv').config();
const express = require("express");
const CryptoUtils = require("../src/utils/CryptoUtils");
const connectDB = require("../src/db/connect");
const OnlineConverterRoutes = require("../src/routers/OnlineConverter");
const Utils = require('./utils/Utils');

const app = express();
const port = process.PORT || 3000;

app.use("/app/allDocumentReader/",OnlineConverterRoutes);

app.get("/",async(req,res)=>{
    res.send(Utils.WELCOME_MESSAGE);
});

const start = async () => {
    try {
        console.log(process.env.MONGODB_URL)
        await connectDB("mongodb://127.0.0.1:27017/AllDocumentReader");
        app.listen(port, () => {
            console.log(`connection is live at port no.${port}`);
        });
    } catch (error) {
        console.log(error);
    }
    
};

start();

// console.log("deviceId:", CryptoUtils.encryptString("hi"));
// console.log("version:", CryptoUtils.encryptString("1.1"));
// console.log("packagname:", CryptoUtils.encryptString("com.purchase.inapp.purchase.purchased"));
// console.log("packagname:", CryptoUtils.decryptString("hJHk0NEZb2OaN8wBfPK1NcWX3y4d0FUYhohScz0CZGbR3RXeedBEmuGM7ExpnpNMLroSXpPz1UbIZV/0vZ9y8ZPm9GswnIUyl07KvekzAprqZCHyIZ61EHL9P4bWCIGRwu0sbm2XE3WFrz3KbdmPBCQsYv2P4rjOYz+cTvOBP5kA5M3ltvQ5WZU1kou1JG77UYjpK5Izl/4VYbK3APOfkpUSB/kuCZrrXtB+ngNNlrvKvgEkzGLby2dXySY6SMg81vNtkJVjEbGYPNuuZfNS2pSIXYPfmrdGZ4jrCJTSPkwrHcN5bP02mipQN56pO+HACKmaNsH1WB2Zv/jYNe1XfDv4AyZxapNhWCdqIbyXjRfMI1HaP7/Y4FG3GpIz/5QF3o7xKOMrBJ3jUfJiBoX1k1E5wyS2RJtTlXEwiwDzmXXmsm2myNgZagOROEqY6SwsvJ4xIj9FqkFyn8c8EkdsSanwIlyCju9oH0J2sJHznF8tpDmYyIREKtbIFk28ljvi7/o0Z/Nam/6JDfhMrGP461IedR5xbgHtJh6RNeqV5rD21JaWDzgZZAjrfaBGXj867n1tjFAWh+fVVKchKUE0XO+4KesutKkoRQNfqVX9KBhmcHSgLgBU8z5+H+R5z6R8BbKYZSlCuOqwpD+advkhPDI9w4Jp4R2qGrBAjjUqcNAOuwn/TStq/7GiNO/Lz+s1"));
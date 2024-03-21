const mongoose = require('mongoose');

const connectDB = (uri) => {
    return mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("connection successful.");
    }).catch((error) => {
        console.log("No connection =>", error.mssage);
    });
};

module.exports = connectDB;
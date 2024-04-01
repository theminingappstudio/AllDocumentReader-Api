const mongoose = require('mongoose');
const Utils = require('../utils/Utils')

const connectDB = (uri) => {
    return mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log(Utils.CONNECTION_SUCCESSFUL);
    }).catch((error) => {
        console.log(Utils.NO_CONNECTION, error.message);
    });
};

module.exports = connectDB;
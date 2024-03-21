const mongoose = require('mongoose');

const onlineConverter = new mongoose.Schema({
    converterName: {
        type: String,
        required: true
    },

    actionUrl: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('OnlineConverter', onlineConverter);
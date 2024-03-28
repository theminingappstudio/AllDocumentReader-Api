const mongoose = require('mongoose');

const sponsoredAdService = new mongoose.Schema({
    adMediaView: {
        type: String,
        required: true
    },

    adCallToAction: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('SponsoredAdService', sponsoredAdService);
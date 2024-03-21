const mongoose = require("mongoose");

const monetizeProductSchema = new mongoose.Schema({
    productId: {
        type: String,
        default: ""
    },
    productName: {
        type: String,
        default: ""
    },
    productType: {
        type: String,
        default: ""
    },
});

module.exports = mongoose.model('MonetizeProduct',monetizeProductSchema);
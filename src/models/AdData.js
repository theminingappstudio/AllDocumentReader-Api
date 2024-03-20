const mongoose = require("mongoose");

const adDataSchema = new mongoose.Schema({
    success: {
        type: Boolean,
        require: true,
    },

    ads: {
        type: Boolean,
        default: true
    },

    dialogMoveType: {
        type: Number,
        default: 1
    },

    dialogVersionCode: {
        type: Number,
        default: 1
    },

    dialogTitle: {
        type: String,
        default: ""
    },

    dialogDescription: {
        type: String,
        default: ""
    },

    dialogButtonLink: {
        type: String,
        default: ""
    },

    dialogButtonName: {
        type: String,
        default: ""
    },

    dialogButtonSkipName: {
        type: String,
        default: ""
    },

    googleBanner: {
        type: String,
        default: ""
    },

    googleNative: {
        type: String,
        default: ""
    },

    googleInter: {
        type: String,
        default: ""
    },

    googleAppOpen: {
        type: String,
        default: ""
    },

    googleReward: {
        type: String,
        default: ""
    },

    facebookBanner: {
        type: String,
        default: ""
    },

    facebookNative: {
        type: String,
        default: ""
    },

    facebookInter: {
        type: String,
        default: ""
    },

    interAfterCount: {
        type: Number,
        default: 2
    },

    adsPriority: {
        type: Number,
        default: 1
    },

    interLoader: {
        type: Boolean,
        default: false
    },

    appOpen: {
        type: Number,
        default: 1
    },

    appOpenInterval: {
        type: Number,
        default: 40
    },

    allIsNative: {
        type: Boolean,
        default: true
    },

    allIsNativeCount: {
        type: Number,
        default: 4
    },

    interFeedLoaderTime: {
        type: Number,
        default: 2
    },

    listNativeStaring: {
        type: Number,
        default: 5
    },

    nativeCount: {
        type: Number,
        default: 50
    },

    exitNative: {
        type: Boolean,
        default: true
    },

    whichOneBottomAds: {
        type: Number,
        default: 2
    },

    rewardAfterCount: {
        type: Number,
        default: 2
    }
});

module.exports = mongoose.model('AdData',adDataSchema);
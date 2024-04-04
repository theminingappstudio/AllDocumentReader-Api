const express = require("express");
const multer = require("multer");
const path = require('path')
const router = express.Router();
const upload = multer();

const { getSponsoredAdService, uploadSponsoredData } = require("../controllers/SponsoredAdService");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./uploads/SponsoredAd");
    },

    filename: function (req, file, cb) {
        return cb(null, `SponsoredAdMedia${path.extname(file.originalname)}`);
    },

});

const uploadFile = multer({ storage: storage });


router.route("/SponsoredAdService").post(upload.none(), getSponsoredAdService);
router.route("/upload/SponsoredAdService").post(uploadFile.single('adMediaView'), uploadSponsoredData);
router.use("/SponsoredAd",express.static('uploads/SponsoredAd'));

module.exports = router;
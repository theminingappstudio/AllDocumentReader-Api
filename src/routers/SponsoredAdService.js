const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer();
const {getSponsoredAdServicer, uploadSponsoredData} = require("../controllers/SponsoredAdService");


router.route("/SponsoredAdService").post(upload.none(), getSponsoredAdServicer);
router.route("/SponsoredAdService/Upload").post(upload.none(), uploadSponsoredData);


module.exports = router;
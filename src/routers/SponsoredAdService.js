const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer();
const getSponsoredAdServicer = require("../controllers/SponsoredAdService");


router.route("/SponsoredAdService").post(upload.none(), getSponsoredAdServicer);


module.exports = router;
const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer();

const getAllAdData = require("../controllers/AdService");

router.route("/AdService").post(upload.none(),getAllAdData);

module.exports = router;
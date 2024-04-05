const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer();

const { getAllAdData, updateAdServiceData } = require("../controllers/AdService");

router.route("/AdService").post(upload.none(), getAllAdData);
router.route("/update/AdService").post(upload.none(), updateAdServiceData);

module.exports = router;
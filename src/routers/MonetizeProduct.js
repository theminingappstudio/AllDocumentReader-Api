const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer();

const getAllMonetizeProduct = require("../controllers/MonetizeProduct");

router.route("/monetize-product-list").post(upload.none(),getAllMonetizeProduct);

module.exports = router;

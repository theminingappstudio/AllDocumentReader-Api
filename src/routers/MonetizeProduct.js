const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer();

const { getAllMonetizeProduct, insertMonetizeProduct } = require("../controllers/MonetizeProduct");

router.route("/monetize-product-list").post(upload.none(), getAllMonetizeProduct);
router.route("/upload/monetize-product-list").post(upload.none(), insertMonetizeProduct);

module.exports = router;

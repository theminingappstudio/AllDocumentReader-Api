const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer();

const { getAllMonetizeProduct, insertMonetizeProduct, removeMonetizeProduct, updateMonetizeProductData } = require("../controllers/MonetizeProduct");

router.route("/monetize-product-list").post(upload.none(), getAllMonetizeProduct);
router.route("/upload/monetize-product-list").post(upload.none(), insertMonetizeProduct);
router.route("/remove/monetize-product-list").post(upload.none(), removeMonetizeProduct);
router.route("/update/monetize-product-list").post(upload.none(), updateMonetizeProductData);

module.exports = router;

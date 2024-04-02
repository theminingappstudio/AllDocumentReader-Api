const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer();
const { getAllOnlineConverter, insertOnlineConverter } = require("../controllers/OnlineConverter");


router.route("/OnlineConverter").post(upload.none(), getAllOnlineConverter);
router.route("/upload/OnlineConverter").post(upload.none(), insertOnlineConverter);


module.exports = router;
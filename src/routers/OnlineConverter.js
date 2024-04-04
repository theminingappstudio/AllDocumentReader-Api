const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer();
const { getAllOnlineConverter, insertOnlineConverter, removeOnlineConverter, updateOnlineConverter } = require("../controllers/OnlineConverter");


router.route("/OnlineConverter").post(upload.none(), getAllOnlineConverter);
router.route("/upload/OnlineConverter").post(upload.none(), insertOnlineConverter);
router.route("/remove/OnlineConverter").post(upload.none(), removeOnlineConverter);
router.route("/update/OnlineConverter").post(upload.none(), updateOnlineConverter);


module.exports = router;
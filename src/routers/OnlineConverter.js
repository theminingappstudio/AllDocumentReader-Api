const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer();
const getAllOnlineConverter = require("../controllers/OnlineConverter");


router.route("/OnlineConverter").post(upload.none(), getAllOnlineConverter);


module.exports = router;
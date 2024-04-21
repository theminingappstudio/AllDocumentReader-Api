const express = require("express");
const multer = require("multer");
const path = require('path')
const router = express.Router();
const upload = multer();

const { getSponsoredAdService, uploadSponsoredData } = require("../controllers/SponsoredAdService");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Set the destination directory for file uploads
        const uploadDir = "./uploads/SponsoredAd";

        // Delete all files in the destination directory before uploading new files
        fs.readdir(uploadDir, (err, files) => {
            if (err) {
                console.error("Error reading directory:", err);
                return cb(err);
            }

            // Filter files to delete based on the filename pattern
            const filesToDelete = files.filter(filename => filename.startsWith('SponsoredAdMedia') && filename.endsWith('.png'));

            // Delete each file in the directory
            for (const file of filesToDelete) {
                fs.unlink(path.join(uploadDir, file), err => {
                    if (err) {
                        console.error("Error deleting file:", err);
                    }
                });
            }

            // Proceed with the file upload after deleting all files
            cb(null, uploadDir);
            // return cb(null, "./uploads/SponsoredAd");
        });
    },

    filename: function (req, file, cb) {
        return cb(null, `SponsoredAdMedia${path.extname(file.originalname)}`);
    },

});

const uploadFile = multer({ storage: storage });


router.route("/SponsoredAdService").post(upload.none(), getSponsoredAdService);
router.route("/upload/SponsoredAdService").post(uploadFile.single('adMediaView'), uploadSponsoredData);
router.use("/SponsoredAd", express.static('uploads/SponsoredAd'));

module.exports = router;
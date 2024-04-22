const express = require("express");
const multer = require("multer");
const path = require('path')
const fs = require('fs');
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
                    } else {
                        console.log("Successfully deleted file:", file);
                    }
                });
            }

            // Proceed with the file upload after deleting all files
            cb(null, uploadDir);
            // return cb(null, "./uploads/SponsoredAd");
        });
    },

    filename: function (req, file, cb) {
        const currentDate = new Date().toISOString().slice(0, 10);
        const date = new Date();
        // Get the time in milliseconds since the Unix epoch
        const currentTimeInMillis = date.getTime();
        const uniqueFilename = `SponsoredAdMedia_${currentDate}_${currentTimeInMillis}${path.extname(file.originalname)}`
        return cb(null, uniqueFilename);
    },

});

const uploadFile = multer({ storage: storage });

function getCurrentTime() {
    // Get the current date and time
    const currentDate = new Date();

    // Extract individual components of the current time
    const hours = String(currentDate.getHours()).padStart(2, '0'); // Get hours (with leading zero if necessary)
    const minutes = String(currentDate.getMinutes()).padStart(2, '0'); // Get minutes (with leading zero if necessary)
    const seconds = String(currentDate.getSeconds()).padStart(2, '0'); // Get seconds (with leading zero if necessary)

    // Construct the time string in the desired format (e.g., HH:MM:SS)
    const currentTime = `${hours}:${minutes}:${seconds}`;

    // Return the formatted current time
    return currentTime;
}


router.route("/SponsoredAdService").post(upload.none(), getSponsoredAdService);
router.route("/upload/SponsoredAdService").post(uploadFile.single('adMediaView'), uploadSponsoredData);
router.use("/SponsoredAd", express.static('uploads/SponsoredAd'));

module.exports = router;
const multer = require("multer");
const path = require("path");

var storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: function(req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true);

    } else {
        cb(null, false);
    }
};

var upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

module.exports = upload;

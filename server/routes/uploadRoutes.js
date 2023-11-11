
const path = require("path");
const express = require("express");
const multer = require("multer");
const router = express.Router();
const cloudinary = require("./../config/cloudinary");

const storage = multer.diskStorage({
  filename(req, file, cb) {
    cb(
      null,
      file.fieldname +
        Date.now() +
        Math.round(Math.random() * 1e9) +
        "." +
        file.mimetype.split("/")[1]
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post("/", upload.single("image"), (req, res) => {
  cloudinary.uploader.upload( 
    req.file.path,
    async function (err, result) {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ message: "something went wrong product not created" });
      }else{
        return res.send(result.url);
      }
    }
  );
  
});

router.post("/descripion", upload.single("image"), (req, res) => {
  cloudinary.uploader.upload(
    req.files.image[0].path,
    async function (err, result) {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ message: "something went wrong description not created" });
      }else{
        return res.send(result.url);
      }
    }
  );
});

module.exports = router;

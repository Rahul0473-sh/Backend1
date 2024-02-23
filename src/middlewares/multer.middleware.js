import multer from "multer"; // THis is

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // file is also comes in file like req contains json and this
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });

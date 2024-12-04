const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'images') cb(null, 'public/images');

    if (file.fieldname === 'video') cb(null, 'public/videos');
  },
  filename: (req, file, cb) => {
    const timestamp = new Date().getTime();
    const randomNumber = Math.round(Math.random() * 1e4);
    const extension = path.extname(file.originalname);
    cb(null, `${timestamp}${randomNumber}${extension}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 20, // maximal 10mb
  },
}).fields([
  {
    name: 'images',
    maxCount: 3,
  },
  {
    name: 'video',
    maxCount: 1,
  },
]);

module.exports = upload;

const multer = require('multer');
const path = require('path');

// Set up storage with multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Use path.join for cross-platform compatibility
    cb(null, path.join(__dirname, '../upload')); // Directory where files will be stored
  },
  filename: (req, file, cb) => {
    // Generate a unique filename with a timestamp
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Multer instance with the storage configuration
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    // File filter to allow only images
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

module.exports = upload;

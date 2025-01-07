const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    const { name } = req.body
    cb(null, name + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const fileTypes = ['image/jpeg','image/jpg','image/png'];
    if (fileTypes.includes(file.mimetype)){
        cb(null, true);
    }else{
        cb(new Error('Invalid file type. Only JPEG, JPG, PNG images are allowed.'));
    }
    
  },
});
 
// const getProduct = (req, res, next)=>{}

module.exports = upload;

const express = require('express');
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const productController = require('../controllers/productController');
const handleUpload = (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      console.error('Upload error:', err);
      return res.status(400).json({ 
        error: 'File upload failed', 
        details: err.message 
      });
    }
    next();
  });
};

router.get('/', productController.getProducts);

router.post('/', handleUpload, productController.createProduct);

router.get('/:id', productController.getProduct);

router.put('/:id', handleUpload, productController.updateProduct);

router.delete('/:id', productController.deleteProduct);

module.exports = router;

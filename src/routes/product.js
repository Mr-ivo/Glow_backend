const express = require('express');
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const productController = require('../controllers/productController');

router.get('/', productController.getProducts);
router.post('/', productController.createProduct);
router.get('/:id', productController.getProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.post("/", upload.single("image"), productController.createProduct);

module.exports = router;

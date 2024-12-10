const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
  const { name, description, price, stockQuantity, categoryId } = req.body;
  const image = req.file ? req.file.path : null;

  try {
    if (!name || !description || !price || !stockQuantity || !categoryId) {
      return res.status(400).json({ error: "All fields are required" });
    }
    
    if (!image) {
      return res.status(400).json({ error: "Image is required" });
    }

    const product = new Product({
      name,
      description,
      price,
      stockQuantity,
      categoryId,
      image,
    });

    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: "Failed to add product", details: err.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('categoryId');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.stockQuantity = req.body.stockQuantity || product.stockQuantity;
    product.categoryId = req.body.categoryId || product.categoryId;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.remove();
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

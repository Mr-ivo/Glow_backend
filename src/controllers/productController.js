const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
  const { name, description, price, stockQuantity, categoryId, image } = req.body;
  // const image = req.file ? req.file.path : null;

  if (!image) {
    return res.status(400).json({ error: "Image is required" });
  }

  try {
    const product = new Product({
      name,
      description,
      price,
      stockQuantity,
      categoryId,
      image,
    });

    await product.save();
    res.status(201).json({ message: "Product created successfully", product });
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ error: "Failed to create product", details: err.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("categoryId");
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Failed to fetch products", details: err.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("categoryId");
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ error: "Failed to fetch product", details: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    Object.keys(req.body).forEach((key) => {
      if (req.body[key] !== undefined) {
        product[key] = req.body[key];
      }
    });

    const updatedProduct = await product.save();
    res.json({ message: "Product updated successfully", updatedProduct });
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ error: "Failed to update product", details: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await product.deleteOne();
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ error: "Failed to delete product", details: err.message });
  }
};

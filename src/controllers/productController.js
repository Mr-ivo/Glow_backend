const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
  try {
    console.log('Create product request:', {
      body: req.body,
      file: req.file
    });

    const { name, description, price, stockQuantity, categoryId } = req.body;
 
    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }

    const image = req.file.filename;
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://glow-backend-2nxl.onrender.com'
      : 'http://localhost:5000';
    const imageUrl = `${baseUrl}/uploads/${image}`;

    const productData = {
      name,
      description,
      price: Number(price),
      stockQuantity: Number(stockQuantity),
      image: imageUrl
    };

    if (categoryId) {
      productData.categoryId = categoryId;
    }

    const product = new Product(productData);
    await product.save();

    console.log('Product created:', product);
    res.status(201).json(product);
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ error: "Failed to create product", details: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    console.log('Update product request:', {
      params: req.params,
      body: req.body,
      file: req.file
    });

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const updates = {
      name: req.body.name,
      description: req.body.description,
      price: Number(req.body.price),
      stockQuantity: Number(req.body.stockQuantity)
    };

    if (req.file) {
      const baseUrl = process.env.NODE_ENV === 'production' 
        ? 'https://glow-backend-2nxl.onrender.com'
        : 'http://localhost:5000';
      updates.image = `${baseUrl}/uploads/${req.file.filename}`;
    }

    if (req.body.categoryId) {
      updates.categoryId = req.body.categoryId;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true }
    );

    console.log('Product updated:', updatedProduct);
    res.json(updatedProduct);
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ error: "Failed to update product", details: err.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Failed to fetch products", details: err.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ error: "Failed to fetch product", details: err.message });
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

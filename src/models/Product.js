const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  stockQuantity: { type: Number, required: true, min: 0 },
  image: { type: String, required: true },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: false  // Making it optional
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);

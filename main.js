 const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan'); 
const authRoutes = require('./src/routes/auth');
const userRoutes = require('./src/routes/user');
const productRoutes = require('./src/routes/product');
const orderRoutes = require('./src/routes/order');
const categoryRoutes = require('./src/routes/category');
const cartRoutes = require('./src/routes/cart');
const emailRoutes = require('./src/routes/email');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs'); // added fs module

dotenv.config();

const app = express();

app.use(morgan('dev'));

app.use(cors({
  origin: ['http://localhost:3000', 'https://apparellglow.vercel.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use('/uploads', express.static(uploadsDir));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, {
    body: req.body,
    file: req.file,
    headers: req.headers
  });
  next();
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/email', emailRoutes); 

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal Server Error', 
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

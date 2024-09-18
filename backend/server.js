const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config({ path: './config.env' });
const multer = require('multer');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// MongoDB connection
const mongoUri = process.env.ATLAS_URI;
if (!mongoUri) {
    console.error('MongoDB connection string (ATLAS_URI) is not defined.');
    process.exit(1);
}

mongoose.connect(mongoUri)
    .then(() => {
        console.log('Connected to MongoDB');
        const db = mongoose.connection.db;
        console.log('Database Name:', db.databaseName);
    })
    .catch((err) => console.error('Could not connect to MongoDB', err));


// Product Schema
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    description: String,
    image: String,
});

// Define the user schema and model
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, 
});

const profileSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, required: true },
    address: { type: String, required: true },
    profileImage: { type: String, default: null }, 
});

const User = mongoose.model('User', userSchema);
const Profile = mongoose.model('Profile', profileSchema);
const Product = mongoose.model('Product', productSchema);
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Endpoint to add product with Base64 image
app.post('/add-product', upload.single('image'), async (req, res) => {
    console.log('Request Body:', req.body);
    console.log('Request File:', req.file);

    const { name, price, description } = req.body;

    if (isNaN(price) || price < 0 || !Number.isInteger(parseFloat(price))) {
        return res.status(400).json({ message: "Invalid input: 'price' should be a non-negative integer." });
    }

    try {
        // Ensure unique image upload
        const existingProduct = await Product.findOne({ name });
        if (existingProduct) {
            console.log('Product already exists');
            return res.status(400).json({ message: "Product with this name already exists." });
        }


        const product = new Product({
            name,
            price: parseInt(price, 10),
            description,
            image: req.file ? req.file.buffer.toString('base64') : null
        });

        await product.save();
        res.status(201).json({ message: "Product added successfully." });
    } catch (error) {
        console.error('Error saving product:', error);
        res.status(500).json({ message: "Error saving product.", error });
    }
});

// Endpoint to update a product
app.put('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, description } = req.body;

        // Validate if 'price' is a number and an integer
        if (isNaN(price) || !Number.isInteger(parseFloat(price))) {
            return res.status(400).json({ message: "Invalid input: 'price' should be an integer." });
        }

        // Find the product by ID and update it
        const product = await Product.findByIdAndUpdate(
            id,
            { name, price: parseInt(price, 10), description }, 
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }

        res.json(product);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: "Error updating product.", error });
    }
});

// Endpoint to get all products
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: "Error fetching products.", error });
    }
});

// Endpoint to delete a product
app.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Product.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: "Product not found." });
        }

        res.json({ message: "Product deleted successfully." });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: "Error deleting product.", error });
    }
});


//dashboard
// Endpoint to get the total number of users
app.get('/total-users', async (req, res) => {
    try {
        const userCount = await User.countDocuments(); 
        res.json({ total: userCount });
    } catch (error) {
        console.error('Error fetching user count:', error);
        res.status(500).json({ message: "Error fetching user count.", error });
    }
});

// Endpoint to get the total number of products
app.get('/total-products', async (req, res) => {
    try {
      const totalProducts = await Product.countDocuments();
      res.json({ total: totalProducts });
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

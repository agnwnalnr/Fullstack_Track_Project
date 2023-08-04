const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');

router.get('/', async (req, res) => {
    try {
        const { productID } = req.query;
        if (!productID) {
            return res.status(400).json({ success: false, error: 'ProductID is required' });
        }

        if (!mongoose.isValidObjectId(productID)) {
            return res.status(400).json({ success: false, error: 'Invalid ProductID' });
        }

        const product = await Product.findById(productID, 'productID linkProduct title price videoID');
        if (!product) {
            return res.status(404).json({ success: false, error: 'Product not found' });
        }

        res.status(200).json({ success: true, data: product });
    } catch (err) {
        console.error('Error fetching product:', err);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { productID, linkProduct, title, price, videoID } = req.body;

        if (!productID || !linkProduct || !title || !price || !videoID) {
            return res.status(400).json({ success: false, error: 'All fields are required' });
        }

        const newProduct = new Product({ productID, linkProduct, title, price, videoID });

        await newProduct.save();

        res.status(201).json({ success: true, data: newProduct });
        
    } catch (err) {
        console.error('Error creating product:', err);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

router.put('/:productID', async (req, res) => {
    try {
        const { productID } = req.params;
        const { linkProduct, title, price, videoID } = req.body;

        if (!mongoose.isValidObjectId(productID)) {
            return res.status(400).json({ success: false, error: 'Invalid ProductID' });
        }

        const existingProduct = await Product.findById(productID);
        if (!existingProduct) {
            return res.status(404).json({ success: false, error: 'Product not found' });
        }

        existingProduct.linkProduct = linkProduct || existingProduct.linkProduct;
        existingProduct.title = title || existingProduct.title;
        existingProduct.price = price || existingProduct.price;
        existingProduct.videoID = videoID || existingProduct.videoID;

        await existingProduct.save();
        res.status(200).json({ success: true, data: existingProduct });
    } catch (err) {
        console.error('Error updating product:', err);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

router.delete('/:productID', async (req, res) => {
    try {
        const { productID } = req.params;

        if (!mongoose.isValidObjectId(productID)) {
            return res.status(400).json({ success: false, error: 'Invalid ProductID' });
        }

        const existingProduct = await Product.findById(productID);
        if (!existingProduct) {
            return res.status(404).json({ success: false, error: 'Product not found' });
        }

        await existingProduct.remove();
        res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (err) {
        console.error('Error deleting product:', err);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Menu = require('../models/MenuItem');

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// POST /api/menu
router.post('/', upload.array('images'), async (req, res) => {
  try {
    const { type, date, items } = req.body;

    // `items` is stringified JSON
    const parsedItems = JSON.parse(items);

    const files = req.files;
    // Add image path to each item
    const updatedItems = parsedItems.map((item, index) => ({
      ...item,
      price: Number(item.price),
      quantity: Number(item.quantity),
      sufficientFor: Number(item.sufficientFor),
      image: files[index] ? `/uploads/${files[index].filename}` : '',
    }));

    const newMenu = new Menu({
      type,
      date,
      items: updatedItems,
    });

    await newMenu.save();
    res.status(201).json({ message: 'Menu items added successfully!' });
  } catch (error) {
    console.error('Error saving menu:', error);
    res.status(500).json({ error: 'Failed to save menu items' });
  }
});

module.exports = router;

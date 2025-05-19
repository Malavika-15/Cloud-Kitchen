const express = require('express');
const router = express.Router();
const Value = require('../models/Value');

router.get('/', async (req, res) => {
  try {
    const values = await Value.find();
    res.json(values);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage');

router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email and message are required.' });
  }

  try {
    const newMessage = new ContactMessage({ name, email, subject, message });
    await newMessage.save();
    res.json({ message: 'Your message has been received. Thank you!' });
  } catch (error) {
    console.error('Error saving contact message:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const TeamMember = require('../models/TeamMember');

router.get('/', async (req, res) => {
  try {
    const team = await TeamMember.find();
    res.json(team);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

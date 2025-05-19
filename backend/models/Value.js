const mongoose = require('mongoose');

const ValueSchema = new mongoose.Schema({
  icon: String, // e.g., 'Utensils', 'Coffee'
  title: String,
  description: String
});

module.exports = mongoose.model('Value', ValueSchema);

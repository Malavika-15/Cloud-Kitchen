const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: Number,
  image: String,
  type: { type: String, enum: ['Breakfast', 'Lunch', 'Dinner'] },
  date: String,
  quantity: Number,
  sufficientFor: Number,
}, { timestamps: true });

const menuSchema = new mongoose.Schema({
  type: { type: String, enum: ['Breakfast', 'Lunch', 'Dinner'], required: true },
  date: { type: String, required: true }, // ISO string date
  items: [menuItemSchema],
});

module.exports = mongoose.model('Menu', menuSchema);

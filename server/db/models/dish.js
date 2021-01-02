const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  dishName: {
    type: String,
    required: true,
    trim: true,
    text: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    index: true
  },
  price: {
    type: Number,
    required: true,
    trim: true,
    text: true
  },
  image: {
    type: String
  },
  specialDescription: {
    type: String,
    trim: true,
    text: true
  },
  mealset: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MealSet'
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store'
  }
});

const Dish = mongoose.model('Dish', dishSchema);
module.exports = Dish;

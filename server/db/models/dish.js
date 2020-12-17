const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  dishName: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true
  },
  ingredients: {},
  specialDescription: {
    type: String,
    trim: true
  }
});

const Dish = mongoose.model('Dish', dishSchema);
module.exports = Dish;

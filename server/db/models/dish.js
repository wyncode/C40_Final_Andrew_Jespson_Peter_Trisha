const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  dishName: {
    type: String,
    required: true,
    trim: true,
    text: true
  },
  price: {
    type: Number,
    required: true,
    trim: true,
    text: true
  },
  image: {
    type: String,
    required: true
  },
  ingredients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ingredients',
      required: true
    }
  ],
  specialDescription: {
    type: String,
    trim: true,
    text: true
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    require: true
  }
});

const Dish = mongoose.model('Dish', dishSchema);
module.exports = Dish;

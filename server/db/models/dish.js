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
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

dishSchema.virtual('mealSet', {
  ref: 'mealSet',
  localField: '_id',
  foreignField: 'dish'
});

const Dish = mongoose.model('Dish', dishSchema);
module.exports = Dish;

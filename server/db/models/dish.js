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
  ingredients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ingredients',
      required: true
    }
  ],
  specialDescription: {
    type: String,
    trim: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store'
  }
});

dishSchema.virtual('mealSet', {
  ref: 'mealSet',
  localField: '_id',
  foreignField: 'dish'
});

const Dish = mongoose.model('Dish', dishSchema);
module.exports = Dish;

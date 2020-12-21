const mongoose = require('mongoose');

const mealSetSchema = new mongoose.Schema({
  setName: {
    type: String,
    required: true,
    trim: true
  },
  setIncludes: [
    {
      dish: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish',
        required: true
      },
      numOfDish: {
        type: Number,
        required: true
      }
    }
  ],
  minPrice: {
    type: Number,
    required: true
  },
  roughlyFeeds: {
    type: Number,
    required: true
  },
  costOfAdditionalPerson: {
    type: Number,
    required: true
  },
  allergenInfo: {
    type: String
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store'
  }
});

const MealSet = mongoose.model('MealSet', mealSetSchema);
module.exports = MealSet;

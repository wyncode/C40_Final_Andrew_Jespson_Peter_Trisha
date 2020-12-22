const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  allergens: {
    type: Boolean,
    required: true
  },
  allergenInfo: {
    type: String,
    required: { allergens } ? true : false
  },
  ingredientName: {
    type: String,
    required: true
  }
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);
module.exports = Ingredient;

const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema(
  {
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
      type: String
    },
    specialDescription: {
      type: String,
      trim: true,
      text: true
    },
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Store',
      require: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      require: true
    }
  },
  { timestamps: true }
);

const Dish = mongoose.model('Dish', dishSchema);
module.exports = Dish;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    isPrefixed: {
      type: Boolean,
      required: true
    },
    cartItems: [
      {
        dishItem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Dish',
          default: null
        },
        numOfDishItem: {
          type: Number
        }
      }
    ],
    mealSetCart: [
      {
        mealSetSelection: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'MealSet'
        },
        numOfAdditionalPeople: {
          type: Number,
          default: 0
        }
      }
    ],
    serviceFee: {
      type: Number,
      default: true
    },
    totalCost: {
      type: Number,
      required: true
    },
    bookingDate: {
      type: Number,
      required: true
    },
    bookingTime: {
      type: Number,
      required: true
    },
    addressConfirmation: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const booking = mongoose.model('booking', bookingSchema);
module.exports = bookingSchema;

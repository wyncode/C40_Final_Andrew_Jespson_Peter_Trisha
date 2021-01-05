const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Store'
    },
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
      type: Number
    },
    totalCost: {
      type: Number
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
    },
    booker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);

const booking = mongoose.model('Booking', bookingSchema);
module.exports = bookingSchema;

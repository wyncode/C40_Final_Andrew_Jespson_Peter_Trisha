const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Store',
      required: true
    },
    isPrefixed: {
      type: Boolean
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
    serviceFee: {
      type: Number
    },
    totalCost: {
      type: Number
    },
    bookingDate: {
      type: Number
    },
    bookingTime: {
      type: Number
    },
    addressConfirmation: {
      type: String
    },
    booker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;

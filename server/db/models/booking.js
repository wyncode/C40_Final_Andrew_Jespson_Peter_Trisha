const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingsPageSchema = new Schema(
  {
    isPrefixed: { type: Boolean, required: true, trim: true },
    cartItems: [{ type: ObjectId, ref: 'Dish', default: null }],
    itemQuantity: { type: Number, required: true, default: 0 },
    mealSetSelection: [{ type: ObjectId, ref: 'MealSet' }],
    numberofPeople: { type: Number, required: true, default: 1 },
    deliveryFee: { type: Number, default: true },
    totalCost: { type: Number },
    bookingDate: { type: Number, required: true },
    bookingTime: { type: Number, required: true },
    addressConfirmation: { type: String, required: true }
  },
  { timestamps: true }
);

const bookingsPage = mongoose.model('bookingsPage', bookingsPageSchema);
module.exports = bookingsPageSchema;

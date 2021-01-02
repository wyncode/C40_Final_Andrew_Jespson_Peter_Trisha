const mongoose = require('mongoose');

const mealSetSchema = new mongoose.Schema(
  {
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
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Store'
    }
  },
  { timestamps: true },
  //we need this method becasue Mongoose does not include virtuals when you convert a document to JSON. For example, if you pass a document to Express' res.json() function,
  // virtuals will not be included by default.
  //https://mongoosejs.com/docs/tutorials/virtuals.html
  { toJSON: { virtuals: true } }
);

//virtual relationship with Dish
StoreSchema.virtual('dishes', {
  ref: 'Dish',
  localField: '_id',
  foreignField: 'store',
  justOne: false
});

const MealSet = mongoose.model('MealSet', mealSetSchema);
module.exports = MealSet;

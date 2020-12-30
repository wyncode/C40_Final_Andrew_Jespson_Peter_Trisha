const mongoose = require('mongoose');
const Dish = require('./dish'),
  MealSet = require('./mealSet');

const Schema = mongoose.Schema;

const StoreSchema = new Schema(
  {
    chefName: {
      type: String,
      required: true
    },
    address: {
      street: String,
      city: String,
      state: {
        type: String,
        uppercase: true,
        required: [true, "Must write similar to 'FL'"],
        maxlength: 2
      },
      zip: Number
    },
    operatingHours: {
      type: Number,
      required: true
    },
    priceRange: {
      type: String,
      required: true
    },
    serviceFee: {
      type: Number,
      required: true
    },
    foodType: {
      type: String,
      required: true
    },
    specialRequests: {
      type: Boolean
    },
    serviceMenu: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish'
      }
    ],
    themedMealSet: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MealSet'
      }
    ],
    availabilityCalender: {
      type: Object
    },
    bio: {
      type: String,
      required: true,
      maxlength: 250,
      required: true
    },
    socialHandle: [
      {
        Instagram: {
          type: String
        },
        Facebook: {
          type: String
        },
        Twitter: {
          type: String
        }
      }
    ],
    website: {
      type: String
    },
    educationalBackground: {
      type: String
    },
    specializedCertifications: {
      type: String
    },
    mediaGallery: [
      {
        type: String
      }
    ],
    careerHighlights: {
      type: String
    },
    allergyInfo: {
      type: String
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);

//virtual relationship with mealSet

StoreSchema.virtual('mealSets', {
  ref: 'MealSet',
  localField: '_id',
  foreignField: 'store',
  justOne: false
});

//virtual relationship with Dish
StoreSchema.virtual('dishes', {
  ref: 'Dish',
  localField: '_id',
  foreignField: 'store',
  justOne: false
});

//adding mongoose middleware to delete all dish and Mealset when
//store is deleted
StoreSchema.pre('remove', async function (next) {
  const store = this;
  await MealSet.deleteMany({
    store: store._id
  });
  await Dish.deleteMany({
    store: store._id
  });
  next();
});

const Store = mongoose.model('Store', StoreSchema);
module.exports = Store;

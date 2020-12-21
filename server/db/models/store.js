const mongoose = require('mongoose');
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
    customerRating: {
      type: Array,
      required: true
    },
    priceRange: {
      type: Array,
      required: true
    },
    deliveryFee: {
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
    serviceMenu: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Dish'
    },
    themedMealSet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MealSet'
    },
    availabilityCalender: {
      type: Object
    },
    reviewsSection: {
      type: Array
    },
    Bio: {
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
    Website: {
      type: String
    },
    educationalBackground: {
      type: String
    },
    specializedCertifications: {
      type: String
    },
    mediaGallery: {
      type: Object
    },
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

const Store = mongoose.model('Store', StoreSchema);
module.exports = Store;

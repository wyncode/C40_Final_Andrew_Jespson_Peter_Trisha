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
      type: mongoose.Schema.Type.ObjectId,
      ref: 'Dish'
    },
    themedMealSet: {
      type: mongoose.Schema.Type.ObjectId,
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
      required: true
    },
    Instagram: {
      type: String
    },
    Facebook: {
      type: String
    },
    Twitter: {
      type: String
    },
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

storeSchema.methods.toJSON = function () {
  const store = this;
  const storeObject = store.toObject();
  return storeObject;
};

const Store = mongoose.model('Store', StoreSchema);
module.exports = Store;

const mongoose = require('mongoose');
const Dish = require('./dish'),
  MealSet = require('./mealSet'),
  geocoder = require('../../middleware/GEOjson/index');

const StoreSchema = new mongoose.Schema(
  {
    chefName: {
      type: String,
      required: true,
      text: true
    },
    bio: {
      type: String,
      required: true,
      maxlength: 250,
      required: true,
      text: true
    },
    careerHighlights: {
      type: String
    },
    educationalBackground: {
      type: String
    },
    specializedCertifications: {
      type: String
    },
    address: { type: String },
    location: {
      type: {
        type: String,
        enum: ['Point']
      },
      coordinates: {
        type: [Number],
        index: '2dsphere'
      },
      formattedAddress: { type: String },
      street: { type: String },
      city: { type: String },
      state: {
        type: String
      },
      zipcode: { type: Number },
      Country: { type: String }
    },
    operatingHours: {
      type: String
    },
    availabilityCalender: {
      type: Object
    },
    averageCost: { type: Number },
    website: {
      type: String
    },
    mediaGallery: [
      {
        type: String
      }
    ],
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

//adding GEOJson
StoreSchema.pre('save', async function (next) {
  const geoloc = await geocoder.geocode(this.address);
  this.location = {
    type: 'Point',
    coordinates: [geoloc[0].longitude, geoloc[0].latitude],
    formattedAddress: geoloc[0].formattedAddress,
    street: geoloc[0].streetName,
    city: geoloc[0].city,
    state: geoloc[0].state,
    zipcode: geoloc[0].zipcode,
    country: geoloc[0].country
  };

  this.address = undefined;
  next();
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

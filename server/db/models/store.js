const { address } = require('faker');
const mongoose = require('mongoose');
const Dish = require('./dish'),
  MealSet = require('./mealSet'),
  geocoder = require('../../middleware/geocoder/geocoder');

const Schema = mongoose.Schema;

const StoreSchema = new Schema(
  {
    chefName: {
      type: String,
      required: true,
      text: true
    },
    address: {
      type: String,
      required: [true, 'an address is required']
    },
    //this is to use GEOJSON doc url https://mongoosejs.com/docs/geojson.html
    location: {
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ['Point'], // 'location.type' must be 'Point'
        required: true
      },
      coordinates: {
        type: [Number], //an array of the coordinates
        required: true,
        index: '2dsphere'
      },
      meshupAddress: String,
      street: String,
      city: String,
      state: String,
      zipcode: String
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
      text: true,
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

//this basically gonna pass the address though the geocoder before saving the
//store
StoreSchema.pre('save', async function (next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    meshupAddress: loc[0].meshupAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].state,
    zipcode: loc[0].zipcode
  };

  //since we decided to go with meshup address then
  //there's no need to save address
  // we rather save meshupAddress

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

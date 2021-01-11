const mongoose = require('mongoose');

const DishSchema = new mongoose.Schema({
  dishName: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String
  },
  specialDescription: {
    type: String,
    trim: true
  },
  store: {
    type: mongoose.Schema.ObjectId,
    ref: 'Store',
    required: true
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
});

// Static method to get avg of course tuitions
DishSchema.statics.getAverageCost = async function (storeId) {
  const obj = await this.aggregate([
    {
      $match: { store: storeId }
    },
    {
      $group: {
        _id: '$store',
        averageCost: { $avg: '$price' }
      }
    }
  ]);

  try {
    await this.model('Store').findByIdAndUpdate(storeId, {
      averageCost: Math.ceil(obj[0].averageCost / 10) * 10
    });
  } catch (err) {
    console.error(err);
  }
};

// Call getAverageCost after save
DishSchema.post('save', async function () {
  await this.constructor.getAverageCost(this.store);
});

// Call getAverageCost after remove
DishSchema.post('remove', async function () {
  await this.constructor.getAverageCost(this.store);
});

const Dish = mongoose.model('Dish', DishSchema);
module.exports = Dish;

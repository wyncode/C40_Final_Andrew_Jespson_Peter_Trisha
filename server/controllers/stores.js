const mongoose = require('mongoose'),
  Store = require('../db/models/store');

/*
get all stores with all the product and mealset
 */

exports.getAllStores = async (req, res, next) => {
  try {
    const stores = await Store.find({}).populate('mealsets').populate('dishes');
    res.json(stores);
  } catch (e) {
    res.status(400).json({ error: e.toString() });
  }
};

/* Create a store, for users that are chefs */
exports.createStore = async (req, res) => {
  console.log('hello');
  try {
    const store = new Store({
      ...req.body,
      owner: req.user._id
    });
    await store.save();
    res.status(201).json(store);
  } catch (e) {
    res.status(400).json({ error: e.toString() });
  }
};

/* Get current store for logged in chef */
exports.getMyStore = async (req, res) => {
  console.log('hello');
  try {
    await req.user
      .populate({ path: 'store' })
      .populate('mealsets')
      .populate('dishes');
    res.json(req.user.store);
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
};

/* Update a chef's store*/
exports.updateStore = async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    const store = await Store.findByIdAndUpdate({
      ...req.body,
      _id: req.params.id,
      owner: req.user._id
    });
    if (!store) return res.status(400).json({ error: 'store not found' });
    updates.forEach((update) => (store[update] = req.body[update]));
    await store.save();
    res.json(store);
  } catch (e) {
    res.status(400).json({ error: e.toString() });
  }
};

/* Delete a chef's store */
exports.deleteStore = async (req, res) => {
  try {
    const store = await Store.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id
    });
    if (!store) return res.status(404).json({ error: 'store not found' });
    res.json({ message: 'store has been deleted' });
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
};

/* allows a user to get all stores by city name */
exports.getStoresByCity = async (req, res) => {
  const { city } = req.query;

  try {
    let stores = await Store.find({
      'address.city': city
    });
    stores = stores.sort((a, b) => (a.chefName > b.chefName ? 1 : -1));
    res.status(200).json({ stores });
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
};

/* allows a user to view a specific store */
exports.getSpecificStore = async (req, res) => {
  try {
    const _id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).send('not a valid id');
    }
    const store = await Store.findOne({
      _id
    });
    if (!store) return res.status(404).send();
    res.json(store);
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
};

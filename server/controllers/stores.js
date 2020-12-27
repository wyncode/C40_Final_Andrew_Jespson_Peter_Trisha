const mongoose = require('mongoose'),
  Store = require('../db/models/store');

/* Create a store, for users that are chefs */
exports.createStore = async (req, res) => {
  console.log('hello');
  try {
    const store = await new Store({
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
    await req.user.populate({ path: 'store' }).execPopulate();
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

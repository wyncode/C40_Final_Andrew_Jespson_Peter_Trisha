const mongoose = require('mongoose'),
  Store = require('../db/models/store'),
  geocoder = require('../middleware/GEOjson/index');
//User = require('../db/models/user');

/* Create a store, for users that are chefs */
exports.createStore = async (req, res) => {
  try {
    const store = new Store({
      ...req.body,
      owner: req.user._id
    });
    await store.save();
    req.user.chefStore = store._id;
    await req.user.save();
    res.status(201).json(store);
  } catch (e) {
    res.status(400).json({ error: e.toString() });
  }
};

/* Get current store for logged in chef */
exports.getMyStore = async (req, res) => {
  console.log('hello worlds');
  try {
    await req.user.populate({ path: 'store' }).execPopulate();
    // .populate("serviceMenu")
    // .exec((err, storeWithServiceMenu) => {
    //   if (err) {
    //     res.status(500).json({ error: e.toString() });
    //   } else {
    //     res.status(200).json(storeWithServiceMenu);
    //   }
    // });
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
    if (!store) return res.status(404).json({ error: 'store not found' });
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

exports.getStoreByZip = async (req, res) => {
  const { zipcode, distance } = req.params;

  // Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calc radius using radians
  // Divide dist by radius of Earth
  // Earth Radius = 3,963 mi / 6,378 km
  const radius = distance / 3963;

  const stores = await Store.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
  });

  res.status(200).json({
    success: true,
    count: stores.length,
    data: stores
  });
};

const Dish = require('../db/models/dish'),
  mongoose = require('mongoose'),
  Store = require('../db/models/store');
//const slugify = require('slugify');

//get All dish
const getAlldishes = async (req, res, next) => {
  try {
    const dish = await Dish.find({})
      .populate('store', 'chefName foodType')
      .exec();
    res.json(dish);
  } catch (e) {
    res.status(400).json({ error: e.toString() });
  }
};

// Get a Specific Dish
const getADish = async (req, res) => {
  console.log('hello');
  try {
    const dish = await Dish.findById(req.params.id).populate({
      path: 'store',
      select: 'chefName'
    });
    if (!dish) res.status(404).json({ error: 'dish not found' });
    res.json(dish);
  } catch (e) {
    res.status(400).json({ error: e.toString() });
  }
};

//creste dish
const createDish = async (req, res) => {
  try {
    const dish = new Dish({
      ...req.body,
      store: req.user.chefStore,
      owner: req.user._id
    });
    await dish.save();
    await Store.findByIdAndUpdate(
      {
        _id: req.user.chefStore
      },
      { $push: { serviceMenu: dish._id } }
    );
    res.status(201).json(dish);
  } catch (e) {
    res.status(400).json({ error: e.toString() });
  }
};

//update a dsh
const updateDish = async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    const dish = await Dish.findByIdAndUpdate({
      ...req.body,
      _id: req.params.id
    });
    if (!dish) return res.status(404).json({ error: 'dish not found' });
    updates.forEach((update) => (dish[update] = req.body[update]));
    await dish.save();
    res.json(dish);
  } catch (e) {
    res.status(400).json({ error: e.toString() });
  }
};

//delete Dish
const deleteDish = async (req, res) => {
  try {
    const dish = await Dish.findByIdAndDelete({
      _id: req.params.id
    });
    await Store.findByIdAndUpdate(
      {
        _id: req.user.chefStore
      },
      { $pull: { serviceMenu: dish._id } }
    );
    if (!dish) return res.status(404).json({ error: 'Dish not found' });
    res.json({ message: 'Dish has been deleted' });
  } catch (e) {
    res.status(400).json({ error: e.toString() });
  }
};

const picDish = async (req, res) => {
  try {
    const fileStr = req.body.data;
    const cloudinaryUploader = await cloudinary.uploader.upload(fileStr);
    res.json({ msg: 'fileuploaded' });
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
};

module.exports = {
  getAlldishes,
  getADish,
  createDish,
  updateDish,
  deleteDish,
  picDish
};

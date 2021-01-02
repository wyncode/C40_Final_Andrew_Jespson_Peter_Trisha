const MealSet = require('../db/models/mealSet');

const mongoose = require('mongoose');

exports.createMealSet = async (req, res) => {
  console.log('hello');
  try {
    const mealSet = new MealSet({
      ...req.body
      //   mealSet: req.users._id
    });
    await mealSet.save();
    res.status(201).json(mealSet);
  } catch (e) {
    res.status(400).json({ error: e.toString() });
  }
};
//get all mealset from all stores or from a single store
exports.getAllMealSets = async (req, res) => {
  let query;
  try {
    //if a store id is provided then we'll find dishes
    //inside said store // if not then we'll show all courses
    if (req.params.storeId) {
      query = MealSet.find({ store: req.params.storeId });
    } else {
      //in this code we get all dishes from all stores
      //and mealset and we populate them
      query = MealSet.find({})
        .populate({
          path: 'store',
          select: 'chefName bio'
        })
        .populate('dishes');
    }
    const mealsets = await query;
    res.json(mealsets);
  } catch (e) {
    res.status(400).json({ error: e.toString() });
  }
};

exports.getMealSet = async (req, res) => {
  try {
    const mealSet = await MealSet.findOne({ _id: req.params.id })
      .populate({
        path: 'store',
        select: 'chefName bio'
      })
      .populate('dishes');
    if (!mealSet) return res.status(404).send();
    res.json(mealSet);
  } catch (e) {
    res.status(400).json({ error: e.toString() });
  }
};

exports.updateMealSet = async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    const mealSet = await MealSet.findByIdAndUpdate({
      ...req.body,
      _id: req.params.id
    });
    if (!mealSet) return res.status(400).json({ error: 'meal set not found' });
    updates.forEach((update) => (mealSet[update] = req.body[update]));
    await mealSet.save();
    res.json(mealSet);
  } catch (e) {
    res.status(400).json({ error: e.toString() });
  }
};

exports.deleteMealSet = async (req, res) => {
  try {
    const mealSet = await MealSet.findOneAndDelete({
      _id: req.params.id
    });
    if (!mealSet) return res.status(404).json({ error: 'Meal not found' });
    res.json({ message: 'Meal has been deleted' });
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
};

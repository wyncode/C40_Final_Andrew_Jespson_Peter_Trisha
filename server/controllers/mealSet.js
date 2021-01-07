const MealSet = require('../db/models/mealSet'),
  Store = require('../db/models/store');

const mongoose = require('mongoose');

exports.createMealSet = async (req, res) => {
  console.log('Mealset Whisper');
  try {
    const mealSet = new MealSet({
      ...req.body,
      store: req.user.chefStore,
      owner: req.user._id
    });
    await mealSet.save();
    await Store.findByIdAndUpdate(
      {
        _id: req.user.chefStore
      },
      { $push: { themedMealSet: mealSet._id } }
    );
    res.status(201).json(mealSet);
  } catch (e) {
    res.status(400).json({ error: e.toString() });
  }
};

exports.getAllMealSets = async (req, res) => {
  try {
    const getAllMealSets = MealSet.find({})
      .populate({
        path: 'store',
        select: 'chefname bio'
      })
      .populate('dishes');
    res.send(getAllMealSets);
  } catch (e) {
    res.status(400).json({ error: e.toString() });
  }
};

exports.getMealSet = async (req, res) => {
  try {
    const mealSet = await MealSet.findOne({ _id: req.params.id })
      .populate('dishes')
      .populate({
        path: 'store',
        select: 'chefName'
      });
    if (!mealSet) return res.status(404).send();
    res.json(mealSet);
  } catch (e) {
    res.status(400).json({ error: e.toString() });
  }
};

exports.updateMealSet = async (req, res) => {
  try {
    const mealSet = await MealSet.findByIdAndUpdate({
      ...req.body,
      _id: req.params.id
    });
    if (!mealSet) return res.status(400).json({ error: 'meal set not found' });
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
    await Store.findByIdAndUpdate(
      {
        _id: req.user.chefStore
      },
      { $pull: { themedMealSet: mealSet._id } }
    );
    if (!mealSet) return res.status(404).json({ error: 'Meal not found' });
    res.json({ message: 'Meal has been deleted' });
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
};

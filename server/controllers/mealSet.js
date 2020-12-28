const MealSet = require('../db/models/mealSet');

const mongoose = require('mongoose');

exports.createMealSet = async (req, res) => {
  try {
    const mealSet = new MealSet({
      ...req.body
      //   store: req.user._id
    });
    await mealSet.save();
    res.status(201).json(mealSet);
  } catch (e) {
    res.status(400).json({ error: e.toString() });
  }
};

exports.getAllMealSets = async (req, res) => {
  try {
    const getAllMealSets = MealSet.find({});
    res.send(getAllMealSets);
  } catch (e) {
    res.status(400).json({ error: e.toString() });
  }
};

exports.getMealSet = async (req, res) => {
  try {
    const mealSet = await MealSet.findOne({ id: req.params.id });
    if (!mealSet) return res.status(404).send();
    res.json(mealSet);
  } catch (e) {
    res.status(400).json({ error: e.toString() });
  }
};

exports.updateMealSet = async (req, res) => {
  try {
    const updateMealSet = await MealSet.findByIdAndUpdate({
      ...req.body,
      _id: req.params.id
    });
    res.json(updateMealSet);
  } catch (e) {
    res.status(400).json({ error: e.toString() });
  }
};

exports.deleteMealSet = async (req, res) => {
  try {
    const deleteMealSet = await MealSet.findOneAndDelete({
      _id: req.params.id
    });
    if (!deleteMealSet)
      return res.status(404).json({ error: 'Meal not found' });
    res.json({ message: 'Meal has been deleted' });
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
};

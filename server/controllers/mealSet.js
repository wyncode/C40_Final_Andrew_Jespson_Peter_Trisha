const MealSet = require('../db/models/mealSet'),
  Dish = require('../db/models/dish');

const mongoose = require('mongoose');

exports.createMealSet = async (req, res) => {
  console.log('hello');
  const chefStore = req.user.chefStore;
  console.log(chefStore);
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

// exports.getAllMealSets = async (req, res) => {
//   try {
//     const getAllMealSets = MealSet.find({});
//     res.send(getAllMealSets);
//   } catch (e) {
//     res.status(400).json({ error: e.toString() });
//   }
// };

exports.getMealSet = async (req, res) => {
  try {
    const mealSet = await MealSet.findOne({ _id: req.params.id });
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

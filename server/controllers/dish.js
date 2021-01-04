const Dish = require('../db/models/dish');
const Store = require('../db/models/store');
const slugify = require('slugify');

//get All dish
const getAlldishes = async (req, res, next) => {
  try {
    const dish = await Dish.find({});
    res.json(dish);
  } catch (e) {
    res.status(400).json({ error: e.toString() });
  }
};

//get a dish
const getADish = async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id)
      .populate({
        path: 'store',
        select: 'chefName bio'
      })
      .populate({
        path: 'mealset',
        select: 'setName'
      });
    if (!dish) return res.status(404).json({ error: 'dish not found' });
    res.json(dish);
  } catch (e) {
    res.status(400).json({ error: e.toString() });
  }
};

//creste dish
const createDish = async (req, res) => {
  try {
    const dish = new Dish({
      ...req.body
    });
    await dish.save();
    res.status(201).json(dish);
  } catch (e) {
    res.status(400).json({ error: e.toString() });
  }
};

//update a dsh
const updateDish = async (req, res) => {
  try {
    const dish = await Dish.findByIdAndUpdate({
      ...req.body,
      _id: req.params.id
    });
    if (!dish) return res.status(404).json({ error: 'task not found' });
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
    if (!dish) return res.status(404).json({ error: 'Dish not found' });
    res.json({ message: 'Dish has been deleted' });
  } catch (e) {
    res.status(400).json({ error: e.toString() });
  }
};

module.exports = {
  getAlldishes,
  getADish,
  createDish,
  updateDish,
  deleteDish
};

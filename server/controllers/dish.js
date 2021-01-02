const Dish = require('../db/models/dish');
const slugify = require('slugify');

//get All dish from all stores and mealset, get dishes from a sppecific store
const getAlldishes = async (req, res, next) => {
  let query;
  try {
    //if a store id is provided then we'll find dishes
    //inside said store // if not then we'll show all courses
    if (req.params.storeId) {
      query = Dish.find({ store: req.params.storeId });
    } else if (req.params.mealsetId) {
      //check it mealset ID is given
      query = Dish.find({ store: req.params.mealsetId });
    } else {
      //in this code we get all dishes from all stores
      //and mealset and we populate them
      query = Dish.find({})
        .populate({
          path: 'store',
          select: 'chefName bio'
        })
        .populate({
          path: 'mealset',
          select: 'setName'
        });
    }
    const dishes = await query;
    res.json(dishes);
  } catch (e) {
    res.status(400).json({ error: e.toString() });
  }
};

//get a dish
const getADish = async (req, res) => {
  try {
    const dish = await Dish.findOne({ slug: req.params.slug })
      .populate({
        path: 'store',
        select: 'chefName bio'
      })
      .populate({
        path: 'mealset',
        select: 'setName'
      })
      .exec();
    if (!dish) return res.status(404).send();
    res.json(dish);
  } catch (e) {
    res.status(400).json({ error: e.toString() });
  }
};

//creste dish
const createDish = async (req, res) => {
  try {
    req.body.slug = slugify(req.body.title);
    const newDish = new Dish({
      ...req.body
    });
    newDish.save();
    res.status(201).json(task);
  } catch (e) {
    res.status(400).json({ error: e.toString() });
  }
};

//update a dsh
const updateDish = async (req, res) => {
  try {
    const dish = await Dish.findOneAndUpdate(
      {
        slug: req.params.slug
      },
      req.body
    ).exec();
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
    const dish = await Dish.findOneAndDelete({
      slug: req.params.slug
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

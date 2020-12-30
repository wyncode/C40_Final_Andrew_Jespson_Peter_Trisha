const Dish = require('../db/models/dish');
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
    const dish = await Dish.findOne({ slug: req.params.slug }).exec();
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
        slug: req.params.slug,
        owner: req.user._id
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
      slug: req.params.slug,
      owner: req.user._id
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

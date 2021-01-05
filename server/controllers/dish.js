const Dish = require('../db/models/dish');
const Store = require('../db/models/store');
const slugify = require('slugify');

//get All dish
//get All dish from a store
//get storeid then get all dishes from it
//if no id then give all dishes from all stores
// 2 endpoint
//api/dishes
//api/stores/storeid/dishes
const getAlldishes = async (req, res, next) => {
  let query;
  try {
    if (req.params.store) {
      query = Dish.findById({ store: req.params.store }).populate({
        path: 'store'
      });
    } else {
      query = await Dish.find({}).populate({
        path: 'store',
        select: 'chefName bio'
      });
    }
    res.json(query);
  } catch (e) {
    res.status(400).json({ error: e.toString() });
  }
};

//get a dish
const getADish = async (req, res) => {
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
//api/stores/storeId/dishes
const createDish = async (req, res) => {
  req.body.store = req.params.storeId;
  req.body.owner = req.user.id;
  try {
    const ownedStore = await Store.findById(req.params.storeId);
    if (!ownedStore) return res.status(404).json({ error: 'Store not found' });
    if (ownedStore.owner.toString() !== req.user.id)
      return res.status(404).json({ error: 'Not your Store' });
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

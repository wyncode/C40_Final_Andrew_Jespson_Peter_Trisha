const router = require('express').Router();
const { isChef } = require('../../middleware/authorization');

const {
  getAllMealSets,
  getMealSet,
  createMealSet,
  updateMealSet,
  deleteMealSet
} = require('../controllers/mealSetController');

//Get all Meal Sets
router.get('/', getAllMealSets);
//Get a single Meal Set using different queries in slug to find the set
router.get('/:id', getMealSet);
//Create a Meal Set
router.post('/', isChef(), createMealSet);
//Update a Meal Set using different queries in slug to find the set
router.put('/slug', isChef(), updateMealSet);
//Delete a Meal Set
router.delete('/:id', isChef(), deleteMealSet);

module.exports = router;

const router = require('express').Router();

const {
  getAlldishes,
  getAdish,
  createDish,
  updateDish,
  deleteDish
} = require('../controller/dishController');

//get all dishes
router.get('/', getAlldishes);
//get a single dishes using different queries in slug to find the dish
router.get('/:slug', getAdish);
//create a dish
router.post('/', createDish);
//update a dish using different queries in slug to find the dish
router.put('/slug', updateDish);
//delete a dish using different queries in slug to find the dish
router.delete('/:id', deleteDish);

module.exports = router;

const router = require('express').Router();

const {
  getAlldishes,
  getADish,
  createDish,
  updateDish,
  deleteDish
} = require('../controller/dishController');

//admin and chef routes
//get all dishes admin only
router.get('/', getAlldishes);
//get a single dishes using different queries in slug to find the dish
//create a dish chef and admin only
router.post('/', createDish);
//update a dish using different queries in slug to find the dish admin or chef only
router.put('/:slug', updateDish);
//delete a dish using different queries in slug to find the dish admin or chef only
router.delete('/:slug', deleteDish);

//user route or openroute
//get a single dish
router.get('/:slug', getAdish);

module.exports = router;

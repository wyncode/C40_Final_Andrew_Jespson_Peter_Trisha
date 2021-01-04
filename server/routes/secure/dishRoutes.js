const router = require('express').Router();

const {
  getAlldishes,
  getADish,
  createDish,
  updateDish,
  deleteDish
} = require('../../controllers/dish');

//get all dishes
router.get('/', getAlldishes);
//get a single dishes using different queries in slug to find the dish
router.get('/::id', getADish);
//create a dish
router.post('/', createDish);
//update a dish using different queries in slug to find the dish
router.put('/:id', updateDish);
//delete a dish using different queries in slug to find the dish
router.delete('/:id', deleteDish);

module.exports = router;

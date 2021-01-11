const router = require('express').Router(),
  { isChef } = require('../../middleware/authorization'),
  {
    getAlldishes,
    getADish,
    createDish,
    updateDish,
    deleteDish,
    picDish
  } = require('../../controllers/dish');

//get all dishes
router.get('/', getAlldishes);
//get a single dishes using different queries in slug to find the dish
router.get('/:id', getADish);
//create a dish
router.post('/', isChef(), createDish);
//router.post('/image', isChef(), picDish);
//update a dish using different queries in slug to find the dish
//update a dish using different queries in slug to find the dish
router.put('/:id', isChef(), updateDish);
router.put('/:id', isChef(), updateDish);
//delete a dish using different queries in slug to find the dish
router.delete('/:id', isChef(), deleteDish);

module.exports = router;

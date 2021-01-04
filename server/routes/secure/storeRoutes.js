const router = require('express').Router(),
  { isChef } = require('../../middleware/authorization'),
  {
    createStore,
    getMyStore,
    updateStore,
    deleteStore,
    getStoresByCity,
    getSpecificStore
  } = require('../../controllers/stores');

// Allows a user that is a chef to create a new store
router.route('/').post(isChef(), createStore);

// Allows a user that is a chef to view their current store
router.route('/currentStore').get(isChef(), getMyStore);

//Allows a user to get a specific store
//Allows a user that is a chef to update their store
//Allows a user that is a chef to delete their store
router
  .route('/:id')
  .get(getSpecificStore)
  .patch(isChef(), updateStore)
  .delete(isChef(), deleteStore);

//Allows a user to get all chef's in searched city
router.get('/address', getStoresByCity);

module.exports = router;

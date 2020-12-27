const router = require('express').Router(),
  { isChef } = require('../../middleware/authorization'),
  {
    createStore,
    getMyStore,
    updateStore,
    deleteStore
  } = require('../../controllers/stores');

// Allows a user that is a chef to create a new store
router.post('/', isChef(), createStore);

// Allows a user that is a chef to view their current store
router.get('/currentStore', isChef(), getMyStore);

//Allows a user that is a chef to update their store
router.patch('/:id', isChef(), updateStore);

//Allows a user that is a chef to delete their store
router.delete('/:id', isChef(), deleteStore);

module.exports = router;

const searchRouter = require('./searchRouter');
const router = require('express').Router(),
  { isChef } = require('../../middleware/authorization'),
  {
    createStore,
    getMyStore,
    updateStore,
    deleteStore,
    getStoresByCity,
    getSpecificStore,
    getStoreByZip,
    addMediaStore
  } = require('../../controllers/stores');

router.use('/radius/:zipcode/:distance/', searchRouter);
// Allows a user that is a chef to create a new store
router.post('/', isChef(), createStore);

//upload avatar
//router.post('/mediaGallery', isChef(), addMediaStore);

// Allows a user that is a chef to view their current store
router.get('/currentStore', isChef(), getMyStore);

//Allows a user that is a chef to update their store
router.patch('/:id', isChef(), updateStore);

//Allows a user that is a chef to delete their store
router.delete('/:id', isChef(), deleteStore);

//Allows a user to get all chef's in searched city
router.get('/address', getStoresByCity);

//Allows a user to get a specific store
router.get('/:id', getSpecificStore);

router.get('/radius/:zipcode/:distance', getStoreByZip);

module.exports = router;

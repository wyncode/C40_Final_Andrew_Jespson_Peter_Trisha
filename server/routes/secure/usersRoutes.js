const router = require('express').Router(),
  storeRoutes = require('../secure/storeRoutes'),
  {
    getCurrentUser,
    updateCurrentUser,
    logoutUser,
    logoutAllDevices,
    deleteUser,
    getUsers
  } = require('../../controllers/users');

router.use('/:userId/stores', storeRoutes);
router.get('/me', getCurrentUser);
router.patch('/me', updateCurrentUser);
router.post('/logout', logoutUser);
router.post('/logoutall', logoutAllDevices);
router.delete('/:id', deleteUser);
router.get('/', getUsers);

module.exports = router;

const router = require('express').Router(),
  {
    postBooking,
    getSpecificBooking,
    deleteBooking
  } = require('../../controllers/bookings');

// Allows a customer to create a booking
router.post('/', postBooking);

//Allows a user to view or get a specific booking
router.get('/:id', getSpecificBooking);

// Allows a user to delete or cancel a booking
router.delete('/:id', deleteBooking);

module.exports = router;

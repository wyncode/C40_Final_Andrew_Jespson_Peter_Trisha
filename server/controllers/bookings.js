const Booking = require('../db/models/booking'),
  mongoose = require('mongoose');

/* Allow a customer to post a booking */
exports.postBooking = async (req, res) => {
  console.log('hello');
  try {
    const booking = await new Booking({
      ...req.body,
      booker: req.user._id
    });
    await booking.save();
  } catch (e) {
    res.status(400).json({ error: e.toString() });
  }
};

/* Allow a user to view or get a specific booking */
exports.getSpecificBooking = async (req, res) => {
  try {
    const _id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).send('not a valid id');
    }
    const booking = await Booking.findOne({
      _id
    });
    if (!booking) return res.status(404).send();
    res.json(booking);
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
};

/* Allows a user to delete a booking */
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findOneAndDelete({
      _id: req.params.id,
      booker: req.user._id
    });
    if (!booking) return res.status(404).json({ error: 'booking not found' });
    res.json({ message: 'booking has been cancelled' });
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
};
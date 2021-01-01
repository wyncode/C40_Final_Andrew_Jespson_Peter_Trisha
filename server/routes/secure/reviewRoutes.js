const router = require('express').Router();
const {
  getAllReviews,
  getSingleReview,
  createReview,
  replyReview,
  updateReview,
  deleteReview
} = require('../controllers/reviews');

//Get all Reviews
router.get('/', getAllReviews);
//Get a single Review
router.get('/:id', getSingleReview);
//Create a Review
router.post('/', createReview);
//Reply to a Review
router.post('/', isChef(), replyReview);
//Update a Review
router.put('/slug', updateReview);
//Delete a Review
router.delete('/:id', isChef(), deleteReview);

module.exports = router;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userReviewSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    ratingTitle: { type: String, required: true },
    ratingComment: { type: String, required: true },
    returningCustomer: { type: String, required: true }
  },
  { timestamps: true }
);

const UserReviews = mongoose.model('UserReviews', UserReviewsSchema);
module.exports = UserReviews;

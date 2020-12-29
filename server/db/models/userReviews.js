const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userReviewSchema = new Schema(
  {
    // ReviewId: { type: String, required: true, trim: true },
    isChef: { type: Boolean, default: false },
    user: { type: String, ref: User },
    rating: { type: [] / Number, required: true },
    returningCustomer: { type: String, required: true },
    isUser: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const UserReviews = mongoose.model('UserReviews', UserReviewsSchema);
module.exports = UserReviews;

const { ObjectID } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chefRepliesSchema = new Schema(
  {
    chef: { type: ObjectID, required: true, trim: true, ref: User },
    isChef: { type: Boolean, default: false },
    user: { type: ObjectID },
    reply: { type: String, required: true }
  },
  { timestamps: true }
);

const chefReplies = mongoose.model('chefReplies', chefRepliesSchema);
module.exports = chefReplies;

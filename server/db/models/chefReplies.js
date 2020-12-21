const { ObjectID } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chefRepliesSchema = new Schema(
  {
    Chef: { type: ObjectID, required: true, trim: true, ref: User },
    isChef: { type: Boolean, default: false },
    User: { type: ObjectID },
    Reply: { type: String, required: true }
  },
  { timestamps: true }
);

const chefReplies = mongoose.model('chefReplies', chefRepliesSchema);
module.exports = chefReplies;

const { ObjectID } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chefRepliesSchema = new Schema(
  {
    Chef: { type: String, required: true, trim: true },
    isChef: { type: Boolean, default: false },
    User: { type: ObjectID },
    Reply: { type: String, required: true }
  },
  { timestamps: true }
);

const chefReplies = mongoose.model('chefReplies', chefRepliesSchema);
module.exports = chefReplies;

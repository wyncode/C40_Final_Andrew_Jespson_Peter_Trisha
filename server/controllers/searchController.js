const mongoose = require('mongoose'),
  Store = require('../db/models/store');

const handleQuery = async (req, res) => {
  //to hanle text search
  const stores = await Store.find({ $text: { $search: query } }).populate(
    'chefName'
  );
  res.json(stores);
};

exports.searchfilter = async (req, res) => {
  let query = req.body;

  let queryStr = JSON.stringify(query);

  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  if (query) {
    console.log('this is a query');
    await handleQuery(res, res, query);
  }
};

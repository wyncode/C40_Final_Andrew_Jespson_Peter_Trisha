const Dish = require('../db/models/dish');

//text-based search
const handleQuery = async (req, res, query) => {
  const dish = await Dish.find({ $text: { $search: query } });
};

const handlePrice = async (req, res, price) => {
  const dish = await Dish.find({
    price: {
      $gte: price[0],
      $lte: price[1]
    }
  });
  res.json(dish);
};

const searchFilter = async (req, res, next) => {
  const { query, price } = req.body;

  //handle text based search
  if (query) {
    await handleQuery(req, res, query);
  }

  //handle price based search
  //if price not empty
  if (price !== undefined) {
    await handlePrice(req, res, price);
  }
};

module.exports = {
  searchFilter,
  handleQuery,
  handlePrice
};

const router = require('express').Router();
const { searchFilter } = require('../../controllers/search');

router.get('/search/filters', searchFilter); //filtering options on Dish Model

module.exports = router;

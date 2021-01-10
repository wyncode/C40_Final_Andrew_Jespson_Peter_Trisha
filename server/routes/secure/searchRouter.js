const router = require('express').Router({ mergeParams: true });
const { searchfilter } = require('../../controllers/searchController');

router.get('/', searchfilter);

module.exports = router;

const router = require('express').Router({ mergeParams: true });
const { getAllStores } = require('../../controllers/stores');

router.get('/search', getAllStores);

module.exports = router;

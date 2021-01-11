const router = require('express').Router({ mergeParams: true });
const { getAllStores } = require('../../controllers/stores');

router.post('/search', getAllStores);

module.exports = router;

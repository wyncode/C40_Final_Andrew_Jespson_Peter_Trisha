const router = require('express').Router(),
  {
    createUser,
    loginUser,
    requestPasswordReset,
    passwordRedirect
  } = require('../../controllers/users');

// JUST FOR DEMO PURPOSES, PUT YOUR ACTUAL API CODE HERE
router.get('/api/demo', (request, response) => {
  response.json({
    message: 'Hello from server.js'
  });
});
// END DEMO

module.exports = router;

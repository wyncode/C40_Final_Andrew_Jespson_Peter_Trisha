// import db
require('./db/config/index');

const express = require('express'),
  app = express(),
  path = require('path'),
  morgan = require('morgan'),
  passport = require('./middleware/authentication'),
  cookieParser = require('cookie-parser'),
  openRoutes = require('./routes/open'),
  userRouter = require('./routes/secure/usersRoutes'),
  mealSetRouter = require('./routes/secure/mealsetRoutes'),
  dishRouter = require('./routes/secure/dishRoutes'),
  storeRouter = require('./routes/secure/storeRoutes'),
  bookingRouter = require('./routes/secure/bookingRoutes');

// Parse incoming JSON into objects
app.use(express.json());
// Log all requests
app.use(morgan('dev'));

// Unauthenticated routes
app.use('/api/users', openRoutes);

app.use(cookieParser());

// Serve any static files
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.resolve(__dirname, '..', 'client', 'build')));
}

//  Authentication Middleware
app.use('/api/*', passport.authenticate('jwt', { session: false }));
app.use('/api/users', userRouter);
app.use('/api/mealsets', mealSetRouter);

app.use('/api/stores', storeRouter);
app.use('/api/dishes', dishRouter);
app.use('/api/bookings', bookingRouter);

// Handle React routing, return all requests to React app
if (process.env.NODE_ENV === 'production') {
  // Handle React routing, return all requests to React app
  app.get('*', (request, response) => {
    response.sendFile(
      path.resolve(__dirname, '..', 'client', 'build', 'index.html')
    );
  });
}

module.exports = app;

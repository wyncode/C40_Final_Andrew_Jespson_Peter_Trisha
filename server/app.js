// import db
require('./db/config/config');

const express = require('express'),
  app = express(),
  morgan = require('morgan'),
  passport = require('./middleware/authentication'),
  cookieParser = require('cookie-parser'),
  openRoutes = require('./routes/open/index'),
  dishRoutes = require('./routes/secure/dishRoutes');
path = require('path');

// Parse incoming JSON into objects
app.use(express.json());
// Log all requests
app.use(morgan('dev'));

// Unauthenticated routes
app.use('/api/users', openRoutes);

app.use(cookieParser());

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.resolve(__dirname, '..', 'client', 'build')));
}

//  Authentication Middleware
app.use('/api/*', passport.authenticate('jwt', { session: false }));

app.use('/api/users', userRoutes);
app.use('/api/dishes', dishRoutes);

if (process.env.NODE_ENV === 'production') {
  // Handle React routing, return all requests to React app
  app.get('*', (request, response) => {
    response.sendFile(
      path.resolve(__dirname, '..', 'client', 'build', 'index.html')
    );
  });
}

module.exports = app;

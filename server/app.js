require('./db/config');
const express = require('express'),
  path = require('path'),
  morgan = require('morgan'),
  passport = require('./middleware/authentication'),
  cookieParser = require('cookie-parser'),
  openRoutes = require('./routes/open'),
  storeRouter = require('./routes/secure/storeRoutes');

const app = express();

//Middleware
app.use(express.json());
app.use(morgan('dev'));

// Unauthenticated routes
app.use('/api/users', openRoutes);

app.use(cookieParser());

// Serve any static files
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Any authentication middleware and related routing would be here.
app.use('/api/*', passport.authenticate('jwt', { session: false }));

app.use('/api/stores', storeRouter);
//app.use('/api/dishes', dishRouter);
//app.use('/api/mealSet/', mealSetRouter);

// Handle React routing, return all requests to React app
if (process.env.NODE_ENV === 'production') {
  app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}
module.exports = app;

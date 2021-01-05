const User = require('../db/models/user'),
  jwt = require('jsonwebtoken');

/**
 * @param {name, email, password}
 * Create a user
 * @return {user}
 */
exports.createUser = async (req, res) => {
  const {
    chef,
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    street,
    city,
    state,
    zip,
    dateOfBirth
  } = req.body;
  try {
    const user = new User({
      chef,
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      street,
      city,
      state,
      zip,
      dateOfBirth
    });
    await user.save();
    const token = await user.generateAuthToken();
    res.cookie('jwt', token, {
      httpOnly: true,
      sameSite: 'Strict',
      secure: process.env.NODE_ENV !== 'production' ? false : true
    });
    res.status(201).json(user);
  } catch (e) {
    res.status(400).json({ error: e.toString() });
  }
};
/**
 * @param {email, password}
 * Login a user
 * @return {user}
 */
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.cookie('jwt', token, {
      httpOnly: true,
      sameSite: 'Strict',
      secure: process.env.NODE_ENV !== 'production' ? false : true
    });
    res.json(user);
  } catch (e) {
    res.status(400).json({ error: e.toString() });
  }
};

//Authenticated Routes Below

/**
 * @param {req.user}
 * Get current user
 * @return {user}
 */
exports.getCurrentUser = async (req, res) => res.json(req.user);

/**
 * @param {{updates}}
 * Update a user
 * @return {user}
 */
exports.updateCurrentUser = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'avatar'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation)
    return res.status(400).send({ error: 'invalid updates!' });
  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.json(req.user);
  } catch (e) {
    res.status(400).json({ error: e.toString() });
  }
};

/**
 * @param {}
 * Logout a user
 * @return {}
 */
exports.logoutUser = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.cookies.jwt;
    });
    await req.user.save();
    res.clearCookie('jwt');
    res.json({ message: 'Logged out' });
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
};

/**
 * @param {}
 * Logout all devices
 * @return {}
 */
exports.logoutAllDevices = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.clearCookie('jwt');
    res.json({ message: 'all devices logged out' });
  } catch (e) {
    res.status(500).send();
  }
};

/**
 * @param {}
 * Delete a user
 * @return {}
 */
exports.deleteUser = async (req, res) => {
  try {
    await req.user.remove();
    sendCancellationEmail(req.user.email, req.user.name);
    res.clearCookie('jwt');
    res.json({ message: 'user deleted' });
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
};

exports.getUsers = async (req, res) => {
  console.log('lets goo!');
  try {
    const user = User.find({}).populate('store').populate('dishes');
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
};

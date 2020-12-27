const User = require('../db/models/user'),
  jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
  const { chef, firstName, lastName, email, password, address } = req.body;
  try {
    const user = new User({
      chef,
      firstName,
      lastName,
      email,
      password,
      address
    });
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

exports.loginUser = async (req, res) => {
  console.log(req.body);
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

exports.requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.query,
      user = await User.findOne({ email });
    if (!user) throw new Error('no user found');
    const token = jwt.sign(
      { _id: user._id.toString(), name: user.name },
      process.env.JWT_SECRET,
      {
        expiresIn: '10m'
      }
    );
    res.json({ message: 'reset password email sent' });
  } catch (e) {
    res.json({ error: e.toString() });
  }
};

exports.passwordRedirect = async (req, res) => {
  try {
    const { token } = req.params;
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      if (err) throw new Error(err.message);
    });
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 600000,
      sameSite: 'Strict'
    });
    res.redirect(process.env.URL + '/updatepassword');
  } catch (e) {
    res.json({ error: e.toString() });
  }
};

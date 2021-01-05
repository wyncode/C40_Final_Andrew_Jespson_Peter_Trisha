const mongoose = require('mongoose'),
  validator = require('validator'),
  bcrypt = require('bcryptjs'),
  jwt = require('jsonwebtoken'),
  Store = require('./store');

const userSchema = new mongoose.Schema(
  {
    chef: {
      type: Boolean,
      required: true
    },
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Email is invalid.');
        }
      }
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes('password')) {
          throw new Error("Password can't be password.");
        }
        if (value.length < 6) {
          throw new Error('Password must be at least 6 characters long.');
        }
      }
    },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ],
    phoneNumber: {
      type: String,
      validate: {
        validator: function (v) {
          return /\d{3}-\d{3}-\d{4}/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`
      },
      required: [true, 'User phone number required'],
      unique: true
    },
    street: { type: String },
    city: { type: String },
    state: {
      type: String,
      uppercase: true,
      required: [true, "Must write similar to 'FL'"],
      maxlength: 2
    },
    zip: { type: Number },
    dateOfBirth: {
      type: String,
      required: true
    },
    servSafeCertification: {
      type: Boolean
    },
    securityQuestion: {
      type: String
      //required: true
    },
    securityQuestionAnswer: {
      type: String
      //required: true
    },
    emailPromotion: {
      type: Boolean
      //required: true
    },
    textPromotion: {
      type: Boolean
      //required: true
    },
    avatar: {
      type: String
    }
  },
  {
    timestamps: true
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

userSchema.virtual('address').get(function () {
  return this.street + ' ' + this.city + ' ' + this.state + ' ' + this.zip;
});

userSchema.virtual('store', {
  ref: 'Store',
  localField: '_id',
  foreignField: 'owner'
});

userSchema.virtual('dishes', {
  ref: 'Dish',
  localField: '_id',
  foreignField: 'owner'
});
/**
 * // By naming this instance method toJSON we don't
 * // need to call it for it to run because of our
 * // express res.send or res.json methods calls it for us.
 * @return { name, email, admin, avatar, timestamps }
 */
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};

/**
 * // This instance method will generate a user token
 * // and append it to the user.tokens array in the DB
 * @return { token }
 */
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString(), name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

/**
 * // This static method will first find a user by email
 * // and then compare that users password with the
 * // submitted password.
 * // Static methods are run on the actual Model (User), instead
 * // of an instance of a model.
 * @return { user }
 */
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Unable to log in.');
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Unable to login.');
  return user;
};

/**
 * // This mongoose middleware will hash our user's passwords
 * // whenever a user is created or a user password is updated.
 * // it doesn't return anything, but calls next instead.  This next
 * // serves the same purpose as the next we have been calling in
 * // express, but it is not the same next.  This one is provided
 * // by mongoose, and the other by express.
 */
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password'))
    user.password = await bcrypt.hash(user.password, 8);

  next();
});

userSchema.pre('remove', async function (next) {
  const user = this;
  await Store.deleteMany({
    owner: user._id
  });
});

const User = mongoose.model('User', userSchema);
module.exports = User;

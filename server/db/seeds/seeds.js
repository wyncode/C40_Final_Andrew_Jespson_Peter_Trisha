if (process.env.NODE_ENV !== 'production') require('dotenv').config();

require('../config/');

const User = require('../models/user'),
  Store = require('../models/store'),
  Dish = require('../models/dish'),
  faker = require('faker'),
  mongoose = require('mongoose');

const dbReset = async () => {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany();
  }

  await User.countDocuments({}, function (err, count) {
    console.log('Number of users:', count);
  });

  await Store.countDocuments({}, function (err, count) {
    console.log('Number of stores:', count);
  });

  await Dish.countDocuments({}, function (err, count) {
    console.log('Number of dishes:', count);
  });

  const userIdArray = [];
  const storeIdArray = [];
  const dishIdArray = [];

  for (let i = 0; i < 20; i++) {
    const user = new User({
      chef: Boolean(Math.round(Math.random())),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      phoneNumber: faker.phone.phoneNumber(),
      street: faker.address.streetName(),
      city: faker.address.city(),
      state: faker.address.stateAbbr(),
      zipcode: faker.address.zipCode(),
      avatar: faker.internet.avatar(),
      chefStore: storeIdArray[Math.floor(Math.random() * storeIdArray.length)]
    });
    await user.generateAuthToken();
    userIdArray.push(user._id);
  }
  for (let i = 0; i < 20; i++) {
    const store = new Store({
      chefName: faker.company.companyName(),
      bio: faker.company.catchPhraseDescriptor(),
      careerHighlights: faker.lorem.text(),
      educationalBackground: faker.lorem.text(),
      specializedCertifications: faker.lorem.text(),
      address: `${faker.address.streetName()} ${faker.address.city()} ${faker.address.stateAbbr()} ${faker.address.zipCode()}`,
      website: faker.internet.domainName(),
      mediaGallery: faker.image.food(),
      allergyInfo: faker.lorem.text(),
      owner: userIdArray[Math.floor(Math.random() * userIdArray.length)]
    });
    storeIdArray.push(store._id);
    await store.save();
  }
  for (let i = 0; i < 20; i++) {
    const dish = new Dish({
      dishName: faker.commerce.productName(),
      price: faker.commerce.price(),
      specialDescription: faker.commerce.productDescription(),
      chefStore: storeIdArray[Math.floor(Math.random() * storeIdArray.length)],
      owner: userIdArray[Math.floor(Math.random() * userIdArray.length)]
    });
    dishIdArray.push(dish._id);
    await dish.save();
  }

  await User.countDocuments({}, function (err, count) {
    console.log('Number of users:', count);
  });
  await Store.countDocuments({}, function (err, count) {
    console.log('Number of stores:', count);
  });
  await Dish.countDocuments({}, function (err, count) {
    console.log('Number of dishes:', count);
  });
};

dbReset();

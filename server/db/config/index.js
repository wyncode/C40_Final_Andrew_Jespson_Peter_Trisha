const mongoose = require('mongoose');

try {
  mongoose.connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
  console.log('Connected to MongoDB');
} catch (e) {
  console.log(e.toString());
}

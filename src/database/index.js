const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(
  process.env.NODE_ENV === 'test'
    ? process.env.MONGO_URL_TEST
    : process.env.MONGO_URL
);
mongoose.Promise = global.Promise;
module.exports = mongoose;

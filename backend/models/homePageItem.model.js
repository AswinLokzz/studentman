// models/homePageItem.model.js

const mongoose = require('mongoose');

const homePageItemSchema = new mongoose.Schema({
  name: String,
  icon: String,
});

const HomePageItem = mongoose.model('HomePageItem', homePageItemSchema);

module.exports = HomePageItem;

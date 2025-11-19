const mongoose = require('mongoose');

const PhoneSchema = new mongoose.Schema({
  name: String,
  brand: String,
  price: Number,
  description: String,
  image: String
}, { timestamps: true });

module.exports = mongoose.model('Phone', PhoneSchema);

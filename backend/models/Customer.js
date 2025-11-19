const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  purchaseHistory: [{ item: String, date: Date }]
}, { timestamps: true });

module.exports = mongoose.model('Customer', CustomerSchema);

const mongoose = require('mongoose');

const schoolDetailsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  schoolName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  principalName: {
    type: String,
  },
  registrationNumber: {
    type: String,
    unique: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('SchoolDetails', schoolDetailsSchema);

const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  role: {
    type: String, // 'admin' or 'school'
    required: true,
  },
  targetAudience: {
    type: String,
    enum: ['all', 'parents', 'schools'], // Who sees this
    default: 'all',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Notice', noticeSchema);

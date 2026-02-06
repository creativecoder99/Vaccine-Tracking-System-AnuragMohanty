const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  child: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Child',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String, // URL or Path
    required: true,
  },
  fileType: {
    type: String, // 'medical', 'vaccination'
    required: true,
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Report', reportSchema);

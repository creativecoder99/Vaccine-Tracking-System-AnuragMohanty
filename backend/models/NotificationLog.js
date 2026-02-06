const mongoose = require('mongoose');

const notificationLogSchema = new mongoose.Schema({
  child: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Child',
    required: true,
  },
  schedule: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'VaccinationSchedule',
    required: true,
  },
  channel: {
    type: String,
    enum: ['Email', 'SMS', 'App'],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Sent', 'Failed', 'Pending'],
    default: 'Pending',
  },
  sentAt: {
    type: Date,
    default: Date.now,
  },
  error: {
    type: String,
  },
});

module.exports = mongoose.model('NotificationLog', notificationLogSchema);

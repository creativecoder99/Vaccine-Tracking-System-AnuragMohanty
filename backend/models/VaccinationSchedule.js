const mongoose = require('mongoose');

const vaccinationScheduleSchema = new mongoose.Schema({
  child: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Child',
    required: true,
  },
  vaccineName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Missed', 'Skipped'],
    default: 'Pending',
  },
  completionDate: {
    type: Date,
  },
  notes: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('VaccinationSchedule', vaccinationScheduleSchema);

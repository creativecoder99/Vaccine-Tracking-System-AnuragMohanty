const asyncHandler = require('express-async-handler');
const Child = require('../models/Child');
const VaccinationSchedule = require('../models/VaccinationSchedule');
const { generateSchedule } = require('../utils/vaccineScheduler');

// @desc    Get all children for a user
// @route   GET /api/children
// @access  Private
const getChildren = asyncHandler(async (req, res) => {
  const children = await Child.find({ user: req.user.id });
  res.status(200).json(children);
});

// @desc    Register a new child
// @route   POST /api/children
// @access  Private
const createChild = asyncHandler(async (req, res) => {
  const { name, dob, gender, bloodGroup, medicalHistory } = req.body;

  if (!name || !dob || !gender) {
    res.status(400);
    throw new Error('Please add all required fields');
  }

  const child = await Child.create({
    user: req.user.id,
    name,
    dob,
    gender,
    bloodGroup,
    medicalHistory,
  });

  // Generate Vaccination Schedule
  await generateSchedule(child._id, dob);

  res.status(201).json(child);
});

// @desc    Get child details and schedule
// @route   GET /api/children/:id
// @access  Private
const getChild = asyncHandler(async (req, res) => {
  const child = await Child.findById(req.params.id);

  if (!child) {
    res.status(404);
    throw new Error('Child not found');
  }

  // Ensure user owns the child
  if (child.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const schedule = await VaccinationSchedule.find({ child: req.params.id }).sort({ dueDate: 1 });

  res.status(200).json({ ...child._doc, schedule });
});

// @desc    Update child
// @route   PUT /api/children/:id
// @access  Private
const updateChild = asyncHandler(async (req, res) => {
  const child = await Child.findById(req.params.id);

  if (!child) {
    res.status(404);
    throw new Error('Child not found');
  }

  if (child.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedChild = await Child.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedChild);
});

// @desc    Delete child
// @route   DELETE /api/children/:id
// @access  Private
const deleteChild = asyncHandler(async (req, res) => {
  const child = await Child.findById(req.params.id);

  if (!child) {
    res.status(404);
    throw new Error('Child not found');
  }

  if (child.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await child.deleteOne();
  // Also delete schedules
  await VaccinationSchedule.deleteMany({ child: req.params.id });

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getChildren,
  createChild,
  getChild,
  updateChild,
  deleteChild,
};

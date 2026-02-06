const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const SchoolDetails = require('../models/SchoolDetails');
const Child = require('../models/Child');

// @desc    Get all users (parents and schools)
// @route   GET /api/admin/users
// @access  Private (Admin Only)
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ role: { $ne: 'admin' } }).select('-password').sort({ createdAt: -1 });
  // Optionally populating school details if needed, but for listing, basics are fine
  res.status(200).json(users);
});

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private (Admin Only)
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Prevent deleting other admins (optional safeguard)
  if (user.role === 'admin') {
      res.status(400);
      throw new Error('Cannot delete admin users');
  }

  // Cascading delete
  if (user.role === 'school') {
      await SchoolDetails.deleteOne({ user: user._id });
  }
  
  // Delete associated children
  await Child.deleteMany({ user: user._id });

  await user.deleteOne();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getAllUsers,
  deleteUser,
};

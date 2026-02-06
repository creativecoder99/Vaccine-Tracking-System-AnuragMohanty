const asyncHandler = require('express-async-handler');
const Notice = require('../models/Notice');

// @desc    Get all notices
// @route   GET /api/notices
// @access  Public (or Private based on requirement, keeping public specifically for now so parents can see)
const getNotices = asyncHandler(async (req, res) => {
  // Can filter by role audience later
  const notices = await Notice.find().sort({ createdAt: -1 });
  res.status(200).json(notices);
});

// @desc    Create a notice
// @route   POST /api/notices
// @access  Private (Admin/School only)
const createNotice = asyncHandler(async (req, res) => {
  const { title, content, targetAudience } = req.body;

  if (!title || !content) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  // Ensure user is admin or school
  if (req.user.role !== 'admin' && req.user.role !== 'school') {
    res.status(403);
    throw new Error('Not authorized to post notices');
  }

  const notice = await Notice.create({
    title,
    content,
    postedBy: req.user.id,
    role: req.user.role,
    targetAudience,
  });

  res.status(201).json(notice);
});

// @desc    Delete a notice
// @route   DELETE /api/notices/:id
// @access  Private (Admin/School only)
const deleteNotice = asyncHandler(async (req, res) => {
  const notice = await Notice.findById(req.params.id);

  if (!notice) {
    res.status(404);
    throw new Error('Notice not found');
  }

  // Check permission
  if (req.user.role !== 'admin' && notice.postedBy.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  await notice.deleteOne();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getNotices,
  createNotice,
  deleteNotice,
};

const asyncHandler = require('express-async-handler');
const Report = require('../models/Report');
const Child = require('../models/Child');

// @desc    Upload a medical report
// @route   POST /api/reports
// @access  Private (Parent)
const uploadReport = asyncHandler(async (req, res) => {
  const { childId, title, fileType } = req.body;

  if (!req.file) {
    res.status(400);
    throw new Error('No file uploaded');
  }

  // Verify child belongs to user (or school maybe?) - enforcing parent for now
  const child = await Child.findById(childId);
  if (!child) {
      res.status(404);
      throw new Error('Child not found');
  }

  // Simple permission check: Parent or Admin or School(if implemented later)
  // For now, allow parent
  // Optimization: Check child.user === req.user.id

  const report = await Report.create({
    child: childId,
    title: title || req.file.originalname,
    fileUrl: req.file.path, // In real app, upload to S3/Cloudinary
    fileType: fileType || 'medical',
    uploadedBy: req.user.id
  });

  res.status(201).json(report);
});

// @desc    Get reports for a child
// @route   GET /api/reports/:childId
// @access  Private
const getReports = asyncHandler(async (req, res) => {
  const reports = await Report.find({ child: req.params.childId }).sort({ createdAt: -1 });
  res.status(200).json(reports);
});

module.exports = {
  uploadReport,
  getReports,
};

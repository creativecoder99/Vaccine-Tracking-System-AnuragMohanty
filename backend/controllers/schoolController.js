const asyncHandler = require('express-async-handler');
const xlsx = require('xlsx');
const fs = require('fs');
const Child = require('../models/Child');
const { generateSchedule } = require('../utils/vaccineScheduler');

// @desc    Bulk upload students via Excel
// @route   POST /api/schools/upload
// @access  Private (School only)
const uploadStudents = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('No file uploaded');
  }

  if (req.user.role !== 'school') {
    res.status(403);
    throw new Error('Not authorized: Schools only');
  }

  const filePath = req.file.path;
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(sheet);

  const studentsAdded = [];
  const errors = [];

  for (const row of data) {
    // Expected Columns: Name, ParentEmail, DOB, Gender, BloodGroup
    const { Name, ParentEmail, DOB, Gender, BloodGroup } = row;

    if (!Name || !DOB || !Gender) {
        errors.push(`Skipped row: Missing required fields for ${Name || 'Unknown'}`);
        continue;
    }

    try {
        // Create Child linked to the School (User ID of the school)
        const child = await Child.create({
            user: req.user.id, // Linked to School Account
            name: Name,
            dob: new Date(DOB),
            gender: Gender,
            bloodGroup: BloodGroup,
            medicalHistory: 'Imported via Bulk Upload',
        });

        // Generate Schedule
        await generateSchedule(child._id, child.dob);
        studentsAdded.push(child);
    } catch (error) {
        errors.push(`Failed to add ${Name}: ${error.message}`);
    }
  }

  // Cleanup file
  fs.unlinkSync(filePath);

  res.status(201).json({
    message: `Processed ${data.length} records`,
    successCount: studentsAdded.length,
    errors,
    students: studentsAdded,
  });
});

module.exports = {
  uploadStudents,
};

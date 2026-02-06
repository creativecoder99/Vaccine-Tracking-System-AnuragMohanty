const asyncHandler = require('express-async-handler');
const VaccinationSchedule = require('../models/VaccinationSchedule');
const Child = require('../models/Child');

// @desc    Update vaccination status
// @route   PUT /api/vaccines/:id
// @access  Private
const updateVaccineStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const vaccineId = req.params.id;

  const vaccine = await VaccinationSchedule.findById(vaccineId);

  if (!vaccine) {
    res.status(404);
    throw new Error('Vaccine schedule not found');
  }

  // Verify ownership
  const child = await Child.findById(vaccine.child);
  if (child.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  vaccine.status = status;
  if (status === 'Completed') {
    vaccine.completionDate = Date.now();
  } else {
    vaccine.completionDate = undefined;
  }

  const updatedVaccine = await vaccine.save();
  res.status(200).json(updatedVaccine);
});

module.exports = {
  updateVaccineStatus,
};

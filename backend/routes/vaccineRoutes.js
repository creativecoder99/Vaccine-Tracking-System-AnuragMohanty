const express = require('express');
const router = express.Router();
const { updateVaccineStatus } = require('../controllers/vaccineController');
const { protect } = require('../middlewares/authMiddleware');

router.put('/:id', protect, updateVaccineStatus);

module.exports = router;

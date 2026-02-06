const express = require('express');
const router = express.Router();
console.log('Analytics Routes Module Loaded');
const { protect, admin } = require('../middlewares/authMiddleware');
const { getAdminStats, getSchoolStats, getParentStats } = require('../controllers/analyticsController');


router.get('/admin', protect, admin, getAdminStats);
router.get('/school', protect, getSchoolStats); // Add school role check middleware if strictly needed
router.get('/parent', protect, getParentStats);

module.exports = router;

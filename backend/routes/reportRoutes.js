const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadReport, getReports } = require('../controllers/reportController');
const { protect } = require('../middlewares/authMiddleware');

const upload = multer({ dest: 'uploads/reports/' });

router.post('/', protect, upload.single('file'), uploadReport);
router.get('/:childId', protect, getReports);

module.exports = router;

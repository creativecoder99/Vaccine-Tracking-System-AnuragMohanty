const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadStudents } = require('../controllers/schoolController');
const { protect } = require('../middlewares/authMiddleware');

// Configure Multer for temp storage
const upload = multer({ dest: 'uploads/' });

router.post('/upload', protect, upload.single('file'), uploadStudents);

module.exports = router;

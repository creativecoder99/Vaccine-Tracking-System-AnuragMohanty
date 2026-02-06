const express = require('express');
const router = express.Router();
const { getNotices, createNotice, deleteNotice } = require('../controllers/noticeController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/')
  .get(getNotices)
  .post(protect, createNotice);

router.route('/:id')
  .delete(protect, deleteNotice);

module.exports = router;

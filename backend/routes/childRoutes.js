const express = require('express');
const router = express.Router();
const {
  getChildren,
  createChild,
  getChild,
  updateChild,
  deleteChild,
} = require('../controllers/childController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/')
  .get(protect, getChildren)
  .post(protect, createChild);

router.route('/:id')
  .get(protect, getChild)
  .put(protect, updateChild)
  .delete(protect, deleteChild);

module.exports = router;

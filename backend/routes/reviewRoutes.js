const express = require('express');
const router = express.Router();
const { addReview, getReviews } = require('../controllers/reviewController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/').post(protect, addReview).get(getReviews);

module.exports = router;

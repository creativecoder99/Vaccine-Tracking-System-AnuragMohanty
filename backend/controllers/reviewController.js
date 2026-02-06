const asyncHandler = require('express-async-handler');
const Review = require('../models/Review');

// @desc    Add a new review
// @route   POST /api/reviews
// @access  Private (Parent/School)
const addReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;

    const review = await Review.create({
        user: req.user._id,
        userName: req.user.name,
        rating,
        comment
    });

    if (review) {
        res.status(201).json(review);
    } else {
        res.status(400);
        throw new Error('Invalid review data');
    }
});

// @desc    Get all reviews
// @route   GET /api/reviews
// @access  Public
const getReviews = asyncHandler(async (req, res) => {
    // Return latest 10 reviews
    const reviews = await Review.find({}).sort({ createdAt: -1 }).limit(10);
    res.json(reviews);
});

module.exports = {
    addReview,
    getReviews
};

import axios from 'axios';

const API_URL = '/api/reviews/';

// Get all reviews (public)
const getReviews = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Add a review (private user)
const addReview = async (reviewData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(API_URL, reviewData, config);
    return response.data;
};

const reviewService = {
    getReviews,
    addReview,
};

export default reviewService;

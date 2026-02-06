import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import reviewService from '../../services/reviewService';

const AddReview = ({ token, onReviewAdded }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [rating, setRating] = useState(5);

    const onSubmit = async (data) => {
        setIsLoading(true);
        setMessage('');
        try {
            await reviewService.addReview({ ...data, rating }, token);
            setMessage('Thank you! Your review has been submitted.');
            reset();
            setRating(5);
            if (onReviewAdded) onReviewAdded();
        } catch (error) {
            setMessage('Failed to submit review. Please try again.');
        } finally {
            setIsLoading(false);
            setTimeout(() => setMessage(''), 3000);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Rate Your Experience</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                    <div className="flex space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                className={`text-2xl focus:outline-none transition-transform hover:scale-110 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            >
                                ★
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">Your Feedback</label>
                    <textarea
                        id="comment"
                        rows="3"
                        {...register('comment', { required: 'Please write a comment' })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary resize-none"
                        placeholder="How is VacciNotify helping you?"
                    ></textarea>
                    {errors.comment && <p className="text-red-500 text-xs mt-1">{errors.comment.message}</p>}
                </div>

                <div className="flex items-center justify-between">
                    <AnimatePresence>
                        {message && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className={`text-sm ${message.includes('Failed') ? 'text-red-600' : 'text-green-600'}`}
                            >
                                {message}
                            </motion.p>
                        )}
                    </AnimatePresence>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-primary text-white py-2 px-6 rounded-md hover:bg-secondary transition-colors disabled:opacity-50"
                    >
                        {isLoading ? 'Submitting...' : 'Submit Review'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddReview;

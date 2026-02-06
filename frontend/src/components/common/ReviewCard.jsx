import React from 'react';
import { motion } from 'framer-motion';

const ReviewCard = ({ review, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center text-center hover:shadow-2xl transition-all duration-300"
        >
            <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                    <svg
                        key={i}
                        className={`w-5 h-5 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            </div>
            <p className="text-gray-600 italic mb-6">"{review.comment}"</p>
            <div className="mt-auto">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl mx-auto mb-2">
                    {review.userName.charAt(0).toUpperCase()}
                </div>
                <h4 className="font-bold text-gray-900">{review.userName}</h4>
                <p className="text-xs text-gray-500">Verified User</p>
            </div>
        </motion.div>
    );
};

export default ReviewCard;

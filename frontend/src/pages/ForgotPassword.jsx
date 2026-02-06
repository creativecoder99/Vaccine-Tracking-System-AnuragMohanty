import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/common/Footer';
import { motion } from 'framer-motion';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        // Mock API call
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white p-10 rounded-xl shadow-2xl"
                    >
                        <div>
                            <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
                                Reset Password
                            </h2>
                            <p className="mt-2 text-center text-sm text-gray-600">
                                Enter your email and we'll send you a recovery link.
                            </p>
                        </div>

                        {!submitted ? (
                            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="email-address" className="sr-only">Email address</label>
                                    <input
                                        id="email-address"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                        placeholder="Email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                                    >
                                        Send Recovery Link
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-8 text-center"
                            >
                                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                                    <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900">Link Sent!</h3>
                                <p className="text-sm text-gray-500 mt-2">
                                    Check your email inbox for further instructions.
                                </p>
                            </motion.div>
                        )}

                        <div className="mt-6 text-center">
                            <Link to="/login" className="font-medium text-primary hover:text-secondary">
                                &larr; Back to Login
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ForgotPassword;

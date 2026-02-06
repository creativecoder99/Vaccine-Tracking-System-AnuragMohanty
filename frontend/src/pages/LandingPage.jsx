import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/common/Footer';
import BackgroundAnimation from '../components/common/BackgroundAnimation';
import ImageCarousel from '../components/common/ImageCarousel';
import ReviewCard from '../components/common/ReviewCard';
import reviewService from '../services/reviewService';
import heroImage from '../assets/hero.jpg';

const LandingPage = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const data = await reviewService.getReviews();
                setReviews(data);
            } catch (error) {
                console.error("Failed to fetch reviews", error);
            }
        };
        fetchReviews();
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            {/* Hero Section */}
            <section className="flex-grow flex items-center relative overflow-hidden">
                {/* Dynamic Background */}
                <BackgroundAnimation />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="text-center lg:text-left"
                        >
                            <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="inline-block bg-blue-100 text-primary py-1 px-3 rounded-full text-sm font-semibold mb-6 tracking-wide"
                            >
                                #1 VACCINATION TRACKER
                            </motion.span>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                                Protect Your Child's <br className="hidden lg:block" />
                                <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">Future Health</span>
                            </h1>
                            <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                                Never miss a vaccine again. VacciNotify helps you manage multiple children's schedules, receive timely automated reminders, and keep digital health records safe.
                            </p>
                            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <Link to="/register" className="group relative px-8 py-4 bg-primary text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:bg-secondary transition-all transform hover:-translate-y-1 overflow-hidden">
                                    <span className="relative z-10">Get Started Free</span>
                                    <div className="absolute inset-0 h-full w-full bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"></div>
                                </Link>
                                <a href="#features" className="px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-full font-bold text-lg hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm hover:shadow-md">
                                    Browse Features
                                </a>
                            </div>

                            <div className="mt-8 flex justify-center lg:justify-start items-center space-x-4 text-sm text-gray-500">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className={`w-8 h-8 rounded-full border-2 border-white bg-gray-200 bg-[url('https://i.pravatar.cc/100?img=${i + 10}')] bg-cover`}></div>
                                    ))}
                                </div>
                                <span>Trusted by 10,000+ Parents</span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="hidden lg:block relative"
                        >

                            {/* Illustration / Image Placeholder */}
                            <motion.img
                                src={heroImage}
                                alt="Doctor and Child"
                                className="object-cover w-full h-full rounded-3xl"
                                initial={{ scale: 1.1 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 1.5 }}
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8 rounded-b-3xl">
                                <p className="text-white font-medium text-lg">"The best way to keep track of my kids' shots."</p>
                                <p className="text-blue-100 text-sm mt-1">- Sarah J., Mother of 3</p>
                            </div>


                            {/* Floating Elements */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-xl border border-blue-100"
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-800">Vaccine Done!</p>
                                        <p className="text-xs text-gray-500">Just now</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute -bottom-10 -left-6 bg-white p-4 rounded-xl shadow-xl border border-red-50"
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-800">Reminder Set</p>
                                        <p className="text-xs text-gray-500">Polio - Due in 2 days</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Image Carousel */}
                    <div className="mt-20">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">See VacciNotify in Action</h2>
                            <ImageCarousel />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 bg-white relative">
                <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-gray-50 to-white"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-20">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl font-extrabold text-gray-900 sm:text-4xl"
                        >
                            Everything you need to stay on track
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto"
                        >
                            Comprehensive features designed for modern parents and schools.
                        </motion.p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        <FeatureCard
                            title="Multi-Child Management"
                            description="Easily switch between profiles for all your children. Keep individual records organized in one secure place."
                            icon="👨‍👩‍👧‍👦"
                            delay={0.1}
                        />
                        <FeatureCard
                            title="Smart Reminders"
                            description="Receive automated SMS and email alerts before every due vaccine. Never rely on memory alone again."
                            icon="🔔"
                            delay={0.2}
                        />
                        <FeatureCard
                            title="Visual Timelines"
                            description="Interactive charts show exactly where each child is in their immunization journey. Green means go!"
                            icon="📊"
                            delay={0.3}
                        />
                        <FeatureCard
                            title="Secure Cloud Storage"
                            description="Access digital records anytime, anywhere. Perfect for school admissions and travel documents."
                            icon="☁️"
                            delay={0.4}
                        />
                        <FeatureCard
                            title="Auto-Schedule"
                            description="Simply enter the birth date, and we'll generate the complete government-recommended schedule instantly."
                            icon="📅"
                            delay={0.5}
                        />
                        <FeatureCard
                            title="Delivery Tracking"
                            description="See exactly when notifications were sent and whether they were delivered successfully."
                            icon="📨"
                            delay={0.6}
                        />
                    </div>
                </div>
            </section>

            {/* Reviews Section */}
            <section className="py-20 bg-blue-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">What Parents Say</h2>
                        <p className="mt-4 text-xl text-gray-600">Join our community of happy families.</p>
                    </div>
                    {reviews.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {reviews.slice(0, 3).map((review, index) => (
                                <ReviewCard key={review._id} review={review} index={index} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">Be the first to review us!</p>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-primary py-20">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-white mb-6">Ready to simplify your child's healthcare?</h2>
                    <p className="text-blue-100 text-xl mb-10">Join thousands of parents who trust VacciNotify for their peace of mind.</p>
                    <Link to="/register" className="inline-block bg-white text-primary font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all transform hover:-translate-y-1">
                        Create Free Account
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
};

const FeatureCard = ({ title, description, icon, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: delay }}
        whileHover={{ y: -10 }}
        className="p-8 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 group"
    >
        <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">{icon}</div>
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-gray-500 leading-relaxed">{description}</p>
    </motion.div>
);

export default LandingPage;

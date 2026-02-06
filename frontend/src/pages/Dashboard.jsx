import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AuthContext from '../context/AuthContext';
import ChildContext from '../context/ChildContext';
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import NoticeBoard from '../components/dashboard/NoticeBoard';
import AddReview from '../components/common/AddReview';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const { childrenList, getChildren, isLoading } = useContext(ChildContext);
    const [stats, setStats] = useState([]);

    useEffect(() => {
        getChildren();
        const fetchStats = async () => {
            try {
                const userStr = localStorage.getItem('user');
                if (!userStr) {
                    console.log("User not found in localStorage, cannot fetch parent stats.");
                    return;
                }
                const token = JSON.parse(userStr).token;
                console.log("Fetching Parent Stats...");

                const res = await axios.get('/api/analytics/parent', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log("Parent Stats Received:", res.data);
                setStats(res.data);
            } catch (err) {
                console.error("Failed to fetch parent analytics", err);
            }
        }
        if (childrenList.length > 0) {
            fetchStats();
        }
    }, [childrenList.length]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <header className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Parent Dashboard</h1>
                        <p className="mt-2 text-gray-600">Welcome back, {user?.name}!</p>
                    </div>
                    {childrenList.length > 0 && (
                        <Link to="/add-child" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary shadow-sm transition-colors">
                            + Add Child
                        </Link>
                    )}
                </header>

                {isLoading ? (
                    <div className="text-center py-20">
                        <p className="text-gray-500">Loading your family details...</p>
                    </div>
                ) : childrenList.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-200"
                    >
                        <div className="mx-auto h-24 w-24 text-gray-300 mb-4">
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h3 className="mt-2 text-lg font-medium text-gray-900">No children added yet</h3>
                        <p className="mt-1 text-gray-500">Get started by adding your child's profile.</p>
                        <div className="mt-6">
                            <Link to="/add-child" className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary">
                                <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                                Add Child
                            </Link>
                        </div>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {childrenList.map(child => {
                            const childStats = stats.find(s => s.name === child.name) || { percentage: 0, completed: 0, total: 0 };
                            return (
                                <motion.div
                                    key={child._id}
                                    whileHover={{ y: -5 }}
                                    className="bg-white overflow-hidden shadow rounded-lg border border-gray-100 flex flex-col justify-between"
                                >
                                    <div className="px-4 py-5 sm:p-6">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 bg-blue-100 rounded-full h-12 w-12 flex items-center justify-center text-primary font-bold text-xl">
                                                {child.name.charAt(0)}
                                            </div>
                                            <div className="ml-4">
                                                <h3 className="text-lg font-medium text-gray-900">{child.name}</h3>
                                                <p className="text-sm text-gray-500">{new Date(child.dob).toLocaleDateString()} • {child.gender}</p>
                                            </div>
                                        </div>

                                        {/* Progress Section */}
                                        <div className="mt-6">
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-gray-500">Vaccination Progress</span>
                                                <span className="font-medium text-primary">{childStats.percentage}%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                <div
                                                    className="bg-primary h-2.5 rounded-full transition-all duration-500"
                                                    style={{ width: `${childStats.percentage}%` }}
                                                ></div>
                                            </div>
                                            <p className="mt-2 text-xs text-gray-400">{childStats.completed} of {childStats.total} doses completed</p>
                                        </div>

                                        <div className="mt-4">
                                            <Link to={`/child/${child._id}`} className="text-primary hover:text-secondary font-medium text-sm flex items-center">
                                                View Vaccination Schedule &rarr;
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Mini Chart Decoration (Optional) */}
                                    <div className="h-1 bg-gradient-to-r from-blue-400 to-green-400"></div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}

                {/* Notices Section */}
                <div className="mt-10">
                    <NoticeBoard userRole="user" />
                </div>

                {/* Review Section */}
                <div className="mt-10">
                    <AddReview token={user?.token} />
                </div>
            </main>
        </div>
    );
};
export default Dashboard;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/navbar/Navbar';
import axios from 'axios';
import NoticeBoard from '../components/dashboard/NoticeBoard';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const SchoolDashboard = () => {
    const [file, setFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const [stats, setStats] = useState(null);
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const userStr = localStorage.getItem('user');
                if (!userStr) return;
                const token = JSON.parse(userStr).token;
                console.log("Fetching School Stats...");

                const res = await axios.get('/api/analytics/school', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log("School Stats Received:", res.data);
                setStats(res.data);
            } catch (err) {
                console.error("Failed to fetch school analytics", err);
            }
        };
        fetchStats();
    }, [successMsg]); // Refresh when upload is successful

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert('Please select a file first!');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            setUploadStatus('Uploading...');
            const token = JSON.parse(localStorage.getItem('user')).token;

            const res = await axios.post('/api/schools/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });

            setUploadStatus(`Success! Processed ${res.data.successCount} students.`);
            // Refresh stats after upload
            // window.location.reload(); // Simple refresh for now
        } catch (err) {
            console.error(err);
            setUploadStatus('Upload failed. check console.');
        }
    };

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-3xl font-bold text-gray-900">School Dashboard</h1>
                    <p className="mt-2 text-gray-600">Manage students and vaccination drives.</p>
                </motion.div>

                {/* Stats Overview */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow border-l-4 border-indigo-500">
                        <h3 className="text-lg font-medium text-gray-900">Total Students</h3>
                        <p className="text-3xl font-bold text-indigo-600 mt-2">{stats?.totalStudents || 0}</p>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-bold mb-4 text-gray-800">Gender Distribution</h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={stats?.genderDistribution || []}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        <Cell fill="#3B82F6" />
                                        <Cell fill="#EC4899" />
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-bold mb-4 text-gray-800">Vaccination Coverage</h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={stats?.vaccinationCoverage || []} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis type="number" />
                                    <YAxis dataKey="name" type="category" width={120} />
                                    <Tooltip />
                                    <Bar dataKey="value" fill="#10B981" radius={[0, 4, 4, 0]} >
                                        {stats?.vaccinationCoverage?.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Bulk Upload Section */}
                <div className="mt-8 bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Bulk Upload Students</h2>
                    <p className="mb-4 text-sm text-gray-500">Upload an Excel file (.xlsx) with columns: Name, ParentEmail, DOB, Gender, BloodGroup</p>

                    <div className="flex gap-4 items-center">
                        <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} className="border p-2 rounded" />
                        <button
                            onClick={handleUpload}
                            className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition"
                        >
                            Upload Excel
                        </button>
                    </div>
                    {uploadStatus && <p className="mt-4 text-sm font-medium text-blue-600">{uploadStatus}</p>}
                </div>

                {/* Broadcast Notification */}
                <div className="mt-8 bg-purple-50 p-6 rounded-lg shadow border border-purple-100">
                    <h2 className="text-xl font-semibold mb-4 text-purple-800">📡 Broadcast Notification</h2>
                    <p className="mb-4 text-sm text-purple-600">Send Event/Drive updates to all parents via Email/SMS.</p>
                    <textarea
                        className="w-full border p-2 rounded mb-2"
                        placeholder="Message content (e.g. Polio Drive tomorrow...)"
                    ></textarea>
                    <button
                        onClick={() => alert('Broadcast simulation: Sending Emails and SMS to 150 parents... Success!')}
                        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
                    >
                        Send Alert
                    </button>
                </div>

                {/* Notices */}
                <NoticeBoard userRole="school" />
            </div>
        </div>
    );
};

export default SchoolDashboard;

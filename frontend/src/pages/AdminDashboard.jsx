import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Navbar from '../components/navbar/Navbar';
import NoticeBoard from '../components/dashboard/NoticeBoard';
import axios from 'axios';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const userStr = localStorage.getItem('user');
                if (!userStr) {
                    console.error("No user found in localStorage");
                    return;
                }
                const token = JSON.parse(userStr).token;
                console.log("Fetching Admin Stats from /api/analytics/admin...");

                const res = await axios.get('/api/analytics/admin', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log("Admin Stats Received:", res.data);
                setStats(res.data);
            } catch (err) {
                console.error("Failed to fetch admin analytics", err);
                // Optional: alert("Error loading analytics: " + (err.response?.data?.message || err.message));
            }
        };
        fetchStats();
    }, []);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-3xl font-bold text-gray-900">System Administrator</h1>
                    <p className="mt-2 text-gray-600">Overview of schools and vaccination statistics.</p>
                </motion.div>

                {/* KPI Cards */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
                        <h3 className="text-lg font-medium text-gray-900">Total Users</h3>
                        <p className="text-3xl font-bold text-blue-600 mt-2">{stats?.totalUsers || 0}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-500">
                        <h3 className="text-lg font-medium text-gray-900">Total Schools</h3>
                        <p className="text-3xl font-bold text-purple-600 mt-2">{stats?.totalSchools || 0}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
                        <h3 className="text-lg font-medium text-gray-900">Total Children</h3>
                        <p className="text-3xl font-bold text-green-600 mt-2">{stats?.totalChildren || 0}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow border-l-4 border-yellow-500">
                        <h3 className="text-lg font-medium text-gray-900">Vaccines Done</h3>
                        <p className="text-3xl font-bold text-yellow-600 mt-2">{stats?.vaccinationsAdministered || 0}</p>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* User Growth Chart */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-bold mb-4 text-gray-800">User Growth (Last 6 Months)</h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={stats?.userGrowth || []}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="users" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Vaccination Status Pie Chart */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-bold mb-4 text-gray-800">Vaccination Status Distribution</h3>
                        <div className="h-64 flex justify-center">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={[
                                            { name: 'Administered', value: stats?.vaccinationsAdministered || 0 },
                                            { name: 'Pending', value: stats?.vaccinationsPending || 0 }
                                        ]}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        <Cell key="cell-0" fill="#10B981" />
                                        <Cell key="cell-1" fill="#F59E0B" />
                                    </Pie>
                                    <Tooltip />
                                    <Legend verticalAlign="bottom" height={36} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* User Management Section */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">User Management</h2>
                        <UserList />
                    </div>

                    {/* Notices Section */}
                    <div>
                        <NoticeBoard userRole="admin" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const token = JSON.parse(localStorage.getItem('user')).token;
            // Native fetch for simplicity or axios
            const res = await fetch('/api/admin/users', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            setUsers(data);
        } catch (err) {
            console.error("Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;
        try {
            const token = JSON.parse(localStorage.getItem('user')).token;
            await fetch(`/api/admin/users/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(users.filter(u => u._id !== id));
        } catch (err) {
            alert("Failed to delete user");
        }
    }

    if (loading) return <p>Loading users...</p>;

    return (
        <div className="overflow-y-auto max-h-96">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {users.map(user => (
                        <tr key={user._id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'school' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>
                                    {user.role}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button onClick={() => handleDelete(user._id)} className="text-red-600 hover:text-red-900">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;

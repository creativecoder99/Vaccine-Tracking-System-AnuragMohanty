import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AuthContext from '../context/AuthContext';
import ChildContext from '../context/ChildContext';
import vaccineService from '../services/vaccineService';
import Navbar from '../components/navbar/Navbar';
import axios from 'axios';

const ChildProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { deleteChild, updateChild } = useContext(ChildContext);
    const [child, setChild] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Edit State
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editFormData, setEditFormData] = useState({
        name: '',
        dob: '',
        gender: '',
        bloodGroup: '',
        medicalHistory: ''
    });

    useEffect(() => {
        const fetchChild = async () => {
            try {
                const data = await vaccineService.getChildDetails(id, user.token);
                setChild(data);
                // Pre-fill form
                setEditFormData({
                    name: data.name,
                    dob: data.dob.split('T')[0],
                    gender: data.gender,
                    bloodGroup: data.bloodGroup || '',
                    medicalHistory: data.medicalHistory || ''
                });
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch child details');
            } finally {
                setIsLoading(false);
            }
        };

        if (user && id) {
            fetchChild();
        }
    }, [id, user]);

    const handleStatusUpdate = async (vaccineId, newStatus) => {
        try {
            const updatedVaccine = await vaccineService.updateVaccineStatus(vaccineId, newStatus, user.token);
            setChild(prev => ({
                ...prev,
                schedule: prev.schedule.map(v => v._id === vaccineId ? updatedVaccine : v)
            }));
        } catch (err) {
            alert('Failed to update status');
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this profile? This cannot be undone and all vaccination records will be lost.")) {
            const success = await deleteChild(id);
            if (success) {
                navigate('/dashboard');
            }
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const success = await updateChild(id, editFormData);
        if (success) {
            setIsEditModalOpen(false);
            // Optimistically update or refetch. 
            // Since updateChild updates the list in context, but we are viewing local state here, we update local state too.
            setChild(prev => ({ ...prev, ...editFormData }));
            alert("Profile updated successfully!");
        }
    };

    if (isLoading) return <div className="text-center py-20">Loading...</div>;
    if (error) return <div className="text-center py-20 text-red-600">{error}</div>;
    if (!child) return <div className="text-center py-20">Child not found</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="mb-8">
                    <Link to="/dashboard" className="text-primary hover:underline flex items-center mb-4">
                        &larr; Back to Dashboard
                    </Link>

                    {/* Reports Section */}
                    <div className="bg-white p-6 rounded-lg shadow mb-8">
                        <h2 className="text-xl font-bold mb-4">Medical Reports</h2>

                        <div className="mb-6 bg-gray-50 p-4 rounded border">
                            <h3 className="text-sm font-semibold mb-2">Upload New Report</h3>
                            <div className="flex gap-4 items-end">
                                <div>
                                    <label className="block text-xs text-gray-500">Document Title</label>
                                    <input
                                        type="text"
                                        id="reportTitle"
                                        className="border p-2 rounded text-sm"
                                        placeholder="e.g. Lab Results"
                                    />
                                </div>
                                <div>
                                    <input type="file" id="reportFile" className="border p-2 rounded text-sm w-60" />
                                </div>
                                <button
                                    onClick={async () => {
                                        const title = document.getElementById('reportTitle').value;
                                        const file = document.getElementById('reportFile').files[0];
                                        if (!file) return alert('Select file');

                                        const formData = new FormData();
                                        formData.append('file', file);
                                        formData.append('title', title);
                                        formData.append('childId', id);

                                        try {
                                            const token = JSON.parse(localStorage.getItem('user')).token;
                                            await axios.post('/api/reports', formData, {
                                                headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` }
                                            });
                                            alert('Uploaded!');
                                            // window.location.reload(); 
                                        } catch (e) { alert('Upload failed'); }
                                    }}
                                    className="bg-secondary text-white px-4 py-2 rounded text-sm hover:bg-green-600"
                                >
                                    Upload
                                </button>
                            </div>
                        </div>
                        <p className="text-gray-500 text-sm italic">
                            (Uploaded reports will appear here)
                        </p>
                    </div>

                    <div className="bg-white shadow rounded-lg p-6 relative">
                        {/* Edit/Delete Controls */}
                        <div className="absolute top-6 right-6 flex space-x-4">
                            <button
                                onClick={() => setIsEditModalOpen(true)}
                                className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
                            >
                                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                Edit
                            </button>
                            <button
                                onClick={handleDelete}
                                className="text-red-600 hover:text-red-800 font-medium text-sm flex items-center"
                            >
                                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                Delete
                            </button>
                        </div>

                        <div className="flex items-center">
                            <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl font-bold text-primary">
                                {child.name.charAt(0)}
                            </div>
                            <div className="ml-6">
                                <h1 className="text-3xl font-bold text-gray-900">{child.name}</h1>
                                <p className="text-sm text-gray-500">
                                    DOB: {new Date(child.dob).toLocaleDateString()} • {child.gender} • Blood Group: {child.bloodGroup || 'N/A'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-6">Vaccination Schedule</h2>

                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                        {child.schedule.map((vaccine) => (
                            <li key={vaccine._id} className="p-4 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-medium text-gray-900">{vaccine.vaccineName}</h3>
                                        <p className="text-sm text-gray-500">{vaccine.description}</p>
                                        <p className={`mt-1 text-sm font-semibold  ${vaccine.status === 'Completed' ? 'text-green-600' :
                                            (new Date(vaccine.dueDate) < new Date() && vaccine.status !== 'Completed') ? 'text-red-600' : 'text-blue-600'
                                            }`}>
                                            Due: {new Date(vaccine.dueDate).toLocaleDateString()} • Status: {vaccine.status}
                                        </p>
                                    </div>
                                    <div className="ml-4 flex-shrink-0">
                                        {vaccine.status !== 'Completed' ? (
                                            <button
                                                onClick={() => handleStatusUpdate(vaccine._id, 'Completed')}
                                                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
                                            >
                                                Mark as Done
                                            </button>
                                        ) : (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                Completed on {new Date(vaccine.completionDate).toLocaleDateString()}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>

            {/* Edit Child Modal */}
            <AnimatePresence>
                {isEditModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6"
                        >
                            <h2 className="text-xl font-bold mb-6 text-gray-900">Edit Child Profile</h2>
                            <form onSubmit={handleEditSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
                                        value={editFormData.name}
                                        onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                                    <input
                                        type="date"
                                        required
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
                                        value={editFormData.dob}
                                        onChange={(e) => setEditFormData({ ...editFormData, dob: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Gender</label>
                                    <select
                                        required
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
                                        value={editFormData.gender}
                                        onChange={(e) => setEditFormData({ ...editFormData, gender: e.target.value })}
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Blood Group</label>
                                        <select
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
                                            value={editFormData.bloodGroup}
                                            onChange={(e) => setEditFormData({ ...editFormData, bloodGroup: e.target.value })}
                                        >
                                            <option value="">Unknown</option>
                                            <option value="A+">A+</option>
                                            <option value="A-">A-</option>
                                            <option value="B+">B+</option>
                                            <option value="B-">B-</option>
                                            <option value="AB+">AB+</option>
                                            <option value="AB-">AB-</option>
                                            <option value="O+">O+</option>
                                            <option value="O-">O-</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Medical History / Allergies</label>
                                    <textarea
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
                                        rows="3"
                                        placeholder="Any known allergies or conditions..."
                                        value={editFormData.medicalHistory}
                                        onChange={(e) => setEditFormData({ ...editFormData, medicalHistory: e.target.value })}
                                    ></textarea>
                                </div>

                                <div className="mt-8 flex justify-end space-x-3 pt-4 border-t">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditModalOpen(false)}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-secondary rounded-md shadow-sm"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ChildProfile;

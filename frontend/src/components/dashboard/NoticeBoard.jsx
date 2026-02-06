import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const NoticeBoard = ({ userRole }) => {
    const [notices, setNotices] = useState([]);
    const [newNotice, setNewNotice] = useState({ title: '', content: '' });
    const [isPosting, setIsPosting] = useState(false);

    useEffect(() => {
        fetchNotices();
    }, []);

    const fetchNotices = async () => {
        try {
            const res = await axios.get('/api/notices');
            setNotices(res.data);
        } catch (err) {
            console.error("Failed to fetch notices");
        }
    };

    const handlePostNotice = async (e) => {
        e.preventDefault();
        const token = JSON.parse(localStorage.getItem('user')).token;
        try {
            setIsPosting(true);
            await axios.post('/api/notices', newNotice, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNewNotice({ title: '', content: '' });
            fetchNotices(); // Refresh
        } catch (err) {
            alert('Failed to post notice');
        } finally {
            setIsPosting(false);
        }
    };

    const handleDeleteNotice = async (id) => {
        if (!window.confirm("Delete this notice?")) return;
        const token = JSON.parse(localStorage.getItem('user')).token;
        try {
            await axios.delete(`/api/notices/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchNotices(); // Refresh
        } catch (err) {
            alert('Failed to delete notice');
        }
    };

    const user = JSON.parse(localStorage.getItem('user'));
    const canPost = userRole === 'admin' || userRole === 'school';

    return (
        <div className="bg-white p-6 rounded-lg shadow mt-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">📢 Notice Board</h2>

            {canPost && (
                <div className="mb-6 bg-blue-50 p-4 rounded-md border border-blue-100">
                    <h3 className="text-sm font-semibold text-blue-800 mb-2">Post New Announcement</h3>
                    <form onSubmit={handlePostNotice} className="space-y-3">
                        <input
                            type="text"
                            placeholder="Title"
                            className="w-full border p-2 rounded"
                            value={newNotice.title}
                            onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                            required
                        />
                        <textarea
                            placeholder="Message"
                            className="w-full border p-2 rounded"
                            rows="2"
                            value={newNotice.content}
                            onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
                            required
                        />
                        <button
                            type="submit"
                            disabled={isPosting}
                            className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 disabled:opacity-50"
                        >
                            {isPosting ? 'Posting...' : 'Post Notice'}
                        </button>
                    </form>
                </div>
            )}

            <div className="space-y-4 max-h-96 overflow-y-auto">
                {notices.length === 0 ? (
                    <p className="text-gray-500 text-sm">No notices yet.</p>
                ) : (
                    notices.map((notice) => (
                        <motion.div
                            key={notice._id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="border-l-4 border-secondary bg-gray-50 p-4 rounded relative group"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-gray-900">{notice.title}</h3>
                                    <p className="text-gray-600 mt-1 text-sm">{notice.content}</p>
                                </div>
                                {/* Delete Button for Notice Creator (or Admin) */}
                                {(user?.role === 'admin' || notice.postedBy === user._id) && (
                                    <button
                                        onClick={() => handleDeleteNotice(notice._id)}
                                        className="text-gray-400 hover:text-red-600 p-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                                        title="Delete Notice"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                    </button>
                                )}
                            </div>
                            <div className="mt-2 flex justify-between items-center">
                                <span className="text-xs text-gray-400">
                                    {new Date(notice.createdAt).toLocaleDateString()}
                                </span>
                                <span className={`text-xs px-2 py-1 rounded text-white ${notice.role === 'admin' ? 'bg-red-400' : 'bg-green-400'}`}>
                                    {notice.role.toUpperCase()}
                                </span>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
};

export default NoticeBoard;

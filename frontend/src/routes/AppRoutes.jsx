import React, { useContext } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

import LandingPage from '../pages/LandingPage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import SchoolDashboard from '../pages/SchoolDashboard';
import AdminDashboard from '../pages/AdminDashboard';
import AddChild from '../pages/AddChild';
import ChildProfile from '../pages/ChildProfile';
import AuthContext from '../context/AuthContext';

const PrivateRoutes = () => {
    const { user } = useContext(AuthContext);
    return user ? <Outlet /> : <Navigate to="/login" />;
}

import ForgotPassword from '../pages/ForgotPassword';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route element={<PrivateRoutes />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/school-dashboard" element={<SchoolDashboard />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/add-child" element={<AddChild />} />
                <Route path="/child/:id" element={<ChildProfile />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRoutes;

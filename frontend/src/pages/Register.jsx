import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { motion } from 'framer-motion';
import BackgroundAnimation from '../components/common/BackgroundAnimation';

const Register = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { register: registerUser, isError, isSuccess, isLoading, message, user, setIsError } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            if (user.role === 'school') {
                navigate('/school-dashboard');
            } else if (user.role === 'admin') {
                navigate('/admin-dashboard');
            } else {
                navigate('/dashboard');
            }
        }
        // Clear error on mount
        setIsError(false);
    }, [user, navigate, setIsError]);

    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

    const role = watch("role", "user"); // Watch role to toggle fields

    const onSubmit = (data) => {
        // Exclude confirmPassword from submission
        const { confirmPassword, ...userData } = data;

        // Structure for backend
        if (userData.role === 'school') {
            userData.schoolDetails = {
                schoolName: userData.schoolName,
                address: userData.schoolAddress,
                registrationNumber: userData.registrationNumber,
                contactNumber: userData.contactNumber
            };
            // Cleanup flat fields
            delete userData.schoolName;
            delete userData.schoolAddress;
            delete userData.registrationNumber;
            delete userData.contactNumber;
        }

        registerUser(userData);
    };

    const password = watch("password");

    return (
        <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Dynamic Background */}
            <BackgroundAnimation />

            <div className="sm:mx-auto sm:w-full sm:max-w-md z-10">
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                >
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">Join VacciNotify today</p>
                </motion.div>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 border-t-4 border-primary"
                >
                    {isError && (
                        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                            <div className="flex">
                                <div className="ml-3">
                                    <p className="text-sm text-red-700">{message}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Account Type</label>
                            <select
                                id="role"
                                {...register('role')}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md transition-shadow focus:shadow-md"
                            >
                                <option value="user">Parent / User</option>
                                <option value="school">School Administrator</option>
                                <option value="admin">Platform Administrator</option>
                            </select>
                            <p className="mt-1 text-xs text-gray-500">Select "School Administrator" to register a school.</p>
                        </div>

                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name {role === 'school' && '(Principal/Admin Name)'}</label>
                            <div className="mt-1">
                                <input
                                    id="name"
                                    type="text"
                                    {...register('name', { required: 'Name is required' })}
                                    className={`appearance-none block w-full px-3 py-2 border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm transition-shadow focus:shadow-md`}
                                />
                                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                            </div>
                        </div>

                        {role === 'school' && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="space-y-4 border-l-2 border-primary pl-4"
                            >
                                <div>
                                    <label htmlFor="schoolName" className="block text-sm font-medium text-gray-700">School Name</label>
                                    <input
                                        id="schoolName"
                                        type="text"
                                        {...register('schoolName', {
                                            required: role === 'school' ? 'School Name is required' : false,
                                            minLength: { value: 3, message: 'Must be at least 3 characters' }
                                        })}
                                        className={`mt-1 appearance-none block w-full px-3 py-2 border ${errors.schoolName ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
                                    />
                                    {errors.schoolName && <p className="mt-1 text-sm text-red-600">{errors.schoolName.message}</p>}
                                </div>
                                <div>
                                    <label htmlFor="registrationNumber" className="block text-sm font-medium text-gray-700">Registration Number</label>
                                    <input
                                        id="registrationNumber"
                                        type="text"
                                        {...register('registrationNumber', {
                                            required: role === 'school' ? 'Registration Number is required' : false
                                        })}
                                        className={`mt-1 appearance-none block w-full px-3 py-2 border ${errors.registrationNumber ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
                                    />
                                    {errors.registrationNumber && <p className="mt-1 text-sm text-red-600">{errors.registrationNumber.message}</p>}
                                </div>
                                <div>
                                    <label htmlFor="schoolAddress" className="block text-sm font-medium text-gray-700">Address</label>
                                    <input
                                        id="schoolAddress"
                                        type="text"
                                        {...register('schoolAddress', {
                                            required: role === 'school' ? 'Address is required' : false
                                        })}
                                        className={`mt-1 appearance-none block w-full px-3 py-2 border ${errors.schoolAddress ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
                                    />
                                    {errors.schoolAddress && <p className="mt-1 text-sm text-red-600">{errors.schoolAddress.message}</p>}
                                </div>
                                <div>
                                    <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">Contact Number</label>
                                    <input
                                        id="contactNumber"
                                        type="text"
                                        {...register('contactNumber', {
                                            required: role === 'school' ? 'Contact Number is required' : false,
                                            pattern: { value: /^[0-9]{10}$/, message: 'Must be a valid 10-digit number' }
                                        })}
                                        className={`mt-1 appearance-none block w-full px-3 py-2 border ${errors.contactNumber ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
                                    />
                                    {errors.contactNumber && <p className="mt-1 text-sm text-red-600">{errors.contactNumber.message}</p>}
                                </div>
                            </motion.div>
                        )}

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    type="email"
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address"
                                        }
                                    })}
                                    className={`appearance-none block w-full px-3 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
                                />
                                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <div className="mt-1 relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    {...register('password', {
                                        required: 'Password is required',
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters"
                                        }
                                    })}
                                    className={`appearance-none block w-full px-3 py-2 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm pr-10`}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    )}
                                </button>
                                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <div className="mt-1 relative">
                                <input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    {...register('confirmPassword', {
                                        required: 'Please confirm password',
                                        validate: value => value === password || "The passwords do not match"
                                    })}
                                    className={`appearance-none block w-full px-3 py-2 border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm pr-10`}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    )}
                                </button>
                                {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 transition-all transform hover:scale-[1.02]"
                            >
                                {isLoading ? 'Creating account...' : 'Register'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or</span>
                            </div>
                        </div>
                        <div className="mt-6 text-center">
                            <Link to="/login" className="font-medium text-primary hover:text-secondary">
                                Sign in to existing account
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};


export default Register;

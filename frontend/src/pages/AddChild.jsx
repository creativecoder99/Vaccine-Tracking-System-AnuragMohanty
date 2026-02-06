import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ChildContext from '../context/ChildContext';
import { motion } from 'framer-motion';
import Navbar from '../components/navbar/Navbar';

const AddChild = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createChild, isLoading, isError, message } = useContext(ChildContext);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const success = await createChild(data);
        if (success) {
            navigate('/dashboard');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 bg-opacity-50">
            <Navbar />
            <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Add Child Profile</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Enter details to generate vaccination schedule
                    </p>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10"
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
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Child's Name</label>
                                <div className="mt-1">
                                    <input
                                        id="name"
                                        type="text"
                                        {...register('name', { required: 'Name is required' })}
                                        className={`appearance-none block w-full px-3 py-2 border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
                                    />
                                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                                <div className="mt-1">
                                    <input
                                        id="dob"
                                        type="date"
                                        {...register('dob', { required: 'Date of Birth is required' })}
                                        className={`appearance-none block w-full px-3 py-2 border ${errors.dob ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
                                    />
                                    {errors.dob && <p className="mt-1 text-sm text-red-600">{errors.dob.message}</p>}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                                <div className="mt-1">
                                    <select
                                        id="gender"
                                        {...register('gender', { required: 'Gender is required' })}
                                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700">Blood Group (Optional)</label>
                                <div className="mt-1">
                                    <select
                                        id="bloodGroup"
                                        {...register('bloodGroup')}
                                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                                    >
                                        <option value="">Select Blood Group</option>
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
                                <label htmlFor="medicalHistory" className="block text-sm font-medium text-gray-700">Medical History (Optional)</label>
                                <div className="mt-1">
                                    <textarea
                                        id="medicalHistory"
                                        rows={3}
                                        {...register('medicalHistory')}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
                                >
                                    {isLoading ? 'Adding Child...' : 'Add Child'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default AddChild;

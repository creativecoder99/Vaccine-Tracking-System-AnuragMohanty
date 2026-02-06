import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="bg-surface shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <span className="text-2xl font-bold text-primary">VacciNotify</span>
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-textSecondary hover:text-primary transition-colors">Home</Link>

                        {user ? (
                            <>
                                <Link to="/dashboard" className="text-textSecondary hover:text-primary transition-colors">Dashboard</Link>
                                <span className="text-textSecondary font-medium">Hello, {user.name}</span>
                                <button
                                    onClick={handleLogout}
                                    className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition-colors shadow-sm"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <a href="#features" className="text-textSecondary hover:text-primary transition-colors">Features</a>
                                <Link to="/login" className="text-primary font-medium hover:text-secondary transition-colors">Login</Link>
                                <Link to="/register" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition-colors shadow-sm">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-textSecondary hover:text-primary focus:outline-none"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden bg-surface border-t border-gray-100">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-textSecondary hover:text-primary hover:bg-gray-50">Home</Link>
                        {user ? (
                            <>
                                <Link to="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-textSecondary hover:text-primary hover:bg-gray-50">Dashboard</Link>
                                <button onClick={handleLogout} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-primary hover:text-secondary hover:bg-gray-50">Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:text-secondary hover:bg-gray-50">Login</Link>
                                <Link to="/register" className="block w-full text-center mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary shadow-sm">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

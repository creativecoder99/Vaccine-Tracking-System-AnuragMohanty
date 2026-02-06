import { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const register = async (userData) => {
        setIsLoading(true);
        setIsError(false);
        try {
            const data = await authService.register(userData);
            setUser(data);
            setIsSuccess(true);
        } catch (error) {
            setIsError(true);
            setMessage(error.response?.data?.message || 'Registration failed');
            setIsSuccess(false);
        }
        setIsLoading(false);
    };

    const login = async (userData) => {
        setIsLoading(true);
        setIsError(false);
        try {
            const data = await authService.login(userData);
            setUser(data);
            setIsSuccess(true);
        } catch (error) {
            setIsError(true);
            setMessage(error.response?.data?.message || 'Login failed');
            setIsSuccess(false);
        }
        setIsLoading(false);
    };

    const logout = () => {
        authService.logout();
        setUser(null);
        setIsSuccess(false);
        setIsError(false);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isError,
                isSuccess,
                isLoading,
                message,
                register,
                login,
                logout,
                setIsError, // Expose setter to clear errors
                setMessage
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

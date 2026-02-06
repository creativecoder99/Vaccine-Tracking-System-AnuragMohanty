import { createContext, useState, useEffect, useContext } from 'react';
import childService from '../services/childService';
import AuthContext from './AuthContext';

const ChildContext = createContext();

export const ChildProvider = ({ children }) => {
    const [childrenList, setChildrenList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');

    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (isError) {
            const timer = setTimeout(() => {
                setIsError(false);
                setMessage('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isError]);

    const getChildren = async () => {
        setIsLoading(true);
        try {
            const token = user.token;
            const data = await childService.getChildren(token);
            setChildrenList(data);
        } catch (error) {
            const message = error.response?.data?.message || error.message || error.toString();
            setIsError(true);
            setMessage(message);
        }
        setIsLoading(false);
    };

    const createChild = async (childData) => {
        setIsLoading(true);
        try {
            const token = user.token;
            const data = await childService.createChild(childData, token);
            setChildrenList([...childrenList, data]);
            return true; // Success
        } catch (error) {
            const message = error.response?.data?.message || error.message || error.toString();
            setIsError(true);
            setMessage(message);
            return false; // Failed
        } finally {
            setIsLoading(false);
        }
    };

    const updateChild = async (id, childData) => {
        setIsLoading(true);
        try {
            const token = user.token;
            await childService.updateChild(id, childData, token);
            // Update local list if needed, or re-fetch
            const updatedList = childrenList.map(c => c._id === id ? { ...c, ...childData } : c);
            setChildrenList(updatedList);
            return true;
        } catch (error) {
            const message = error.response?.data?.message || error.message || error.toString();
            setIsError(true);
            setMessage(message);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const deleteChild = async (id) => {
        try {
            const token = user.token;
            await childService.deleteChild(id, token);
            setChildrenList(childrenList.filter((child) => child._id !== id));
            return true;
        } catch (error) {
            const message = error.response?.data?.message || error.message || error.toString();
            setIsError(true);
            setMessage(message);
            return false;
        }
    };

    return (
        <ChildContext.Provider
            value={{
                childrenList,
                isLoading,
                isError,
                message,
                getChildren,
                createChild,
                updateChild,
                deleteChild,
            }}
        >
            {children}
        </ChildContext.Provider>
    );
};

export default ChildContext;

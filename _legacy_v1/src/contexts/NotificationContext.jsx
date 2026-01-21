import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ToastContainer } from '../components/Common/Toast';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'info') => {
        const id = Date.now() + Math.random();
        setToasts(prev => [...prev, { id, message, type }]);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    // SIMULATION: Random "Ralph Wiggum" style alerts to keep user engaged
    useEffect(() => {
        const messages = [
            { msg: "New Rescue Deal: 50% off Sushi at Zen!", type: 'success' },
            { msg: "Order Rescue: A Burger nearby was just cancelled.", type: 'info' },
            { msg: "Hurry! 2 deals are about to expire.", type: 'alert' },
            { msg: "Impact Update: You're close to 'Waste Warrior' badge!", type: 'success' }
        ];

        // Trigger a mock notification every 30-60 seconds for demo purposes
        const interval = setInterval(() => {
            if (Math.random() > 0.7) { // 30% chance every tick
                const randomMsg = messages[Math.floor(Math.random() * messages.length)];
                addToast(randomMsg.msg, randomMsg.type);
            }
        }, 15000); // Check every 15s

        return () => clearInterval(interval);
    }, [addToast]);

    return (
        <NotificationContext.Provider value={{ addToast, removeToast }}>
            {children}
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </NotificationContext.Provider>
    );
};

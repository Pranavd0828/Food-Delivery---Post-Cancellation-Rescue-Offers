import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, CheckCircle, AlertCircle } from 'lucide-react';
import './Toast.css';

const icons = {
    info: Bell,
    success: CheckCircle,
    alert: AlertCircle
};

export const Toast = ({ id, message, type = 'info', onClose }) => {
    const Icon = icons[type];

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(id);
        }, 5000); // Auto dismiss
        return () => clearTimeout(timer);
    }, [id, onClose]);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={`toast toast--${type}`}
        >
            <div className="toast__icon">
                <Icon size={20} />
            </div>
            <div className="toast__content">
                <p>{message}</p>
            </div>
            <button className="toast__close" onClick={() => onClose(id)}>
                <X size={16} />
            </button>
        </motion.div>
    );
};

export const ToastContainer = ({ toasts, removeToast }) => {
    return (
        <div className="toast-container">
            <AnimatePresence mode="popLayout">
                {toasts.map(toast => (
                    <Toast key={toast.id} {...toast} onClose={removeToast} />
                ))}
            </AnimatePresence>
        </div>
    );
};

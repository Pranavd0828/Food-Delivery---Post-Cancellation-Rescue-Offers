import React from 'react';
import { motion } from 'framer-motion';

const PageTransition = ({ children, className = "" }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className={`h-full w-full ${className}`}
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;

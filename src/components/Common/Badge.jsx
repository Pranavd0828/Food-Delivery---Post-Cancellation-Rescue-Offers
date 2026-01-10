import React from 'react';
import clsx from 'clsx';
import './Badge.css';

export const Badge = ({ children, variant = 'default', className }) => {
    return (
        <span className={clsx('badge', `badge--${variant}`, className)}>
            {children}
        </span>
    );
};

import React from 'react';
import clsx from 'clsx';
import './Card.css';

export const Card = ({ children, className, onClick, padding = 'md' }) => {
    return (
        <div
            className={clsx('card', `card--padding-${padding}`, className)}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

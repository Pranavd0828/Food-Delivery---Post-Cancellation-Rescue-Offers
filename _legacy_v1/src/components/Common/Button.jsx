import React from 'react';
import clsx from 'clsx';
import './Button.css';

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false, 
  disabled = false, 
  onClick,
  className,
  type = 'button'
}) => {
  return (
    <button
      type={type}
      className={clsx(
        'btn',
        `btn--${variant}`,
        `btn--${size}`,
        fullWidth && 'btn--full',
        className
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

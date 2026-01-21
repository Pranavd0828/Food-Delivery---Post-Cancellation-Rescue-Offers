import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { Clock } from 'lucide-react';
import './Timer.css';

export const CountdownTimer = ({
    targetDate,
    onExpire,
    variant = 'default',
    showIcon = true
}) => {
    const [timeLeft, setTimeLeft] = useState('');
    const [isUrgent, setIsUrgent] = useState(false);

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = +new Date(targetDate) - +new Date();

            if (difference > 0) {
                const minutes = Math.floor((difference / 1000 / 60) % 60);
                const seconds = Math.floor((difference / 1000) % 60);

                setIsUrgent(minutes < 3); // Urgent if less than 3 mins
                return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            } else {
                if (onExpire) onExpire();
                return '00:00';
            }
        };

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        setTimeLeft(calculateTimeLeft());

        return () => clearInterval(timer);
    }, [targetDate, onExpire]);

    return (
        <div className={clsx(
            'timer',
            `timer--${variant}`,
            isUrgent && 'timer--urgent'
        )}>
            {showIcon && <Clock size={14} className="timer__icon" />}
            <span className="timer__text">{timeLeft}</span>
        </div>
    );
};

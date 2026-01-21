import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

const HoldTimer = ({ expiresAt, onExpire }) => {
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            const diff = Math.max(0, Math.ceil((expiresAt - now) / 1000));
            setTimeLeft(diff);

            if (diff <= 0) {
                clearInterval(interval);
                onExpire && onExpire();
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [expiresAt, onExpire]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div className="flex items-center gap-2 text-white font-mono text-xl font-bold bg-red-500 px-4 py-2 rounded-full animate-pulse-fast shadow-lg">
            <Clock size={24} />
            <span>{minutes}:{seconds.toString().padStart(2, '0')}</span>
        </div>
    );
};

export default HoldTimer;

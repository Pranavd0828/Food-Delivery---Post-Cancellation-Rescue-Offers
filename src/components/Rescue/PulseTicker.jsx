import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { RESTAURANTS } from '../../data/mock';

const NAMES = ['Alex', 'Sam', 'Jordan', 'Taylor', 'Casey', 'Riley', 'Jamie'];
const ACTIONS = ['rescued a meal', 'saved $12.50', 'prevented 2kg of CO2', 'grabbed lunch'];

const PulseTicker = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const name = NAMES[Math.floor(Math.random() * NAMES.length)];
            const restaurant = RESTAURANTS[Math.floor(Math.random() * RESTAURANTS.length)];
            const action = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];

            const newEvent = {
                id: Date.now(),
                text: `${name} just ${action} from ${restaurant.name}`,
                timestamp: 'Just now'
            };

            setEvents(prev => [newEvent, ...prev].slice(0, 3)); // Keep top 3
        }, 3500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute top-16 left-4 right-4 z-[500] pointer-events-none flex flex-col gap-2">
            <AnimatePresence>
                {events.map(event => (
                    <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                        className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-md self-start border border-slate-100 flex items-center gap-2"
                    >
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs font-medium text-slate-700">{event.text}</span>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default PulseTicker;

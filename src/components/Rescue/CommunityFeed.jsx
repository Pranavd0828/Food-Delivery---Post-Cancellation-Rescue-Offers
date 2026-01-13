import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, User } from 'lucide-react';
import './CommunityFeed.css';

const NAMES = ['Sarah', 'Mike', 'Alex', 'Jordan', 'Emma', 'David'];
const ITEMS = ['Sushi Roll', 'Burger Combo', 'Tacos', 'Pizza', 'Pasta', 'Salad'];
const RESTAURANTS = ['Sushi Zen', 'Burger & Co', 'Baja Fresh', 'Pasta House'];

export const CommunityFeed = () => {
    const [feed, setFeed] = useState([
        { id: 1, text: "Sarah just saved $12 at Sushi Zen", time: 'Just now' }
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            const name = NAMES[Math.floor(Math.random() * NAMES.length)];
            const item = ITEMS[Math.floor(Math.random() * ITEMS.length)];
            const restaurant = RESTAURANTS[Math.floor(Math.random() * RESTAURANTS.length)];
            const savings = Math.floor(Math.random() * 15) + 5;

            const newAction = {
                id: Date.now(),
                text: `${name} rescued ${item} from ${restaurant} (Saved $${savings})`,
                time: 'Just now'
            };

            setFeed(prev => [newAction, ...prev.slice(0, 2)]);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="community-feed">
            <div className="feed-header">
                <TrendingUp size={16} className="text-primary" />
                <span className="feed-title">Live Rescue Feed</span>
                <div className="live-indicator">
                    <span className="live-dot"></span>
                    124 active Rescuers
                </div>
            </div>

            <div className="feed-list">
                <AnimatePresence mode='popLayout'>
                    {feed.map(item => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, height: 0 }}
                            className="feed-item"
                        >
                            <div className="feed-avatar">
                                <User size={12} />
                            </div>
                            <p className="feed-text">{item.text}</p>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

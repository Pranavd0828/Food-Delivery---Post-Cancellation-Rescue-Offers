import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RescueDealsCarousel } from '../components/Rescue/RescueDealsCarousel';
import { CommunityFeed } from '../components/Rescue/CommunityFeed';
import { Card } from '../components/Common/Card';
import { RESTAURANTS } from '../data/mock';
import './Home.css';

const CATEGORIES = ['All', 'Burgers', 'Sushi', 'Asian', 'Pizza', 'Mexican', 'Dessert'];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export default function Home() {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredRestaurants = activeCategory === 'All'
        ? RESTAURANTS
        : RESTAURANTS.filter(r => r.tags.includes(activeCategory));

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            style={{ paddingBottom: '2rem' }}
        >
            <header className="home-header">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1>DashDrop</h1>
                    <p>123 Main St, San Francisco</p>
                </motion.div>
            </header>

            {/* Social Proof - Flow N */}
            <motion.div variants={itemVariants}>
                <CommunityFeed />
            </motion.div>

            {/* Rescue Module - Flow B */}
            <motion.div variants={itemVariants}>
                <RescueDealsCarousel />
            </motion.div>

            {/* Categories - Flow I */}
            <motion.div
                className="category-scroll"
                variants={itemVariants}
            >
                {CATEGORIES.map(cat => (
                    <button
                        key={cat}
                        className={`category-chip ${activeCategory === cat ? 'active' : ''}`}
                        onClick={() => setActiveCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </motion.div>

            {/* Standard Listings */}
            <motion.h2 variants={itemVariants} className="section-title">All Restaurants</motion.h2>

            <motion.div className="restaurant-list" layout>
                <AnimatePresence mode='popLayout'>
                    {filteredRestaurants.length > 0 ? (
                        filteredRestaurants.map(r => (
                            <motion.div
                                key={r.id}
                                layout
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                                exit={{ opacity: 0, scale: 0.95 }}
                            >
                                <Card className="restaurant-card" padding="sm">
                                    <div className="restaurant-img"></div>
                                    <div style={{ flex: 1 }}>
                                        <h3 className="font-bold">{r.name}</h3>
                                        <p className="text-sm text-secondary">
                                            {r.tags.slice(0, 2).join(' • ')} • $$ • 25-35 min
                                        </p>
                                        <p className="text-sm text-secondary">0.8 mi • Free delivery</p>
                                    </div>
                                </Card>
                            </motion.div>
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="empty-state"
                        >
                            <p>No restaurants found for "{activeCategory}"</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
}

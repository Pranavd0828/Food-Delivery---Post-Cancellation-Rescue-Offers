import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFavorites } from '../contexts/FavoritesContext';
import { Card } from '../components/Common/Card';
import { RESTAURANTS } from '../data/mock';
import { Heart, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Favorites.css';

export default function Favorites() {
    const { favorites, toggleFavorite } = useFavorites();
    const navigate = useNavigate();

    const favoriteRestaurants = RESTAURANTS.filter(r => favorites.includes(r.id));

    return (
        <div className="favorites-page">
            <header className="favorites-header">
                <h1>Your Watchlist</h1>
                <p>You'll be notified when these spots drop a Rescue Deal.</p>
            </header>

            <div className="favorites-list">
                <AnimatePresence mode="popLayout">
                    {favoriteRestaurants.length > 0 ? (
                        favoriteRestaurants.map(r => (
                            <motion.div
                                key={r.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                            >
                                <Card className="fav-card" padding="sm" onClick={() => navigate('/')}>
                                    <div className="fav-content">
                                        <h3>{r.name}</h3>
                                        <p className="text-secondary text-sm">Waiting for deals...</p>
                                    </div>
                                    <button
                                        className="fav-remove-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleFavorite(r.id, r.name);
                                        }}
                                    >
                                        <Heart size={20} fill="#EF4444" color="#EF4444" />
                                    </button>
                                </Card>
                            </motion.div>
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="empty-favorites"
                        >
                            <div className="heart-circle">
                                <Heart size={32} />
                            </div>
                            <h3>No Favorites Yet</h3>
                            <p>Heart restaurants to get notified about their rescue deals!</p>
                            <button className="browse-btn" onClick={() => navigate('/')}>
                                Browse Restaurants <ArrowRight size={16} />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

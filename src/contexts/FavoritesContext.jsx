import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNotification } from './NotificationContext';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
    const { addToast } = useNotification();

    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('dashdrop-favorites');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('dashdrop-favorites', JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (restaurantId, restaurantName) => {
        setFavorites(prev => {
            if (prev.includes(restaurantId)) {
                addToast(`Removed ${restaurantName} from favorites`, 'info');
                return prev.filter(id => id !== restaurantId);
            } else {
                addToast(`Added ${restaurantName} to favorites. We'll notify you of deals!`, 'success');
                return [...prev, restaurantId];
            }
        });
    };

    const isFavorite = (restaurantId) => favorites.includes(restaurantId);

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

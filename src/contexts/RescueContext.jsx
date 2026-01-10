import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_OFFERS, RESTAURANTS, USERS } from '../data/mock';

const RescueContext = createContext();

export const useRescue = () => useContext(RescueContext);

export const RescueProvider = ({ children }) => {
    const [offers, setOffers] = useState([]);
    const [user, setUser] = useState(USERS.current);
    const [cart, setCart] = useState(null); // { offerId, heldAt }
    const [activeHold, setActiveHold] = useState(null);

    // Load initial data
    useEffect(() => {
        // Hydrate offers with restaurant data
        const hydratedOffers = MOCK_OFFERS.map(offer => {
            const restaurant = RESTAURANTS.find(r => r.id === offer.restaurantId);
            return { ...offer, restaurant };
        });
        setOffers(hydratedOffers);
    }, []);

    // Timer loop for dynamic discounts/expiration
    useEffect(() => {
        const interval = setInterval(() => {
            setOffers(currentOffers =>
                currentOffers.map(offer => {
                    const now = new Date();
                    const expireTime = new Date(offer.expiresAt);
                    const minutesLeft = (expireTime - now) / 60000;

                    if (minutesLeft <= 0) return { ...offer, status: 'EXPIRED' };

                    // Dynamic Discount Logic
                    let newDiscount = offer.discountPercent;
                    if (minutesLeft < 3) newDiscount = 50;
                    else if (minutesLeft < 6) newDiscount = 35;
                    else newDiscount = 25;

                    return { ...offer, discountPercent: newDiscount };
                })
            );
        }, 5000); // Check every 5s

        return () => clearInterval(interval);
    }, []);

    // Hold Logic
    const claimDeal = (offerId) => {
        const offer = offers.find(o => o.id === offerId);
        if (!offer || offer.status !== 'AVAILABLE') return false;

        // Set hold
        const holdExpiresAt = new Date(Date.now() + 90 * 1000); // 90s from now
        setActiveHold({ offerId, expiresAt: holdExpiresAt });

        // Update local offer status
        setOffers(prev => prev.map(o =>
            o.id === offerId ? { ...o, status: 'HOLD' } : o
        ));

        return true;
    };

    const releaseHold = () => {
        if (!activeHold) return;
        setOffers(prev => prev.map(o =>
            o.id === activeHold.offerId ? { ...o, status: 'AVAILABLE' } : o
        ));
        setActiveHold(null);
    };

    return (
        <RescueContext.Provider value={{
            offers,
            user,
            claimDeal,
            activeHold,
            releaseHold
        }}>
            {children}
        </RescueContext.Provider>
    );
};

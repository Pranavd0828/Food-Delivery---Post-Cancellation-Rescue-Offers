import React, { createContext, useContext, useState, useEffect } from 'react';
import { getOffersWithRestaurant, CURRENT_USER } from '../data/mock';

const RescueContext = createContext();

export const useRescue = () => useContext(RescueContext);

export const RescueProvider = ({ children }) => {
    const [offers, setOffers] = useState([]);
    const [userLocation, setUserLocation] = useState(CURRENT_USER.location);
    const [activeHold, setActiveHold] = useState(null);

    useEffect(() => {
        setOffers(getOffersWithRestaurant());
    }, []);

    const claimHold = (offerId) => {
        setActiveHold({ offerId, expiresAt: Date.now() + 90000 });
        return true;
    };

    return (
        <RescueContext.Provider value={{ offers, userLocation, activeHold, claimHold, releaseHold: () => setActiveHold(null) }}>
            {children}
        </RescueContext.Provider>
    );
};

import React from 'react';
import { useRescue } from '../../contexts/RescueContext';
import { DealCard } from './DealCard';
import './RescueDealsCarousel.css';

export const RescueDealsCarousel = () => {
    const { offers } = useRescue();
    const availableOffers = offers.filter(o => o.status === 'AVAILABLE');

    if (availableOffers.length === 0) return null;

    return (
        <div className="rescue-module">
            <div className="rescue-module__header">
                <h2 className="rescue-module__title">Rescue Deals Near You</h2>
                <span className="rescue-module__scroll-hint">Scroll for more</span>
            </div>

            <div className="rescue-carousel">
                {availableOffers.map(offer => (
                    <DealCard key={offer.id} offer={offer} />
                ))}
            </div>
        </div>
    );
};

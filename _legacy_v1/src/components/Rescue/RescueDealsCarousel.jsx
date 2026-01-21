import React from 'react';
import { motion } from 'framer-motion';
import { useRescue } from '../../contexts/RescueContext';
import { DealCard } from './DealCard';
import './RescueDealsCarousel.css';

const carouselVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const cardVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { type: 'spring', stiffness: 100, damping: 20 }
    }
};

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

            <motion.div
                className="rescue-carousel"
                variants={carouselVariants}
                initial="hidden"
                animate="visible"
            >
                {availableOffers.map(offer => (
                    <motion.div key={offer.id} variants={cardVariants}>
                        <DealCard offer={offer} />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

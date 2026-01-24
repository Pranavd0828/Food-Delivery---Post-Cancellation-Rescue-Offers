import React, { useState } from 'react';
import { Search, MapPin, ChevronDown, SlidersHorizontal, User } from 'lucide-react';
import PageTransition from '../components/Common/PageTransition';
import { useRescue } from '../contexts/RescueContext';
import RadarTeaser from '../components/Home/RadarTeaser';
import CategoryPill from '../components/Home/CategoryPill';
import RestaurantCard from '../components/Home/RestaurantCard';
import RadarMap from '../components/Rescue/RadarMap';
import { AnimatePresence, motion } from 'framer-motion';

const CATEGORIES = [
    { id: 'all', label: 'All', icon: '🍽️' },
    { id: 'burgers', label: 'Burgers', icon: '🍔' },
    { id: 'pizza', label: 'Pizza', icon: '🍕' },
    { id: 'asian', label: 'Asian', icon: '🍜' },
    { id: 'healthy', label: 'Healthy', icon: '🥗' },
    { id: 'dessert', label: 'Treats', icon: '🧁' },
];

const Home = () => {
    const { offers, userLocation } = useRescue();
    const [activeCategory, setActiveCategory] = useState('all');
    const [showFullMap, setShowFullMap] = useState(false);

    // Filter logic
    const filteredOffers = activeCategory === 'all'
        ? offers
        : offers.filter(o => o.restaurant.type.toLowerCase().includes(activeCategory));

    return (
        <PageTransition className="pb-24 bg-slate-50 min-h-screen">
            {/* Header */}
            <div className="bg-white px-4 pt-12 pb-4 sticky top-0 z-30 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)]">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex flex-col">
                        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Delivering to</span>
                        <div className="flex items-center gap-1 text-primary font-bold text-lg -ml-1 cursor-pointer hover:bg-slate-50 p-1 rounded transition-colors">
                            <MapPin size={18} />
                            <span>Current Location</span>
                            <ChevronDown size={16} />
                        </div>
                    </div>
                    <div className="bg-slate-100 p-2 rounded-full cursor-pointer hover:bg-slate-200 transition-colors">
                        <User size={20} className="text-slate-600" />
                    </div>
                </div>

                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search for restaurants"
                        className="w-full bg-slate-100 text-slate-900 rounded-xl py-3 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium placeholder:text-slate-400"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 border-l border-slate-300 pl-3 cursor-pointer">
                        <SlidersHorizontal size={18} className="text-slate-500" />
                    </div>
                </div>
            </div>

            <div className="p-4 space-y-8">
                {/* Hero Section: Radar Teaser */}
                <section>
                    <RadarTeaser
                        count={offers.length}
                        onClick={() => setShowFullMap(true)}
                    />
                </section>

                {/* Categories */}
                <section>
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
                        {CATEGORIES.map(cat => (
                            <CategoryPill
                                key={cat.id}
                                icon={cat.icon}
                                label={cat.label}
                                isActive={activeCategory === cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                            />
                        ))}
                    </div>
                </section>

                {/* Recommended Feed */}
                <section>
                    <div className="flex justify-between items-end mb-4">
                        <h2 className="text-xl font-bold text-slate-900">Recommended Rescues</h2>
                        <span className="text-primary font-bold text-sm cursor-pointer">See All</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filteredOffers.map(offer => (
                            <RestaurantCard key={offer.id} offer={offer} />
                        ))}
                    </div>

                    {filteredOffers.length === 0 && (
                        <div className="text-center py-10 text-slate-400 col-span-full">
                            <p>No offers found in this category.</p>
                            <button onClick={() => setActiveCategory('all')} className="text-primary font-bold mt-2">View All</button>
                        </div>
                    )}
                </section>
            </div>

            {/* Full Screen Map Modal */}
            <AnimatePresence>
                {showFullMap && (
                    <motion.div
                        initial={{ opacity: 0, y: '100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[1000] bg-white flex flex-col"
                    >
                        <div className="relative flex-1">
                            <RadarMap />

                            <button
                                onClick={() => setShowFullMap(false)}
                                className="absolute top-12 left-4 z-[9999] bg-white/90 backdrop-blur p-3 rounded-full shadow-lg"
                            >
                                <ChevronDown size={24} className="text-slate-900" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </PageTransition>
    );
};

export default Home;

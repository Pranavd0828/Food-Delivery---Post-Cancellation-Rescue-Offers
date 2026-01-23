import React from 'react';
import RadarMap from '../components/Rescue/RadarMap';
import PulseTicker from '../components/Rescue/PulseTicker';
import PageTransition from '../components/Common/PageTransition';

const Home = () => {
    return (
        <PageTransition className="relative">
            <PulseTicker />
            <RadarMap />

            {/* Floating Action Button or List Toggle could go here */}
            <div className="absolute bottom-6 right-4 z-[999]">
                {/* Future 'List View' toggle */}
            </div>
        </PageTransition>
    );
};

export default Home;

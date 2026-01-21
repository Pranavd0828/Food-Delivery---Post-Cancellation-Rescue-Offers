import React from 'react';
import RadarMap from '../components/Rescue/RadarMap';

const Home = () => {
    return (
        <div className="h-full w-full">
            <RadarMap />

            {/* Floating Action Button or List Toggle could go here */}
            <div className="absolute bottom-6 right-4 z-[999]">
                {/* Future 'List View' toggle */}
            </div>
        </div>
    );
};

export default Home;

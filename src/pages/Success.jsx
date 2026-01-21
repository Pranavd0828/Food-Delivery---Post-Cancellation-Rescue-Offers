import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Map } from 'lucide-react';

const Success = () => {
    const navigate = useNavigate();

    return (
        <div className="h-full bg-primary flex flex-col items-center justify-center text-white p-8 text-center relative overflow-hidden">
            <div className="bg-white/20 p-8 rounded-full mb-6 relative z-10">
                <Check size={48} strokeWidth={4} />
            </div>

            <h1 className="text-3xl font-bold mb-2 relative z-10">Rescued!</h1>
            <p className="text-white/80 mb-8 relative z-10">You just saved a meal from ending up in the trash.</p>

            <button
                onClick={() => navigate('/')}
                className="bg-white text-primary font-bold py-3 px-8 rounded-full shadow-lg relative z-10 flex items-center gap-2"
            >
                <Map size={18} />
                <span>Find More Deals</span>
            </button>

            {/* Confetti / Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-secondary rounded-full blur-3xl"></div>
            </div>
        </div>
    );
};

export default Success;

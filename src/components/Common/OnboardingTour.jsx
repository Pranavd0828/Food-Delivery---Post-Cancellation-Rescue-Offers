import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, MapPin, Clock, Heart } from 'lucide-react';

const STEPS = [
    {
        icon: MapPin,
        title: "Rescue Radar",
        desc: "Cancelled orders pop up on the map in real-time. They are ready to eat and heavily discounted."
    },
    {
        icon: Clock,
        title: "Beat the Clock",
        desc: "Tap a pin to see the deal. Hit 'Secure' to start a 90-second hold timer. Be fast!"
    },
    {
        icon: Heart,
        title: "Save the Planet",
        desc: "Every meal you rescue fights food waste and earns you specialized badges."
    }
];

const OnboardingTour = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        // Show only on first visit (simulated by localStorage check)
        const seen = localStorage.getItem('dashdrop-tour-seen');
        if (!seen) {
            setIsVisible(true);
        }
    }, []);

    const handleNext = () => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep(c => c + 1);
        } else {
            handleClose();
        }
    };

    const handleClose = () => {
        localStorage.setItem('dashdrop-tour-seen', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    const StepIcon = STEPS[currentStep].icon;

    return (
        <div className="fixed inset-0 z-[1000] flex items-end justify-center pointer-events-none p-4 pb-24 bg-black/40 backdrop-blur-sm">
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-sm pointer-events-auto"
            >
                <button onClick={handleClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
                    <X size={20} />
                </button>

                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary mb-4">
                        <StepIcon size={32} />
                    </div>

                    <h2 className="text-xl font-bold mb-2">{STEPS[currentStep].title}</h2>
                    <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                        {STEPS[currentStep].desc}
                    </p>

                    <div className="flex items-center justify-between w-full">
                        <div className="flex gap-1">
                            {STEPS.map((_, i) => (
                                <div key={i} className={`h-1.5 rounded-full transition-all ${i === currentStep ? 'w-6 bg-primary' : 'w-1.5 bg-slate-200'}`} />
                            ))}
                        </div>
                        <button
                            onClick={handleNext}
                            className="bg-primary text-white px-6 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-primary/90"
                        >
                            {currentStep === STEPS.length - 1 ? "Let's Go" : "Next"}
                            <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default OnboardingTour;

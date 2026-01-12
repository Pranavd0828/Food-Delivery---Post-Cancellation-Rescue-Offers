import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Common/Button';
import { Badge } from '../components/Common/Badge';
import TrackingMap from '../components/Rescue/TrackingMap';
import { CheckCircle, Clock } from 'lucide-react';
import './Tracking.css';

const STEPS = [
    'Order Confirmed',
    'Preparing',
    'Heading to you',
    'Arrived'
];

export default function Tracking() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        // Simulate progress
        const timer = setInterval(() => {
            setCurrentStep(prev => {
                if (prev >= STEPS.length - 1) {
                    clearInterval(timer);
                    return prev;
                }
                return prev + 1;
            });
        }, 3000); // Fast mock progress

        return () => clearInterval(timer);
    }, []);

    const isDelivered = currentStep === STEPS.length - 1;

    return (
        <div className="tracking-page">
            <div className="map-placeholder">
                <TrackingMap step={currentStep} />
            </div>

            <div className="tracking-sheet">
                <div className="sheet-handle"></div>

                <header className="tracking-header">
                    <h2>{isDelivered ? 'Arrived!' : 'Arriving in 15-20 min'}</h2>
                    {!isDelivered && <p className="text-secondary">Latest arrival by 7:45 PM</p>}
                </header>

                <div className="status-timeline">
                    {STEPS.map((step, idx) => (
                        <div key={idx} className={`timeline-item ${idx <= currentStep ? 'completed' : ''}`}>
                            <div className="timeline-icon">
                                {idx <= currentStep ? <CheckCircle size={16} /> : <div className="dot" />}
                            </div>
                            <span className="timeline-text">{step}</span>
                        </div>
                    ))}
                </div>

                {isDelivered && (
                    <div className="tracking-footer fade-in">
                        <Button fullWidth onClick={() => navigate('/receipt')}>
                            View Receipt
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

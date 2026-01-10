import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRescue } from '../contexts/RescueContext';
import { Button } from '../components/Common/Button';
import { Badge } from '../components/Common/Badge';
import { PartyPopper } from 'lucide-react';

export default function Receipt() {
    const navigate = useNavigate();
    const { activeHold, offers, releaseHold } = useRescue();

    // Use last active hold or mock if lost (for demo stability)
    const offer = activeHold ? offers.find(o => o.id === activeHold.offerId) : offers[0];

    const handleDone = () => {
        releaseHold();
        navigate('/');
    };

    const savedAmount = offer ? (offer.originalSubtotal * offer.discountPercent / 100).toFixed(2) : "12.50";

    return (
        <div style={{ padding: '2rem', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <div style={{ background: '#D1FAE5', padding: '2rem', borderRadius: '50%', marginBottom: '2rem', color: '#059669' }}>
                <PartyPopper size={48} />
            </div>

            <h1>Order Complete!</h1>
            <p className="text-secondary mb-4">You rescued a meal and saved money.</p>

            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '2rem' }}>
                You saved ${savedAmount}
            </div>

            <div className="w-full flex flex-col gap-2">
                <Button fullWidth size="lg" onClick={handleDone}>Browse More Deals</Button>
                <Button variant="ghost" fullWidth>Rate Experience</Button>
            </div>
        </div>
    );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRescue } from '../contexts/RescueContext';
import { Button } from '../components/Common/Button';
import { CountdownTimer } from '../components/Common/Timer';
import { MapPin, AlertTriangle, Lock } from 'lucide-react';
import './Checkout.css';

export default function Checkout() {
    const navigate = useNavigate();
    const { activeHold, offers, user } = useRescue();
    const [address, setAddress] = useState('home'); // home | far

    if (!activeHold) return <div className="p-4">No active deal held. <Button onClick={() => navigate('/')}>Go Home</Button></div>;

    const offer = offers.find(o => o.id === activeHold.offerId);
    if (!offer) return <div>Offer expired.</div>;

    const isEligible = address === 'home'; // Mock logic: Home is close, Far is far
    const finalPrice = (offer.originalSubtotal * (1 - offer.discountPercent / 100)).toFixed(2);

    const handlePlaceOrder = () => {
        // Navigate to tracking
        navigate('/orders');
    };

    return (
        <div className="checkout-page">
            <header className="checkout-header">
                <Button variant="ghost" onClick={() => navigate(-1)}>Cancel</Button>
                <h2>Checkout</h2>
                <div className="hold-timer">
                    <CountdownTimer targetDate={activeHold.expiresAt} variant="urgent" showIcon={false} />
                </div>
            </header>

            <div className="checkout-content">
                <div className="section address-section">
                    <h3>Delivery Address</h3>
                    <div className="address-selector">
                        <label className={`address-option ${address === 'home' ? 'selected' : ''}`}>
                            <input type="radio" name="addr" checked={address === 'home'} onChange={() => setAddress('home')} />
                            <div>
                                <span className="font-bold">Home</span>
                                <p className="text-sm text-secondary">123 Main St (0.8 mi)</p>
                            </div>
                        </label>
                        <label className={`address-option ${address === 'far' ? 'selected' : ''}`}>
                            <input type="radio" name="addr" checked={address === 'far'} onChange={() => setAddress('far')} />
                            <div>
                                <span className="font-bold">Work</span>
                                <p className="text-sm text-secondary">500 Market St (2.5 mi)</p>
                            </div>
                        </label>
                    </div>

                    {!isEligible && (
                        <div className="warning-box">
                            <AlertTriangle size={16} />
                            <span>This deal is only available within 1.5 miles.</span>
                        </div>
                    )}
                </div>

                <div className="section items-section">
                    <div className="flex justify-between items-center mb-2">
                        <h3>Items</h3>
                        <span className="locked-badge"><Lock size={12} /> Locked</span>
                    </div>
                    <p className="text-sm text-secondary mb-2">Items cannot be modified for Rescue Deals.</p>
                    {offer.items.map((item, i) => (
                        <div key={i} className="flex justify-between py-1 border-b border-gray-100">
                            <span>{item.quantity}x {item.name}</span>
                            <span>${item.price.toFixed(2)}</span>
                        </div>
                    ))}
                </div>

                <div className="section payment-section">
                    <h3>Payment</h3>
                    <div className="payment-method">
                        <span>Visa ending in 4242</span>
                        <Button variant="ghost" size="sm">Change</Button>
                    </div>
                </div>
            </div>

            <div className="checkout-footer">
                <div className="flex justify-between mb-4 font-bold text-lg">
                    <span>Total</span>
                    <span>${finalPrice}</span>
                </div>
                <Button
                    fullWidth
                    size="lg"
                    onClick={handlePlaceOrder}
                    disabled={!isEligible}
                >
                    Place Rescue Order
                </Button>
            </div>
        </div>
    );
}

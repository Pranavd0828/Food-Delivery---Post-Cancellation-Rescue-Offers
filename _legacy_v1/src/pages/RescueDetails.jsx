import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRescue } from '../contexts/RescueContext';
import { Button } from '../components/Common/Button';
import { Badge } from '../components/Common/Badge';
import { CountdownTimer } from '../components/Common/Timer';
import { ChevronLeft, Info, MapPin } from 'lucide-react';
import { ClaimHoldModal } from '../components/Rescue/ClaimHoldModal';
import './RescueDetails.css';

export default function RescueDetails() {
    const { offerId } = useParams();
    const navigate = useNavigate();
    const { offers, claimDeal, activeHold } = useRescue();

    const offer = offers.find(o => o.id === offerId);

    if (!offer) return <div>Offer not found or expired.</div>;

    const { restaurant, items, originalSubtotal, discountPercent, expiresAt } = offer;
    const finalPrice = (originalSubtotal * (1 - discountPercent / 100)).toFixed(2);
    const discountAmount = (originalSubtotal - finalPrice).toFixed(2);

    const handleClaim = () => {
        const success = claimDeal(offer.id);
        if (!success) alert('Deal is no longer available!');
    };

    const isHeldByMe = activeHold?.offerId === offer.id;

    return (
        <div className="rescue-details">
            <header className="details-header">
                <button onClick={() => navigate(-1)} className="back-btn"><ChevronLeft /></button>
                <h2>Rescue Deal</h2>
            </header>

            <div className="details-content">
                <div className="restaurant-info">
                    <h1>{restaurant.name}</h1>
                    <div className="flex items-center gap-1 text-secondary text-sm">
                        <MapPin size={14} /> {offer.distance} miles away
                    </div>
                </div>

                <div className="rescue-alert">
                    <Info size={20} className="text-secondary" />
                    <div>
                        <p className="font-bold">Why is this discounted?</p>
                        <p className="text-sm text-secondary">Order cancelled after preparation. Items are fixed.</p>
                    </div>
                </div>

                <div className="timer-banner">
                    <span>Expiring in:</span>
                    <CountdownTimer targetDate={expiresAt} showIcon={true} />
                </div>

                <div className="items-list">
                    <h3>Items</h3>
                    {items.map((item, idx) => (
                        <div key={idx} className="order-item">
                            <span className="item-qty">{item.quantity}x</span>
                            <span className="item-name">{item.name}</span>
                            <span className="item-price">${item.price.toFixed(2)}</span>
                        </div>
                    ))}
                </div>

                <div className="price-breakdown">
                    <div className="row">
                        <span>Subtotal</span>
                        <span className="strike">${originalSubtotal.toFixed(2)}</span>
                    </div>
                    <div className="row discount-row">
                        <span>Rescue Discount ({discountPercent}%)</span>
                        <span>-${discountAmount}</span>
                    </div>
                    <div className="row total-row">
                        <span>Total</span>
                        <span>${finalPrice}</span>
                    </div>
                </div>
            </div>

            <div className="details-footer">
                <Button
                    fullWidth
                    size="lg"
                    onClick={handleClaim}
                    disabled={offer.status !== 'AVAILABLE'}
                >
                    {offer.status === 'AVAILABLE' ? 'Claim Deal' : 'Unavailable'}
                </Button>
            </div>

            {isHeldByMe && <ClaimHoldModal offer={offer} expiresAt={activeHold.expiresAt} />}
        </div>
    );
}

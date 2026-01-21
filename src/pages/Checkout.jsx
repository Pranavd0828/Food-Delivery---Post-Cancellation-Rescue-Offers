import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, CreditCard, MapPin, ChevronRight, Check } from 'lucide-react';
import { useRescue } from '../contexts/RescueContext';

const Checkout = () => {
    const navigate = useNavigate();
    const { activeHold, offers, releaseHold } = useRescue();
    const [isProcessing, setIsProcessing] = useState(false);

    // In a real app, we'd look up the offer from activeHold
    // effectively assuming the user is checking out the held offer
    const offer = offers.find(o => o.id === activeHold?.offerId);

    if (!offer) {
        return <div className="p-8">No active session. <button onClick={() => navigate('/')} className="text-primary underline">Go Home</button></div>;
    }

    const total = (offer.discountPrice + 2.99 + 1.50).toFixed(2); // + Fees/Tip

    const handlePlaceOrder = () => {
        setIsProcessing(true);
        setTimeout(() => {
            releaseHold();
            navigate('/success');
        }, 2000);
    };

    return (
        <div className="h-full bg-background flex flex-col">
            <header className="p-4 flex items-center gap-4 bg-white shadow-sm z-10">
                <button onClick={() => navigate(-1)}><ArrowLeft /></button>
                <h1 className="font-bold text-lg">Checkout</h1>
            </header>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">

                {/* Order Summary */}
                <div className="bg-white p-4 rounded-xl shadow-sm">
                    <h2 className="font-bold mb-3">{offer.restaurant.name}</h2>
                    {offer.items.map((item, i) => (
                        <div key={i} className="flex justify-between text-sm mb-2">
                            <span className="text-slate-600">{item.quantity}x {item.name}</span>
                            <span>...</span>
                        </div>
                    ))}
                </div>

                {/* Payment Method */}
                <div className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-slate-100 p-2 rounded-full">
                            <CreditCard size={20} className="text-slate-600" />
                        </div>
                        <div>
                            <div className="font-bold text-sm">Apple Pay</div>
                            <div className="text-xs text-slate-500">**** 4242</div>
                        </div>
                    </div>
                    <ChevronRight className="text-slate-300" />
                </div>

                {/* Total */}
                <div className="mt-8">
                    <div className="flex justify-between mb-2 text-sm text-slate-500">
                        <span>Subtotal</span>
                        <span>${offer.discountPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-4 text-sm text-slate-500">
                        <span>Fees & Tax</span>
                        <span>$4.49</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold">
                        <span>Total</span>
                        <span>${total}</span>
                    </div>
                </div>
            </div>

            <div className="p-4 bg-white border-t border-slate-100">
                <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg hover:bg-primary/90 disabled:opacity-70 flex justify-center items-center gap-2"
                >
                    {isProcessing ? 'Processing...' : 'Place Order'}
                </button>
            </div>
        </div>
    );
};

export default Checkout;

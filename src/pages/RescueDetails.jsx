import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRescue } from '../contexts/RescueContext';
import { ArrowLeft, MapPin, Star, AlertCircle } from 'lucide-react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import HoldTimer from '../components/Rescue/HoldTimer';

const RescueDetails = () => {
    const { offerId } = useParams();
    const navigate = useNavigate();
    const { offers, activeHold, claimHold } = useRescue();

    // Find offer (in real app, fetch from API)
    const offer = offers.find(o => o.id === offerId);

    if (!offer) return <div className="p-8 text-center bg-background h-full">Offer not found</div>;

    const isHeld = activeHold?.offerId === offerId;
    const restaurant = offer.restaurant;

    const handleClaim = () => {
        claimHold(offerId);
    };

    return (
        <div className="h-full bg-background flex flex-col relative overflow-hidden">
            {/* Header / Map Context */}
            <div className="h-56 relative w-full overflow-hidden bg-slate-100">
                <MapContainer
                    center={restaurant.location}
                    zoom={15}
                    zoomControl={false}
                    scrollWheelZoom={false}
                    dragging={false}
                    doubleClickZoom={false}
                    className="h-full w-full opacity-60 grayscale-[50%]"
                >
                    <TileLayer
                        attribution='&copy; OpenStreetMap'
                        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                    />
                    <Marker position={restaurant.location}>
                        {/* No popup needed for context map */}
                    </Marker>
                </MapContainer>

                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none z-[400]"></div>

                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-4 left-4 bg-white/50 backdrop-blur-md hover:bg-white p-2 rounded-full shadow-sm z-[500] transition-all"
                >
                    <ArrowLeft size={20} className="text-slate-900" />
                </button>

                {/* Status Badge */}
                <div className="absolute top-4 right-4 z-[500]">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg animate-pulse">
                        Rescue Deal
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 -mt-6 bg-white rounded-t-3xl p-6 shadow-xl z-20 overflow-y-auto">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">{restaurant.name}</h1>
                        <div className="flex items-center gap-1 text-slate-500 text-sm mt-1">
                            <Star size={14} className="fill-yellow-400 text-yellow-400" />
                            <span>{restaurant.rating}</span>
                            <span>•</span>
                            <span>{restaurant.type}</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold text-primary">${offer.discountPrice.toFixed(2)}</div>
                        <div className="text-sm text-slate-400 line-through">${offer.originalPrice.toFixed(2)}</div>
                    </div>
                </div>

                {/* Warning / Context */}
                <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 mb-6 flex gap-3">
                    <AlertCircle className="text-orange-500 shrink-0" size={20} />
                    <div className="text-sm text-orange-800">
                        <p className="font-semibold">Last Minute Cancellation!</p>
                        <p>This order is ready for pickup right now. Rescue it before it's tossed.</p>
                    </div>
                </div>

                {/* Items */}
                <h3 className="font-bold text-slate-900 mb-3 uppercase text-xs tracking-wider text-slate-400">Items Included</h3>
                <ul className="space-y-3 mb-8">
                    {offer.items.map((item, i) => (
                        <li key={i} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                            <div className="flex items-center gap-3">
                                <span className="bg-slate-100 text-slate-600 w-6 h-6 flex items-center justify-center rounded text-xs font-bold">
                                    {item.quantity}x
                                </span>
                                <span className="text-slate-700">{item.name}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Footer Action */}
            <div className="p-4 bg-white border-t border-slate-100 absolute bottom-0 w-full pb-8 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-[600]">
                {isHeld ? (
                    <div className="flex items-center justify-between gap-4">
                        <HoldTimer expiresAt={activeHold.expiresAt} onExpire={() => { }} />
                        <button
                            onClick={() => navigate('/checkout')}
                            className="flex-1 bg-primary text-white font-bold py-3 rounded-xl shadow-lg shadow-primary/30"
                        >
                            Checkout Now
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={handleClaim}
                        className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                        <span>Secure This Deal</span>
                        <span className="bg-white/20 px-2 py-0.5 rounded text-sm text-white/90">
                            -{offer.discountPercent}%
                        </span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default RescueDetails;

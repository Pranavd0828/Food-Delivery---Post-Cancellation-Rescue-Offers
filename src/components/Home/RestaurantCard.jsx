import React from 'react';
import { Star, Clock, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RestaurantCard = ({ offer }) => {
    const navigate = useNavigate();
    const { restaurant, items, originalPrice, discountPrice, discountPercent, id } = offer;

    return (
        <div
            onClick={() => navigate(`/rescue/${id}`)}
            className="group bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all active:scale-[0.98] cursor-pointer h-full flex flex-col"
        >
            {/* Image Section */}
            <div className="h-40 bg-slate-200 relative overflow-hidden shrink-0">
                <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80'; // Fallback food image
                    }}
                />

                {/* Overlay Gradient for Text Readability */}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent"></div>

                {/* Overlay Badge */}
                <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg animate-pulse z-10">
                    Save {discountPercent}%
                </div>

                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-slate-800 flex items-center gap-1 shadow-sm z-10">
                    <Clock size={12} className="text-red-500" />
                    <span>Pickup Now</span>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-4 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-slate-900 text-lg leading-tight group-hover:text-primary transition-colors line-clamp-1">
                        {restaurant.name}
                    </h3>
                    <div className="bg-slate-100 px-1.5 py-0.5 rounded flex items-center gap-1 shrink-0">
                        <span className="text-xs font-bold text-slate-700">{restaurant.rating}</span>
                        <Star size={10} className="fill-slate-700 text-slate-700" />
                    </div>
                </div>

                <div className="flex items-center gap-1 text-slate-500 text-sm mb-3">
                    <span>{restaurant.type}</span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5">
                        <MapPin size={12} /> {restaurant.distance}m
                    </span>
                </div>

                <div className="flex items-end justify-between border-t border-slate-50 pt-3 mt-auto">
                    <div className="text-sm text-slate-600 line-clamp-1 flex-1 mr-4">
                        {items[0].quantity}x {items[0].name} {items.length > 1 && `+ ${items.length - 1} more`}
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-xs text-slate-400 line-through">${originalPrice.toFixed(2)}</span>
                        <span className="font-bold text-slate-900 text-lg">${discountPrice.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestaurantCard;

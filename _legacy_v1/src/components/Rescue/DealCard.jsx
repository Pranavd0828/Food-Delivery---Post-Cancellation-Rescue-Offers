import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../Common/Card';
import { Badge } from '../Common/Badge';
import { CountdownTimer } from '../Common/Timer';
import { MapPin, Clock, Heart } from 'lucide-react';
import { useFavorites } from '../../contexts/FavoritesContext';
import './DealCard.css';

export const DealCard = ({ offer }) => {
    const navigate = useNavigate();
    const { isFavorite, toggleFavorite } = useFavorites();
    const { restaurant, items, discountPercent, originalSubtotal, expiresAt, etaRange, distance } = offer;

    const finalPrice = (originalSubtotal * (1 - discountPercent / 100)).toFixed(2);
    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
    const summary = `${items[0].name}${items.length > 1 ? ` +${itemCount - items[0].quantity} more` : ''}`;

    const handleHeartClick = (e) => {
        e.stopPropagation();
        toggleFavorite(restaurant.id, restaurant.name);
    };

    return (
        <Card className="deal-card" onClick={() => navigate(`/rescue/${offer.id}`)}>
            <div className="deal-card__header">
                <h3 className="deal-card__restaurant">{restaurant.name}</h3>
                <div className="flex gap-2">
                    <button
                        className={`heart-btn ${isFavorite(restaurant.id) ? 'active' : ''}`}
                        onClick={handleHeartClick}
                    >
                        <Heart size={18} fill={isFavorite(restaurant.id) ? "currentColor" : "none"} />
                    </button>
                    <Badge variant="discount">-{discountPercent}%</Badge>
                </div>
            </div>

            <div className="deal-card__items">
                <span className="text-secondary text-sm">{summary}</span>
            </div>

            <div className="deal-card__meta">
                <div className="deal-card__timer-row">
                    <CountdownTimer targetDate={expiresAt} />
                    <span className="deal-card__eta text-sm text-secondary">
                        • {etaRange} min
                    </span>
                </div>

                <div className="deal-card__price-row">
                    <span className="deal-card__original-price">${originalSubtotal.toFixed(2)}</span>
                    <span className="deal-card__final-price">${finalPrice}</span>
                </div>
            </div>

            <div className="deal-card__footer">
                <div className="flex items-center gap-1 text-secondary text-sm">
                    <MapPin size={12} />
                    <span>{distance} mi</span>
                </div>
            </div>
        </Card>
    );
};

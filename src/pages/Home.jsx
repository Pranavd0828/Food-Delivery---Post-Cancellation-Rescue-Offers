import React from 'react';
import { RescueDealsCarousel } from '../components/Rescue/RescueDealsCarousel';
import { Card } from '../components/Common/Card';
import { RESTAURANTS } from '../data/mock';
import './Home.css';

export default function Home() {
    return (
        <div style={{ paddingBottom: '2rem' }}>
            <header className="home-header">
                <h1>DashDrop</h1>
                <p>123 Main St, San Francisco</p>
            </header>

            {/* Rescue Module - Flow B */}
            <RescueDealsCarousel />

            {/* Standard Listings (Mock) */}
            <h2 className="section-title">All Restaurants</h2>
            <div className="restaurant-list">
                {RESTAURANTS.map(r => (
                    <Card key={r.id} className="restaurant-card" padding="sm">
                        <div className="restaurant-img"></div>
                        <div style={{ flex: 1 }}>
                            <h3 className="font-bold">{r.name}</h3>
                            <p className="text-sm text-secondary">American • $$ • 25-35 min</p>
                            <p className="text-sm text-secondary">0 mi • Free delivery</p>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}

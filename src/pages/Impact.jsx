import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/Common/Card';
import { Badge } from '../components/Common/Badge';
import { Trophy, Leaf, DollarSign, Utensils, Award } from 'lucide-react';
import './Impact.css';

const StatCard = ({ icon: Icon, value, label, color }) => (
    <Card className="stat-card" padding="sm">
        <div className={`stat-icon-wrapper ${color}`}>
            <Icon size={24} />
        </div>
        <div className="stat-content">
            <h3 className="stat-value">{value}</h3>
            <p className="stat-label">{label}</p>
        </div>
    </Card>
);

const ImpactBadge = ({ label, icon: Icon, locked }) => (
    <div className={`impact-badge ${locked ? 'locked' : ''}`}>
        <div className="badge-circle">
            <Icon size={24} />
        </div>
        <span className="badge-label">{label}</span>
    </div>
);

export default function Impact() {
    const [stats, setStats] = useState({ saved: 0, co2: 0, meals: 0 });

    // Animate stats on mount
    useEffect(() => {
        const timer = setInterval(() => {
            setStats(prev => {
                if (prev.saved >= 124.50) clearInterval(timer);
                return {
                    saved: Math.min(prev.saved + 5.50, 124.50),
                    co2: Math.min(prev.co2 + 0.5, 12.5),
                    meals: Math.min(prev.meals + 1, 8)
                };
            });
        }, 50);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="impact-page">
            <header className="impact-header">
                <div className="header-content">
                    <Trophy size={48} className="trophy-icon" />
                    <h1>Rescue Hero</h1>
                    <p>Level 5 • Waste Warrior</p>
                </div>
                <div className="impact-wave"></div>
            </header>

            <div className="impact-body">
                <section className="stats-grid">
                    <StatCard
                        icon={DollarSign}
                        value={`$${stats.saved.toFixed(2)}`}
                        label="Money Saved"
                        color="green"
                    />
                    <StatCard
                        icon={Leaf}
                        value={`${stats.co2.toFixed(1)}kg`}
                        label="CO2 Prevented"
                        color="teal"
                    />
                    <StatCard
                        icon={Utensils}
                        value={Math.floor(stats.meals)}
                        label="Meals Rescued"
                        color="orange"
                    />
                </section>

                <section className="badges-section">
                    <h2 className="section-title">Your Badges</h2>
                    <Card className="badges-grid">
                        <ImpactBadge label="First Rescue" icon={Award} />
                        <ImpactBadge label="Streak: 3" icon={Award} />
                        <ImpactBadge label="Big Saver" icon={DollarSign} />
                        <ImpactBadge label="Eco Hero" icon={Leaf} locked />
                    </Card>
                </section>

                <section className="impact-chart">
                    <h2 className="section-title">Monthly Impact</h2>
                    <Card className="chart-placeholder">
                        <div className="bar" style={{ height: '40%' }}></div>
                        <div className="bar" style={{ height: '70%' }}></div>
                        <div className="bar" style={{ height: '50%' }}></div>
                        <div className="bar active" style={{ height: '90%' }}></div>
                    </Card>
                </section>
            </div>
        </div>
    );
}

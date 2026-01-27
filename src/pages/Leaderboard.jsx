import React from 'react';
import { Trophy, Leaf, TrendingUp, Medal, Star, ChevronRight } from 'lucide-react';
import PageTransition from '../components/Common/PageTransition';
import { motion } from 'framer-motion';

const RANKINGS = [
    { id: 1, name: 'Alex M.', points: 2450, co2: 12.5, saved: 85, rank: 1, tier: 'Platinum' },
    { id: 2, name: 'Sarah K.', points: 2100, co2: 10.2, saved: 72, rank: 2, tier: 'Gold' },
    { id: 3, name: 'Jordan T.', points: 1850, co2: 8.9, saved: 64, rank: 3, tier: 'Gold' },
    { id: 4, name: 'You', points: 1420, co2: 6.5, saved: 48, rank: 12, tier: 'Silver' },
    { id: 5, name: 'Casey R.', points: 1350, co2: 6.1, saved: 45, rank: 13, tier: 'Silver' },
    { id: 6, name: 'Jamie L.', points: 900, co2: 4.2, saved: 30, rank: 24, tier: 'Bronze' },
];

const TierBadge = ({ tier }) => {
    const colors = {
        Platinum: 'bg-purple-100 text-purple-600 border-purple-200',
        Gold: 'bg-yellow-100 text-yellow-600 border-yellow-200',
        Silver: 'bg-slate-100 text-slate-600 border-slate-200',
        Bronze: 'bg-orange-50 text-orange-600 border-orange-100'
    };
    return (
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${colors[tier] || colors.Bronze}`}>
            {tier}
        </span>
    );
};

const Leaderboard = () => {
    return (
        <PageTransition className="h-full bg-background flex flex-col p-4">
            <header className="mb-6">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <Trophy className="text-yellow-500 fill-yellow-500" />
                    Waste Warriors
                </h1>
                <p className="text-slate-500 text-sm">Top rescuers in San Francisco</p>
            </header>

            {/* Your Stats Card */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-primary text-white p-6 rounded-2xl shadow-lg shadow-primary/20 mb-8 relative overflow-hidden"
            >
                <div className="relative z-10">
                    <div className="flex justify-between items-end mb-4">
                        <div>
                            <div className="text-white/80 text-sm mb-1 flex items-center gap-2">
                                Your Rank <TierBadge tier="Silver" />
                            </div>
                            <div className="text-4xl font-bold">#12</div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold">1,420</div>
                            <div className="text-white/80 text-sm">Points</div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="bg-black/20 h-2 rounded-full overflow-hidden mb-2">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '70%' }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="bg-yellow-400 h-full rounded-full"
                        />
                    </div>
                    <div className="flex justify-between text-xs text-white/70">
                        <span>Silver Tier</span>
                        <span>430 pts to Gold</span>
                    </div>
                </div>

                {/* Decor */}
                <div className="absolute -right-8 -bottom-8 bg-white/10 w-40 h-40 rounded-full blur-3xl"></div>
                <div className="absolute -left-8 -top-8 bg-white/10 w-32 h-32 rounded-full blur-3xl"></div>
            </motion.div>

            {/* Rankings List */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-slate-900">Weekly Top 10</h2>
                <button className="text-primary text-sm font-bold flex items-center">
                    View All <ChevronRight size={16} />
                </button>
            </div>

            <div className="space-y-3 overflow-y-auto pb-20">
                {RANKINGS.map((user, index) => (
                    <motion.div
                        key={user.id}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${user.name === 'You'
                                ? 'bg-primary/5 border-primary/20 shadow-sm'
                                : 'bg-white border-slate-100 hover:border-slate-200'
                            }`}
                    >
                        <div className={`font-bold w-6 text-center ${user.rank <= 3 ? 'text-yellow-500 text-lg' : 'text-slate-400'}`}>
                            {user.rank}
                        </div>

                        <div className="relative">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm bg-slate-100 text-slate-600`}>
                                {user.name[0]}
                            </div>
                            {user.rank <= 3 && (
                                <div className="absolute -top-1 -right-1 bg-yellow-400 text-white p-0.5 rounded-full">
                                    <Star size={8} fill="currentColor" />
                                </div>
                            )}
                        </div>

                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-slate-900">{user.name}</span>
                                <TierBadge tier={user.tier} />
                            </div>
                            <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                                <span className="flex items-center gap-1">
                                    <Leaf size={10} className="text-green-500" />
                                    {user.co2}kg
                                </span>
                                <span className="flex items-center gap-1">
                                    <TrendingUp size={10} className="text-blue-500" />
                                    ${user.saved}
                                </span>
                            </div>
                        </div>

                        <div className="text-right">
                            <div className="font-bold text-slate-900">{user.points}</div>
                            <div className="text-[10px] text-slate-400">pts</div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </PageTransition>
    );
};

export default Leaderboard;

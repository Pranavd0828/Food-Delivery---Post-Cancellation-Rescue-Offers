import React from 'react';
import { Trophy, Leaf, TrendingUp, Medal } from 'lucide-react';
import PageTransition from '../components/Common/PageTransition';

const RANKINGS = [
    { id: 1, name: 'Alex M.', points: 2450, co2: 12.5, saved: 85, rank: 1, avatar: 'bg-yellow-100 text-yellow-600' },
    { id: 2, name: 'Sarah K.', points: 2100, co2: 10.2, saved: 72, rank: 2, avatar: 'bg-slate-100 text-slate-600' },
    { id: 3, name: 'Jordan T.', points: 1850, co2: 8.9, saved: 64, rank: 3, avatar: 'bg-orange-100 text-orange-600' },
    { id: 4, name: 'You', points: 1420, co2: 6.5, saved: 48, rank: 12, avatar: 'bg-primary text-white' },
    { id: 5, name: 'Casey R.', points: 1350, co2: 6.1, saved: 45, rank: 13, avatar: 'bg-slate-100 text-slate-600' },
];

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
            <div className="bg-primary text-white p-6 rounded-2xl shadow-lg shadow-primary/20 mb-8 relative overflow-hidden">
                <div className="relative z-10 flex justify-between items-end">
                    <div>
                        <div className="text-white/80 text-sm mb-1">Your Rank</div>
                        <div className="text-4xl font-bold">#12</div>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold">1,420</div>
                        <div className="text-white/80 text-sm">Points</div>
                    </div>
                </div>

                {/* Decor */}
                <div className="absolute -right-4 -bottom-4 bg-white/10 w-32 h-32 rounded-full blur-2xl"></div>
            </div>

            {/* Rankings List */}
            <h2 className="font-bold mb-4 text-slate-900">Weekly Top 10</h2>
            <div className="space-y-3 overflow-y-auto">
                {RANKINGS.map((user) => (
                    <div
                        key={user.id}
                        className={`flex items-center gap-4 p-4 rounded-xl shadow-sm border border-slate-100 ${user.name === 'You' ? 'bg-primary/5 border-primary/20' : 'bg-white'}`}
                    >
                        <div className="font-bold text-slate-400 w-6">{user.rank}</div>

                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${user.avatar}`}>
                            {user.rank <= 3 ? <Medal size={20} /> : user.name[0]}
                        </div>

                        <div className="flex-1">
                            <div className="font-bold text-slate-900">{user.name}</div>
                            <div className="flex items-center gap-3 text-xs text-slate-500">
                                <span className="flex items-center gap-1">
                                    <Leaf size={10} className="text-green-500" />
                                    {user.co2}kg CO2
                                </span>
                                <span className="flex items-center gap-1">
                                    <TrendingUp size={10} className="text-blue-500" />
                                    ${user.saved} saved
                                </span>
                            </div>
                        </div>

                        <div className="font-bold text-primary">{user.points}</div>
                    </div>
                ))}
            </div>
        </PageTransition>
    );
};

export default Leaderboard;

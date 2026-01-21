import React from 'react';
import { CreditCard, DollarSign, History } from 'lucide-react';
import { CURRENT_USER } from '../data/mock';

const Wallet = () => {
    return (
        <div className="h-full p-4 bg-background">
            <h1 className="text-2xl font-bold mb-6">Wallet</h1>

            {/* Balance Card */}
            <div className="bg-gradient-to-br from-primary to-secondary text-white p-6 rounded-2xl shadow-lg mb-6">
                <div className="text-white/80 text-sm mb-1">Total Savings</div>
                <div className="text-4xl font-bold mb-4">$142.50</div>
                <div className="flex gap-2 text-xs">
                    <span className="bg-white/20 px-2 py-1 rounded">12 Rescues</span>
                    <span className="bg-white/20 px-2 py-1 rounded">Rank: Waste Warrior</span>
                </div>
            </div>

            {/* Payment Methods */}
            <h2 className="text-lg font-bold mb-3">Payment Methods</h2>
            <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex items-center gap-3">
                <div className="bg-slate-100 p-2 rounded-full">
                    <CreditCard size={20} className="text-slate-600" />
                </div>
                <div className="flex-1">
                    <div className="font-bold text-sm">Apple Pay</div>
                    <div className="text-xs text-slate-500">Default</div>
                </div>
                <button className="text-primary text-sm font-bold">Edit</button>
            </div>

            {/* Credits */}
            <h2 className="text-lg font-bold mb-3">Credits</h2>
            <div className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <DollarSign size={20} className="text-green-500" />
                    <span className="font-medium">Rescue Credits</span>
                </div>
                <span className="font-bold text-green-600">${CURRENT_USER.credits.toFixed(2)}</span>
            </div>
        </div>
    );
};

export default Wallet;

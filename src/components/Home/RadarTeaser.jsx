import React from 'react';
import { Radar, ChevronRight } from 'lucide-react';

const RadarTeaser = ({ count = 3, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="relative w-full h-48 bg-slate-900 rounded-2xl overflow-hidden shadow-xl group cursor-pointer"
        >
            {/* Dark Map Background Effect */}
            <div className="absolute inset-0 opacity-60 mix-blend-luminosity bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110"></div>

            {/* Radar Sweep Animation Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>

            {/* Content */}
            <div className="absolute inset-0 p-5 flex flex-col justify-end">
                <div className="flex justify-between items-end">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                            </span>
                            <span className="text-red-400 font-bold uppercase tracking-wider text-xs">Live Scanning</span>
                        </div>
                        <h2 className="text-2xl font-black text-white leading-none mb-1">Rescue Radar</h2>
                        <p className="text-slate-300 text-sm">
                            <strong className="text-white">{count} orders</strong> vanishing nearby
                        </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md p-2 rounded-full group-hover:bg-white group-hover:text-slate-900 transition-all text-white">
                        <ChevronRight size={24} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RadarTeaser;

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Clock, ChevronRight } from 'lucide-react';

const AlertOverlay = ({ alerts, onAlertClick }) => {
    return (
        <div className="absolute top-20 left-4 right-4 z-[1000] flex flex-col gap-2 pointer-events-none">
            <AnimatePresence>
                {alerts.map((alert) => (
                    <motion.div
                        key={alert.id}
                        initial={{ opacity: 0, y: -20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="bg-white/95 backdrop-blur-md shadow-lg rounded-xl p-3 border border-slate-100 pointer-events-auto flex items-center justify-between cursor-pointer"
                        onClick={() => onAlertClick && onAlertClick(alert)}
                    >
                        <div className="flex items-center gap-3">
                            <div className="bg-red-50 p-2 rounded-full">
                                <Globe size={20} className="text-red-500 animate-pulse" />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800 text-sm">{alert.restaurantName}</h4>
                                <p className="text-xs text-slate-500 flex items-center gap-1">
                                    <span>{alert.item}</span>
                                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                    <span className="text-green-600 font-bold">Save {alert.discount}%</span>
                                </p>
                            </div>
                        </div>
                        <ChevronRight size={18} className="text-slate-300" />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default AlertOverlay;

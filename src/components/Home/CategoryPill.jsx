import React from 'react';

const CategoryPill = ({ icon, label, isActive, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`
                flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all
                ${isActive
                    ? 'bg-slate-900 text-white shadow-md transform scale-105'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }
            `}
        >
            <span className="text-lg">{icon}</span>
            <span>{label}</span>
        </button>
    );
};

export default CategoryPill;

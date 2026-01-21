import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Map, Wallet, User, CircleHelp } from 'lucide-react';
import clsx from 'clsx';
import OnboardingTour from '../Common/OnboardingTour';

const NavItem = ({ to, icon: Icon, label }) => (
    <NavLink
        to={to}
        className={({ isActive }) => clsx(
            "flex flex-col items-center justify-center w-full h-full gap-1 transition-colors duration-200",
            isActive ? "text-primary" : "text-slate-400 hover:text-slate-600"
        )}
    >
        <Icon size={24} />
        <span className="text-[10px] font-medium">{label}</span>
    </NavLink>
);

const MobileLayout = () => {
    return (
        <div className="flex flex-col h-screen max-w-md mx-auto bg-background shadow-2xl overflow-hidden relative border-x border-slate-200">
            <OnboardingTour />
            <main className="flex-1 overflow-y-auto overflow-x-hidden relative">
                <Outlet />
            </main>

            <nav className="h-16 bg-surface border-t border-slate-200 flex justify-around items-center px-2 z-50 shrink-0">
                <NavItem to="/" icon={Map} label="Radar" />
                <NavItem to="/wallet" icon={Wallet} label="Wallet" />
                <NavItem to="/profile" icon={User} label="Profile" />
            </nav>
        </div>
    );
};

export default MobileLayout;

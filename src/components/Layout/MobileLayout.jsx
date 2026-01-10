import React from 'react';
import { Home, Search, ShoppingBag, User } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';
import clsx from 'clsx';
import './Layout.css';

const NavItem = ({ to, icon: Icon, label }) => (
    <NavLink
        to={to}
        className={({ isActive }) => clsx('nav-item', isActive && 'nav-item--active')}
    >
        <Icon size={24} />
        <span className="nav-item__label">{label}</span>
    </NavLink>
);

export const MobileLayout = () => {
    return (
        <div className="mobile-shell">
            <main className="mobile-content">
                <Outlet />
            </main>
            <nav className="bottom-nav">
                <NavItem to="/" icon={Home} label="Home" />
                <NavItem to="/browse" icon={Search} label="Browse" />
                <NavItem to="/orders" icon={ShoppingBag} label="Orders" />
                <NavItem to="/account" icon={User} label="Account" />
            </nav>
        </div>
    );
};

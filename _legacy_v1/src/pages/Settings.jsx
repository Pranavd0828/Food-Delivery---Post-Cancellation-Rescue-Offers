import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from '../components/Common/Button';
import { Card } from '../components/Common/Card';
import { Moon, Sun, ChevronRight, User, Bell, Shield } from 'lucide-react';
import './Settings.css';

export default function Settings() {
    const { theme, toggleTheme } = useTheme();

    const SettingItem = ({ icon: Icon, label, action }) => (
        <div className="setting-item">
            <div className="setting-icon-wrapper">
                <Icon size={20} />
            </div>
            <span className="setting-label">{label}</span>
            {action || <ChevronRight size={20} className="text-secondary" />}
        </div>
    );

    return (
        <div className="settings-page">
            <header className="settings-header">
                <h1>Account</h1>
            </header>

            <div className="settings-content">
                <div className="user-profile mb-6">
                    <div className="avatar">AD</div>
                    <div>
                        <h2>Alex Visitor</h2>
                        <p className="text-secondary">Gold Member</p>
                    </div>
                </div>

                <section className="settings-group">
                    <h3 className="group-title">Preferences</h3>
                    <Card padding="none">
                        <div className="setting-list">
                            <div className="setting-item" onClick={toggleTheme}>
                                <div className="setting-icon-wrapper">
                                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                                </div>
                                <span className="setting-label">Dark Mode</span>
                                <div className={`toggle-switch ${theme === 'dark' ? 'active' : ''}`}>
                                    <div className="toggle-thumb" />
                                </div>
                            </div>
                        </div>
                    </Card>
                </section>

                <section className="settings-group">
                    <h3 className="group-title">General</h3>
                    <Card padding="none">
                        <div className="setting-list">
                            <SettingItem icon={User} label="Profile Information" />
                            <SettingItem icon={Bell} label="Notifications" />
                            <SettingItem icon={Shield} label="Privacy & Security" />
                        </div>
                    </Card>
                </section>

                <div className="mt-8 text-center">
                    <p className="text-xs text-secondary">DashDrop v1.0.0 (Prototype)</p>
                    <Button variant="ghost" className="text-accent mt-2">Sign Out</Button>
                </div>
            </div>
        </div>
    );
}

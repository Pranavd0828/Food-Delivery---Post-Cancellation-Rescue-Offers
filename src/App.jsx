import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import MobileLayout from './components/Layout/MobileLayout';
import Home from './pages/Home';
import RescueDetails from './pages/RescueDetails';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import Wallet from './pages/Wallet';
import Leaderboard from './pages/Leaderboard';

function App() {
  const location = useLocation();

  return (
    <div className="h-screen w-full bg-background text-slate-900 overflow-hidden flex flex-col font-sans">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<MobileLayout />}>
            <Route index element={<Home />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="wallet" element={<Wallet />} />
            <Route path="profile" element={<div className="p-4">Profile Coming Soon</div>} />
          </Route>
          <Route path="/rescue/:offerId" element={<RescueDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;

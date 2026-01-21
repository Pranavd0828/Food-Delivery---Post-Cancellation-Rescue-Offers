import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MobileLayout from './components/Layout/MobileLayout';
import Home from './pages/Home';
import RescueDetails from './pages/RescueDetails';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import Wallet from './pages/Wallet';

function App() {
  return (
    <div className="h-screen w-full bg-background text-slate-900 overflow-hidden flex flex-col font-sans">
      <Routes>
        <Route path="/" element={<MobileLayout />}>
          <Route index element={<Home />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="profile" element={<div className="p-4">Profile Coming Soon</div>} />
        </Route>
        <Route path="/rescue/:offerId" element={<RescueDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </div>
  );
}

export default App;

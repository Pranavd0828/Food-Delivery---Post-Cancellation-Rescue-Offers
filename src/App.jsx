import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MobileLayout } from './components/Layout/MobileLayout';
import Home from './pages/Home';
import RescueDetails from './pages/RescueDetails';
import Checkout from './pages/Checkout';
import Tracking from './pages/Tracking';
import Receipt from './pages/Receipt';
import Settings from './pages/Settings';
import Impact from './pages/Impact';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MobileLayout />}>
        <Route index element={<Home />} />
        <Route path="browse" element={<div>Browse (Mock)</div>} />
        <Route path="orders" element={<Tracking />} />
        <Route path="account" element={<Settings />} />
        <Route path="impact" element={<Impact />} />
      </Route>
      {/* Full screen routes */}
      <Route path="/rescue/:offerId" element={<RescueDetails />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/receipt" element={<Receipt />} />
    </Routes>
  );
}

export default App;

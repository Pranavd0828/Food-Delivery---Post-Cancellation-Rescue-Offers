import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MobileLayout from './components/Layout/MobileLayout';
import Home from './pages/Home';

function App() {
  return (
    <div className="h-screen w-full bg-background text-slate-900 overflow-hidden flex flex-col font-sans">
      <Routes>
        <Route path="/" element={<MobileLayout />}>
          <Route index element={<Home />} />
          <Route path="wallet" element={<div className="p-4">Wallet Coming Soon</div>} />
          <Route path="profile" element={<div className="p-4">Profile Coming Soon</div>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

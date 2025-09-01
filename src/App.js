import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Broadband from './pages/Broadband';
import CableTV from './pages/CableTV';
import Support from './pages/Support';
import EnquiryForm from './pages/EnquiryForm';
import PinCodePage from './pages/PinCodePage';
import BuyConnectionForm from './pages/BuyConnectionForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/broadband" element={<Broadband />} />
          <Route path="/cable-tv" element={<CableTV />} />
          <Route path="/support" element={<Support />} />
          <Route path="/enquire" element={<EnquiryForm />} />
          <Route path="/pincodes" element={<PinCodePage />} />
          <Route path="/buy-connection-form" element={<BuyConnectionForm />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

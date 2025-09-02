import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import FloatingActionButton from './components/FloatingActionButton';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Broadband = lazy(() => import('./pages/Broadband'));
const CableTV = lazy(() => import('./pages/CableTV'));
const Support = lazy(() => import('./pages/Support'));
const EnquiryForm = lazy(() => import('./pages/EnquiryForm'));
const PinCodePage = lazy(() => import('./pages/PinCodePage'));
const BuyConnectionForm = lazy(() => import('./pages/BuyConnectionForm'));

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <div className="App">
          <Navbar />
          <main>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/broadband" element={<Broadband />} />
                <Route path="/cable-tv" element={<CableTV />} />
                <Route path="/support" element={<Support />} />
                <Route path="/enquire" element={<EnquiryForm />} />
                <Route path="/pincodes" element={<PinCodePage />} />
                <Route path="/buy-connection-form" element={<BuyConnectionForm />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <FloatingActionButton />
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

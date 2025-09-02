import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { registerServiceWorker } from './utils/serviceWorkerRegistration';

// Performance monitoring
const reportWebVitals = (metric) => {
  console.log('📊 Web Vitals:', metric);
  
  // In production, you could send this to analytics
  // sendToAnalytics('web-vitals', metric);
};

// Register service worker for offline functionality
try {
  registerServiceWorker();
} catch (error) {
  console.warn('Service Worker registration failed:', error);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Performance monitoring
if (process.env.NODE_ENV === 'production') {
  import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    getCLS(reportWebVitals);
    getFID(reportWebVitals);
    getFCP(reportWebVitals);
    getLCP(reportWebVitals);
    getTTFB(reportWebVitals);
  }).catch(error => {
    console.warn('Web Vitals failed to load:', error);
  });
} 
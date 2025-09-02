// Service Worker Registration Utility
export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/sw.js`;
      
      registerValidSW(swUrl);
    });
  }
}

function registerValidSW(swUrl) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      console.log('🚀 Service Worker registered successfully:', registration);
      
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // New content available
              console.log('🆕 New content is available; please refresh.');
              showUpdateNotification();
            } else {
              // Content cached for offline use
              console.log('📱 Content is cached for offline use.');
            }
          }
        };
      };
      
      // Handle service worker updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              showUpdateNotification();
            }
          });
        }
      });
      
      // Handle service worker controller change
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('🔄 Service Worker controller changed');
        window.location.reload();
      });
      
      // Handle service worker messages
      navigator.serviceWorker.addEventListener('message', (event) => {
        console.log('📨 Message from Service Worker:', event.data);
        
        if (event.data && event.data.type === 'BACKGROUND_SYNC_COMPLETE') {
          console.log('✅ Background sync completed');
        }
      });
    })
    .catch((error) => {
      console.error('❌ Error during service worker registration:', error);
    });
}

function showUpdateNotification() {
  try {
    // Create a custom update notification
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #ff6600 0%, #ff7a1a 100%);
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 12px;
      box-shadow: 0 8px 25px rgba(255, 102, 0, 0.3);
      z-index: 10000;
      font-family: 'Poppins', sans-serif;
      font-weight: 600;
      max-width: 300px;
      animation: slideIn 0.3s ease-out;
    `;
    
    notification.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
        <span style="font-size: 1.2rem;">🆕</span>
        <span>New Update Available</span>
      </div>
      <p style="margin: 0 0 1rem 0; font-size: 0.9rem; opacity: 0.9;">
        A new version of SPEEDLINK is available. Refresh to get the latest features!
      </p>
      <div style="display: flex; gap: 0.5rem;">
        <button id="refresh-btn" style="
          background: white;
          color: #ff6600;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        ">Refresh Now</button>
        <button id="dismiss-btn" style="
          background: transparent;
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 0.5rem 1rem;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        ">Dismiss</button>
      </div>
      <style>
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        #refresh-btn:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
        #dismiss-btn:hover { background: rgba(255,255,255,0.1); }
      </style>
    `;
    
    document.body.appendChild(notification);
    
    // Add event listeners
    const refreshBtn = notification.querySelector('#refresh-btn');
    const dismissBtn = notification.querySelector('#dismiss-btn');
    
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => {
        window.location.reload();
      });
    }
    
    if (dismissBtn) {
      dismissBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
          if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
          }
        }, 300);
      });
    }
    
    // Auto-dismiss after 10 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
          if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
          }
        }, 300);
      }
    }, 10000);
    
    // Add slideOut animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  } catch (error) {
    console.warn('Failed to show update notification:', error);
  }
}

export function unregisterServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}

// Check if service worker is supported
export function isServiceWorkerSupported() {
  return 'serviceWorker' in navigator;
}

// Get service worker registration
export function getServiceWorkerRegistration() {
  if ('serviceWorker' in navigator) {
    return navigator.serviceWorker.ready;
  }
  return Promise.reject(new Error('Service Worker not supported'));
}

// Send message to service worker
export function sendMessageToSW(message) {
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage(message);
  }
}

// Request background sync
export function requestBackgroundSync(tag = 'background-sync') {
  if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
    return navigator.serviceWorker.ready.then((registration) => {
      return registration.sync.register(tag);
    });
  }
  return Promise.reject(new Error('Background Sync not supported'));
}

// Request notification permission
export function requestNotificationPermission() {
  if ('Notification' in window) {
    return Notification.requestPermission();
  }
  return Promise.reject(new Error('Notifications not supported'));
}

// Check notification permission
export function getNotificationPermission() {
  if ('Notification' in window) {
    return Notification.permission;
  }
  return 'denied';
}

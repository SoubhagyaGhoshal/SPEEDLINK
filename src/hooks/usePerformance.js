import { useEffect, useRef, useCallback } from 'react';

export const usePerformance = (pageName = 'Unknown') => {
  const startTime = useRef(performance.now());
  const interactionCount = useRef(0);
  const scrollDepth = useRef(0);
  const lastScrollTime = useRef(0);

  // Track page load performance
  useEffect(() => {
    const handleLoad = () => {
      const loadTime = performance.now() - startTime.current;
      const navigation = performance.getEntriesByType('navigation')[0];
      
      if (navigation) {
        const metrics = {
          page: pageName,
          loadTime: Math.round(loadTime),
          domContentLoaded: Math.round(navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart),
          firstPaint: performance.getEntriesByType('paint').find(entry => entry.name === 'first-paint')?.startTime,
          firstContentfulPaint: performance.getEntriesByType('paint').find(entry => entry.name === 'first-contentful-paint')?.startTime,
          timestamp: new Date().toISOString()
        };

        // Log performance metrics
        console.log('🚀 Page Performance:', metrics);
        
        // In production, you could send this to analytics
        // sendToAnalytics('performance', metrics);
      }
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, [pageName]);

  // Track user interactions
  const trackInteraction = useCallback((type, details = {}) => {
    interactionCount.current++;
    
    const interaction = {
      type,
      timestamp: new Date().toISOString(),
      page: pageName,
      interactionNumber: interactionCount.current,
      details
    };

    console.log('👆 User Interaction:', interaction);
    
    // In production, you could send this to analytics
    // sendToAnalytics('interaction', interaction);
  }, [pageName]);

  // Track scroll depth
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      
      // Only track significant scroll changes (every 25%)
      if (scrollPercent >= scrollDepth.current + 25) {
        scrollDepth.current = scrollPercent;
        lastScrollTime.current = Date.now();
        
        trackInteraction('scroll', {
          scrollDepth: scrollPercent,
          scrollTop,
          docHeight
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [trackInteraction]);

  // Track visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        trackInteraction('page_hide', {
          timeOnPage: Date.now() - startTime.current
        });
      } else {
        trackInteraction('page_show');
        startTime.current = performance.now();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [trackInteraction]);

  // Track beforeunload
  useEffect(() => {
    const handleBeforeUnload = () => {
      const timeOnPage = Date.now() - startTime.current;
      trackInteraction('page_unload', {
        timeOnPage,
        scrollDepth: scrollDepth.current
      });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [trackInteraction]);

  // Track errors
  useEffect(() => {
    const handleError = (event) => {
      trackInteraction('error', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error?.stack
      });
    };

    const handleUnhandledRejection = (event) => {
      trackInteraction('unhandled_rejection', {
        reason: event.reason
      });
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, [trackInteraction]);

  // Track memory usage (if available)
  useEffect(() => {
    if ('memory' in performance) {
      const trackMemory = () => {
        const memory = performance.memory;
        trackInteraction('memory_usage', {
          usedJSHeapSize: Math.round(memory.usedJSHeapSize / 1048576), // MB
          totalJSHeapSize: Math.round(memory.totalJSHeapSize / 1048576), // MB
          jsHeapSizeLimit: Math.round(memory.jsHeapSizeLimit / 1048576) // MB
        });
      };

      // Track memory every 30 seconds
      const interval = setInterval(trackMemory, 30000);
      return () => clearInterval(interval);
    }
  }, [trackInteraction]);

  // Track long tasks (if available)
  useEffect(() => {
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (entry.duration > 50) { // Tasks longer than 50ms
              trackInteraction('long_task', {
                duration: Math.round(entry.duration),
                startTime: Math.round(entry.startTime),
                name: entry.name
              });
            }
          });
        });

        observer.observe({ entryTypes: ['longtask'] });
        return () => observer.disconnect();
      } catch (e) {
        console.warn('Long task observer not supported:', e);
      }
    }
  }, [trackInteraction]);

  return {
    trackInteraction,
    getMetrics: () => ({
      timeOnPage: Date.now() - startTime.current,
      interactionCount: interactionCount.current,
      scrollDepth: scrollDepth.current
    })
  };
};

export default usePerformance;

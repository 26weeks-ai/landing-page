import { useState, useEffect } from 'react';

interface PerformanceMetrics {
  loadTime: number | null;
  timeToFirstByte: number | null;
  domContentLoaded: number | null;
  firstPaint: number | null;
  firstContentfulPaint: number | null;
  isDataCollected: boolean;
}

/**
 * Custom hook to measure and track website performance metrics
 */
export function usePerformance(): PerformanceMetrics {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: null,
    timeToFirstByte: null,
    domContentLoaded: null,
    firstPaint: null,
    firstContentfulPaint: null,
    isDataCollected: false
  });

  useEffect(() => {
    // Ensure this only runs in the browser and after page load
    if (typeof window === 'undefined' || !window.performance) {
      return;
    }

    const collectMetrics = () => {
      try {
        // Load time (navigation to complete page load)
        const loadTime = 
          performance.timing.loadEventEnd - performance.timing.navigationStart;

        // Time to First Byte (TTFB)
        const timeToFirstByte = 
          performance.timing.responseStart - performance.timing.navigationStart;

        // DOM Content Loaded
        const domContentLoaded = 
          performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;

        // First Paint and First Contentful Paint
        let firstPaint = null;
        let firstContentfulPaint = null;

        const perfEntries = performance.getEntriesByType('paint');
        perfEntries.forEach((entry) => {
          if (entry.name === 'first-paint') {
            firstPaint = entry.startTime;
          }
          if (entry.name === 'first-contentful-paint') {
            firstContentfulPaint = entry.startTime;
          }
        });

        setMetrics({
          loadTime,
          timeToFirstByte,
          domContentLoaded,
          firstPaint,
          firstContentfulPaint,
          isDataCollected: true
        });
      } catch (error) {
        console.error('Error collecting performance metrics:', error);
        setMetrics({
          ...metrics,
          isDataCollected: false
        });
      }
    };

    // Collect metrics when the page has fully loaded
    if (document.readyState === 'complete') {
      collectMetrics();
    } else {
      window.addEventListener('load', collectMetrics);
      return () => window.removeEventListener('load', collectMetrics);
    }
  }, []);

  return metrics;
}

/**
 * Utility component to log performance metrics to console in development
 */
export function PerformanceLogger(): null {
  const metrics = usePerformance();
  
  useEffect(() => {
    if (metrics.isDataCollected && process.env.NODE_ENV !== 'production') {
      console.log('Performance Metrics:', {
        'Load Time': `${metrics.loadTime}ms`,
        'Time to First Byte': `${metrics.timeToFirstByte}ms`,
        'DOM Content Loaded': `${metrics.domContentLoaded}ms`,
        'First Paint': `${metrics.firstPaint}ms`,
        'First Contentful Paint': `${metrics.firstContentfulPaint}ms`
      });
    }
  }, [metrics.isDataCollected]);
  
  return null;
}
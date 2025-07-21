import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { PerformanceLogger } from './hooks/use-performance';

// Performance optimization with priority loading
const startRender = () => {
  const root = document.getElementById("root");
  if (!root) {
    console.error("Root element not found");
    return;
  }

  // Create a single root and render the app with performance logger if in development
  if (import.meta.env.MODE !== 'production') {
    const AppWithPerformanceLogging = () => (
      <>
        <App />
        <PerformanceLogger />
      </>
    );
    
    createRoot(root).render(<AppWithPerformanceLogging />);
  } else {
    createRoot(root).render(<App />);
  }
};

// Optimized loading strategy
const initializeApp = () => {
  // Use requestIdleCallback if available for better performance
  if ('requestIdleCallback' in window) {
    requestIdleCallback(startRender, { timeout: 100 });
  } else {
    startRender();
  }
};

// Start rendering immediately if document is already ready
if (document.readyState === 'interactive' || document.readyState === 'complete') {
  initializeApp();
} else {
  // Otherwise wait for DOMContentLoaded event
  document.addEventListener('DOMContentLoaded', initializeApp);
}

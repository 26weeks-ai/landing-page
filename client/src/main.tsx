import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { PerformanceLogger } from './hooks/use-performance';

// Performance optimization
const startRender = () => {
  // Create a single root and render the app with performance logger if in development
  if (process.env.NODE_ENV !== 'production') {
    const AppWithPerformanceLogging = () => (
      <>
        <App />
        <PerformanceLogger />
      </>
    );
    
    createRoot(document.getElementById("root")!).render(<AppWithPerformanceLogging />);
  } else {
    createRoot(document.getElementById("root")!).render(<App />);
  }
};

// Start rendering immediately if document is already interactive
if (document.readyState === 'interactive' || document.readyState === 'complete') {
  startRender();
} else {
  // Otherwise wait for DOMContentLoaded event
  document.addEventListener('DOMContentLoaded', startRender);
}

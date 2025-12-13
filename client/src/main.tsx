import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { PerformanceLogger } from './hooks/use-performance';

const root = document.getElementById("root");
if (!root) {
  throw new Error("Root element not found");
}

createRoot(root).render(
  import.meta.env.DEV ? (
    <>
      <App />
      <PerformanceLogger />
    </>
  ) : (
    <App />
  ),
);

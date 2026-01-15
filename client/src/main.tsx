import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { PerformanceLogger } from './hooks/use-performance';

const root = document.getElementById("root");
if (!root) {
  throw new Error("Root element not found");
}

const appShell = document.getElementById("app-shell");
if (appShell) {
  let frames = 0;
  const isCssReady = () =>
    document.documentElement.classList.contains("css-loaded") ||
    !document.querySelector('link[rel="stylesheet"][media="print"]');

  const tryRemoveShell = () => {
    frames += 1;
    if (root.childElementCount > 0 && (isCssReady() || frames >= 240)) {
      appShell.remove();
      return;
    }

    if (frames < 240) {
      window.requestAnimationFrame(tryRemoveShell);
    }
  };

  window.requestAnimationFrame(tryRemoveShell);
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

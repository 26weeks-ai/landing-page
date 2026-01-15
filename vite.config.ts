import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const deferCssPlugin = () => ({
  name: "defer-css",
  apply: "build",
  transformIndexHtml(html: string) {
    return html.replace(
      /<link rel="stylesheet"([^>]*href="\/assets\/[^"]+\.css"[^>]*)>/g,
      (match) => {
        const attrsMatch = match.match(/<link rel="stylesheet"([^>]*)>/);
        if (!attrsMatch) return match;

        const cleanedAttrs = attrsMatch[1]
          .replace(/\s*media="[^"]*"/i, "")
          .replace(/\s*onload="[^"]*"/i, "");

        const asyncLink = `<link rel="stylesheet"${cleanedAttrs} media="print" onload="this.media='all';document.documentElement.classList.add('css-loaded')">`;
        const noscript = `<noscript><link rel="stylesheet"${cleanedAttrs}></noscript>`;
        return `${asyncLink}\n    ${noscript}`;
      },
    );
  },
});

export default defineConfig({
  plugins: [react(), deferCssPlugin()],
  base: "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
    },
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
  },
});

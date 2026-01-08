import { spawn } from "node:child_process";
import net from "node:net";
import path from "node:path";

const HOST = process.env.LH_HOST ?? "127.0.0.1";
const PORT = Number(process.env.LH_PORT ?? "4173");
const REPORT_PATH = process.env.LH_REPORT_PATH ?? "lighthouse.preview.json";
const PRESET = process.env.LH_PRESET ?? "desktop";

const npxCommand = process.platform === "win32" ? "npx.cmd" : "npx";
const viteBin = path.resolve("node_modules", "vite", "bin", "vite.js");

function spawnAsync(command, args, options) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, options);
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} ${args.join(" ")} exited with code ${code}`));
    });
  });
}

async function waitForUrl(url, timeoutMs = 30_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(1500) });
      if (response.ok) return;
    } catch {
      // ignore
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Timed out waiting for ${url}`);
}

async function findAvailablePort(startPort, host, tries = 20) {
  for (let offset = 0; offset < tries; offset += 1) {
    const candidate = startPort + offset;
    const available = await new Promise((resolve) => {
      const server = net.createServer();
      server.unref();
      server.on("error", (error) => {
        if (error && (error.code === "EADDRINUSE" || error.code === "EACCES")) resolve(false);
        else resolve(false);
      });
      server.listen(candidate, host, () => {
        server.close(() => resolve(true));
      });
    });
    if (available) return candidate;
  }
  throw new Error(`Could not find an available port starting at ${startPort}`);
}

const resolvedPort = await findAvailablePort(PORT, HOST);
if (resolvedPort !== PORT) {
  console.warn(`Port ${PORT} is busy; using ${resolvedPort} instead.`);
}

const url = `http://${HOST}:${resolvedPort}/`;

let previewProcess;
const shutdown = () => {
  if (previewProcess && !previewProcess.killed) {
    previewProcess.kill("SIGTERM");
  }
};

process.on("SIGINT", () => {
  shutdown();
  process.exit(130);
});
process.on("SIGTERM", () => {
  shutdown();
  process.exit(143);
});

try {
  await spawnAsync(process.execPath, [viteBin, "build"], { stdio: "inherit" });

  previewProcess = spawn(
    process.execPath,
    [viteBin, "preview", "--host", HOST, "--port", String(resolvedPort), "--strictPort"],
    { stdio: "inherit" },
  );

  await waitForUrl(url);

  await spawnAsync(
    npxCommand,
    [
      "-y",
      "lighthouse",
      url,
      "--preset",
      PRESET,
      "--only-categories=performance,accessibility,seo,best-practices",
      "--output=json",
      "--output-path",
      REPORT_PATH,
      "--no-enable-error-reporting",
      '--chrome-flags=--headless=new --no-sandbox --disable-extensions',
    ],
    { stdio: "inherit" },
  );
} finally {
  shutdown();
}

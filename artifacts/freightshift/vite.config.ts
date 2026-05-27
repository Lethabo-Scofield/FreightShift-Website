import { defineConfig, type PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const OLYXEE_PREFIX = "/api/olyxee";
const OLYXEE_TARGET = "https://logistics.olyxee.com";

function olyxeeProxyPlugin(): PluginOption {
  const handler: any = async (req: any, res: any, next: any) => {
    if (!req.url || !req.url.startsWith(OLYXEE_PREFIX)) return next();
    const upstream = OLYXEE_TARGET + req.url.slice(OLYXEE_PREFIX.length);
    try {
      const upstreamRes = await fetch(upstream, {
        method: req.method,
        headers: {
          Accept: "application/json",
          "User-Agent": "FreightShift-Proxy/1.0",
        },
        redirect: "follow",
      });
      res.statusCode = upstreamRes.status;
      const ct = upstreamRes.headers.get("content-type");
      if (ct) res.setHeader("content-type", ct);
      const body = await upstreamRes.arrayBuffer();
      res.end(Buffer.from(body));
    } catch {
      res.statusCode = 502;
      res.setHeader("content-type", "application/json");
      res.end(JSON.stringify({ error: "upstream_unreachable" }));
    }
  };
  return {
    name: "olyxee-proxy",
    configureServer(server) {
      server.middlewares.use(handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler);
    },
  };
}

const rawPort = process.env.PORT ?? "5173";
const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH ?? "/";

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    runtimeErrorOverlay(),
    olyxeeProxyPlugin(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, ".."),
            }),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});

import { defineConfig, type PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { handleQuote } from "./src/server/quote";

const OLYXEE_PREFIX = "/api/olyxee";
const OLYXEE_TARGET = "https://logistics.olyxee.com";

function readJsonBody(req: any): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    let size = 0;
    req.on("data", (chunk: Buffer) => {
      size += chunk.length;
      if (size > 1_000_000) {
        reject(new Error("payload_too_large"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => {
      const raw = Buffer.concat(chunks).toString("utf8").trim();
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch {
        reject(new Error("invalid_json"));
      }
    });
    req.on("error", reject);
  });
}

// Handles POST /api/quote in both dev (configureServer) and
// production preview/serve (configurePreviewServer). Sends the quote
// notification email via the Replit Mail integration (blueprint:replitmail).
function quoteApiPlugin(): PluginOption {
  const handler: any = async (req: any, res: any, next: any) => {
    if (!req.url || req.url.split("?")[0] !== "/api/quote") return next();
    if (req.method !== "POST") {
      res.statusCode = 405;
      res.setHeader("content-type", "application/json");
      res.setHeader("allow", "POST");
      res.end(JSON.stringify({ error: "method_not_allowed" }));
      return;
    }
    try {
      const body = await readJsonBody(req);
      const result = await handleQuote(body);
      res.statusCode = result.status;
      res.setHeader("content-type", "application/json");
      res.end(JSON.stringify(result.json));
    } catch (err) {
      res.statusCode = 400;
      res.setHeader("content-type", "application/json");
      const message = err instanceof Error ? err.message : "bad_request";
      res.end(JSON.stringify({ error: message }));
    }
  };
  return {
    name: "quote-api",
    configureServer(server) {
      server.middlewares.use(handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler);
    },
  };
}

// Development only: disable caching so the Replit preview iframe never serves
// a stale (e.g. blank) version of the app.
function noCacheInDevPlugin(): PluginOption {
  return {
    name: "no-cache-in-dev",
    configureServer(server) {
      server.middlewares.use((_req, res, next) => {
        res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
        res.setHeader("Pragma", "no-cache");
        res.setHeader("Expires", "0");
        next();
      });
    },
  };
}

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
    noCacheInDevPlugin(),
    quoteApiPlugin(),
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

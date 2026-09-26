import { defineConfig } from "vite";

const prettyPaths = {
  "/coming-soon": "/index.html",
  "/home": "/home.html",
  "/terms": "/terms.html",
  "/privacy": "/privacy.html",
  "/design-system": "/design-system.html",
};

const pathKey = (req) => {
  const raw = req.url || "";
  const [path] = raw.split("?");
  return path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
};

const rewritePrettyUrls = (req, _res, next) => {
  const raw = req.url || "";
  const [, query] = raw.split("?");
  const mapped = prettyPaths[pathKey(req)];
  if (mapped) {
    req.url = mapped + (query ? `?${query}` : "");
  }
  next();
};

const posthogProxy = {
  "/ingest/static": {
    target: "https://us-assets.i.posthog.com",
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/ingest\/static/, "/static"),
  },
  "/ingest/array": {
    target: "https://us-assets.i.posthog.com",
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/ingest\/array/, "/array"),
  },
  "/ingest": {
    target: "https://us.i.posthog.com",
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/ingest/, ""),
  },
};

export default defineConfig({
  appType: "mpa",
  plugins: [
    {
      name: "pretty-html-urls",
      configureServer(server) {
        server.middlewares.use(rewritePrettyUrls);
      },
      configurePreviewServer(server) {
        server.middlewares.use(rewritePrettyUrls);
      },
    },
  ],
  // Mirrors vercel.json PostHog first-party proxy for local `vite` / `vite preview`.
  server: {
    proxy: posthogProxy,
  },
  preview: {
    proxy: posthogProxy,
  },
});

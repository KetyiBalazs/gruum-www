import { defineConfig } from "vite";

const prettyPaths = {
  "/coming-soon": "/coming-soon.html",
  "/coming-soon-2": "/coming-soon-2.html",
};

const redirects = {
  "/home": "/coming-soon",
};

const pathKey = (req) => {
  const raw = req.url || "";
  const [path] = raw.split("?");
  return path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
};

const redirectHome = (req, res, next) => {
  const dest = redirects[pathKey(req)];
  if (!dest) {
    next();
    return;
  }
  const query = (req.url || "").split("?")[1];
  res.statusCode = 302;
  res.setHeader("Location", dest + (query ? `?${query}` : ""));
  res.end();
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

export default defineConfig({
  appType: "mpa",
  plugins: [
    {
      name: "pretty-html-urls",
      configureServer(server) {
        server.middlewares.use(redirectHome);
        server.middlewares.use(rewritePrettyUrls);
      },
      configurePreviewServer(server) {
        server.middlewares.use(redirectHome);
        server.middlewares.use(rewritePrettyUrls);
      },
    },
  ],
});

import { renderDuranHomePage } from "./homepage.js";

const HTML_HEADERS = {
  "content-type": "text/html; charset=utf-8",
  "cache-control": "no-store",
  "x-content-type-options": "nosniff"
};

const TEXT_HEADERS = {
  "content-type": "text/plain; charset=utf-8",
  "cache-control": "no-store",
  "x-content-type-options": "nosniff"
};

export default {
  async fetch(request, env = {}) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: TEXT_HEADERS });
    }

    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method Not Allowed", { status: 405, headers: TEXT_HEADERS });
    }

    if (url.pathname === "/" || url.pathname === "/index.html") {
      const assetBase = env.ASSET_BASE_URL || "";
      const assetPrefix = assetBase ? `${assetBase.replace(/\/+$/, "")}/assets` : "/assets";
      const mapSrc = `${assetPrefix}/arcadia-map.png`;
      return new Response(renderDuranHomePage({ assetBase, assetPrefix, mapSrc }), { headers: HTML_HEADERS });
    }

    if (url.pathname.startsWith("/assets/") && env.ASSETS) {
      const assetUrl = new URL(request.url);
      assetUrl.pathname = `/${url.pathname.replace(/^\/assets\//, "")}`;
      return env.ASSETS.fetch(new Request(assetUrl.toString(), {
        method: request.method,
        headers: request.headers
      }));
    }

    return new Response("Not Found", { status: 404, headers: TEXT_HEADERS });
  }
};

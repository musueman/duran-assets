const DEFAULT_ASSET_BASE_URL = "https://musueman.github.io/duran-assets";
const DICE_ASSET_DIR = "/dice";
const BACK_ASSET_DIR = "/dice/back";
const DICE_ASSET_VALUES = [1, 2, 3, 4, 5, 6];
const BACK_ASSET_KEYS = ["검문소", "숲", "실내", "야외", "전장", "지하", "폐허", "성벽"];
const DICE_SOURCE_WIDTH = 700;
const DICE_SOURCE_HEIGHT = 560;
const BACK_SOURCE_WIDTH = 700;
const BACK_SOURCE_HEIGHT = 560;
const BASE_SOURCE_WIDTH = 700;
const BASE_SOURCE_HEIGHT = 241;
const CANVAS_WIDTH = BACK_SOURCE_WIDTH;
const CANVAS_HEIGHT = BACK_SOURCE_HEIGHT;
const COMPACT_CANVAS_HEIGHT = Math.round((CANVAS_WIDTH * 5) / 9);
const BASE_LAYER_WIDTH = Math.round(BASE_SOURCE_WIDTH * 0.8);
const BASE_LAYER_HEIGHT = Math.round((BASE_LAYER_WIDTH * BASE_SOURCE_HEIGHT) / BASE_SOURCE_WIDTH);
const BASE_LAYER_X = Math.round((CANVAS_WIDTH - BASE_LAYER_WIDTH) / 2);
const BASE_LAYER_BOTTOM_OFFSET = 20;
const BASE_LAYER_Y = CANVAS_HEIGHT - BASE_LAYER_HEIGHT - BASE_LAYER_BOTTOM_OFFSET;
const DICE_LAYER_BASE_WIDTH = 200;
const DICE_LAYER_WIDTH = Math.round(DICE_LAYER_BASE_WIDTH * 1.15);
const DICE_LAYER_HEIGHT = Math.round((DICE_LAYER_WIDTH * DICE_SOURCE_HEIGHT) / DICE_SOURCE_WIDTH);
const DICE_LAYER_BASE_HEIGHT = Math.round((DICE_LAYER_BASE_WIDTH * DICE_SOURCE_HEIGHT) / DICE_SOURCE_WIDTH);
const DICE_LAYER_COMPACT_Y = Math.round(COMPACT_CANVAS_HEIGHT * 0.02) + 50;
const DICE_CANVAS_GROWTH = CANVAS_HEIGHT - COMPACT_CANVAS_HEIGHT;
const DICE_CANVAS_UP_SHIFT = 100;
const DICE_SCALE_UP_SHIFT = 30;
const DICE_LAYER_BASE_Y = DICE_LAYER_COMPACT_Y + DICE_CANVAS_GROWTH - DICE_CANVAS_UP_SHIFT;
const DICE_LAYER_Y = DICE_LAYER_BASE_Y + DICE_LAYER_BASE_HEIGHT - DICE_LAYER_HEIGHT - DICE_SCALE_UP_SHIFT;
const DICE_LAYER_GAP = 24;
const DICE_FLOAT_BEGIN = 1.05;
const DICE_FLOAT_DURATION = 3.4;
const D8_DOUBLE_FACE_MAP = {
  7: [3, 4],
  8: [4, 4]
};
const BACK_ASSETS = Object.fromEntries(
  BACK_ASSET_KEYS.map((key) => [key, { key, path: `${BACK_ASSET_DIR}/${key}.jpg` }])
);
const CARD_ASSETS = {
  a: {
    key: "a",
    label: "운명의흔적",
    path: "/a/기본.webp",
    defaultMaxValue: 6
  },
  b: {
    key: "b",
    label: "새운명의패",
    path: "/b/기본.webp",
    defaultMaxValue: 8
  }
};
const TEXT_HEADERS = {
  "content-type": "text/plain; charset=utf-8",
  "cache-control": "no-store, no-cache, must-revalidate, max-age=0",
  "pragma": "no-cache",
  "expires": "0",
  "x-content-type-options": "nosniff",
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, HEAD, OPTIONS",
  "access-control-allow-headers": "content-type"
};

const HTML_HEADERS = {
  ...TEXT_HEADERS,
  "content-type": "text/html; charset=utf-8"
};

const SVG_HEADERS = {
  ...TEXT_HEADERS,
  "content-type": "image/svg+xml; charset=utf-8"
};

export default {
  async fetch(request, env = {}) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: TEXT_HEADERS });
    }

    if (!["GET", "HEAD"].includes(request.method)) {
      return new Response("Method Not Allowed", {
        status: 405,
        headers: { ...TEXT_HEADERS, allow: "GET, HEAD, OPTIONS" }
      });
    }

    if (url.pathname === "/" || url.pathname === "") {
      return textResponse(renderHelp(url));
    }

    if (url.pathname === "/preview") {
      return htmlResponse(renderPreview(url));
    }

    if (url.pathname === "/manifest.json") {
      return jsonResponse(renderManifest(url));
    }

    if (url.pathname === "/dice.webp") {
      return serveDiceWebp(request, env);
    }

    if (url.pathname === "/card-base.webp") {
      return serveCardBaseWebp(request, env);
    }

    if (url.pathname === "/card-back.jpg") {
      return serveCardBackJpg(request, env);
    }

    if (url.pathname === "/dice.svg") {
      return svgResponse(renderSvgWrapper(url));
    }

    if (url.pathname === "/card.svg") {
      return svgResponse(renderCardSvgWrapper(url));
    }

    return new Response("Not Found", { status: 404, headers: TEXT_HEADERS });
  }
};

async function serveDiceWebp(request, env) {
  const url = new URL(request.url);
  const maxValue = parseDiceMax(getSearchParam(url, "면", "주사위"), 6);
  const roll = parseDiceRoll(getSearchParam(url, "값"), maxValue);
  const animated = parseToggle(getSearchParam(url, "애니"), true);

  const candidates = getDiceAssetCandidates(roll.assetValue, animated);

  const response = await findAsset(request, env, candidates);
  if (response) return response;

  return textResponse(
    [
      "Animated WebP asset is missing.",
      "",
      "필요 파일:",
      ...candidates.map((path) => `  public${path}`),
      "",
      "Cloudflare Worker Static Assets를 쓰는 경우:",
      "  wrangler.toml에 assets binding을 연결하세요.",
      "",
      "예:",
      '  assets = { directory = "./public", binding = "ASSETS" }',
      "",
      "또는 Worker var ASSET_BASE_URL에 WebP 파일이 올라간 공개 base URL을 넣으세요."
    ].join("\n"),
    501
  );
}

async function serveCardBaseWebp(request, env) {
  const url = new URL(request.url);
  const card = parseCardAsset(getSearchParam(url, "카드", "종류"));
  return serveMappedAsset(request, env, card.path, {
    title: "Base card WebP asset is missing.",
    extraLines: ["또는 Worker var ASSET_BASE_URL에 기본 카드 파일이 올라간 공개 base URL을 넣으세요."]
  });
}

async function serveCardBackJpg(request, env) {
  const url = new URL(request.url);
  const back = parseBackAsset(getSearchParam(url, "환경", "배경"));
  return serveMappedAsset(request, env, back.path, {
    title: "Background JPG asset is missing.",
    extraLines: ["환경값:", ...BACK_ASSET_KEYS.map((name) => `  ${name}`)]
  });
}

async function serveMappedAsset(request, env, path, { title, extraLines = [] }) {
  const response = await findAsset(request, env, [path]);
  if (response) return response;

  return textResponse(
    [
      title,
      "",
      "필요 파일:",
      `  public${path}`,
      "",
      ...extraLines
    ].join("\n"),
    501
  );
}

async function findAsset(request, env, paths) {
  if (env && env.ASSETS && typeof env.ASSETS.fetch === "function") {
    for (const path of paths) {
      const assetUrl = new URL(path, request.url);
      const assetRequest = new Request(assetUrl, {
        method: request.method === "HEAD" ? "HEAD" : "GET",
        headers: request.headers
      });

      const assetResponse = await env.ASSETS.fetch(assetRequest);
      if (assetResponse.status !== 404) {
        return withImageHeaders(assetResponse, request, path);
      }
    }
  }

  if (env && env.DICE_R2 && typeof env.DICE_R2.get === "function") {
    for (const path of paths) {
      const key = path.replace(/^\/+/, "");
      const object = await env.DICE_R2.get(key);
      if (object) {
        const headers = new Headers();
        object.writeHttpMetadata?.(headers);
        return new Response(request.method === "HEAD" ? null : object.body, {
          status: 200,
          headers: withAssetHeaders(headers, path)
        });
      }
    }
  }

  const baseUrl = normalizeBaseUrl(env?.ASSET_BASE_URL || DEFAULT_ASSET_BASE_URL);
  if (baseUrl) {
    return Response.redirect(`${baseUrl}${paths[0]}`, 302);
  }

  return null;
}

function withImageHeaders(response, request, path) {
  return new Response(request.method === "HEAD" ? null : response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: withAssetHeaders(new Headers(response.headers), path)
  });
}

function withAssetHeaders(headers, path) {
  headers.set("content-type", headers.get("content-type") || getAssetContentType(path));
  headers.set("cache-control", "public, max-age=3600, stale-while-revalidate=86400");
  headers.set("access-control-allow-origin", "*");
  headers.set("x-content-type-options", "nosniff");
  return headers;
}

function getAssetContentType(path) {
  if (/\.jpe?g$/i.test(path)) return "image/jpeg";
  if (/\.png$/i.test(path)) return "image/png";
  if (/\.svg$/i.test(path)) return "image/svg+xml; charset=utf-8";
  return "image/webp";
}

function renderHelp(url) {
  return [
    "Realistic Dice WebP Worker is running.",
    "",
    "이 버전은 SVG로 그리는 대신 미리 렌더링한 animated WebP를 서빙합니다.",
    "",
    "사용 예시:",
    `  ${url.origin}/dice.webp?값=1`,
    `  ${url.origin}/dice.webp?값=6`,
    `  ${url.origin}/dice.svg?값=8&면=8`,
    `  ${url.origin}/card.svg?카드=a&환경=전장&값=6&면=6`,
    `  ${url.origin}/card.svg?카드=b&환경=숲&값=8&면=8`,
    `  ${url.origin}/dice.webp?값=0   -> 표시값 0, 애셋은 1.webp`,
    `  ${url.origin}/dice.webp?값=6&애니=0`,
    `  ${url.origin}/preview?값=6`,
    `  ${url.origin}/preview?카드=b&값=8`,
    "",
    "필요 파일:",
    ...DICE_ASSET_VALUES.map((value) => `  public${DICE_ASSET_DIR}/${value}.webp`),
    "",
    "합성 기본 파일:",
    ...Object.values(CARD_ASSETS).map((card) => `  public${card.path}`),
    "",
    "합성 배경 파일:",
    ...BACK_ASSET_KEYS.map((name) => `  public${BACK_ASSET_DIR}/${name}.jpg`),
    "",
    "장막값 7/8은 dice/7.webp, dice/8.webp 없이 d6 WebP 두 개를 SVG에서 합성합니다.",
    "",
    "기본 공개 base URL:",
    `  ${DEFAULT_ASSET_BASE_URL}`,
    "",
    "호환 fallback:",
    "  public/dice/roll-1.webp ... public/dice/roll-6.webp",
    "  public/dice/still-1.webp ... public/dice/still-6.webp",
    ""
  ].join("\n");
}

function renderPreview(url) {
  const cardParam = getSearchParam(url, "카드", "종류");
  const card = cardParam == null ? null : parseCardAsset(cardParam);
  const back = parseBackAsset(getSearchParam(url, "환경", "배경"));
  const defaultMaxValue = card?.defaultMaxValue ?? 6;
  const maxValue = parseDiceMax(getSearchParam(url, "면", "주사위"), defaultMaxValue);
  const roll = parseDiceRoll(getSearchParam(url, "값"), maxValue);
  const animated = parseToggle(getSearchParam(url, "애니"), true);
  const diceFaces = getDiceFaces(roll, maxValue);
  const imagePath = card || diceFaces.length > 1 ? (card ? "/card.svg" : "/dice.svg") : "/dice.webp";
  const imageHref = makeLocalHref(url, imagePath, {
    카드: card?.key,
    환경: card ? back.key : null,
    값: roll.displayValue,
    면: maxValue,
    애니: animated ? "1" : "0"
  });

  const title = card ? `${card.label} ${back.key} D${maxValue} ${roll.displayValue}` : `D${maxValue} ${roll.displayValue}`;
  const alt = card ? `${card.label} ${getDiceLabel(roll, maxValue)}` : getDiceLabel(roll, maxValue);

  return `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <style>
    html, body {
      margin: 0;
      min-height: 100%;
      background:
        linear-gradient(45deg, #2a2a2a 25%, transparent 25%),
        linear-gradient(-45deg, #2a2a2a 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, #2a2a2a 75%),
        linear-gradient(-45deg, transparent 75%, #2a2a2a 75%),
        #171717;
      background-position: 0 0, 0 10px, 10px -10px, -10px 0;
      background-size: 20px 20px;
      color: #eee;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }

    body {
      display: grid;
      place-items: center;
      padding: 28px;
      box-sizing: border-box;
    }

    main {
      width: min(100%, 860px);
    }

    img {
      display: block;
      width: 100%;
      max-width: ${CANVAS_WIDTH}px;
      height: auto;
      margin: 0 auto;
      background: transparent;
    }

    nav {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 18px;
    }

    a {
      color: #eee;
      text-decoration: none;
      border: 1px solid #555;
      padding: 8px 11px;
      border-radius: 8px;
      background: #1d1d1d;
    }
  </style>
</head>
<body>
  <main>
    <img src="${escapeHtml(imageHref)}" alt="${escapeHtml(alt)}">
    <nav>
      ${rangeFromZero(maxValue).map((n) => `<a href="/preview?${card ? `카드=${card.key}&환경=${encodeURIComponent(back.key)}&` : ""}값=${n}&면=${maxValue}">${n}</a>`).join("")}
      <a href="${escapeHtml(imageHref)}">${card ? "card" : "webp"}</a>
      <a href="/preview?카드=a&환경=${encodeURIComponent(back.key)}&값=${Math.min(roll.displayValue, 6)}&면=6">a</a>
      <a href="/preview?카드=b&환경=${encodeURIComponent(back.key)}&값=${roll.displayValue}&면=8">b</a>
    </nav>
  </main>
</body>
</html>`;
}

function renderManifest(url) {
  return {
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
    endpoints: {
      d6Animated: `${url.origin}/dice.webp?값={0-6}&면=6`,
      d6Still: `${url.origin}/dice.webp?값={0-6}&면=6&애니=0`,
      d6Svg: `${url.origin}/dice.svg?값={0-6}&면=6`,
      d8Animated: `${url.origin}/dice.webp?값={0-8}&면=8`,
      d8Still: `${url.origin}/dice.webp?값={0-8}&면=8&애니=0`,
      d8Svg: `${url.origin}/dice.svg?값={0-8}&면=8`,
      traceCardSvg: `${url.origin}/card.svg?카드=a&환경={환경}&값={0-6}&면=6`,
      newCardSvg: `${url.origin}/card.svg?카드=b&환경={환경}&값={0-8}&면=8`,
      preview: `${url.origin}/preview?카드=a&환경=전장&값={0-6}&면=6`
    },
    requiredAssets: DICE_ASSET_VALUES.map((n) => `${DICE_ASSET_DIR}/${n}.webp`),
    baseCardAssets: Object.values(CARD_ASSETS).map((card) => card.path),
    backAssets: Object.values(BACK_ASSETS).map((back) => back.path),
    d8HighValueBehavior: {
      7: "dice/3.webp + dice/4.webp",
      8: "dice/4.webp + dice/4.webp"
    },
    fallbackAssets: DICE_ASSET_VALUES.flatMap((n) => [
      `${DICE_ASSET_DIR}/roll-${n}.webp`,
      `${DICE_ASSET_DIR}/still-${n}.webp`
    ]),
    zeroBehavior: "값=0은 규칙 표시값으로 유지하고, 실제 이미지 애셋은 1.webp를 사용합니다."
  };
}

function renderSvgWrapper(url) {
  const maxValue = parseDiceMax(getSearchParam(url, "면", "주사위"), 6);
  const roll = parseDiceRoll(getSearchParam(url, "값"), maxValue);
  const animated = parseToggle(getSearchParam(url, "애니"), true);
  const href = makeLocalHref(url, "/dice.webp", {
    값: roll.displayValue,
    면: maxValue,
    애니: animated ? "1" : "0"
  });
  const diceFaces = getDiceFaces(roll, maxValue);
  const desc = animated
    ? `미리 렌더링된 WebP d${maxValue} 주사위 애니메이션 ${roll.displayValue}`
    : `미리 렌더링된 WebP d${maxValue} 주사위 이미지 ${roll.displayValue}`;
  const label = getDiceLabel(roll, maxValue);

  return renderSvgDocument({
    label,
    desc,
    body: `
  ${renderDiceLayerDefs()}
  ${renderDiceLayers({ url, faces: diceFaces, animated, fallbackHref: href })}
`
  });
}

function renderCardSvgWrapper(url) {
  const card = parseCardAsset(getSearchParam(url, "카드", "종류"));
  const back = parseBackAsset(getSearchParam(url, "환경", "배경"));
  const maxValue = parseDiceMax(
    getSearchParam(url, "면", "주사위"),
    card.defaultMaxValue
  );
  const roll = parseDiceRoll(getSearchParam(url, "값"), maxValue);
  const animated = parseToggle(getSearchParam(url, "애니"), true);

  const backHref = makeLocalHref(url, "/card-back.jpg", { 환경: back.key });
  const baseHref = makeLocalHref(url, "/card-base.webp", { 카드: card.key });
  const diceFaces = getDiceFaces(roll, maxValue);
  const label = `${card.label} ${back.key} ${getDiceLabel(roll, maxValue)}`;
  const desc = `${back.key} 배경과 ${card.label} 기본 이미지 위에 ${getDiceLabel(roll, maxValue)} WebP를 합성한 SVG`;

  return renderSvgDocument({
    label,
    desc,
    body: `
  ${renderDiceLayerDefs()}
  ${renderImage({
    href: backHref,
    x: 0,
    y: 0,
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
    preserveAspectRatio: "xMidYMax slice"
  })}
  ${renderImage({
    href: baseHref,
    x: BASE_LAYER_X,
    y: BASE_LAYER_Y,
    width: BASE_LAYER_WIDTH,
    height: BASE_LAYER_HEIGHT
  })}
  ${renderDiceLayers({ url, faces: diceFaces, animated })}
`
  });
}

function renderSvgDocument({ label, desc, body }) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="100%"
  height="auto"
  viewBox="0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}"
  preserveAspectRatio="xMidYMid meet"
  style="display:block;max-width:${CANVAS_WIDTH}px;height:auto"
  role="img"
  aria-label="${escapeXml(label)}"
>
  <title>${escapeXml(label)}</title>
  <desc>${escapeXml(desc)}</desc>
${body}</svg>`;
}

function renderImage({
  href,
  x,
  y,
  width,
  height,
  preserveAspectRatio = "xMidYMid meet",
  filter = ""
}) {
  const filterAttribute = filter ? `\n    filter="${escapeXml(filter)}"` : "";

  return `<image
    href="${escapeXml(href)}"
    x="${x}"
    y="${y}"
    width="${width}"
    height="${height}"
    preserveAspectRatio="${escapeXml(preserveAspectRatio)}"${filterAttribute}
  />`;
}

function renderDiceLayerDefs() {
  return `
  <defs>
    <filter id="diceLayerEffect" x="-35%" y="-35%" width="170%" height="190%" color-interpolation-filters="sRGB">
      <feDropShadow dx="0" dy="9" stdDeviation="7" flood-color="#000000" flood-opacity="0.34" />
      <feDropShadow dx="4" dy="-1" stdDeviation="2.8" flood-color="#7ec7ff" flood-opacity="0.38" />
      <feDropShadow dx="-3" dy="-2" stdDeviation="2.2" flood-color="#ffe0ad" flood-opacity="0.22" />
    </filter>
  </defs>`;
}

function renderDiceLayers({ url, faces, animated, fallbackHref = "" }) {
  const layers = makeDiceLayerLayout(faces);
  return layers.map((layer, index) => {
    const href = fallbackHref && faces.length === 1
      ? fallbackHref
      : makeDiceWebpHref(url, layer.face, animated);
    const floatBegin = Number((DICE_FLOAT_BEGIN + index * 0.22).toFixed(2));

    return `
  <g>
    <animateTransform
      attributeName="transform"
      type="translate"
      values="0 0; 1.8 -3.4; -1.2 -8.2; 1.1 -5.1; -0.8 2.6; 0.9 1.1; 0 0"
      keyTimes="0;0.16;0.37;0.56;0.73;0.89;1"
      begin="${floatBegin}s"
      dur="${DICE_FLOAT_DURATION + index * 0.37}s"
      repeatCount="indefinite"
    />
    <animateTransform
      attributeName="transform"
      type="rotate"
      additive="sum"
      values="0 ${layer.centerX} ${layer.centerY}; 1.8 ${layer.centerX} ${layer.centerY}; 0.35 ${layer.centerX} ${layer.centerY}; -1.55 ${layer.centerX} ${layer.centerY}; -0.3 ${layer.centerX} ${layer.centerY}; 0 ${layer.centerX} ${layer.centerY}"
      keyTimes="0;0.2;0.38;0.64;0.82;1"
      begin="${floatBegin + 0.09}s"
      dur="${DICE_FLOAT_DURATION + 1.15 + index * 0.31}s"
      repeatCount="indefinite"
    />
    ${renderImage({
      href,
      x: layer.x,
      y: layer.y,
      width: layer.width,
      height: layer.height,
      filter: "url(#diceLayerEffect)"
    })}
  </g>`;
  }).join("\n");
}

function makeDiceLayerLayout(faces) {
  const totalWidth = faces.length * DICE_LAYER_WIDTH + Math.max(0, faces.length - 1) * DICE_LAYER_GAP;
  const startX = Math.round((CANVAS_WIDTH - totalWidth) / 2);

  return faces.map((face, index) => ({
    face,
    x: startX + index * (DICE_LAYER_WIDTH + DICE_LAYER_GAP),
    y: DICE_LAYER_Y,
    width: DICE_LAYER_WIDTH,
    height: DICE_LAYER_HEIGHT,
    centerX: startX + index * (DICE_LAYER_WIDTH + DICE_LAYER_GAP) + DICE_LAYER_WIDTH / 2,
    centerY: DICE_LAYER_Y + DICE_LAYER_HEIGHT / 2
  }));
}

function makeDiceWebpHref(url, face, animated) {
  return makeLocalHref(url, "/dice.webp", {
    값: face,
    면: 6,
    애니: animated ? "1" : "0"
  });
}

function getDiceFaces(roll, maxValue) {
  if (maxValue === 8 && D8_DOUBLE_FACE_MAP[roll.displayValue]) {
    return D8_DOUBLE_FACE_MAP[roll.displayValue];
  }

  return [roll.assetValue];
}

function getDiceAssetCandidates(assetValue, animated) {
  const current = `${DICE_ASSET_DIR}/${assetValue}.webp`;
  const legacyAnimated = `${DICE_ASSET_DIR}/roll-${assetValue}.webp`;
  const legacyStill = `${DICE_ASSET_DIR}/still-${assetValue}.webp`;

  return animated
    ? [current, legacyAnimated]
    : [current, legacyStill, legacyAnimated];
}

function parseDiceMax(value, fallback) {
  const text = String(value ?? "").trim().toLowerCase();
  if (text === "d8" || text === "8") return 8;
  if (text === "d6" || text === "6") return 6;
  return fallback;
}

function parseCardAsset(value) {
  const text = String(value ?? "").trim().toLowerCase();

  if (["b", "new", "card", "새운명의패", "새운명", "패"].includes(text)) {
    return CARD_ASSETS.b;
  }

  return CARD_ASSETS.a;
}

function parseBackAsset(value) {
  const normalized = normalizeKey(value);
  return BACK_ASSETS[normalized] || BACK_ASSETS["야외"];
}

function normalizeKey(value) {
  return String(value ?? "")
    .trim()
    .replace(/[^\uAC00-\uD7A3a-zA-Z0-9]/g, "");
}

function parseDiceRoll(value, maxValue) {
  const text = String(value ?? "1").trim();
  if (!/^-?\d+$/.test(text)) {
    return { displayValue: 1, assetValue: 1 };
  }

  const number = Number(text);
  if (!Number.isFinite(number)) {
    return { displayValue: 1, assetValue: 1 };
  }

  const clamped = Math.max(0, Math.min(maxValue, number));
  return {
    displayValue: clamped,
    assetValue: clamped === 0 ? 1 : clamped
  };
}

function getDiceLabel(roll, maxValue) {
  if (roll.displayValue === 0) {
    return `d${maxValue} 주사위 0 (계산값 1)`;
  }

  return `d${maxValue} 주사위 ${roll.displayValue}`;
}

function rangeFromZero(maxValue) {
  return Array.from({ length: maxValue + 1 }, (_, index) => index);
}

function parseToggle(value, fallback) {
  if (value == null || value === "") return fallback;
  const normalized = String(value).trim().toLowerCase();
  if (["0", "false", "off", "no"].includes(normalized)) return false;
  if (["1", "true", "on", "yes"].includes(normalized)) return true;
  return fallback;
}

function getSearchParam(url, ...names) {
  for (const name of names) {
    const value = url.searchParams.get(name);
    if (value != null) return value;
  }

  return null;
}

function makeLocalHref(url, pathname, params = {}) {
  const target = new URL(pathname, url.origin);

  for (const [key, value] of Object.entries(params)) {
    if (value == null || value === "") continue;
    target.searchParams.set(key, String(value));
  }

  return `${target.pathname}${target.search}`;
}

function normalizeBaseUrl(value) {
  const text = String(value || "").trim();
  if (!text) return "";
  return text.endsWith("/") ? text.slice(0, -1) : text;
}

function textResponse(text, status = 200) {
  return new Response(text, { status, headers: TEXT_HEADERS });
}

function htmlResponse(html, status = 200) {
  return new Response(html, { status, headers: HTML_HEADERS });
}

function svgResponse(svg, status = 200) {
  return new Response(svg, { status, headers: SVG_HEADERS });
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      ...TEXT_HEADERS,
      "content-type": "application/json; charset=utf-8"
    }
  });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeXml(str) {
  return escapeHtml(str);
}

const ASSET_BASE_URL = "https://musueman.github.io/duran-assets";
const GITHUB_OWNER = "musueman";
const GITHUB_REPO = "duran-assets";
const GITHUB_BRANCH = "main";

const WIDTH = 700;
const HEIGHT = 560;
const TOTAL_SECONDS = 5.6;

const SMALL_WIDTH = 260;
const SMALL_HEIGHT = 520;
const SMALL_Y = 32;

const LARGE_WIDTH = 520;
const LARGE_HEIGHT = 1150;
const LARGE_Y = -128;

const RESULT_WIDTH = 650;
const RESULT_HEIGHT = 250;
const RESULT_CENTER_X = WIDTH / 2;
const RESULT_CENTER_Y = HEIGHT / 2;

const RESULT_ENTER_KEY = 0.035714;
const SMALL_DELAY_KEY = 0.053571;
const SMALL_BLUR_PEAK_KEY = 0.080357;
const SMALL_ENTER_KEY = 0.107143;
const LARGE_DELAY_KEY = 0.071429;
const LARGE_BLUR_PEAK_KEY = 0.098214;
const LARGE_ENTER_KEY = 0.125;
const CHARACTER_EXIT_KEY = 0.892857;
const CHARACTER_END_KEY = 0.928571;
const RESULT_EXIT_KEY = CHARACTER_END_KEY;
const RESULT_BURST_KEY = 0.982143;

const K = {
  destinyBottom: "\uC6B4\uBA85\uC758\uD558\uB2E8",
  background: "\uBC30\uACBD",
  character: "\uCE90\uB9AD\uD130",
  duran: "\uB4C0\uB780",
  judgement: "\uD310\uC815",
  success: "\uC131\uACF5",
  failure: "\uC2E4\uD328",
  layer: "\uB808\uC774\uC5B4",
  env: "\uD658\uACBD",
  action: "\uD589\uB3D9",
  card: "\uD328",
  emotion: "\uAC10\uC815",
  mood: "\uBD84\uC704\uAE30",
  result: "\uACB0\uACFC",
  expression: "\uD45C\uC815",
  direction: "\uBC29\uD5A5",
  repeat: "\uBC18\uBCF5",
  left: "\uC88C",
  leftWord: "\uC67C\uCABD",
  right: "\uC6B0",
  rightWord: "\uC624\uB978\uCABD"
};

const E = {
  battle: "\uC804\uC7A5",
  forest: "\uC232",
  underground: "\uC9C0\uD558",
  ruins: "\uD3D0\uD5C8",
  checkpoint: "\uAC80\uBB38\uC18C",
  wall: "\uC131\uBCBD",
  indoor: "\uC2E4\uB0B4"
};

const X = {
  resolve: "\uACB0\uC758",
  guard: "\uACBD\uACC4",
  awkward: "\uB09C\uCC98",
  surprise: "\uB180\uB78C",
  talk: "\uB300\uD654",
  smile: "\uBBF8\uC18C",
  anxiousTalk: "\uBD88\uC548\uB300\uD654",
  sad: "\uC2AC\uD514",
  infer: "\uCD94\uB9AC",
  curious: "\uD638\uAE30\uC2EC",
  sigh: "\uD55C\uC228",
  brightSmile: "\uD658\uD55C\uBBF8\uC18C"
};

const BACKGROUND_ROOT = ["visual", K.destinyBottom, "000_" + K.background];
const DURAN_ROOT = ["visual", K.destinyBottom, "001_" + K.character, "000_" + K.duran];
const JUDGEMENT_ROOT = ["visual", K.destinyBottom, "002_" + K.judgement];

const ENVIRONMENT_DIRS = {
  [E.battle]: "000_" + E.battle,
  [E.forest]: "001_" + E.forest,
  [E.underground]: "002_" + E.underground,
  [E.ruins]: "003_" + E.ruins,
  [E.checkpoint]: "004_" + E.checkpoint,
  [E.wall]: "005_" + E.wall,
  [E.indoor]: "006_" + E.indoor
};

const ENVIRONMENT_ALIASES = {
  battle: E.battle,
  battlefield: E.battle,
  field: E.battle,
  forest: E.forest,
  woods: E.forest,
  underground: E.underground,
  ruins: E.ruins,
  ruin: E.ruins,
  checkpoint: E.checkpoint,
  gate: E.checkpoint,
  wall: E.wall,
  castlewall: E.wall,
  indoor: E.indoor,
  inside: E.indoor
};

const EXPRESSION_FOLDERS = [
  X.resolve,
  X.guard,
  X.awkward,
  X.surprise,
  X.talk,
  X.smile,
  X.anxiousTalk,
  X.sad,
  X.infer,
  X.curious,
  X.sigh,
  X.brightSmile
];

const EXPRESSION_FALLBACK_FILES = {
  [X.resolve]: layerFiles([1, 2, 3, 4]),
  [X.guard]: layerFiles([1, 2, 3, 4, 5, 6, 7, 8]),
  [X.awkward]: layerFiles([1, 2, 3, 4, 5, 6]),
  [X.surprise]: layerFiles([1, 2, 3, 4, 5, 6]),
  [X.talk]: layerFiles([1, 2, 3, 4, 5, 6]),
  [X.smile]: layerFiles([1, 2, 3, 4, 5, 6]),
  [X.anxiousTalk]: layerFiles([1, 4, 5]),
  [X.sad]: layerFiles([1, 2, 3, 4]),
  [X.infer]: layerFiles([1, 2, 3, 4, 5]),
  [X.curious]: layerFiles([1, 2, 3, 4, 5]),
  [X.sigh]: layerFiles([1, 2, 3, 4]),
  [X.brightSmile]: layerFiles([1, 2, 3, 4, 5])
};

const SUCCESS_EXPRESSIONS = [
  X.resolve,
  X.guard,
  X.infer,
  X.curious,
  X.smile,
  X.brightSmile
];

const FAILURE_EXPRESSIONS = [
  X.sigh,
  X.sad,
  X.awkward,
  X.surprise,
  X.anxiousTalk,
  X.guard
];

const BACKGROUND_FALLBACK_FILES = {
  ["000_" + E.battle]: numberedFiles(E.battle, [1, 2, 3, 4]),
  ["001_" + E.forest]: ["21.jpg", ...numberedFiles(E.forest, [1, 3, 4])],
  ["002_" + E.underground]: numberedFiles(E.underground, [1, 2, 3, 4]),
  ["003_" + E.ruins]: numberedFiles(E.ruins, [1, 2, 3, 4]),
  ["004_" + E.checkpoint]: numberedFiles(E.checkpoint, [1, 2, 3, 4]),
  ["005_" + E.wall]: numberedFiles(E.wall, [1, 2, 3, 4]),
  ["006_" + E.indoor]: numberedFiles(E.indoor, [1, 2, 3, 4])
};

const ENV_TINTS = {
  [E.battle]: "#5b4138",
  [E.forest]: "#263f2d",
  [E.underground]: "#24313d",
  [E.ruins]: "#51453c",
  [E.checkpoint]: "#5b4739",
  [E.wall]: "#4c5061",
  [E.indoor]: "#4a372d"
};

const HEADERS = {
  "content-type": "image/svg+xml; charset=utf-8",
  "cache-control": "no-store, no-cache, must-revalidate, max-age=0",
  pragma: "no-cache",
  expires: "0",
  "x-content-type-options": "nosniff",
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, HEAD, OPTIONS",
  "access-control-allow-headers": "content-type"
};

const TEXT_HEADERS = { ...HEADERS, "content-type": "text/plain; charset=utf-8" };
const JSON_HEADERS = { ...HEADERS, "content-type": "application/json; charset=utf-8" };

const fileCache = new Map();
const FILE_CACHE_MS = 5 * 60 * 1000;

export default {
  async fetch(request) {
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
      return textResponse(renderHelp(url), request);
    }

    if (url.pathname === "/health.json") {
      return jsonResponse({ ok: true, worker: "duran-action", endpoints: ["/action.svg"] }, request);
    }

    if (url.pathname !== "/action.svg" && url.pathname !== "/cutin.svg") {
      return new Response("Not Found", { status: 404, headers: TEXT_HEADERS });
    }

    try {
      return svgResponse(await renderActionSvg(url), request);
    } catch (error) {
      return svgResponse(renderErrorSvg(error), request, 502);
    }
  }
};

async function renderActionSvg(url) {
  const params = url.searchParams;
  const environment = normalizeEnvironment(getAnyParam(params, ["env", K.env, "environment", "place"]));
  const action = getAnyParam(params, ["act", "action", K.action, "card", K.card]) || "";
  const emotion = getAnyParam(params, ["emotion", K.emotion, "mood", K.mood]) || "";
  const result = resolveJudgementResult(params, getAnyParam(params, ["result", K.result]) || "");
  const success = isSuccessResult(result);
  const expression = normalizeExpression(
    getAnyParam(params, ["expression", K.expression, "image", "img"]) ||
      pickExpression({ action, emotion, result })
  );
  const side = normalizeSide(getAnyParam(params, ["side", "dir", K.direction]));

  const backgroundUrl = await pickBackgroundUrl(environment);
  const [smallCharacterUrl, largeCharacterUrl] = await pickDuranUrls(expression);
  const judgementUrl = pickJudgementUrl(result);
  const smallMotion = makeSmallMotion(side);
  const largeMotion = makeLargeMotion(oppositeSide(side));
  const smallFacingTransform = makeFacingTransform(SMALL_WIDTH, smallMotion.fromLeft);
  const largeFacingTransform = makeFacingTransform(LARGE_WIDTH, largeMotion.fromLeft);
  const repeatCount = "indefinite";
  const fill = "remove";
  const tint = ENV_TINTS[environment] || ENV_TINTS[E.battle];
  const effectPalette = getEffectPalette(environment, success);
  const label = `${environment} / ${expression}`;

  return compactSvg(`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="auto" viewBox="0 0 ${WIDTH} ${HEIGHT}" preserveAspectRatio="xMidYMid meet" style="display:block;max-width:100%;height:auto;overflow:hidden" role="img" aria-label="${escapeXml(label)}">
  <defs>
    <clipPath id="stageClip"><rect x="0" y="0" width="${WIDTH}" height="${HEIGHT}" rx="18" ry="18"/></clipPath>
    <filter id="motionBlurSmall" x="-55%" y="-18%" width="210%" height="140%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="14 0"/>
    </filter>
    <filter id="motionBlurLarge" x="-55%" y="-8%" width="210%" height="118%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="18 0"/>
    </filter>
    <filter id="resultShadow" x="-18%" y="-28%" width="136%" height="156%">
      <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.72"/>
      <feDropShadow dx="0" dy="0" stdDeviation="2.4" flood-color="#ffffff" flood-opacity="0.28"/>
    </filter>
    <filter id="chromaticAberration" x="-12%" y="-12%" width="124%" height="124%" color-interpolation-filters="sRGB">
      <feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .85 0" result="red"/>
      <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0 0 .72 0 0 0 0 0 0 0 0 0 0 0 .45 0" result="green"/>
      <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 .85 0" result="blue"/>
      <feOffset in="red" dx="-3.5" dy="0" result="redShift"/>
      <feOffset in="blue" dx="3.5" dy="0" result="blueShift"/>
      <feMerge>
        <feMergeNode in="redShift"/>
        <feMergeNode in="green"/>
        <feMergeNode in="blueShift"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <filter id="particleGlow" x="-80%" y="-80%" width="260%" height="260%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="1.8" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <linearGradient id="shade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.08"/>
      <stop offset="0.55" stop-color="#000000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000000" stop-opacity="0.24"/>
    </linearGradient>
    <radialGradient id="failureVignette" cx="50%" cy="54%" r="68%">
      <stop offset="0" stop-color="#000000" stop-opacity="0"/>
      <stop offset="0.56" stop-color="#21070b" stop-opacity="0.18"/>
      <stop offset="1" stop-color="#020103" stop-opacity="0.72"/>
    </radialGradient>
    <radialGradient id="focus" cx="50%" cy="55%" r="68%">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.16"/>
      <stop offset="0.62" stop-color="#000000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000000" stop-opacity="0.44"/>
    </radialGradient>
  </defs>
  <g clip-path="url(#stageClip)">
    <g>
      ${renderScreenShake(success)}
      <image href="${escapeAttr(backgroundUrl)}" x="0" y="0" width="${WIDTH}" height="${HEIGHT}" preserveAspectRatio="xMidYMid slice"/>
      <rect x="0" y="0" width="${WIDTH}" height="${HEIGHT}" fill="${tint}" opacity="0.22" style="mix-blend-mode:multiply"/>
      <rect x="0" y="0" width="${WIDTH}" height="${HEIGHT}" fill="url(#shade)"/>
      ${renderFailurePulse(success)}
      <g transform="translate(${largeMotion.startX} ${LARGE_Y})">
      <animateTransform attributeName="transform" type="translate" dur="${TOTAL_SECONDS}s" values="${largeMotion.values}" keyTimes="0;${LARGE_DELAY_KEY};${LARGE_ENTER_KEY};${CHARACTER_EXIT_KEY};${CHARACTER_END_KEY};1" calcMode="spline" keySplines="0 0 1 1;.1 .72 .16 1;0 0 1 1;.7 0 .9 .18;0 0 1 1" repeatCount="${repeatCount}" fill="${fill}"/>
      <g transform="${largeFacingTransform}">
        ${renderCharacterAfterimages(largeCharacterUrl, LARGE_WIDTH, LARGE_HEIGHT, "xMidYMin meet", "large")}
        <image href="${escapeAttr(largeCharacterUrl)}" x="0" y="0" width="${LARGE_WIDTH}" height="${LARGE_HEIGHT}" preserveAspectRatio="xMidYMin meet"/>
        <image href="${escapeAttr(largeCharacterUrl)}" x="0" y="0" width="${LARGE_WIDTH}" height="${LARGE_HEIGHT}" preserveAspectRatio="xMidYMin meet" filter="url(#motionBlurLarge)" opacity="0.82">
          <animate attributeName="opacity" dur="${TOTAL_SECONDS}s" values="0;0;0.82;0;0" keyTimes="0;${LARGE_DELAY_KEY};${LARGE_BLUR_PEAK_KEY};${LARGE_ENTER_KEY};1" repeatCount="${repeatCount}" fill="${fill}"/>
        </image>
      </g>
    </g>
    <rect x="0" y="0" width="${WIDTH}" height="${HEIGHT}" fill="url(#focus)"/>
    ${renderFailureVignette(success)}
    ${renderShockwaves(success, effectPalette)}
    <g transform="translate(${RESULT_CENTER_X} ${RESULT_CENTER_Y})" opacity="0">
      <animate attributeName="opacity" dur="${TOTAL_SECONDS}s" values="0;0.95;0.95;0.95;0" keyTimes="0;${RESULT_ENTER_KEY};${RESULT_EXIT_KEY};${RESULT_BURST_KEY};1" calcMode="spline" keySplines=".12 .72 .18 1;0 0 1 1;0 0 1 1;.18 0 1 .16" repeatCount="${repeatCount}" fill="${fill}"/>
      <g transform="scale(0)">
        <animateTransform attributeName="transform" type="scale" dur="${TOTAL_SECONDS}s" values="0;1;1.08;1.08;2.35" keyTimes="0;${RESULT_ENTER_KEY};${RESULT_EXIT_KEY};${RESULT_BURST_KEY};1" calcMode="spline" keySplines=".12 .72 .18 1;0 0 1 1;0 0 1 1;.18 0 1 .16" repeatCount="${repeatCount}" fill="${fill}"/>
        ${renderChromaticResult(judgementUrl, success)}
        <image href="${escapeAttr(judgementUrl)}" x="${-RESULT_WIDTH / 2}" y="${-RESULT_HEIGHT / 2}" width="${RESULT_WIDTH}" height="${RESULT_HEIGHT}" preserveAspectRatio="xMidYMid meet" filter="url(#resultShadow)"/>
      </g>
    </g>
    <g transform="translate(${smallMotion.startX} ${SMALL_Y})" opacity="0">
      <animateTransform attributeName="transform" type="translate" dur="${TOTAL_SECONDS}s" values="${smallMotion.values}" keyTimes="0;${SMALL_DELAY_KEY};${SMALL_ENTER_KEY};${CHARACTER_EXIT_KEY};${CHARACTER_END_KEY};1" calcMode="spline" keySplines="0 0 1 1;.12 .72 .18 1;0 0 1 1;.72 0 .9 .22;0 0 1 1" repeatCount="${repeatCount}" fill="${fill}"/>
      <animate attributeName="opacity" dur="${TOTAL_SECONDS}s" values="0;0;1;1;0;0" keyTimes="0;${SMALL_DELAY_KEY};${SMALL_ENTER_KEY};${CHARACTER_EXIT_KEY};${CHARACTER_END_KEY};1" calcMode="spline" keySplines="0 0 1 1;.12 .72 .18 1;0 0 1 1;.18 0 1 .16;0 0 1 1" repeatCount="${repeatCount}" fill="${fill}"/>
      <g transform="${smallFacingTransform}">
        ${renderCharacterAfterimages(smallCharacterUrl, SMALL_WIDTH, SMALL_HEIGHT, "xMidYMax meet", "small")}
        <image href="${escapeAttr(smallCharacterUrl)}" x="0" y="0" width="${SMALL_WIDTH}" height="${SMALL_HEIGHT}" preserveAspectRatio="xMidYMax meet" opacity="0.98"/>
        <image href="${escapeAttr(smallCharacterUrl)}" x="0" y="0" width="${SMALL_WIDTH}" height="${SMALL_HEIGHT}" preserveAspectRatio="xMidYMax meet" filter="url(#motionBlurSmall)" opacity="0.86">
          <animate attributeName="opacity" dur="${TOTAL_SECONDS}s" values="0;0;0.86;0;0" keyTimes="0;${SMALL_DELAY_KEY};${SMALL_BLUR_PEAK_KEY};${SMALL_ENTER_KEY};1" repeatCount="${repeatCount}" fill="${fill}"/>
        </image>
      </g>
    </g>
    ${renderEnvironmentParticles(environment, effectPalette)}
    </g>
  </g>
  <rect x="1.5" y="1.5" width="${WIDTH - 3}" height="${HEIGHT - 3}" rx="18" ry="18" fill="none" stroke="#d7c083" stroke-width="3" opacity="0.9"/>
</svg>`);
}

function makeSmallMotion(side) {
  const fromLeft = side === "left";
  const startX = fromLeft ? -SMALL_WIDTH - 40 : WIDTH + 40;
  const centerX = (WIDTH - SMALL_WIDTH) / 2;
  const slowStartX = startX + (centerX - startX) * 0.8 - 70;
  const slowEndX = slowStartX + (fromLeft ? 29 : -29);
  const endX = fromLeft ? WIDTH + 40 : -SMALL_WIDTH - 40;

  return {
    fromLeft,
    startX,
    values: `${startX} ${SMALL_Y};${startX} ${SMALL_Y};${round(slowStartX)} ${SMALL_Y};${round(slowEndX)} ${SMALL_Y};${endX} ${SMALL_Y};${endX} ${SMALL_Y}`
  };
}

function makeLargeMotion(side) {
  const fromLeft = side === "left";
  const startX = fromLeft ? -LARGE_WIDTH - 70 : WIDTH + 70;
  const slowStartX = (fromLeft ? -LARGE_WIDTH * 0.3 : WIDTH - LARGE_WIDTH * 0.7) - 26;
  const slowEndX = slowStartX + (fromLeft ? 36 : -36);
  const endX = fromLeft ? WIDTH + 70 : -LARGE_WIDTH - 70;

  return {
    fromLeft,
    startX,
    values: `${startX} ${LARGE_Y};${startX} ${LARGE_Y};${round(slowStartX)} ${LARGE_Y};${round(slowEndX)} ${LARGE_Y};${endX} ${LARGE_Y};${endX} ${LARGE_Y}`
  };
}

function makeFacingTransform(width, fromLeft) {
  return fromLeft ? "translate(0 0)" : `translate(${width} 0) scale(-1 1)`;
}

function isSuccessResult(result) {
  return /(success|\uC131\uACF5)/i.test(String(result || ""));
}

function getEffectPalette(environment, success) {
  const env = {
    [E.battle]: { particle: "#f0a33d", dust: "#d7b17a", speed: "#ffe8b1" },
    [E.forest]: { particle: "#9ecf77", dust: "#6f8f5b", speed: "#d7f0b8" },
    [E.underground]: { particle: "#9bb2c8", dust: "#7f8b94", speed: "#d7e4f2" },
    [E.ruins]: { particle: "#d8b384", dust: "#b89872", speed: "#ffe0a6" },
    [E.checkpoint]: { particle: "#e0ad6b", dust: "#b98a62", speed: "#ffe2ad" },
    [E.wall]: { particle: "#ccd3df", dust: "#9299aa", speed: "#eef4ff" },
    [E.indoor]: { particle: "#d29b6a", dust: "#ad8062", speed: "#ffd7b2" }
  }[environment] || { particle: "#f0a33d", dust: "#d7b17a", speed: "#ffe8b1" };

  return {
    ...env,
    shock: success ? "#ffdf78" : "#ff5b72",
    glow: success ? "#fff0a8" : "#68dbff"
  };
}

function renderScreenShake(success) {
  const values = success
    ? "0 0;0 0;1 -1;-1 1;0 0;0 0"
    : "0 0;0 0;-5 2;4 -3;-3 2;2 -1;0 0;0 0";
  const keyTimes = success
    ? "0;0.035;0.055;0.078;0.11;1"
    : "0;0.032;0.047;0.062;0.08;0.105;0.14;1";

  return `<animateTransform attributeName="transform" type="translate" dur="${TOTAL_SECONDS}s" values="${values}" keyTimes="${keyTimes}" repeatCount="indefinite" fill="remove"/>`;
}

function renderFailurePulse(success) {
  if (success) return "";
  return `<rect x="0" y="0" width="${WIDTH}" height="${HEIGHT}" fill="#050006" opacity="0">
    <animate attributeName="opacity" dur="${TOTAL_SECONDS}s" values="0;0;0.34;0.08;0;0.22;0" keyTimes="0;0.032;0.055;0.11;0.28;${RESULT_BURST_KEY};1" repeatCount="indefinite" fill="remove"/>
  </rect>`;
}

function renderFailureVignette(success) {
  if (success) return "";
  return `<rect x="0" y="0" width="${WIDTH}" height="${HEIGHT}" fill="url(#failureVignette)" opacity="0">
    <animate attributeName="opacity" dur="${TOTAL_SECONDS}s" values="0;0;0.48;0.18;0.18;0" keyTimes="0;${RESULT_ENTER_KEY};0.11;0.22;${RESULT_EXIT_KEY};1" repeatCount="indefinite" fill="remove"/>
  </rect>`;
}

function renderShockwaves(success, palette) {
  const color = palette.shock;
  const opacity = success ? "0.72" : "0.64";
  return `<g transform="translate(${RESULT_CENTER_X} ${RESULT_CENTER_Y})" fill="none" stroke="${color}" stroke-linecap="round" opacity="0">
    <animate attributeName="opacity" dur="${TOTAL_SECONDS}s" values="0;${opacity};0;0;${success ? "0.55" : "0.42"};0" keyTimes="0;${RESULT_ENTER_KEY};0.22;${RESULT_EXIT_KEY};${RESULT_BURST_KEY};1" repeatCount="indefinite" fill="remove"/>
    <ellipse rx="58" ry="20" stroke-width="4">
      <animateTransform attributeName="transform" type="scale" dur="${TOTAL_SECONDS}s" values="0.5;2.25;3.1;3.1;5.2;5.8" keyTimes="0;${RESULT_ENTER_KEY};0.22;${RESULT_EXIT_KEY};${RESULT_BURST_KEY};1" repeatCount="indefinite" fill="remove"/>
      <animate attributeName="stroke-width" dur="${TOTAL_SECONDS}s" values="7;4;1;1;2;0" keyTimes="0;${RESULT_ENTER_KEY};0.22;${RESULT_EXIT_KEY};${RESULT_BURST_KEY};1" repeatCount="indefinite" fill="remove"/>
    </ellipse>
    <ellipse rx="96" ry="33" stroke-width="2" opacity="0.55">
      <animateTransform attributeName="transform" type="scale" dur="${TOTAL_SECONDS}s" values="0.25;1.7;2.6;2.6;4.6;5" keyTimes="0;0.06;0.24;${RESULT_EXIT_KEY};${RESULT_BURST_KEY};1" repeatCount="indefinite" fill="remove"/>
    </ellipse>
  </g>`;
}

function renderChromaticResult(judgementUrl, success) {
  if (success) return "";
  return `<image href="${escapeAttr(judgementUrl)}" x="${-RESULT_WIDTH / 2}" y="${-RESULT_HEIGHT / 2}" width="${RESULT_WIDTH}" height="${RESULT_HEIGHT}" preserveAspectRatio="xMidYMid meet" filter="url(#chromaticAberration)" opacity="0">
    <animate attributeName="opacity" dur="${TOTAL_SECONDS}s" values="0;0.92;0;0;0.72;0" keyTimes="0;0.052;0.13;${RESULT_EXIT_KEY};${RESULT_BURST_KEY};1" repeatCount="indefinite" fill="remove"/>
  </image>`;
}

function renderCharacterAfterimages(url, width, height, preserveAspectRatio, size) {
  const delay = size === "large" ? LARGE_DELAY_KEY : SMALL_DELAY_KEY;
  const peak = size === "large" ? LARGE_BLUR_PEAK_KEY : SMALL_BLUR_PEAK_KEY;
  const enter = size === "large" ? LARGE_ENTER_KEY : SMALL_ENTER_KEY;
  const offsetA = size === "large" ? -42 : -24;
  const offsetB = size === "large" ? -78 : -46;

  return `
    <image href="${escapeAttr(url)}" x="${offsetB}" y="0" width="${width}" height="${height}" preserveAspectRatio="${preserveAspectRatio}" opacity="0" style="mix-blend-mode:screen">
      <animate attributeName="opacity" dur="${TOTAL_SECONDS}s" values="0;0;0.22;0;0" keyTimes="0;${delay};${peak};${enter};1" repeatCount="indefinite" fill="remove"/>
    </image>
    <image href="${escapeAttr(url)}" x="${offsetA}" y="0" width="${width}" height="${height}" preserveAspectRatio="${preserveAspectRatio}" opacity="0">
      <animate attributeName="opacity" dur="${TOTAL_SECONDS}s" values="0;0;0.34;0;0" keyTimes="0;${delay};${peak};${enter};1" repeatCount="indefinite" fill="remove"/>
    </image>`;
}

function renderEnvironmentParticles(environment, palette) {
  const forest = environment === E.forest;
  const underground = environment === E.underground;
  const color = palette.particle;
  const dust = palette.dust;
  const particles = [
    [48, 496, 32, -70, 4.4],
    [92, 438, 46, -82, 3.4],
    [132, 522, -28, -92, 3.8],
    [188, 462, 34, -76, 5.0],
    [244, 516, 22, -96, 4.2],
    [318, 486, -34, -84, 3.2],
    [382, 528, 28, -104, 4.8],
    [446, 456, -46, -78, 3.6],
    [512, 510, 30, -94, 4.4],
    [574, 448, -26, -86, 3.1],
    [632, 524, -38, -98, 4.0],
    [666, 390, -42, -68, 2.8],
    [28, 346, 58, -60, 2.9],
    [612, 316, -52, -72, 3.3]
  ];

  const shapes = particles.map(([x, y, dx, dy, radius], index) => {
    const keyA = 0.075 + (index % 7) * 0.045;
    const keyB = Math.min(0.92, keyA + 0.52);
    if (forest) {
      return `<path d="M${x} ${y} q${radius * 2.4} -${radius * 3.4} ${radius * 6.2} 0 q-${radius * 2.4} ${radius * 3.4} -${radius * 6.2} 0" fill="${color}" opacity="0">
        <animate attributeName="opacity" dur="${TOTAL_SECONDS}s" values="0;0.92;0.55;0" keyTimes="0;${keyA};${keyB};1" repeatCount="indefinite" fill="remove"/>
        <animateTransform attributeName="transform" type="translate" dur="${TOTAL_SECONDS}s" values="0 0;${dx} ${dy};${dx * 1.55} ${dy * 1.24};${dx * 1.55} ${dy * 1.24}" keyTimes="0;${keyA};${keyB};1" repeatCount="indefinite" fill="remove"/>
        <animateTransform additive="sum" attributeName="transform" type="rotate" dur="${TOTAL_SECONDS}s" values="0 ${x} ${y};${index % 2 ? -34 : 34} ${x} ${y};${index % 2 ? -70 : 70} ${x} ${y};${index % 2 ? -70 : 70} ${x} ${y}" keyTimes="0;${keyA};${keyB};1" repeatCount="indefinite" fill="remove"/>
      </path>`;
    }

    const spark = !underground && index % 3 === 0;
    if (spark) {
      return `<path d="M${x} ${y - radius * 2.2} L${x + radius * 1.2} ${y} L${x} ${y + radius * 2.2} L${x - radius * 1.2} ${y} Z" fill="${color}" opacity="0">
        <animate attributeName="opacity" dur="${TOTAL_SECONDS}s" values="0;1;0.42;0" keyTimes="0;${keyA};${keyB};1" repeatCount="indefinite" fill="remove"/>
        <animateTransform attributeName="transform" type="translate" dur="${TOTAL_SECONDS}s" values="0 0;${dx} ${dy};${dx * 1.45} ${dy * 1.2};${dx * 1.45} ${dy * 1.2}" keyTimes="0;${keyA};${keyB};1" repeatCount="indefinite" fill="remove"/>
      </path>`;
    }

    return `<circle cx="${x}" cy="${y}" r="${radius}" fill="${dust}" opacity="0">
      <animate attributeName="opacity" dur="${TOTAL_SECONDS}s" values="0;0.74;0.38;0" keyTimes="0;${keyA};${keyB};1" repeatCount="indefinite" fill="remove"/>
      <animate attributeName="r" dur="${TOTAL_SECONDS}s" values="${radius * 0.75};${radius * 1.28};${radius * 0.8};${radius * 0.8}" keyTimes="0;${keyA};${keyB};1" repeatCount="indefinite" fill="remove"/>
      <animateTransform attributeName="transform" type="translate" dur="${TOTAL_SECONDS}s" values="0 0;${dx} ${dy};${dx * 1.45} ${dy * 1.2};${dx * 1.45} ${dy * 1.2}" keyTimes="0;${keyA};${keyB};1" repeatCount="indefinite" fill="remove"/>
    </circle>`;
  }).join("");

  return `<g filter="url(#particleGlow)" style="mix-blend-mode:screen" pointer-events="none">${shapes}</g>`;
}

async function pickBackgroundUrl(environment) {
  const dir = ENVIRONMENT_DIRS[environment] || ENVIRONMENT_DIRS[E.battle];
  const files = await listGithubFiles([...BACKGROUND_ROOT, dir], /\.(jpe?g|png|webp)$/i);
  const fallback = BACKGROUND_FALLBACK_FILES[dir] || BACKGROUND_FALLBACK_FILES["000_" + E.battle];
  return assetUrl([...BACKGROUND_ROOT, dir, randomPick(files.length > 0 ? files : fallback)]);
}

async function pickDuranUrls(expression) {
  const folder = normalizeExpression(expression);
  const assetSet = await getDuranAssetSet(folder);
  const choices = assetSet.files;
  const first = randomPick(choices);
  let second = randomPick(choices);

  if (choices.length > 1) {
    for (let i = 0; i < 8 && second === first; i++) {
      second = randomPick(choices);
    }
    if (second === first) {
      const index = (choices.indexOf(first) + 1) % choices.length;
      second = choices[index];
    }
  }

  return [
    assetUrl([...assetSet.root, assetSet.folder, first]),
    assetUrl([...assetSet.root, assetSet.folder, second])
  ];
}

async function getDuranAssetSet(folder) {
  const cutinFiles = await listGithubFiles([...DURAN_ROOT, folder], /\.(png|webp|jpe?g)$/i);
  if (cutinFiles.length > 0) return { root: DURAN_ROOT, folder, files: cutinFiles };

  const guardFiles = await listGithubFiles([...DURAN_ROOT, X.guard], /\.(png|webp|jpe?g)$/i);
  return { root: DURAN_ROOT, files: guardFiles.length > 0 ? guardFiles : makeLayerFallback(X.guard), folder: X.guard };
}

function pickJudgementUrl(result) {
  const isFailure = !/(success|\uC131\uACF5)/i.test(String(result || ""));
  const file = `${isFailure ? K.failure : K.success}.png`;
  return assetUrl([...JUDGEMENT_ROOT, file]);
}

function resolveJudgementResult(params, fallback) {
  const final = getNumericParam(params, ["final", "total"]);
  const roll = getNumericParam(params, ["P", "p", "roll"]);
  const ability = getNumericParam(params, ["ability", "ab"]);
  const item = getNumericParam(params, ["item", "it"], 0);
  const tint = getNumericParam(params, ["tint", "ti"], 0);
  const target = getNumericParam(params, ["target", "T"]);

  if (final != null && target != null) {
    const calculatedTarget = target === 0 ? 1 : target;
    return final >= calculatedTarget ? K.success : K.failure;
  }

  if ([roll, ability, item, tint, target].every((value) => value != null)) {
    const calculatedRoll = roll === 0 ? 1 : roll;
    const calculatedTarget = target === 0 ? 1 : target;
    const total = calculatedRoll + ability + item + tint;
    return total >= calculatedTarget ? K.success : K.failure;
  }

  return fallback || K.success;
}

function getNumericParam(params, names, defaultValue = null) {
  const raw = getAnyParam(params, names);
  if (raw == null || raw === "") return defaultValue;
  const match = String(raw).match(/-?\d+/);
  return match ? Number(match[0]) : defaultValue;
}

async function listGithubFiles(pathSegments, extensionPattern) {
  const key = pathSegments.join("/");
  const cached = fileCache.get(key);
  const now = Date.now();

  if (cached && now - cached.time < FILE_CACHE_MS) return cached.files;

  try {
    const apiUrl =
      `https://api.github.com/repos/${encodeURIComponent(GITHUB_OWNER)}` +
      `/${encodeURIComponent(GITHUB_REPO)}/contents/${encodePath(pathSegments)}` +
      `?ref=${encodeURIComponent(GITHUB_BRANCH)}`;

    const response = await fetch(apiUrl, {
      headers: {
        accept: "application/vnd.github+json",
        "user-agent": "duran-action-worker"
      }
    });

    if (!response.ok) throw new Error(`GitHub API ${response.status}`);

    const json = await response.json();
    if (!Array.isArray(json)) throw new Error("GitHub contents response is not an array");

    const files = json
      .filter((item) => item && item.type === "file" && typeof item.name === "string")
      .map((item) => item.name)
      .filter((name) => extensionPattern.test(name))
      .sort(naturalCompare);

    fileCache.set(key, { files, time: now });
    return files;
  } catch (_) {
    fileCache.set(key, { files: [], time: now });
    return [];
  }
}

function pickExpression({ action, emotion, result }) {
  const text = `${action} ${emotion} ${result}`.toLowerCase();

  if (/(fail|damage|shock|fear|sad|wound|death|sigh|\uC2E4\uD328|\uD53C\uD574|\uBD80\uC0C1|\uC0C1\uCC98|\uCDA9\uACA9|\uC8FD\uC74C|\uACF5\uD3EC|\uC808\uB9DD|\uC2AC\uD514|\uD55C\uC228|\uD6C4\uD68C|\uC8C4\uCC45)/.test(text)) return randomPick(FAILURE_EXPRESSIONS);
  if (/(surprise|ambush|\uB180\uB78C|\uAE30\uC2B5|\uC2B5\uACA9)/.test(text)) return X.surprise;
  if (/(threat|danger|anxious|tension|guard|hide|escape|\uC704\uD611|\uC704\uD5D8|\uBD88\uC548|\uACF5\uD3EC|\uAE34\uC7A5|\uACBD\uACC4|\uC740\uC2E0|\uC228|\uB3C4\uC8FC)/.test(text)) return X.guard;
  if (/(investigate|search|infer|trace|clue|\uC870\uC0AC|\uC218\uC0C9|\uCD94\uB9AC|\uB2E8\uC11C|\uD754\uC801|\uD655\uC778|\uD0D0\uC0C9)/.test(text)) return X.infer;
  if (/(curious|wonder|\uD638\uAE30\uC2EC|\uAD00\uC2EC|\uC774\uC0C1|\uAD81\uAE08|\uC758\uBB38)/.test(text)) return X.curious;
  if (/(talk|speech|dialogue|persuade|\uB300\uD654|\uB9D0|\uC124\uB4DD|\uAD50\uC12D|\uAD50\uD658)/.test(text)) return X.talk;
  if (/(success|reward|relief|smile|\uC131\uACF5|\uBCF4\uC0C1|\uD68C\uBCF5|\uC548\uB3C4|\uBBF8\uC18C)/.test(text)) return randomPick(SUCCESS_EXPRESSIONS);
  if (/(resolve|move|advance|arrive|endure|\uACB0\uC758|\uAC01\uC624|\uB3CC\uD30C|\uC774\uB3D9|\uC804\uC9C4|\uB3C4\uCC29|\uBC84\uD2F0)/.test(text)) return X.resolve;
  if (/(awkward|hesitate|\uB09C\uCC98|\uACE4\uB780|\uB2F9\uD669|\uB9DD\uC124)/.test(text)) return X.awkward;

  return randomPick([...SUCCESS_EXPRESSIONS, ...FAILURE_EXPRESSIONS]);
}

function normalizeEnvironment(value) {
  const raw = String(value || "").trim();
  if (ENVIRONMENT_DIRS[raw]) return raw;
  const lower = raw.toLowerCase();
  if (ENVIRONMENT_ALIASES[lower]) return ENVIRONMENT_ALIASES[lower];
  return E.battle;
}

function normalizeExpression(value) {
  const raw = String(value || "").trim();
  return EXPRESSION_FOLDERS.includes(raw) ? raw : X.guard;
}

function normalizeSide(value) {
  const raw = String(value || "").trim().toLowerCase();
  if (["left", "l", K.left, K.leftWord].includes(raw)) return "left";
  if (["right", "r", K.right, K.rightWord].includes(raw)) return "right";
  return randomPick(["left", "right"]);
}

function oppositeSide(side) {
  return side === "left" ? "right" : "left";
}

function normalizeBoolean(value, defaultValue) {
  if (value == null || value === "") return defaultValue;
  return /^(1|true|yes|y|on|loop)$/i.test(String(value).trim()) || String(value).trim() === K.repeat;
}

function numberedFiles(prefix, numbers) {
  return numbers.map((number) => `${prefix}${number}.jpg`);
}

function makeLayerFallback(folder) {
  return EXPRESSION_FALLBACK_FILES[folder] || layerFiles([1]);
}

function layerFiles(numbers) {
  return numbers.map((number) => `${K.layer} ${number}.png`);
}

function getAnyParam(params, names) {
  for (const name of names) {
    const value = params.get(name);
    if (value != null && value !== "") return value;
  }
  return "";
}

function assetUrl(pathSegments) {
  return `${ASSET_BASE_URL}/${encodePath(pathSegments)}`;
}

function encodePath(pathSegments) {
  return pathSegments.map((segment) => encodeURIComponent(segment)).join("/");
}

function randomPick(items) {
  if (!Array.isArray(items) || items.length === 0) return "";
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return items[array[0] % items.length];
}

function naturalCompare(a, b) {
  return String(a).localeCompare(String(b), "ko-KR", { numeric: true, sensitivity: "base" });
}

function escapeXml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeAttr(value) {
  return escapeXml(value).replace(/"/g, "&quot;");
}

function compactSvg(svg) {
  return svg.replace(/>\s+</g, "><").replace(/\s{2,}/g, " ").trim();
}

function round(value) {
  return Math.round(value * 100) / 100;
}

function svgResponse(svg, request, status = 200) {
  return new Response(request.method === "HEAD" ? null : svg, { status, headers: HEADERS });
}

function textResponse(text, request, status = 200) {
  return new Response(request.method === "HEAD" ? null : text, { status, headers: TEXT_HEADERS });
}

function jsonResponse(data, request, status = 200) {
  return new Response(request.method === "HEAD" ? null : JSON.stringify(data, null, 2), {
    status,
    headers: JSON_HEADERS
  });
}

function renderHelp(url) {
  const origin = `${url.protocol}//${url.host}`;
  return [
    "duran-action worker",
    "",
    "Endpoints:",
    `${origin}/action.svg?env=${E.battle}&P=5&ab=3&it=0&ti=1&target=7`,
    `${origin}/cutin.svg?env=${E.forest}&P=2&ab=2&it=0&ti=0&target=6`,
    "",
    "Params:",
    `env|${K.env}: ${Object.keys(ENVIRONMENT_DIRS).join(", ")}`,
    "P+ab+it+ti+target: worker-side judgement. act/emotion/result are not needed.",
    `expression|${K.expression}: ${EXPRESSION_FOLDERS.join(", ")}`,
    `side|${K.direction}: left/right/random`,
    "loop: always"
  ].join("\n");
}

function renderErrorSvg(error) {
  const message = escapeXml(error && error.message ? error.message : String(error));
  return compactSvg(`<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="auto" viewBox="0 0 ${WIDTH} ${HEIGHT}" preserveAspectRatio="xMidYMid meet" style="display:block;max-width:100%;height:auto;overflow:hidden">
    <rect width="100%" height="100%" fill="#1c1512"/>
    <text x="32" y="56" fill="#ffd98a" font-size="26" font-family="serif">Duran Action Worker Error</text>
    <text x="32" y="96" fill="#fff4cf" font-size="18" font-family="monospace">${message}</text>
  </svg>`);
}

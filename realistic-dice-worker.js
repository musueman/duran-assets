export default {
  async fetch(request) {
    const url = new URL(request.url);

    const TEXT_HEADERS = {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store, no-cache, must-revalidate, max-age=0",
      "pragma": "no-cache",
      "expires": "0",
      "x-content-type-options": "nosniff",
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET, OPTIONS",
      "access-control-allow-headers": "content-type"
    };

    const SVG_HEADERS = {
      "content-type": "image/svg+xml; charset=utf-8",
      "cache-control": "no-store, no-cache, must-revalidate, max-age=0",
      "pragma": "no-cache",
      "expires": "0",
      "x-content-type-options": "nosniff",
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET, OPTIONS",
      "access-control-allow-headers": "content-type"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: TEXT_HEADERS });
    }

    if (url.pathname === "/" || url.pathname === "") {
      return new Response(
        [
          "Realistic Dice SVG Worker is running.",
          "",
          "사용 예시:",
          "  /dice.svg?값=1",
          "  /dice.svg?값=6",
          "  /dice.svg?값=0   -> 1로 치환",
          "",
          "옵션:",
          "  - 값: 0~6 (0은 1로 처리)",
          "  - 애니: 1 또는 0 (기본 1)",
          "  - 질감: 1 또는 0 (기본 1)",
          "  - 눈색: 기본 #171411",
          "  - 바탕색: 기본 #f5efe2",
          "  - 테두리색: 기본 #8a7a62",
          "",
          "예시:",
          "  /dice.svg?값=4",
          "  /dice.svg?값=6&애니=0",
          "  /dice.svg?값=2&눈색=%23000000&바탕색=%23f8f6ef",
          ""
        ].join("\n"),
        { headers: TEXT_HEADERS }
      );
    }

    if (url.pathname !== "/dice.svg") {
      return new Response("Not Found", { status: 404, headers: TEXT_HEADERS });
    }

    const p = url.searchParams;

    const 원값 = clampIntStrict(p.get("값") ?? "1", 0, 6, 1);
    const 값 = 원값 === 0 ? 1 : 원값;

    const 애니 = parseToggle(p.get("애니"), true);
    const 질감 = parseToggle(p.get("질감"), true);

    const 눈색 = safeColor(p.get("눈색") ?? "#171411", "#171411");
    const 바탕색 = safeColor(p.get("바탕색") ?? "#f5efe2", "#f5efe2");
    const 테두리색 = safeColor(p.get("테두리색") ?? "#8a7a62", "#8a7a62");

    const svg = renderDiceSvg({
      값,
      애니,
      질감,
      눈색,
      바탕색,
      테두리색
    });

    return new Response(svg, { headers: SVG_HEADERS });
  }
};

function renderDiceSvg({ 값, 애니, 질감, 눈색, 바탕색, 테두리색 }) {
  const 캔버스_가로 = 700;
  const 캔버스_세로 = 560;
  const 중심X = 350;
  const 중심Y = 260;

  const geom = {
    frontX: -96,
    frontY: -72,
    size: 192,
    radius: 34,
    depthX: 34,
    depthY: 27,
    pipR: 12.5
  };

  const centerY = geom.frontY + geom.size / 2;
  const spots = makeSpots(centerY);
  const 면배치 = {
    1: ["MC"],
    2: ["TL", "BR"],
    3: ["TL", "MC", "BR"],
    4: ["TL", "TR", "BL", "BR"],
    5: ["TL", "TR", "MC", "BL", "BR"],
    6: ["TL", "TR", "ML", "MR", "BL", "BR"]
  };

  const orientation = getVisibleOrientation(값);
  const ids = makeIds(값, 눈색, 바탕색, 테두리색, 질감 ? "t" : "n");
  const palette = makePalette(바탕색, 테두리색, 눈색);

  const defs = renderDefs({ ids, geom, palette });
  const shadow = renderGroundShadow({ 애니, ids });
  const body = renderDiceBody({ geom, ids, palette, 질감 });
  const sidePips = renderSidePips({
    value: orientation.side,
    면배치,
    pipColor: 눈색,
    palette,
    geom
  });
  const topPips = renderTopPips({
    value: orientation.top,
    면배치,
    pipColor: 눈색,
    palette,
    geom
  });
  const frontPips = 애니
    ? renderAnimatedFrontPips({
        finalValue: 값,
        면배치,
        spots,
        pipR: geom.pipR,
        ids,
        palette
      })
    : renderFrontPips({
        value: 값,
        면배치,
        spots,
        pipR: geom.pipR,
        ids,
        palette
      });

  const staticDice = `
    <g transform="translate(${중심X} ${중심Y})">
      <g filter="url(#${ids.dropShadow})">
        ${body}
        ${topPips}
        ${sidePips}
        ${frontPips}
      </g>
    </g>
  `;

  const animatedDice = `
    <g transform="translate(${중심X} ${중심Y})">
      <g filter="url(#${ids.dropShadow})">
        <animateTransform
          attributeName="transform"
          type="translate"
          values="-18 -255; 8 18; -4 -16; 2 5; 0 0"
          keyTimes="0;0.54;0.74;0.9;1"
          dur="0.96s"
          begin="0s"
          fill="freeze"
        />
        <animateTransform
          attributeName="transform"
          additive="sum"
          type="rotate"
          values="-21; 132; 257; 344; 360"
          keyTimes="0;0.47;0.72;0.9;1"
          dur="0.96s"
          begin="0s"
          fill="freeze"
        />
        <animateTransform
          attributeName="transform"
          additive="sum"
          type="scale"
          values="0.98 1.04; 1.025 0.978; 0.992 1.01; 1.004 0.998; 1 1"
          keyTimes="0;0.54;0.74;0.9;1"
          dur="0.96s"
          begin="0s"
          fill="freeze"
        />
        ${body}
        ${topPips}
        ${sidePips}
        ${frontPips}
      </g>
    </g>
  `;

  const desc = 애니
    ? `투명 배경 위에서 떨어져 굴러 ${값}으로 멈추는 사실적인 입체 주사위 애니메이션`
    : `투명 배경 위에 놓인 ${값}면의 사실적인 입체 주사위`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="${캔버스_가로}"
  height="${캔버스_세로}"
  viewBox="0 0 ${캔버스_가로} ${캔버스_세로}"
  role="img"
  aria-label="주사위 ${값}"
>
  <title>주사위 ${값}</title>
  <desc>${escapeXml(desc)}</desc>
  ${defs}
  ${shadow}
  ${애니 ? animatedDice : staticDice}
</svg>`;
}

function renderDefs({ ids, geom, palette }) {
  const { frontX, frontY, size, radius } = geom;

  return `
    <defs>
      <linearGradient id="${ids.frontGrad}" x1="16%" y1="6%" x2="88%" y2="96%">
        <stop offset="0%" stop-color="${escapeXml(palette.frontHi)}" />
        <stop offset="38%" stop-color="${escapeXml(palette.front)}" />
        <stop offset="72%" stop-color="${escapeXml(palette.frontMid)}" />
        <stop offset="100%" stop-color="${escapeXml(palette.frontLow)}" />
      </linearGradient>

      <linearGradient id="${ids.topGrad}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${escapeXml(palette.topHi)}" />
        <stop offset="62%" stop-color="${escapeXml(palette.top)}" />
        <stop offset="100%" stop-color="${escapeXml(palette.topLow)}" />
      </linearGradient>

      <linearGradient id="${ids.sideGrad}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${escapeXml(palette.sideHi)}" />
        <stop offset="56%" stop-color="${escapeXml(palette.side)}" />
        <stop offset="100%" stop-color="${escapeXml(palette.sideLow)}" />
      </linearGradient>

      <radialGradient id="${ids.pipGrad}" cx="35%" cy="28%" r="78%">
        <stop offset="0%" stop-color="${escapeXml(palette.pipHi)}" />
        <stop offset="54%" stop-color="${escapeXml(palette.pip)}" />
        <stop offset="100%" stop-color="${escapeXml(palette.pipLow)}" />
      </radialGradient>

      <radialGradient id="${ids.shineGrad}" cx="28%" cy="20%" r="82%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.76" />
        <stop offset="34%" stop-color="#ffffff" stop-opacity="0.22" />
        <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
      </radialGradient>

      <linearGradient id="${ids.bevelGrad}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.62" />
        <stop offset="48%" stop-color="#ffffff" stop-opacity="0.08" />
        <stop offset="100%" stop-color="#000000" stop-opacity="0.2" />
      </linearGradient>

      <clipPath id="${ids.frontClip}">
        <rect
          x="${frontX}"
          y="${frontY}"
          width="${size}"
          height="${size}"
          rx="${radius}"
          ry="${radius}"
        />
      </clipPath>

      <filter id="${ids.dropShadow}" x="-45%" y="-45%" width="210%" height="210%">
        <feDropShadow dx="0" dy="17" stdDeviation="15" flood-color="#000000" flood-opacity="0.26" />
      </filter>

      <filter id="${ids.floorBlur}" x="-50%" y="-50%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="10" />
      </filter>

      <filter id="${ids.softBlur}" x="-35%" y="-35%" width="170%" height="170%">
        <feGaussianBlur stdDeviation="1.7" />
      </filter>

      <filter id="${ids.surfaceNoise}" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="3" seed="17" />
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer>
          <feFuncA type="table" tableValues="0 0.075" />
        </feComponentTransfer>
      </filter>
    </defs>
  `;
}

function renderDiceBody({ geom, ids, palette, 질감 }) {
  const { frontX, frontY, size, radius, depthX, depthY } = geom;
  const rightX = frontX + size;
  const bottomY = frontY + size;

  return `
    <path
      d="
        M ${frontX + radius * 0.75} ${frontY}
        L ${rightX - radius * 0.42} ${frontY}
        C ${rightX + 2} ${frontY} ${rightX + depthX - 10} ${frontY - depthY} ${rightX + depthX - radius * 0.55} ${frontY - depthY}
        L ${frontX + depthX + radius * 0.52} ${frontY - depthY}
        C ${frontX + depthX - 6} ${frontY - depthY} ${frontX + 6} ${frontY - 8} ${frontX + radius * 0.75} ${frontY}
        Z
      "
      fill="url(#${ids.topGrad})"
      stroke="${escapeXml(palette.edge)}"
      stroke-width="4.8"
      stroke-linejoin="round"
    />

    <path
      d="
        M ${rightX} ${frontY + radius * 0.28}
        C ${rightX + 6} ${frontY + 4} ${rightX + depthX - 12} ${frontY - depthY + 5} ${rightX + depthX} ${frontY - depthY + radius * 0.48}
        L ${rightX + depthX} ${bottomY - depthY - radius * 0.48}
        C ${rightX + depthX} ${bottomY - depthY + 8} ${rightX + 17} ${bottomY + 2} ${rightX + 1} ${bottomY}
        L ${rightX} ${bottomY - radius}
        Z
      "
      fill="url(#${ids.sideGrad})"
      stroke="${escapeXml(palette.edge)}"
      stroke-width="4.8"
      stroke-linejoin="round"
    />

    <rect
      x="${frontX}"
      y="${frontY}"
      width="${size}"
      height="${size}"
      rx="${radius}"
      ry="${radius}"
      fill="url(#${ids.frontGrad})"
      stroke="${escapeXml(palette.edge)}"
      stroke-width="6"
    />

    <rect
      x="${frontX + 5}"
      y="${frontY + 5}"
      width="${size - 10}"
      height="${size - 10}"
      rx="${radius - 5}"
      ry="${radius - 5}"
      fill="none"
      stroke="url(#${ids.bevelGrad})"
      stroke-width="8"
      opacity="0.78"
    />

    <rect
      x="${frontX + 17}"
      y="${frontY + 17}"
      width="${size - 34}"
      height="${size - 34}"
      rx="${radius - 13}"
      ry="${radius - 13}"
      fill="none"
      stroke="${escapeXml(palette.innerLine)}"
      stroke-opacity="0.34"
      stroke-width="1.8"
    />

    ${
      질감
        ? `
    <rect
      x="${frontX}"
      y="${frontY}"
      width="${size}"
      height="${size}"
      rx="${radius}"
      ry="${radius}"
      filter="url(#${ids.surfaceNoise})"
      clip-path="url(#${ids.frontClip})"
      opacity="0.44"
    />`
        : ""
    }

    <ellipse
      cx="${frontX + 70}"
      cy="${frontY + 53}"
      rx="${size * 0.33}"
      ry="${size * 0.24}"
      fill="url(#${ids.shineGrad})"
      clip-path="url(#${ids.frontClip})"
      opacity="0.82"
    />

    <path
      d="M ${frontX + 34} ${frontY - 4} C ${frontX + 82} ${frontY - 29}, ${rightX - 5} ${frontY - 30}, ${rightX + depthX - 16} ${frontY - depthY + 8}"
      fill="none"
      stroke="#ffffff"
      stroke-opacity="0.42"
      stroke-width="3.2"
      stroke-linecap="round"
    />

    <path
      d="M ${rightX + depthX - 2} ${frontY - depthY + 45} C ${rightX + depthX + 1} ${frontY + 32}, ${rightX + depthX + 1} ${bottomY - depthY - 44}, ${rightX + 7} ${bottomY - 10}"
      fill="none"
      stroke="#000000"
      stroke-opacity="0.13"
      stroke-width="3"
      stroke-linecap="round"
    />
  `;
}

function renderFrontPips({ value, 면배치, spots, pipR, ids, palette }) {
  const keys = 면배치[value] || 면배치[1];
  return keys.map((key) => renderFrontPip(spots[key], pipR, ids, palette)).join("\n");
}

function renderAnimatedFrontPips({ finalValue, 면배치, spots, pipR, ids, palette }) {
  const sequence = makeRollSequence(finalValue);
  const durations = [0.065, 0.075, 0.09, 0.11, 0.14, 0.18, 0.3];

  let start = 0;

  return sequence.map((value, index) => {
    const dur = durations[index] ?? 0.12;
    const begin = round(start);
    const end = round(start + dur);
    start += dur;

    const first = index === 0;
    const last = index === sequence.length - 1;
    const display = first ? "inline" : "none";
    let anim = "";

    if (!first) {
      anim += `<set attributeName="display" to="inline" begin="${begin}s" fill="freeze" />`;
    }

    if (!last) {
      anim += `<set attributeName="display" to="none" begin="${end}s" fill="freeze" />`;
    }

    return `
      <g display="${display}">
        ${renderFrontPips({ value, 면배치, spots, pipR, ids, palette })}
        ${anim}
      </g>
    `;
  }).join("\n");
}

function renderFrontPip([cx, cy], r, ids, palette) {
  return `
    <g>
      <circle
        cx="${cx + 1.8}"
        cy="${cy + 2.2}"
        r="${r + 2.4}"
        fill="#000000"
        opacity="0.16"
        filter="url(#${ids.softBlur})"
      />
      <circle
        cx="${cx}"
        cy="${cy}"
        r="${r + 2.2}"
        fill="${escapeXml(palette.pipRim)}"
        opacity="0.58"
      />
      <circle
        cx="${cx}"
        cy="${cy}"
        r="${r}"
        fill="url(#${ids.pipGrad})"
      />
      <ellipse
        cx="${cx - r * 0.28}"
        cy="${cy - r * 0.32}"
        rx="${r * 0.31}"
        ry="${r * 0.2}"
        fill="#ffffff"
        opacity="0.16"
      />
      <path
        d="M ${cx - r * 0.52} ${cy + r * 0.45} C ${cx - r * 0.12} ${cy + r * 0.72}, ${cx + r * 0.42} ${cy + r * 0.6}, ${cx + r * 0.67} ${cy + r * 0.18}"
        fill="none"
        stroke="#000000"
        stroke-opacity="0.2"
        stroke-width="1.6"
        stroke-linecap="round"
      />
    </g>
  `;
}

function renderTopPips({ value, 면배치, pipColor, palette, geom }) {
  const keys = 면배치[value] || 면배치[1];
  const color = mixHex(pipColor, palette.sideLow, 0.16);
  const points = makePlaneSpots(-2, -87, 45, 8.5, 14, 10);

  return keys.map((key) => {
    const [cx, cy] = points[key];
    return `
      <g transform="rotate(-9 ${cx} ${cy})">
        <ellipse cx="${cx + 1.2}" cy="${cy + 1.5}" rx="8.7" ry="5.1" fill="#000000" opacity="0.11" />
        <ellipse cx="${cx}" cy="${cy}" rx="8.2" ry="4.6" fill="${escapeXml(darkenHex(color, 18))}" opacity="0.9" />
        <ellipse cx="${cx - 1.8}" cy="${cy - 1}" rx="2.4" ry="1.1" fill="#ffffff" opacity="0.14" />
      </g>
    `;
  }).join("\n");
}

function renderSidePips({ value, 면배치, pipColor, palette, geom }) {
  const keys = 면배치[value] || 면배치[1];
  const centerY = geom.frontY + geom.size / 2;
  const color = mixHex(pipColor, palette.sideLow, 0.22);
  const points = makePlaneSpots(111, centerY, 8.2, 44, 8.5, -3.5);

  return keys.map((key) => {
    const [cx, cy] = points[key];
    return `
      <g transform="rotate(8 ${cx} ${cy})">
        <ellipse cx="${cx + 1.4}" cy="${cy + 1.8}" rx="5.2" ry="8.9" fill="#000000" opacity="0.11" />
        <ellipse cx="${cx}" cy="${cy}" rx="4.8" ry="8.3" fill="${escapeXml(darkenHex(color, 18))}" opacity="0.88" />
        <ellipse cx="${cx - 1}" cy="${cy - 2}" rx="1.4" ry="2.5" fill="#ffffff" opacity="0.12" />
      </g>
    `;
  }).join("\n");
}

function renderGroundShadow({ 애니, ids }) {
  if (!애니) {
    return `
      <g transform="translate(365 438)">
        <ellipse
          cx="0"
          cy="0"
          rx="104"
          ry="29"
          fill="#000000"
          opacity="0.26"
          filter="url(#${ids.floorBlur})"
        />
      </g>
    `;
  }

  return `
    <g transform="translate(365 438)">
      <ellipse
        cx="0"
        cy="0"
        rx="104"
        ry="29"
        fill="#000000"
        opacity="0.12"
        filter="url(#${ids.floorBlur})"
      >
        <animate
          attributeName="opacity"
          values="0.04;0.35;0.16;0.28;0.26"
          keyTimes="0;0.54;0.74;0.9;1"
          dur="0.96s"
          begin="0s"
          fill="freeze"
        />
        <animateTransform
          attributeName="transform"
          type="scale"
          values="0.32 0.34;1.2 1.08;0.86 0.83;1.04 0.98;1 1"
          keyTimes="0;0.54;0.74;0.9;1"
          dur="0.96s"
          begin="0s"
          fill="freeze"
        />
      </ellipse>
    </g>
  `;
}

function makeSpots(centerY) {
  const left = -50;
  const center = 0;
  const right = 50;
  const top = centerY - 50;
  const middle = centerY;
  const bottom = centerY + 50;

  return {
    TL: [left, top],
    TC: [center, top],
    TR: [right, top],
    ML: [left, middle],
    MC: [center, middle],
    MR: [right, middle],
    BL: [left, bottom],
    BC: [center, bottom],
    BR: [right, bottom]
  };
}

function makePlaneSpots(baseX, baseY, colStepX, rowStepY, rowToX, colToY) {
  const cols = { L: -1, C: 0, R: 1 };
  const rows = { T: -1, M: 0, B: 1 };
  const spots = {};

  for (const rowKey of Object.keys(rows)) {
    for (const colKey of Object.keys(cols)) {
      const row = rows[rowKey];
      const col = cols[colKey];
      spots[`${rowKey}${colKey}`] = [
        baseX + col * colStepX + row * rowToX,
        baseY + row * rowStepY + col * colToY
      ];
    }
  }

  return spots;
}

function getVisibleOrientation(front) {
  const map = {
    1: { top: 2, side: 3 },
    2: { top: 6, side: 3 },
    3: { top: 2, side: 6 },
    4: { top: 1, side: 5 },
    5: { top: 6, side: 4 },
    6: { top: 2, side: 4 }
  };
  return map[front] || map[1];
}

function makeRollSequence(finalValue) {
  const base = [2, 5, 1, 6, 3, 4];
  const seq = base.filter((v) => v !== finalValue).slice(0, 6);
  seq.push(finalValue);
  return seq;
}

function makeIds(...parts) {
  const key = parts.join("-").replace(/[^a-zA-Z0-9_-]/g, "");
  const hash = hashString(key).toString(36);
  return {
    frontGrad: `frontGrad-${hash}`,
    topGrad: `topGrad-${hash}`,
    sideGrad: `sideGrad-${hash}`,
    pipGrad: `pipGrad-${hash}`,
    shineGrad: `shineGrad-${hash}`,
    bevelGrad: `bevelGrad-${hash}`,
    frontClip: `frontClip-${hash}`,
    dropShadow: `dropShadow-${hash}`,
    floorBlur: `floorBlur-${hash}`,
    softBlur: `softBlur-${hash}`,
    surfaceNoise: `surfaceNoise-${hash}`
  };
}

function makePalette(bodyColor, edgeColor, pipColor) {
  return {
    front: bodyColor,
    frontHi: lightenHex(bodyColor, 13),
    frontMid: mixHex(bodyColor, edgeColor, 0.08),
    frontLow: darkenHex(mixHex(bodyColor, edgeColor, 0.12), 8),
    top: lightenHex(bodyColor, 8),
    topHi: lightenHex(bodyColor, 18),
    topLow: darkenHex(mixHex(bodyColor, edgeColor, 0.11), 4),
    side: darkenHex(mixHex(bodyColor, edgeColor, 0.34), 6),
    sideHi: mixHex(bodyColor, edgeColor, 0.22),
    sideLow: darkenHex(mixHex(bodyColor, edgeColor, 0.45), 14),
    edge: edgeColor,
    innerLine: lightenHex(edgeColor, 18),
    pip: pipColor,
    pipHi: lightenHex(pipColor, 14),
    pipLow: darkenHex(pipColor, 34),
    pipRim: darkenHex(mixHex(bodyColor, edgeColor, 0.18), 7)
  };
}

function parseToggle(value, fallback) {
  if (value == null || value === "") return fallback;
  const normalized = String(value).trim().toLowerCase();
  if (["0", "false", "off", "no"].includes(normalized)) return false;
  if (["1", "true", "on", "yes"].includes(normalized)) return true;
  return fallback;
}

function clampIntStrict(value, min, max, fallback) {
  const text = String(value).trim();
  if (!/^-?\d+$/.test(text)) return fallback;

  const n = Number(text);
  if (!Number.isFinite(n)) return fallback;
  return Math.max(min, Math.min(max, n));
}

function safeColor(value, fallback) {
  const normalized = normalizeHexColor(value);
  if (normalized) return normalized;

  const named = {
    black: "#000000",
    white: "#ffffff",
    red: "#d01818",
    blue: "#1d4ed8",
    green: "#15803d",
    yellow: "#eab308",
    ivory: "#fffff0",
    beige: "#f5f5dc",
    brown: "#8b4513",
    gray: "#808080",
    grey: "#808080"
  };

  return named[String(value || "").trim().toLowerCase()] || fallback;
}

function normalizeHexColor(value) {
  const v = String(value || "").trim();

  if (/^#[0-9a-fA-F]{3}$/.test(v)) {
    const r = v[1];
    const g = v[2];
    const b = v[3];
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
  }

  if (/^#[0-9a-fA-F]{6}$/.test(v)) {
    return v.toLowerCase();
  }

  return null;
}

function round(n) {
  return Number(Number(n).toFixed(3));
}

function escapeXml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function hexToRgb(hex) {
  const normalized = normalizeHexColor(hex);
  if (!normalized) return null;

  const clean = normalized.slice(1);
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);

  if ([r, g, b].some((v) => Number.isNaN(v))) return null;
  return { r, g, b };
}

function rgbToHex(r, g, b) {
  return (
    "#" +
    [r, g, b]
      .map((v) => {
        const n = Math.max(0, Math.min(255, Math.round(v)));
        return n.toString(16).padStart(2, "0");
      })
      .join("")
  );
}

function lightenHex(hex, percent) {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const p = percent / 100;
  return rgbToHex(
    rgb.r + (255 - rgb.r) * p,
    rgb.g + (255 - rgb.g) * p,
    rgb.b + (255 - rgb.b) * p
  );
}

function darkenHex(hex, percent) {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const p = 1 - percent / 100;
  return rgbToHex(rgb.r * p, rgb.g * p, rgb.b * p);
}

function mixHex(hexA, hexB, ratio = 0.5) {
  const a = hexToRgb(hexA);
  const b = hexToRgb(hexB);
  if (!a || !b) return hexA;

  const r = a.r * (1 - ratio) + b.r * ratio;
  const g = a.g * (1 - ratio) + b.g * ratio;
  const bl = a.b * (1 - ratio) + b.b * ratio;

  return rgbToHex(r, g, bl);
}

function hashString(value) {
  let hash = 2166136261;

  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

const BASE_URL = "https://musueman.github.io/duran-assets/visual";

const GITHUB_OWNER = "musueman";
const GITHUB_REPO = "duran-assets";
const GITHUB_BRANCH = "main";

const ASSET_ROOT_FOLDER = "visual";

const 환경_폴더명 = "환경";
const 환경정지_폴더명 = "환경정지";
const 환경반복_폴더명 = "환경반복";

const 패_폴더명 = "패";

const 듀란_폴더명 = "D";

const 원본_가로 = 700;
const 원본_세로 = 559;

const 듀란_가로 = 230;
const 듀란_세로 = 230;

const 듀란_X = 235;
const 듀란_Y = 319;

const 모바일_크롭_크기 = 559;
const 모바일_크롭_X = (원본_가로 - 모바일_크롭_크기) / 2;
const 모바일_크롭_Y = 0;

const 환경_시작정지_초 = 3.0;
const 환경_애니_초 = 4.0;
const 패_등장_초 = 환경_시작정지_초 + 환경_애니_초;
const 패_소환효과_초 = 0.8;
const 듀란_전환_효과_시작_초 = 4.0;
const 듀란_전환_실루엣_초 = 2.0;

const 환경_공통기본이미지_파일 = "기본.webp";

const 환경_목록 = [
  "검문소",
  "성벽",
  "숲",
  "실내",
  "야외",
  "전장",
  "지하",
  "폐허"
];

const 기본_환경 = "야외";

const 환경_대체목록 = {
  "검문소": ["검문소1.webp", "검문소2.webp"],
  "성벽": ["성벽1.webp", "성벽2.webp"],
  "숲": ["숲1.webp", "숲2.webp"],
  "실내": ["실내1.webp", "실내2.webp"],
  "야외": ["야외1.webp", "야외2.webp"],
  "전장": ["전장1.webp", "전장2.webp"],
  "지하": ["지하1.webp", "지하2.webp"],
  "폐허": ["폐허1.webp", "폐허2.webp"]
};

const 패_목록 = [
  "위협",
  "교환",
  "조우",
  "조사",
  "이동",
  "정비"
];

const 기본_패 = "위협";

const 환경_효과테마 = {
  "검문소": {
    accent: "#e65656",
    glow: "#ffb36d",
    fog: "#6f7f91",
    vignette: "#08090d",
    particle: "#d9c3a0",
    mood: "checkpoint"
  },
  "성벽": {
    accent: "#d9e9ff",
    glow: "#fff1ad",
    fog: "#c7d4e8",
    vignette: "#1a2432",
    particle: "#e8dfc8",
    mood: "wall"
  },
  "숲": {
    accent: "#8fdc74",
    glow: "#ffd56f",
    fog: "#9bcfb8",
    vignette: "#06160f",
    particle: "#d8f5a2",
    mood: "forest"
  },
  "실내": {
    accent: "#f3b35f",
    glow: "#ffd27a",
    fog: "#d7b285",
    vignette: "#140c0a",
    particle: "#f0d8a8",
    mood: "indoor"
  },
  "야외": {
    accent: "#b7dbff",
    glow: "#ffe3a2",
    fog: "#d9e8ff",
    vignette: "#182338",
    particle: "#fff1bc",
    mood: "outdoor"
  },
  "전장": {
    accent: "#ff5f45",
    glow: "#ff9a35",
    fog: "#4c3d3a",
    vignette: "#090605",
    particle: "#ffb35a",
    mood: "battlefield"
  },
  "지하": {
    accent: "#69dfd5",
    glow: "#7be7ff",
    fog: "#5fbbb5",
    vignette: "#020b12",
    particle: "#a6fff4",
    mood: "underground"
  },
  "폐허": {
    accent: "#c7b28d",
    glow: "#e2b66c",
    fog: "#9a9288",
    vignette: "#0d0b0a",
    particle: "#d2c1a3",
    mood: "ruins"
  }
};

/*
  듀란 시퀀스
  1. 기본 4초
  2. 놀람 3.5초
  3. 기본 고정
*/
const 듀란_시퀀스_1 = [
  {
    순서: 1,
    폴더: 듀란_폴더명,
    파일: "기본.webp",
    지속: 4.0,
    이동X: 0,
    이동Y: 0
  },
  {
    순서: 2,
    폴더: 듀란_폴더명,
    파일: "놀람.webp",
    지속: 3.5,
    이동X: 0,
    이동Y: 0
  },
  {
    순서: 3,
    폴더: 듀란_폴더명,
    파일: "기본.webp",
    지속: 0,
    이동X: 0,
    이동Y: 0,
    고정: true
  }
];

const TEXT_HEADERS = {
  "content-type": "text/plain; charset=utf-8",
  "cache-control": "no-store, no-cache, must-revalidate, max-age=0",
  "pragma": "no-cache",
  "expires": "0",
  "x-content-type-options": "nosniff",
  "access-control-allow-origin": "*"
};

const SVG_HEADERS = {
  "content-type": "image/svg+xml; charset=utf-8",
  "cache-control": "no-store, no-cache, must-revalidate, max-age=0",
  "pragma": "no-cache",
  "expires": "0",
  "x-content-type-options": "nosniff",
  "access-control-allow-origin": "*"
};

let 환경파일목록_캐시 = null;
let 환경파일목록_가져온시각 = 0;
const 환경파일목록_캐시시간 = 5 * 60 * 1000;

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/" || url.pathname === "") {
      return new Response(getHelpText(), { headers: TEXT_HEADERS });
    }

    if (url.pathname !== "/scene.svg" && url.pathname !== "/duran.svg") {
      return new Response("Not Found", { status: 404, headers: TEXT_HEADERS });
    }

    const p = url.searchParams;

    const 환경입력 = safeText(p.get("환경") || 기본_환경, 기본_환경, 20);
    const 패입력 = safeText(
      p.get("카드") || p.get("패") || 기본_패,
      기본_패,
      50
    );

    const 환경이름 = normalizeEnvironmentName(환경입력);
    const 패이름 = normalizeCardName(패입력);

    const userAgent = request.headers.get("user-agent") || "";
    const 모바일여부 = isMobileUserAgent(userAgent);

    const 선택환경파일 = await pickRandomEnvironmentFile(환경이름);

    const svg = renderSceneSvg({
      환경이름,
      패이름,
      선택환경파일,
      모바일여부
    });

    return new Response(svg, { headers: SVG_HEADERS });
  }
};

function renderSceneSvg({ 환경이름, 패이름, 선택환경파일, 모바일여부 }) {
  const 환경레이어 = renderEnvironmentImage({
    선택환경파일,
    x: 0,
    y: 0,
    width: 원본_가로,
    height: 원본_세로
  });

  const 패위효과레이어 = renderOverCardEffects({ 환경이름 });
  const 패하단효과레이어 = renderCardUnderEffects({ 환경이름 });
  const 패상단효과레이어 = renderCardOverEffects({ 환경이름 });

  const 패레이어 = renderCardImage({
    패이름,
    x: 0,
    y: 0,
    width: 원본_가로,
    height: 원본_세로
  });

  const 듀란타임라인 = buildTimeline(듀란_시퀀스_1, 듀란_X, 듀란_Y);
  const 듀란레이어 = renderSingleImageSequence({
    타임라인: 듀란타임라인,
    x: 듀란_X,
    y: 듀란_Y,
    width: 듀란_가로,
    height: 듀란_세로
  });

  const 듀란보정레이어 = renderDuranGroundingEffects({ 환경이름 });
  const 전경분위기레이어 = renderFrontAtmosphereEffects({ 환경이름 });
  const 시작암전레이어 = renderOpeningFade({ 환경이름 });

  const viewBox = 모바일여부
    ? `${fmt(모바일_크롭_X)} ${fmt(모바일_크롭_Y)} ${모바일_크롭_크기} ${모바일_크롭_크기}`
    : `0 0 ${원본_가로} ${원본_세로}`;

  const 표시모드 = 모바일여부 ? "모바일 1:1" : "데스크탑 원본 비율";

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="${viewBox}"
  width="100%"
  height="auto"
  preserveAspectRatio="xMidYMid meet"
>
  <title>Duran Scene</title>
  <desc>환경=${escapeXml(환경이름)} / 선택환경파일=${escapeXml(선택환경파일)} / 카드=${escapeXml(패이름)} / 표시=${표시모드}</desc>

  <defs>
    ${renderDefs({ 환경이름 })}
  </defs>

  <style>
    svg {
      display: block;
      width: 100%;
      height: auto;
      max-width: 100%;
      margin: 0;
      padding: 0;
      background: transparent;
    }
  </style>

  <g id="layer-environment">
    ${환경레이어}
  </g>

  <g id="layer-card-under-effects" pointer-events="none">
    ${패하단효과레이어}
  </g>

  <g id="layer-card">
    ${패레이어}
  </g>

  <g id="layer-card-over-effects" pointer-events="none">
    ${패상단효과레이어}
  </g>

  <g id="layer-over-card-effects" pointer-events="none">
    ${패위효과레이어}
  </g>

  <g id="layer-duran" pointer-events="none">
    ${듀란보정레이어}
    ${듀란레이어}
  </g>

  <g id="layer-front-atmosphere" pointer-events="none">
    ${전경분위기레이어}
  </g>

  <g id="layer-opening-fade" pointer-events="none">
    ${시작암전레이어}
  </g>
</svg>`;
}

function renderDefs({ 환경이름 }) {
  const theme = getEffectTheme(환경이름);

  return `
    <filter id="soft-blur" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" />
    </filter>

    <filter id="wide-blur" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="22" />
    </filter>

    <filter id="summon-glow" x="-40%" y="-60%" width="180%" height="220%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
      <feColorMatrix
        in="blur"
        type="matrix"
        values="1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 2.6 0"
        result="glow"
      />
      <feMerge>
        <feMergeNode in="glow" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <radialGradient id="edge-vignette" cx="50%" cy="52%" r="67%">
      <stop offset="0%" stop-color="${escapeXml(theme.vignette)}" stop-opacity="0" />
      <stop offset="62%" stop-color="${escapeXml(theme.vignette)}" stop-opacity="0" />
      <stop offset="100%" stop-color="${escapeXml(theme.vignette)}" stop-opacity="0.62" />
    </radialGradient>

    <radialGradient id="duran-backlight" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${escapeXml(theme.glow)}" stop-opacity="0.42" />
      <stop offset="72%" stop-color="${escapeXml(theme.accent)}" stop-opacity="0.18" />
      <stop offset="100%" stop-color="${escapeXml(theme.accent)}" stop-opacity="0" />
    </radialGradient>

    <linearGradient id="low-fog-gradient" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stop-color="${escapeXml(theme.fog)}" stop-opacity="0" />
      <stop offset="42%" stop-color="${escapeXml(theme.fog)}" stop-opacity="0.45" />
      <stop offset="100%" stop-color="${escapeXml(theme.fog)}" stop-opacity="0" />
    </linearGradient>

    <filter id="duran-surprise-silhouette" x="-20%" y="-20%" width="140%" height="140%" color-interpolation-filters="sRGB">
      <feColorMatrix
        in="SourceGraphic"
        type="matrix"
        values="0.18 0 0 0 0
                0 0.16 0 0 0
                0 0 0.14 0 0
                0 0 0 1 0"
      />
    </filter>

    <filter id="duran-inner-glow-thin" x="-25%" y="-25%" width="150%" height="150%" color-interpolation-filters="sRGB">
      <feMorphology in="SourceAlpha" operator="erode" radius="0.75" result="eroded" />
      <feComposite in="SourceAlpha" in2="eroded" operator="out" result="innerEdge" />
      <feGaussianBlur in="innerEdge" stdDeviation="0.85" result="softEdge" />
      <feComposite in="softEdge" in2="SourceAlpha" operator="in" result="clippedEdge" />
      <feFlood flood-color="${escapeXml(theme.glow)}" flood-opacity="0.72" result="glowColor" />
      <feComposite in="glowColor" in2="clippedEdge" operator="in" result="coloredEdge" />
      <feColorMatrix
        in="coloredEdge"
        type="saturate"
        values="0.45"
        result="softColor"
      />
      <feColorMatrix
        in="softColor"
        type="matrix"
        values="1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 0.92 0"
      />
    </filter>

    <filter id="duran-inner-glow-wide" x="-25%" y="-25%" width="150%" height="150%" color-interpolation-filters="sRGB">
      <feMorphology in="SourceAlpha" operator="erode" radius="2.1" result="eroded" />
      <feComposite in="SourceAlpha" in2="eroded" operator="out" result="innerEdge" />
      <feGaussianBlur in="innerEdge" stdDeviation="1.65" result="softEdge" />
      <feComposite in="softEdge" in2="SourceAlpha" operator="in" result="clippedEdge" />
      <feFlood flood-color="${escapeXml(theme.accent)}" flood-opacity="0.56" result="glowColor" />
      <feComposite in="glowColor" in2="clippedEdge" operator="in" result="coloredEdge" />
      <feColorMatrix
        in="coloredEdge"
        type="saturate"
        values="0.38"
        result="softColor"
      />
      <feColorMatrix
        in="softColor"
        type="matrix"
        values="1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 0.86 0"
      />
    </filter>`;
}

function renderEnvironmentImage({ 선택환경파일, x, y, width, height }) {
  const 정지주소 = assetUrl(환경정지_폴더명, 환경_공통기본이미지_파일);
  const 애니주소 = assetUrl(환경_폴더명, 선택환경파일);
  const 반복주소 = assetUrl(환경반복_폴더명, 선택환경파일);

  const 애니시작 = 환경_시작정지_초;
  const 반복시작 = 환경_시작정지_초 + 환경_애니_초;

  return `
  <image
    href="${escapeXml(정지주소)}"
    x="${fmt(x)}"
    y="${fmt(y)}"
    width="${width}"
    height="${height}"
    preserveAspectRatio="none"
  >
    <set
      attributeName="display"
      to="none"
      begin="${fmt(애니시작)}s"
      fill="freeze"
    />
  </image>

  <image
    href="${escapeXml(애니주소)}"
    x="${fmt(x)}"
    y="${fmt(y)}"
    width="${width}"
    height="${height}"
    display="none"
    preserveAspectRatio="none"
  >
    <set
      attributeName="display"
      to="inline"
      begin="${fmt(애니시작)}s"
      fill="freeze"
    />
    <set
      attributeName="display"
      to="none"
      begin="${fmt(반복시작)}s"
      fill="freeze"
    />
  </image>

  <image
    href="${escapeXml(반복주소)}"
    x="${fmt(x)}"
    y="${fmt(y)}"
    width="${width}"
    height="${height}"
    display="none"
    preserveAspectRatio="none"
  >
    <set
      attributeName="display"
      to="inline"
      begin="${fmt(반복시작)}s"
      fill="freeze"
    />
  </image>`;
}

function renderOverCardEffects({ 환경이름 }) {
  const theme = getEffectTheme(환경이름);
  const baseOpacity = getAmbientOpacity(환경이름);

  return `
  <g opacity="0">
    <animate
      attributeName="opacity"
      from="0"
      to="${fmt(baseOpacity)}"
      begin="${fmt(패_등장_초)}s"
      dur="0.8s"
      fill="freeze"
    />
    ${renderEnvironmentAccent({ 환경이름, theme })}
    ${renderAmbientParticles({ 환경이름, theme })}
  </g>`;
}

function renderFrontAtmosphereEffects({ 환경이름 }) {
  const theme = getEffectTheme(환경이름);
  const fogOpacity = Math.min(1, getAmbientOpacity(환경이름) + 0.08);

  return `
  <g opacity="0">
    <animate
      attributeName="opacity"
      from="0"
      to="${fmt(fogOpacity)}"
      begin="${fmt(패_등장_초)}s"
      dur="0.9s"
      fill="freeze"
    />
    ${renderLowFog({ 환경이름, theme })}
  </g>
  ${renderVignette({ 환경이름 })}`;
}

function renderLowFog({ 환경이름, theme }) {
  const fogSettings = {
    "숲": { y: 510, rx: 340, ry: 28, opacity: 0.82 },
    "지하": { y: 518, rx: 354, ry: 34, opacity: 0.94 },
    "전장": { y: 506, rx: 336, ry: 34, opacity: 0.86 },
    "폐허": { y: 510, rx: 328, ry: 30, opacity: 0.76 },
    "실내": { y: 502, rx: 308, ry: 24, opacity: 0.62 },
    "검문소": { y: 500, rx: 306, ry: 24, opacity: 0.66 },
    "성벽": { y: 496, rx: 326, ry: 22, opacity: 0.58 },
    "야외": { y: 496, rx: 326, ry: 22, opacity: 0.54 }
  };

  const setting = fogSettings[환경이름] || fogSettings[기본_환경];

  return `
    <g filter="url(#wide-blur)" opacity="${fmt(setting.opacity)}">
      <ellipse
        cx="350"
        cy="${fmt(setting.y)}"
        rx="${fmt(setting.rx)}"
        ry="${fmt(setting.ry)}"
        fill="url(#low-fog-gradient)"
      >
        <animate
          attributeName="cx"
          values="330;370;330"
          begin="${fmt(패_등장_초)}s"
          dur="9s"
          repeatCount="indefinite"
        />
      </ellipse>
      <ellipse
        cx="365"
        cy="${fmt(setting.y + 10)}"
        rx="${fmt(setting.rx * 0.72)}"
        ry="${fmt(setting.ry * 0.45)}"
        fill="${escapeXml(theme.fog)}"
        opacity="0.42"
      >
        <animate
          attributeName="cx"
          values="375;330;375"
          begin="${fmt(패_등장_초 + 0.7)}s"
          dur="11s"
          repeatCount="indefinite"
        />
      </ellipse>
    </g>`;
}

function renderEnvironmentAccent({ 환경이름, theme }) {
  if (환경이름 === "숲") {
    return `
    <g filter="url(#wide-blur)">
      <circle cx="181" cy="164" r="42" fill="${escapeXml(theme.glow)}" opacity="0.45">
        <animate attributeName="opacity" values="0.3;0.68;0.34;0.58;0.3" begin="${fmt(패_등장_초)}s" dur="3.8s" repeatCount="indefinite" />
      </circle>
      <circle cx="518" cy="164" r="42" fill="${escapeXml(theme.glow)}" opacity="0.45">
        <animate attributeName="opacity" values="0.44;0.26;0.72;0.35;0.44" begin="${fmt(패_등장_초 + 0.4)}s" dur="4.2s" repeatCount="indefinite" />
      </circle>
    </g>`;
  }

  if (환경이름 === "검문소") {
    return `
    <g opacity="0.78">
      <rect x="-120" y="318" width="240" height="20" fill="${escapeXml(theme.accent)}" opacity="0" filter="url(#soft-blur)">
        <animate attributeName="opacity" values="0;0.95;0" begin="${fmt(패_등장_초 + 0.35)}s" dur="1.2s" repeatCount="indefinite" />
        <animate attributeName="x" values="-120;700" begin="${fmt(패_등장_초 + 0.35)}s" dur="4.8s" repeatCount="indefinite" />
      </rect>
    </g>`;
  }

  if (환경이름 === "전장") {
    return `
    <g filter="url(#wide-blur)" opacity="0.9">
      <circle cx="96" cy="433" r="78" fill="${escapeXml(theme.glow)}" opacity="0.32">
        <animate attributeName="opacity" values="0.18;0.62;0.24;0.5;0.18" begin="${fmt(패_등장_초)}s" dur="2.2s" repeatCount="indefinite" />
      </circle>
      <circle cx="610" cy="398" r="68" fill="${escapeXml(theme.accent)}" opacity="0.24">
        <animate attributeName="opacity" values="0.12;0.48;0.16;0.12" begin="${fmt(패_등장_초 + 0.8)}s" dur="3.1s" repeatCount="indefinite" />
      </circle>
    </g>`;
  }

  if (환경이름 === "실내") {
    return `
    <g filter="url(#wide-blur)" opacity="0.78">
      <ellipse cx="350" cy="350" rx="238" ry="94" fill="${escapeXml(theme.glow)}" opacity="0.34">
        <animate attributeName="opacity" values="0.24;0.54;0.29;0.48;0.24" begin="${fmt(패_등장_초)}s" dur="4.6s" repeatCount="indefinite" />
      </ellipse>
    </g>`;
  }

  if (환경이름 === "지하") {
    return `
    <g filter="url(#wide-blur)" opacity="0.84">
      <ellipse cx="350" cy="420" rx="286" ry="76" fill="${escapeXml(theme.accent)}" opacity="0.32">
        <animate attributeName="opacity" values="0.2;0.58;0.26;0.2" begin="${fmt(패_등장_초)}s" dur="5.4s" repeatCount="indefinite" />
      </ellipse>
    </g>`;
  }

  if (환경이름 === "성벽" || 환경이름 === "야외") {
    return `
    <g filter="url(#wide-blur)" opacity="0.62">
      <rect x="-180" y="112" width="380" height="330" fill="${escapeXml(theme.glow)}" opacity="0.32" transform="rotate(-16 0 0)">
        <animate attributeName="x" values="-200;620" begin="${fmt(패_등장_초)}s" dur="14s" repeatCount="indefinite" />
      </rect>
    </g>`;
  }

  return `
    <g filter="url(#soft-blur)" opacity="0.54">
      <ellipse cx="350" cy="382" rx="280" ry="86" fill="${escapeXml(theme.accent)}" opacity="0.26" />
    </g>`;
}

function renderAmbientParticles({ 환경이름, theme }) {
  const points = expandParticlePoints(getParticlePoints(환경이름));
  const upward = 환경이름 === "전장" || 환경이름 === "숲" || 환경이름 === "야외";
  const fill = escapeXml(theme.particle);

  return points.map((point, index) => {
    const delay = (index % 6) * 0.38;
    const duration = 3.4 + (index % 5) * 0.7;
    const drift = upward ? -18 - (index % 4) * 4 : -8 - (index % 3) * 3;
    const maxOpacity = Math.min(0.95, (point.opacity || 0.5) * 1.9);

    return `
    <circle
      cx="${fmt(point.x)}"
      cy="${fmt(point.y)}"
      r="${fmt(point.r)}"
      fill="${fill}"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;${fmt(maxOpacity)};0"
        begin="${fmt(패_등장_초 + delay)}s"
        dur="${fmt(duration)}s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="cy"
        values="${fmt(point.y)};${fmt(point.y + drift)};${fmt(point.y)}"
        begin="${fmt(패_등장_초 + delay)}s"
        dur="${fmt(duration)}s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="cx"
        values="${fmt(point.x)};${fmt(point.x + point.sway)};${fmt(point.x)}"
        begin="${fmt(패_등장_초 + delay)}s"
        dur="${fmt(duration + 1.2)}s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="r"
        values="${fmt(point.r)};${fmt(point.r * 1.8)};${fmt(point.r)}"
        begin="${fmt(패_등장_초 + delay)}s"
        dur="${fmt(duration)}s"
        repeatCount="indefinite"
      />
    </circle>`;
  }).join("");
}

function renderCardUnderEffects({ 환경이름 }) {
  const theme = getEffectTheme(환경이름);

  return `
  <ellipse
    cx="350"
    cy="398"
    rx="238"
    ry="39"
    fill="#080509"
    opacity="0"
    filter="url(#soft-blur)"
  >
    <animate
      attributeName="opacity"
      from="0"
      to="0.26"
      begin="${fmt(패_등장_초)}s"
      dur="0.35s"
      fill="freeze"
    />
  </ellipse>

  <g filter="url(#summon-glow)">
    <ellipse
      cx="350"
      cy="382"
      rx="74"
      ry="15"
      fill="none"
      stroke="${escapeXml(theme.accent)}"
      stroke-width="3"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;0.96;0.86;0.68;0.48;0.3;0.14;0"
        keyTimes="0;0.143;0.286;0.429;0.571;0.714;0.857;1"
        calcMode="discrete"
        begin="${fmt(패_등장_초)}s"
        dur="${fmt(패_소환효과_초)}s"
        fill="freeze"
      />
      <animate
        attributeName="rx"
        values="74;96;124;158;194;226;248;264"
        keyTimes="0;0.143;0.286;0.429;0.571;0.714;0.857;1"
        calcMode="discrete"
        begin="${fmt(패_등장_초)}s"
        dur="${fmt(패_소환효과_초)}s"
        fill="freeze"
      />
      <animate
        attributeName="ry"
        values="15;20;26;33;40;46;50;54"
        keyTimes="0;0.143;0.286;0.429;0.571;0.714;0.857;1"
        calcMode="discrete"
        begin="${fmt(패_등장_초)}s"
        dur="${fmt(패_소환효과_초)}s"
        fill="freeze"
      />
    </ellipse>
    <ellipse
      cx="350"
      cy="382"
      rx="48"
      ry="9"
      fill="${escapeXml(theme.glow)}"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;0.34;0.28;0.2;0.13;0.08;0.03;0"
        keyTimes="0;0.143;0.286;0.429;0.571;0.714;0.857;1"
        calcMode="discrete"
        begin="${fmt(패_등장_초 + 0.05)}s"
        dur="${fmt(패_소환효과_초)}s"
        fill="freeze"
      />
      <animate
        attributeName="rx"
        values="48;68;94;122;154;182;202;218"
        keyTimes="0;0.143;0.286;0.429;0.571;0.714;0.857;1"
        calcMode="discrete"
        begin="${fmt(패_등장_초 + 0.05)}s"
        dur="${fmt(패_소환효과_초)}s"
        fill="freeze"
      />
      <animate
        attributeName="ry"
        values="9;13;18;24;30;35;39;43"
        keyTimes="0;0.143;0.286;0.429;0.571;0.714;0.857;1"
        calcMode="discrete"
        begin="${fmt(패_등장_초 + 0.05)}s"
        dur="${fmt(패_소환효과_초)}s"
        fill="freeze"
      />
    </ellipse>
  </g>`;
}

function renderCardOverEffects({ 환경이름 }) {
  const theme = getEffectTheme(환경이름);
  const sparkles = [
    { x: 142, y: 344, r: 2.3, dx: -10, dy: -30 },
    { x: 218, y: 316, r: 1.8, dx: -4, dy: -24 },
    { x: 288, y: 380, r: 2.1, dx: 7, dy: -28 },
    { x: 372, y: 322, r: 1.7, dx: 10, dy: -22 },
    { x: 452, y: 374, r: 2.4, dx: 6, dy: -34 },
    { x: 546, y: 338, r: 1.9, dx: 13, dy: -27 }
  ];

  const sparkleSvg = sparkles.map((sparkle, index) => {
    const begin = 패_등장_초 + 0.08 + index * 0.045;
    return `
    <circle
      cx="${fmt(sparkle.x)}"
      cy="${fmt(sparkle.y)}"
      r="${fmt(sparkle.r)}"
      fill="${escapeXml(theme.particle)}"
      opacity="0"
    >
      <animate attributeName="opacity" values="0;0.88;0" begin="${fmt(begin)}s" dur="0.68s" fill="freeze" />
      <animate attributeName="cx" from="${fmt(sparkle.x)}" to="${fmt(sparkle.x + sparkle.dx)}" begin="${fmt(begin)}s" dur="0.68s" fill="freeze" />
      <animate attributeName="cy" from="${fmt(sparkle.y)}" to="${fmt(sparkle.y + sparkle.dy)}" begin="${fmt(begin)}s" dur="0.68s" fill="freeze" />
    </circle>`;
  }).join("");

  return `
  <g filter="url(#soft-blur)">
    <rect
      x="72"
      y="300"
      width="556"
      height="126"
      rx="24"
      fill="${escapeXml(theme.accent)}"
      opacity="0"
    >
      <animate
        attributeName="opacity"
        values="0;0.12;0"
        keyTimes="0;0.22;1"
        begin="${fmt(패_등장_초)}s"
        dur="0.5s"
        fill="freeze"
      />
    </rect>
  </g>

  <g filter="url(#summon-glow)">
    ${sparkleSvg}
  </g>`;
}

function renderDuranGroundingEffects({ 환경이름 }) {
  const theme = getEffectTheme(환경이름);

  return `
  <ellipse
    cx="350"
    cy="524"
    rx="84"
    ry="18"
    fill="#050305"
    opacity="0.32"
    filter="url(#soft-blur)"
  />
  <ellipse
    cx="350"
    cy="430"
    rx="156"
    ry="156"
    fill="url(#duran-backlight)"
    opacity="0.54"
    filter="url(#wide-blur)"
  >
    <animate
      attributeName="opacity"
      values="0.44;0.64;0.48;0.54"
      begin="${fmt(패_등장_초)}s"
      dur="5.8s"
      repeatCount="indefinite"
    />
  </ellipse>
  <ellipse
    cx="350"
    cy="346"
    rx="100"
    ry="132"
    fill="${escapeXml(theme.accent)}"
    opacity="0.12"
    filter="url(#wide-blur)"
  />`;
}

function renderVignette({ 환경이름 }) {
  const opacity = 환경이름 === "야외" || 환경이름 === "성벽" ? 0.46 : 0.58;

  return `
  <rect
    x="0"
    y="0"
    width="${원본_가로}"
    height="${원본_세로}"
    fill="url(#edge-vignette)"
    opacity="${fmt(opacity)}"
  />`;
}

function renderOpeningFade({ 환경이름 }) {
  const theme = getEffectTheme(환경이름);

  return `
  <rect
    x="0"
    y="0"
    width="${원본_가로}"
    height="${원본_세로}"
    fill="${escapeXml(theme.vignette)}"
    opacity="1"
  >
    <animate
      attributeName="opacity"
      values="1;1;0"
      keyTimes="0;0.56;1"
      begin="0s"
      dur="1.8s"
      fill="freeze"
    />
  </rect>`;
}

function renderCardImage({ 패이름, x, y, width, height }) {
  const 패파일 = `${패이름}.webp`;
  const 패주소 = assetUrl(패_폴더명, 패파일);

  return `
  <image
    href="${escapeXml(패주소)}"
    x="${fmt(x)}"
    y="${fmt(y)}"
    width="${width}"
    height="${height}"
    display="none"
    preserveAspectRatio="none"
  >
    <set
      attributeName="display"
      to="inline"
      begin="${fmt(패_등장_초)}s"
      fill="freeze"
    />
  </image>`;
}

function buildTimeline(시퀀스, 시작X = 0, 시작Y = 0) {
  const 정렬된시퀀스 = [...시퀀스].sort((a, b) => {
    const ao = Number(a.순서) || 0;
    const bo = Number(b.순서) || 0;
    return ao - bo;
  });

  let t = 0;
  let 현재X = 시작X;
  let 현재Y = 시작Y;

  return 정렬된시퀀스.map((단계, index) => {
    const 지속 = Math.max(0, Number(단계.지속) || 0);
    const 이동X = Number(단계.이동X) || 0;
    const 이동Y = Number(단계.이동Y) || 0;
    const 고정 = !!단계.고정;

    const 시작 = t;
    const 종료 = 고정 ? null : t + 지속;

    const item = {
      index,
      순서: Number(단계.순서) || index + 1,
      폴더: 단계.폴더,
      파일: 단계.파일,
      시작,
      종료,
      지속,
      고정,
      x: 현재X,
      y: 현재Y,
      종료X: 현재X + 이동X,
      종료Y: 현재Y + 이동Y,
      이동X,
      이동Y
    };

    현재X += 이동X;
    현재Y += 이동Y;
    t += 지속;

    return item;
  });
}

function renderSingleImageSequence({ 타임라인, width, height }) {
  if (!Array.isArray(타임라인) || 타임라인.length === 0) {
    return "";
  }

  return 타임라인.map((item) => {
    const href = assetUrl(item.폴더, item.파일);
    const defaultDisplay = item.시작 === 0 ? "inline" : "none";

    let displayAnim = "";

    if (item.시작 > 0) {
      displayAnim += `<set attributeName="display" to="inline" begin="${fmt(item.시작)}s" fill="freeze" />\n    `;
    }

    if (item.종료 !== null) {
      displayAnim += `<set attributeName="display" to="none" begin="${fmt(item.종료)}s" fill="freeze" />\n    `;
    }

    let moveAnimX = "";
    let moveAnimY = "";
    if (item.지속 > 0) {
      if (item.이동X !== 0) {
        moveAnimX = `<animate attributeName="x" from="${fmt(item.x)}" to="${fmt(item.종료X)}" begin="${fmt(item.시작)}s" dur="${fmt(item.지속)}s" fill="freeze" />\n    `;
      }
      if (item.이동Y !== 0) {
        moveAnimY = `<animate attributeName="y" from="${fmt(item.y)}" to="${fmt(item.종료Y)}" begin="${fmt(item.시작)}s" dur="${fmt(item.지속)}s" fill="freeze" />\n    `;
      }
    }

    const transitionEffect = renderDuranImageTransitionEffects({
      item,
      href,
      width,
      height
    });

    return `
  <image
    href="${escapeXml(href)}"
    x="${fmt(item.x)}"
    y="${fmt(item.y)}"
    width="${width}"
    height="${height}"
    display="${defaultDisplay}"
    preserveAspectRatio="none"
  >
    ${displayAnim}${moveAnimX}${moveAnimY}
  </image>${transitionEffect}`;
  }).join("");
}

function renderDuranImageTransitionEffects({ item, href, width, height }) {
  if (item.폴더 !== 듀란_폴더명 || !isTimelineItemActiveAt(item, 듀란_전환_효과_시작_초)) {
    return "";
  }

  const 시작 = 듀란_전환_효과_시작_초;
  const 종료 = 듀란_전환_효과_시작_초 + 듀란_전환_실루엣_초;
  const commonAttrs = `
    href="${escapeXml(href)}"
    x="${fmt(getTimelineItemXAt(item, 시작))}"
    y="${fmt(getTimelineItemYAt(item, 시작))}"
    width="${width}"
    height="${height}"
    display="none"
    preserveAspectRatio="none"`;

  return `
  <image
    ${commonAttrs}
    opacity="0"
    filter="url(#duran-surprise-silhouette)"
  >
    <set attributeName="display" to="inline" begin="${fmt(시작)}s" fill="freeze" />
    <set attributeName="display" to="none" begin="${fmt(종료)}s" fill="freeze" />
    <animate
      attributeName="opacity"
      values="0;0.9;0.72;0.38;0"
      keyTimes="0;0.14;0.36;0.68;1"
      begin="${fmt(시작)}s"
      dur="${fmt(듀란_전환_실루엣_초)}s"
      fill="freeze"
    />
  </image>

  <image
    ${commonAttrs}
    opacity="0"
    filter="url(#duran-inner-glow-thin)"
  >
    <set attributeName="display" to="inline" begin="${fmt(시작)}s" fill="freeze" />
    <set attributeName="display" to="none" begin="${fmt(종료)}s" fill="freeze" />
    <animate
      attributeName="opacity"
      values="0;0.82;0.72;0.54;0.36;0.24;0.14;0.08;0.03;0"
      keyTimes="0;0.111;0.222;0.333;0.444;0.556;0.667;0.778;0.889;1"
      calcMode="discrete"
      begin="${fmt(시작)}s"
      dur="${fmt(듀란_전환_실루엣_초)}s"
      fill="freeze"
    />
  </image>

  <image
    ${commonAttrs}
    opacity="0"
    filter="url(#duran-inner-glow-wide)"
  >
    <set attributeName="display" to="inline" begin="${fmt(시작 + 0.08)}s" fill="freeze" />
    <set attributeName="display" to="none" begin="${fmt(종료)}s" fill="freeze" />
    <animate
      attributeName="opacity"
      values="0;0.7;0.54;0.36;0.22;0.13;0.07;0.035;0.014;0"
      keyTimes="0;0.111;0.222;0.333;0.444;0.556;0.667;0.778;0.889;1"
      calcMode="discrete"
      begin="${fmt(시작 + 0.08)}s"
      dur="${fmt(듀란_전환_실루엣_초 - 0.08)}s"
      fill="freeze"
    />
  </image>`;
}

function isTimelineItemActiveAt(item, time) {
  return item.시작 <= time && (item.종료 === null || time < item.종료);
}

function getTimelineItemXAt(item, time) {
  if (!item.지속 || item.지속 <= 0 || item.이동X === 0) {
    return item.x;
  }

  const progress = clamp01((time - item.시작) / item.지속);
  return item.x + item.이동X * progress;
}

function getTimelineItemYAt(item, time) {
  if (!item.지속 || item.지속 <= 0 || item.이동Y === 0) {
    return item.y;
  }

  const progress = clamp01((time - item.시작) / item.지속);
  return item.y + item.이동Y * progress;
}

function clamp01(value) {
  if (value < 0) return 0;
  if (value > 1) return 1;
  return value;
}

async function pickRandomEnvironmentFile(환경이름) {
  const names = await getEnvironmentFilesFor(환경이름);

  const 후보 =
    Array.isArray(names) && names.length > 0
      ? names
      : 환경_대체목록[환경이름] || 환경_대체목록[기본_환경];

  return randomPick(후보);
}

async function getEnvironmentFilesFor(환경이름) {
  const 모든파일 = await loadEnvironmentFileIndex();

  return 모든파일
    .filter((name) => {
      const fileName = String(name);
      return fileName.toLowerCase().endsWith(".webp") && fileName.startsWith(환경이름);
    })
    .sort(naturalCompare);
}

async function loadEnvironmentFileIndex() {
  const now = Date.now();

  if (
    Array.isArray(환경파일목록_캐시) &&
    now - 환경파일목록_가져온시각 < 환경파일목록_캐시시간
  ) {
    return 환경파일목록_캐시;
  }

  try {
    const apiUrl =
      `https://api.github.com/repos/${encodeURIComponent(GITHUB_OWNER)}` +
      `/${encodeURIComponent(GITHUB_REPO)}` +
      `/contents/${encodePath([ASSET_ROOT_FOLDER, 환경_폴더명])}` +
      `?ref=${encodeURIComponent(GITHUB_BRANCH)}`;

    const res = await fetch(apiUrl, {
      headers: {
        "accept": "application/vnd.github+json",
        "user-agent": "cloudflare-worker"
      }
    });

    if (!res.ok) {
      throw new Error(`GitHub API ${res.status}`);
    }

    const json = await res.json();

    if (!Array.isArray(json)) {
      throw new Error("GitHub contents response is not an array");
    }

    const files = json
      .filter((item) => item && item.type === "file" && typeof item.name === "string")
      .map((item) => item.name);

    환경파일목록_캐시 = files;
    환경파일목록_가져온시각 = now;

    return files;
  } catch (err) {
    const fallbackFiles = Object.values(환경_대체목록).flat();
    환경파일목록_캐시 = fallbackFiles;
    환경파일목록_가져온시각 = now;
    return fallbackFiles;
  }
}

function normalizeEnvironmentName(value) {
  const v = String(value || "").trim();
  if (환경_목록.includes(v)) return v;
  return 기본_환경;
}

function normalizeCardName(value) {
  const raw = String(value || "").trim();

  const cleaned = raw
    .replace(/[⚠️⚖️👥🔎🧭🩹\[\]패:카드\s]/g, "")
    .trim();

  if (패_목록.includes(cleaned)) return cleaned;
  if (패_목록.includes(raw)) return raw;

  return 기본_패;
}

function isMobileUserAgent(userAgent) {
  return /Android|iPhone|iPad|iPod|Mobile|Windows Phone/i.test(userAgent);
}

function getEffectTheme(환경이름) {
  return 환경_효과테마[환경이름] || 환경_효과테마[기본_환경];
}

function getAmbientOpacity(환경이름) {
  if (환경이름 === "전장") return 1;
  if (환경이름 === "지하") return 1;
  if (환경이름 === "숲") return 0.96;
  if (환경이름 === "실내") return 0.9;
  return 0.86;
}

function getParticlePoints(환경이름) {
  const base = [
    { x: 92, y: 430, r: 1.6, sway: 12, opacity: 0.42 },
    { x: 148, y: 472, r: 1.2, sway: -9, opacity: 0.36 },
    { x: 224, y: 428, r: 1.1, sway: 8, opacity: 0.32 },
    { x: 486, y: 430, r: 1.4, sway: -12, opacity: 0.38 },
    { x: 562, y: 466, r: 1.7, sway: 10, opacity: 0.42 },
    { x: 618, y: 394, r: 1.1, sway: -7, opacity: 0.34 },
    { x: 68, y: 346, r: 1, sway: 8, opacity: 0.28 },
    { x: 644, y: 328, r: 1.2, sway: -8, opacity: 0.3 }
  ];

  if (환경이름 === "숲") {
    return [
      ...base,
      { x: 116, y: 258, r: 1.9, sway: 10, opacity: 0.58 },
      { x: 582, y: 252, r: 1.7, sway: -11, opacity: 0.52 },
      { x: 186, y: 198, r: 1.2, sway: 8, opacity: 0.44 },
      { x: 514, y: 205, r: 1.2, sway: -7, opacity: 0.44 }
    ];
  }

  if (환경이름 === "전장") {
    return [
      ...base,
      { x: 110, y: 510, r: 2.2, sway: 18, opacity: 0.7 },
      { x: 608, y: 498, r: 1.8, sway: -15, opacity: 0.65 },
      { x: 520, y: 526, r: 1.3, sway: 10, opacity: 0.6 }
    ];
  }

  if (환경이름 === "지하") {
    return [
      ...base,
      { x: 132, y: 306, r: 1, sway: 3, opacity: 0.5 },
      { x: 568, y: 294, r: 1, sway: -4, opacity: 0.48 }
    ];
  }

  return base;
}

function expandParticlePoints(points) {
  return points.flatMap((point, index) => {
    const direction = index % 2 === 0 ? 1 : -1;

    return [
      point,
      {
        ...point,
        x: point.x + direction * (14 + (index % 3) * 5),
        y: point.y - 10 - (index % 4) * 4,
        r: point.r * 0.78,
        sway: -point.sway * 0.85,
        opacity: Math.min(0.95, (point.opacity || 0.5) * 0.86)
      },
      {
        ...point,
        x: point.x - direction * (18 + (index % 4) * 4),
        y: point.y + 8 + (index % 5) * 3,
        r: point.r * 1.18,
        sway: point.sway * 1.22,
        opacity: Math.min(0.95, (point.opacity || 0.5) * 1.08)
      }
    ];
  });
}

function randomPick(arr) {
  const idx = Math.floor(Math.random() * arr.length);
  return arr[idx];
}

function naturalCompare(a, b) {
  return String(a).localeCompare(String(b), "ko", {
    numeric: true,
    sensitivity: "base"
  });
}

function encodePath(parts) {
  return parts.map((part) => encodeURIComponent(part)).join("/");
}

function assetUrl(folder, file) {
  return `${BASE_URL}/${encodeURIComponent(folder)}/${encodeURIComponent(file)}`;
}

function safeText(value, fallback = "", maxLen = 50) {
  const s = String(value || "").trim();
  if (!s) return fallback;
  return s.slice(0, maxLen);
}

function fmt(n) {
  const num = Number(n);
  if (!Number.isFinite(num)) return "0";
  return Number.isInteger(num) ? String(num) : String(Number(num.toFixed(3)));
}

function escapeXml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function getHelpText() {
  return [
    "Duran Scene Worker is running.",
    "",
    "루나 호출 형식:",
    "  /scene.svg?환경=숲&카드=위협",
    "",
    "받는 값:",
    "  - 환경",
    "  - 카드 또는 패",
    "",
    "레이어 순서:",
    "  - 환경",
    "  - 후경 환경 효과",
    "  - 패 하단 소환/그림자 효과",
    "  - 패",
    "  - 패 상단 짧은 반짝임",
    "  - 듀란 보정 효과",
    "  - 듀란",
    "  - 비네트",
    "",
    "현재 동작:",
    "  - 환경: 환경정지/기본.webp -> 환경/{선택환경파일}.webp -> 환경반복/{선택환경파일}.webp",
    "  - 패: 환경반복 시작과 동시에 패/{패}.webp 표시 후 계속 유지",
    "  - 효과: 패 등장 시 소환 파문/접지 그림자/짧은 반짝임, 이후 환경별 약한 잔향 유지",
    "  - 듀란: 기본 4초 -> 놀람 3.5초 -> 기본 고정",
    "  - 데스크탑은 원본 700x559 표시",
    "  - 모바일은 중앙 기준 559x559로 크롭 표시",
    "",
    "필수 파일:",
    "  - visual/환경정지/기본.webp",
    "  - visual/환경/{선택환경파일}.webp",
    "  - visual/환경반복/{선택환경파일}.webp",
    "  - visual/패/{패}.webp",
    "",
    "원본 기준:",
    "  - 환경/패: 700x559",
    "  - 듀란: 230x230"
  ].join("\n");
}

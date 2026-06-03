const REPO = {
  owner: "musueman",
  name: "duran-assets",
  branch: "main"
};

const RAW_BASE = `https://raw.githubusercontent.com/${REPO.owner}/${REPO.name}/${REPO.branch}/`;

const DOCS = [
  {
    group: "Overview",
    title: "전체 공유 가이드",
    path: "CHATBOT_WORKER_SYSTEM_SHARE_GUIDE.md",
    summary: "시스템 목적, 활용 방식, 전문 템플릿, 일반화 예시"
  },
  {
    group: "Normal Operation",
    title: "Dice Worker 정상작동",
    path: "WORKER_DICE_NORMAL_OPERATION.md",
    summary: "주사위, 카드, 카드+주사위 합성 기준"
  },
  {
    group: "Normal Operation",
    title: "Scene/Sprite Worker 정상작동",
    path: "WORKER_SCENE_SPRITE_NORMAL_OPERATION.md",
    summary: "환경, 카드, 감정 기반 장면 SVG 기준"
  },
  {
    group: "Normal Operation",
    title: "Dialogue Worker 정상작동",
    path: "WORKER_DIALOGUE_NORMAL_OPERATION.md",
    summary: "대사 패널, 표정, 초상 선택 기준"
  },
  {
    group: "Normal Operation",
    title: "Action Worker 정상작동",
    path: "WORKER_ACTION_NORMAL_OPERATION.md",
    summary: "행동 컷인, 성공/실패 연출 기준"
  },
  {
    group: "Compatibility",
    title: "호환 및 라우팅",
    path: "WORKER_COMPATIBILITY_ROUTING.md",
    summary: "호환 경로, dev/prod 라우팅, HTTP 처리, fallback"
  },
  {
    group: "Integration",
    title: "Turn Worker 통합",
    path: "TURN_WORKER_INTEGRATION.md",
    summary: "분리 Worker를 /turn.svg로 통합한 구조"
  },
  {
    group: "System",
    title: "Prompt Rules",
    path: "DURAN_PROMPT_RULES.md",
    summary: "프롬프트 유지보수 원칙"
  },
  {
    group: "System",
    title: "현재 진행 시스템 원문",
    path: "lorebook_texts/00_현재_진행시스템.txt",
    summary: "실제 챗봇 시스템 골자"
  }
];

const SOURCES = [
  {
    group: "Worker Source",
    title: "Dice Worker 원문",
    path: "webp-dice-worker.js",
    language: "js",
    summary: "dice.webp, dice.svg, card.svg"
  },
  {
    group: "Worker Source",
    title: "Scene/Sprite Worker 원문",
    path: "duran-sprite/worker.js",
    language: "js",
    summary: "scene.svg, dchat.svg 호환"
  },
  {
    group: "Worker Source",
    title: "Dialogue Worker 원문",
    path: "dchat/worker.js",
    language: "js",
    summary: "chat.svg, dialogue, line.txt, markdown"
  },
  {
    group: "Worker Source",
    title: "Action Worker 원문",
    path: "duran-action/worker.js",
    language: "js",
    summary: "action.svg, cutin.svg"
  },
  {
    group: "Worker Source",
    title: "Turn Worker 원문",
    path: "duran-turn/worker.js",
    language: "js",
    summary: "turn.svg, trace.svg, veil.svg"
  },
  {
    group: "Config",
    title: "Turn Worker wrangler.toml",
    path: "duran-turn/wrangler.toml",
    language: "toml",
    summary: "dev/prod service binding"
  },
  {
    group: "Config",
    title: "Docs Page Worker 원문",
    path: "worker-system-page/worker.js",
    language: "js",
    summary: "현재 문서 페이지 Worker"
  }
];

const ALL_FILES = [...DOCS, ...SOURCES];
const ALLOWED_PATHS = new Set(ALL_FILES.map((item) => item.path));

const SECURITY_HEADERS = {
  "x-content-type-options": "nosniff",
  "referrer-policy": "strict-origin-when-cross-origin",
  "content-security-policy": "default-src 'self'; connect-src 'self'; img-src 'self' data: https://raw.githubusercontent.com https://*.workers.dev https://musueman.github.io; style-src 'unsafe-inline' 'self'; script-src 'unsafe-inline' 'self'; base-uri 'none'; frame-ancestors 'none'"
};

export default {
  async fetch(request, env = {}) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders() });
    }

    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method Not Allowed", {
        status: 405,
        headers: { ...textHeaders(), allow: "GET, HEAD, OPTIONS" }
      });
    }

    if (url.pathname === "/api/manifest") {
      return jsonResponse({
        stage: env.STAGE || "dev",
        repo: REPO,
        docs: DOCS,
        sources: SOURCES,
        generatedAt: new Date().toISOString()
      }, request);
    }

    if (url.pathname === "/api/file") {
      return proxyRawFile(url.searchParams.get("path"), request);
    }

    if (url.pathname === "/" || url.pathname === "/index.html") {
      return htmlResponse(renderHtml(), request);
    }

    return new Response("Not Found", { status: 404, headers: textHeaders() });
  }
};

function proxyRawFile(path, request) {
  if (!path || !ALLOWED_PATHS.has(path)) {
    return new Response("Unknown file", { status: 404, headers: textHeaders() });
  }

  const rawUrl = `${RAW_BASE}${encodePath(path)}`;
  return fetch(rawUrl, {
    headers: {
      "user-agent": "duran-worker-system-docs/1.0"
    },
    cf: {
      cacheEverything: true,
      cacheTtl: 300
    }
  }).then((response) => {
    const headers = new Headers({
      ...corsHeaders(),
      "content-type": detectContentType(path),
      "cache-control": response.ok ? "public, max-age=120" : "no-store",
      "x-source-path": path
    });
    return new Response(request.method === "HEAD" ? null : response.body, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  });
}

function renderHtml() {
  const initialPath = DOCS[0].path;
  return `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Chatbot-Worker Turn System Docs</title>
  <style>
    :root {
      color-scheme: light;
      --bg: #f7f7f4;
      --panel: #ffffff;
      --ink: #24211d;
      --muted: #6e665c;
      --line: #d9d2c7;
      --accent: #1d6f6f;
      --accent-2: #8a4b37;
      --code: #171b20;
      --code-ink: #eef3f2;
      --soft: #ebe6dc;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      background: var(--bg);
      color: var(--ink);
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      line-height: 1.55;
    }
    header {
      border-bottom: 1px solid var(--line);
      background: #fbfaf7;
      padding: 22px clamp(18px, 4vw, 44px);
    }
    h1 {
      margin: 0;
      font-size: clamp(24px, 4vw, 42px);
      letter-spacing: 0;
      line-height: 1.1;
    }
    .sub {
      margin: 10px 0 0;
      max-width: 900px;
      color: var(--muted);
      font-size: 15px;
    }
    .layout {
      display: grid;
      grid-template-columns: minmax(260px, 340px) minmax(0, 1fr);
      min-height: calc(100vh - 118px);
    }
    aside {
      border-right: 1px solid var(--line);
      background: #f0ece4;
      padding: 18px;
      overflow: auto;
      max-height: calc(100vh - 118px);
      position: sticky;
      top: 0;
    }
    main {
      min-width: 0;
      padding: clamp(18px, 4vw, 42px);
    }
    .toolbar {
      display: flex;
      gap: 10px;
      align-items: center;
      flex-wrap: wrap;
      margin-bottom: 14px;
    }
    input[type="search"] {
      width: 100%;
      border: 1px solid var(--line);
      border-radius: 6px;
      padding: 10px 12px;
      font: inherit;
      background: var(--panel);
      color: var(--ink);
      margin-bottom: 16px;
    }
    .group {
      margin: 0 0 18px;
    }
    .group-title {
      font-size: 12px;
      color: var(--muted);
      text-transform: uppercase;
      letter-spacing: .08em;
      margin: 0 0 8px;
    }
    .nav-button {
      display: block;
      width: 100%;
      text-align: left;
      border: 1px solid transparent;
      border-radius: 6px;
      background: transparent;
      color: var(--ink);
      padding: 9px 10px;
      margin: 3px 0;
      cursor: pointer;
      font: inherit;
    }
    .nav-button:hover,
    .nav-button.active {
      background: var(--panel);
      border-color: var(--line);
    }
    .nav-button small {
      display: block;
      color: var(--muted);
      margin-top: 2px;
      font-size: 12px;
    }
    .doc-head {
      border-bottom: 1px solid var(--line);
      padding-bottom: 18px;
      margin-bottom: 22px;
    }
    .doc-head h2 {
      margin: 0;
      font-size: clamp(24px, 3vw, 36px);
      line-height: 1.15;
      letter-spacing: 0;
    }
    .meta {
      color: var(--muted);
      font-size: 13px;
      margin-top: 8px;
      word-break: break-all;
    }
    .mode {
      border: 1px solid var(--line);
      background: var(--panel);
      color: var(--ink);
      border-radius: 6px;
      padding: 8px 10px;
      font: inherit;
      cursor: pointer;
    }
    .mode.active {
      border-color: var(--accent);
      color: var(--accent);
    }
    .content {
      background: var(--panel);
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: clamp(18px, 3vw, 34px);
      overflow: auto;
    }
    .markdown h1,
    .markdown h2,
    .markdown h3 {
      line-height: 1.2;
      margin: 1.15em 0 .45em;
      letter-spacing: 0;
    }
    .markdown h1:first-child,
    .markdown h2:first-child,
    .markdown h3:first-child {
      margin-top: 0;
    }
    .markdown p { margin: .72em 0; }
    .markdown ul,
    .markdown ol { padding-left: 1.4em; }
    .markdown table {
      border-collapse: collapse;
      width: 100%;
      margin: 16px 0;
      font-size: 14px;
    }
    .markdown th,
    .markdown td {
      border: 1px solid var(--line);
      padding: 8px 10px;
      vertical-align: top;
    }
    .markdown th { background: var(--soft); }
    .markdown code {
      background: var(--soft);
      padding: 1px 5px;
      border-radius: 4px;
      font-family: ui-monospace, SFMono-Regular, Consolas, "Liberation Mono", monospace;
      font-size: .92em;
    }
    pre {
      background: var(--code);
      color: var(--code-ink);
      padding: 16px;
      border-radius: 7px;
      overflow: auto;
      white-space: pre;
      tab-size: 2;
    }
    .content pre code,
    .markdown pre code {
      background: transparent;
      color: inherit;
      padding: 0;
      border-radius: 0;
      display: block;
    }
    .error {
      color: #8f1d1d;
      background: #fff0f0;
      border: 1px solid #f1b2b2;
      padding: 12px;
      border-radius: 6px;
    }
    @media (max-width: 860px) {
      .layout { grid-template-columns: 1fr; }
      aside {
        position: static;
        max-height: none;
        border-right: 0;
        border-bottom: 1px solid var(--line);
      }
    }
  </style>
</head>
<body>
  <header>
    <h1>Chatbot-Worker Turn System</h1>
    <p class="sub">챗봇은 슬롯을 작성하고, Worker는 턴 화면을 렌더링하는 구조를 문서와 원문 코드로 확인하는 공개 페이지입니다.</p>
  </header>
  <div class="layout">
    <aside>
      <input id="filter" type="search" placeholder="문서 또는 워커 검색">
      <div id="nav"></div>
    </aside>
    <main>
      <div class="doc-head">
        <h2 id="title">Loading</h2>
        <div id="summary" class="meta"></div>
        <div id="path" class="meta"></div>
      </div>
      <div class="toolbar">
        <button id="previewBtn" class="mode active" type="button">문서 보기</button>
        <button id="rawBtn" class="mode" type="button">원문 보기</button>
        <button id="copyBtn" class="mode" type="button">복사</button>
      </div>
      <section id="content" class="content markdown">Loading...</section>
    </main>
  </div>
  <script>
    const initialPath = ${JSON.stringify(initialPath)};
    let manifest = null;
    let active = null;
    let rawText = "";
    let viewMode = "preview";

    const nav = document.getElementById("nav");
    const filter = document.getElementById("filter");
    const title = document.getElementById("title");
    const summary = document.getElementById("summary");
    const pathEl = document.getElementById("path");
    const content = document.getElementById("content");
    const previewBtn = document.getElementById("previewBtn");
    const rawBtn = document.getElementById("rawBtn");
    const copyBtn = document.getElementById("copyBtn");

    start();

    async function start() {
      const response = await fetch("/api/manifest");
      manifest = await response.json();
      renderNav();
      const hashPath = decodeURIComponent(location.hash.replace(/^#/, ""));
      await loadFile(findItem(hashPath) || findItem(initialPath) || manifest.docs[0]);
    }

    function allItems() {
      return [...manifest.docs, ...manifest.sources];
    }

    function findItem(path) {
      return allItems().find((item) => item.path === path);
    }

    function renderNav() {
      const q = filter.value.trim().toLowerCase();
      const groups = new Map();
      for (const item of allItems()) {
        const haystack = [item.title, item.path, item.summary, item.group].join(" ").toLowerCase();
        if (q && !haystack.includes(q)) continue;
        if (!groups.has(item.group)) groups.set(item.group, []);
        groups.get(item.group).push(item);
      }
      nav.innerHTML = "";
      for (const [group, items] of groups) {
        const section = document.createElement("section");
        section.className = "group";
        section.innerHTML = '<h3 class="group-title"></h3>';
        section.querySelector("h3").textContent = group;
        for (const item of items) {
          const button = document.createElement("button");
          button.type = "button";
          button.className = "nav-button" + (active && active.path === item.path ? " active" : "");
          button.innerHTML = '<span></span><small></small>';
          button.querySelector("span").textContent = item.title;
          button.querySelector("small").textContent = item.summary || item.path;
          button.addEventListener("click", () => loadFile(item));
          section.appendChild(button);
        }
        nav.appendChild(section);
      }
    }

    async function loadFile(item) {
      active = item;
      title.textContent = item.title;
      summary.textContent = item.summary || "";
      pathEl.textContent = item.path;
      content.textContent = "Loading...";
      renderNav();
      location.hash = encodeURIComponent(item.path);
      const response = await fetch('/api/file?path=' + encodeURIComponent(item.path));
      rawText = await response.text();
      if (!response.ok) {
        content.innerHTML = '<div class="error"></div>';
        content.firstChild.textContent = rawText || "파일을 불러오지 못했습니다.";
        return;
      }
      setMode(item.language ? "raw" : "preview");
    }

    function setMode(mode) {
      viewMode = mode;
      previewBtn.classList.toggle("active", mode === "preview");
      rawBtn.classList.toggle("active", mode === "raw");
      if (mode === "raw" || active.language) {
        content.className = "content";
        content.innerHTML = '<pre><code></code></pre>';
        content.querySelector("code").textContent = rawText;
      } else {
        content.className = "content markdown";
        content.innerHTML = renderMarkdown(rawText);
      }
    }

    previewBtn.addEventListener("click", () => setMode("preview"));
    rawBtn.addEventListener("click", () => setMode("raw"));
    copyBtn.addEventListener("click", async () => {
      await navigator.clipboard.writeText(rawText);
      copyBtn.textContent = "복사됨";
      setTimeout(() => { copyBtn.textContent = "복사"; }, 1200);
    });
    filter.addEventListener("input", renderNav);

    function renderMarkdown(source) {
      const parts = source.split(/(^\\\`\\\`\\\`[^\\n]*\\n[\\s\\S]*?\\n\\\`\\\`\\\`\\s*$)/m);
      return parts.map((part) => {
        if (/^\\\`\\\`\\\`/.test(part)) {
          const lines = part.replace(/^\\\`\\\`\\\`[^\\n]*\\n/, "").replace(/\\n\\\`\\\`\\\`\\s*$/, "");
          return '<pre><code>' + escapeHtml(lines) + '</code></pre>';
        }
        return renderMarkdownBlock(part);
      }).join("");
    }

    function renderMarkdownBlock(block) {
      const lines = block.split(/\\r?\\n/);
      let html = "";
      let list = "";
      let table = [];
      const closeList = () => {
        if (list) {
          html += list === "ol" ? "</ol>" : "</ul>";
          list = "";
        }
      };
      const flushTable = () => {
        if (!table.length) return;
        const rows = table.filter((line) => !/^\\s*\\|?\\s*:?-{3,}/.test(line));
        if (rows.length) {
          html += "<table>";
          rows.forEach((line, index) => {
            const cells = line.trim().replace(/^\\|/, "").replace(/\\|$/, "").split("|").map((cell) => inline(cell.trim()));
            html += index === 0 ? "<thead><tr>" : "<tr>";
            html += cells.map((cell) => index === 0 ? "<th>" + cell + "</th>" : "<td>" + cell + "</td>").join("");
            html += index === 0 ? "</tr></thead><tbody>" : "</tr>";
          });
          html += "</tbody></table>";
        }
        table = [];
      };

      for (const line of lines) {
        if (!line.trim()) {
          closeList();
          flushTable();
          continue;
        }
        if (/^\\s*\\|/.test(line)) {
          closeList();
          table.push(line);
          continue;
        }
        flushTable();
        const heading = line.match(/^(#{1,3})\\s+(.+)$/);
        if (heading) {
          closeList();
          const level = heading[1].length;
          html += '<h' + level + '>' + inline(heading[2]) + '</h' + level + '>';
          continue;
        }
        const bullet = line.match(/^\\s*-\\s+(.+)$/);
        if (bullet) {
          if (list !== "ul") {
            closeList();
            html += "<ul>";
            list = "ul";
          }
          html += "<li>" + inline(bullet[1]) + "</li>";
          continue;
        }
        const number = line.match(/^\\s*\\d+\\.\\s+(.+)$/);
        if (number) {
          if (list !== "ol") {
            closeList();
            html += "<ol>";
            list = "ol";
          }
          html += "<li>" + inline(number[1]) + "</li>";
          continue;
        }
        closeList();
        html += "<p>" + inline(line) + "</p>";
      }
      closeList();
      flushTable();
      return html;
    }

    function inline(text) {
      return escapeHtml(text).replace(/\\\`([^\\\`]+)\\\`/g, "<code>$1</code>");
    }

    function escapeHtml(value) {
      return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");
    }
  </script>
</body>
</html>`;
}

function encodePath(path) {
  return path.split("/").map((part) => encodeURIComponent(part)).join("/");
}

function detectContentType(path) {
  if (path.endsWith(".md")) return "text/markdown; charset=utf-8";
  if (path.endsWith(".txt")) return "text/plain; charset=utf-8";
  if (path.endsWith(".toml")) return "text/plain; charset=utf-8";
  if (path.endsWith(".js")) return "text/javascript; charset=utf-8";
  return "text/plain; charset=utf-8";
}

function htmlResponse(html, request) {
  return new Response(request.method === "HEAD" ? null : html, {
    headers: {
      ...SECURITY_HEADERS,
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=120"
    }
  });
}

function jsonResponse(value, request) {
  return new Response(request.method === "HEAD" ? null : `${JSON.stringify(value, null, 2)}\n`, {
    headers: {
      ...corsHeaders(),
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=60"
    }
  });
}

function textHeaders() {
  return {
    ...SECURITY_HEADERS,
    "content-type": "text/plain; charset=utf-8",
    "cache-control": "no-store"
  };
}

function corsHeaders() {
  return {
    ...SECURITY_HEADERS,
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET, HEAD, OPTIONS",
    "access-control-allow-headers": "content-type"
  };
}

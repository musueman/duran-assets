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

const FULL_ARCHIVE = [
  {
    id: "system",
    title: "시스템 / 프롬프트 계약",
    lead: "챗봇이 어떤 출력 형식을 지켜야 하는지, Worker URL과 상태 주석을 어떻게 유지하는지 확인하는 원문 묶음입니다.",
    items: [
      {
        title: "현재 진행 시스템 원문",
        path: "lorebook_texts/00_현재_진행시스템.txt",
        kind: "system",
        note: "실제 챗봇 출력 골자입니다. 본문을 Worker URL 안에 넣고, 출력 밖으로 서사를 흘리지 않게 만드는 핵심 계약을 담당합니다."
      },
      {
        title: "Duran Prompt Rules",
        path: "DURAN_PROMPT_RULES.md",
        kind: "system",
        note: "URL 예약문자, 상태 필드, OOC/디버그 보정 같은 유지보수 규칙을 문서화한 파일입니다."
      },
      {
        title: "전체 공유 가이드",
        path: "CHATBOT_WORKER_SYSTEM_SHARE_GUIDE.md",
        kind: "system",
        note: "이 구조를 다른 사람이 재사용할 수 있도록 목적, 사용법, 일반화 예시를 풀어둔 공유 문서입니다."
      },
      {
        title: "Turn Worker 통합 문서",
        path: "TURN_WORKER_INTEGRATION.md",
        kind: "system",
        note: "분리되어 있던 Worker들을 turn.svg 중심으로 묶은 이유와 호출 구조를 설명합니다."
      },
      {
        title: "호환 및 라우팅 문서",
        path: "WORKER_COMPATIBILITY_ROUTING.md",
        kind: "system",
        note: "구버전 URL, dev/prod 라우팅, fallback 경로가 어떻게 호환되는지 확인하는 운영 문서입니다."
      }
    ]
  },
  {
    id: "world",
    title: "세계관 / 진행축",
    lead: "서사의 큰 축, 진행 방향, 세계 상태를 잡는 원문입니다.",
    items: [
      {
        title: "세계관 진행축",
        path: "lorebook_texts/세계관_진행축.txt",
        kind: "world",
        note: "듀란 일대기의 사건 진행 방향과 세계관 기준점을 잡아주는 파일입니다."
      },
      {
        title: "홈페이지 원고 데이터",
        path: "duran-homepage/manuscript-data.js",
        kind: "world-generated-source",
        note: "홈페이지에 쓰이는 긴 원고/세계관 데이터입니다. 사람이 읽는 원문이라기보다 공개 페이지가 불러 쓰는 생성 데이터에 가깝습니다."
      }
    ]
  },
  {
    id: "lorebook",
    title: "로어북 원문",
    lead: "챗봇이 매 턴 참조하는 규칙, 카드, 판정, 시작 배경, 사망 엔딩, 장막 관련 원문입니다.",
    items: [
      {
        title: "01 ST",
        path: "lorebook_texts/01_ST.txt",
        kind: "lorebook",
        note: "상태값과 진행 필드를 유지하는 로어북 조각입니다."
      },
      {
        title: "02 CARD 색틈",
        path: "lorebook_texts/02_CARD_색틈.txt",
        kind: "lorebook",
        note: "운명의 패, 색, 틈새 같은 카드 기반 진행 요소를 정의합니다."
      },
      {
        title: "04 새운명의패 SVG",
        path: "lorebook_texts/04_새운명의패SVG.txt",
        kind: "lorebook",
        note: "새 카드/운명패를 Worker 이미지 출력으로 연결하는 규칙입니다."
      },
      {
        title: "05 판정 피해보상",
        path: "lorebook_texts/05_판정_피해보상.txt",
        kind: "lorebook",
        note: "판정 결과, 피해, 보상 처리를 챗봇 진행과 연결합니다."
      },
      {
        title: "07 시작 배경설정",
        path: "lorebook_texts/07_시작_배경설정.txt",
        kind: "lorebook",
        note: "초기 장면과 시작 조건을 잡는 로어북 조각입니다."
      },
      {
        title: "10 사망엔딩",
        path: "lorebook_texts/10_사망엔딩.txt",
        kind: "lorebook",
        note: "사망 또는 종료 상태에 도달했을 때의 처리 기준입니다."
      },
      {
        title: "11 장막의 음모",
        path: "lorebook_texts/11_장막의_음모.txt",
        kind: "lorebook",
        note: "장막 세력과 음모 축을 진행 중 긴장 요소로 넣는 로어북입니다."
      }
    ]
  },
  {
    id: "lorebook500",
    title: "로어북 500자 버전",
    lead: "동일 계열 로어북을 짧게 압축한 버전입니다. 플랫폼 제한이나 토큰 절감을 위해 비교할 수 있게 원문 그대로 둡니다.",
    items: [
      {
        title: "01 ST 500",
        path: "lorebook_texts_500/01_ST.txt",
        kind: "lorebook-short",
        note: "상태 유지 규칙의 압축본입니다."
      },
      {
        title: "02 CARD 색틈 500",
        path: "lorebook_texts_500/02_CARD_색틈.txt",
        kind: "lorebook-short",
        note: "카드/색틈 규칙의 압축본입니다."
      },
      {
        title: "04 새운명의패 SVG 500",
        path: "lorebook_texts_500/04_새운명의패SVG.txt",
        kind: "lorebook-short",
        note: "운명패 SVG 출력 규칙의 압축본입니다."
      },
      {
        title: "05 판정 피해보상 500",
        path: "lorebook_texts_500/05_판정_피해보상.txt",
        kind: "lorebook-short",
        note: "판정/피해/보상 규칙의 압축본입니다."
      },
      {
        title: "07 시작 배경설정 500",
        path: "lorebook_texts_500/07_시작_배경설정.txt",
        kind: "lorebook-short",
        note: "시작 배경 설정의 압축본입니다."
      },
      {
        title: "10 사망엔딩 500",
        path: "lorebook_texts_500/10_사망엔딩.txt",
        kind: "lorebook-short",
        note: "사망 엔딩 처리의 압축본입니다."
      },
      {
        title: "11 장막의 음모 500",
        path: "lorebook_texts_500/11_장막의_음모.txt",
        kind: "lorebook-short",
        note: "장막의 음모 축 압축본입니다."
      }
    ]
  },
  {
    id: "characters",
    title: "캐릭터 정보",
    lead: "캐릭터 프로필, 관리 방식, 구조화된 JSON 원문입니다.",
    items: [
      {
        title: "캐릭터 정보 관리 문서",
        path: "character_info/캐릭터_정보_관리.md",
        kind: "character",
        note: "캐릭터 정보를 어떻게 정리하고 확장할지 설명하는 관리 문서입니다."
      },
      {
        title: "characters.json",
        path: "character_info/characters.json",
        kind: "character",
        note: "챗봇과 도구가 읽기 쉬운 형태로 정리된 캐릭터 데이터 원문입니다."
      }
    ]
  },
  {
    id: "workers",
    title: "Worker 전문",
    lead: "챗봇 출력물을 이미지/텍스트 패널/SVG로 바꾸는 Cloudflare Worker 소스입니다.",
    items: [
      {
        title: "WebP Dice Worker",
        path: "webp-dice-worker.js",
        kind: "worker-js",
        note: "주사위, 카드, 카드+주사위 출력의 주력 dice Worker입니다."
      },
      {
        title: "Realistic Dice Worker",
        path: "realistic-dice-worker.js",
        kind: "worker-js",
        note: "별도 주사위 렌더링 실험/대체 계열 Worker입니다."
      },
      {
        title: "Dialogue Worker",
        path: "dchat/worker.js",
        kind: "worker-js",
        note: "대사창, 초상, 감정, line.txt/markdown 응답을 처리하는 Worker입니다."
      },
      {
        title: "Action Worker",
        path: "duran-action/worker.js",
        kind: "worker-js",
        note: "행동 컷인, 성공/실패 판정 연출을 담당하는 Worker입니다."
      },
      {
        title: "Scene/Sprite Worker",
        path: "duran-sprite/worker.js",
        kind: "worker-js",
        note: "배경, 캐릭터, 카드, 대사창 호환 호출을 묶어 장면 SVG를 만드는 Worker입니다."
      },
      {
        title: "Turn Worker",
        path: "duran-turn/worker.js",
        kind: "worker-js",
        note: "여러 Worker 호출을 한 턴 출력으로 묶는 통합 Worker입니다."
      }
    ]
  },
  {
    id: "public-pages",
    title: "공개 페이지 / 플레이가이드",
    lead: "챗봇 본체를 설명하거나 외부에 보여주기 위해 만든 홈페이지, 안내 페이지, 플레이가이드 변형 원문입니다.",
    items: [
      {
        title: "Homepage Worker",
        path: "duran-homepage/worker.js",
        kind: "public-page-worker",
        note: "듀란 홈페이지를 Cloudflare Worker로 내보내는 공개 페이지용 Worker입니다. 챗봇 턴 진행을 직접 처리하는 Worker와는 구분됩니다."
      },
      {
        title: "Homepage App Script",
        path: "duran-homepage/homepage.js",
        kind: "public-page-js",
        note: "홈페이지 화면 동작을 담당하는 JavaScript입니다."
      },
      {
        title: "Homepage HTML",
        path: "duran-homepage/index.html",
        kind: "public-page-html",
        note: "홈페이지의 기본 HTML 문서입니다."
      },
      {
        title: "Homepage README",
        path: "duran-homepage/README.md",
        kind: "public-page-doc",
        note: "홈페이지 프로젝트 설명 문서입니다."
      },
      {
        title: "Notice Only Page",
        path: "duran-homepage-notice-only.html",
        kind: "public-page-html",
        note: "별도 공지 전용 HTML 변형입니다."
      },
      {
        title: "Duran Play Guide",
        path: "duran-play-guide.html",
        kind: "play-guide-html",
        note: "플레이 방법을 보여주는 기본 가이드 HTML입니다."
      },
      {
        title: "Duran Play Guide Embed",
        path: "duran-play-guide-embed.html",
        kind: "play-guide-html",
        note: "다른 페이지 안에 넣기 쉬운 임베드형 플레이가이드입니다."
      },
      {
        title: "Board Safe Play Guide",
        path: "duran-play-guide-board-safe.html",
        kind: "play-guide-variant",
        note: "게시판 환경에 맞춘 안전형 플레이가이드 변형입니다."
      },
      {
        title: "Board Inline Play Guide",
        path: "duran-play-guide-board-inline.html",
        kind: "play-guide-variant",
        note: "게시판에 인라인으로 넣기 위한 플레이가이드 변형입니다."
      },
      {
        title: "Board Light Safe Play Guide",
        path: "duran-play-guide-board-light-safe.html",
        kind: "play-guide-variant",
        note: "더 가벼운 게시판 안전형 플레이가이드 변형입니다."
      },
      {
        title: "Board Postsafe Play Guide",
        path: "duran-play-guide-board-postsafe.html",
        kind: "play-guide-variant",
        note: "게시 후 깨짐을 줄이기 위한 플레이가이드 변형입니다."
      },
      {
        title: "Docs Page Worker",
        path: "worker-system-page/worker.js",
        kind: "public-page-worker",
        note: "지금 보고 있는 공개 문서/원문 아카이브 페이지를 제공하는 Worker입니다."
      },
      {
        title: "Docs Page README",
        path: "worker-system-page/README.md",
        kind: "public-page-doc",
        note: "공개 문서 페이지의 배포와 구조를 설명하는 README입니다."
      }
    ]
  },
  {
    id: "configs",
    title: "Worker 설정 / 보조 문서",
    lead: "배포 이름, dev/prod 분리, service binding, Worker별 README를 확인하는 원문입니다.",
    items: [
      {
        title: "Dice wrangler",
        path: "wrangler.dice.toml",
        kind: "config",
        note: "Dice Worker 배포 설정입니다."
      },
      {
        title: "Dialogue wrangler",
        path: "dchat/wrangler.toml",
        kind: "config",
        note: "대사 Worker 배포 설정입니다."
      },
      {
        title: "Action wrangler",
        path: "duran-action/wrangler.toml",
        kind: "config",
        note: "Action Worker 배포 설정입니다."
      },
      {
        title: "Sprite wrangler",
        path: "duran-sprite/wrangler.toml",
        kind: "config",
        note: "Sprite Worker 배포 설정입니다."
      },
      {
        title: "Turn wrangler",
        path: "duran-turn/wrangler.toml",
        kind: "config",
        note: "Turn Worker의 dev/prod service binding 설정입니다."
      },
      {
        title: "Homepage wrangler",
        path: "duran-homepage/wrangler.toml",
        kind: "config",
        note: "홈페이지 Worker 배포 설정입니다."
      },
      {
        title: "Docs Page wrangler",
        path: "worker-system-page/wrangler.toml",
        kind: "config",
        note: "공개 문서 페이지 Worker 배포 설정입니다."
      },
      {
        title: "Dialogue README",
        path: "dchat/README.md",
        kind: "readme",
        note: "Dialogue Worker 사용법과 엔드포인트 설명입니다."
      },
      {
        title: "Sprite README",
        path: "duran-sprite/README.md",
        kind: "readme",
        note: "Sprite Worker 보조 설명입니다."
      },
      {
        title: "Turn README",
        path: "duran-turn/README.md",
        kind: "readme",
        note: "Turn Worker 보조 설명입니다."
      },
      {
        title: "Repository README",
        path: "README.md",
        kind: "readme",
        note: "저장소 최상위 설명입니다."
      },
      {
        title: "Deployment",
        path: "DEPLOYMENT.md",
        kind: "readme",
        note: "배포 URL과 배포 절차 기록입니다."
      }
    ]
  },
  {
    id: "operation-docs",
    title: "기능별 정상작동 문서",
    lead: "각 Worker가 정상작동한다고 판단하는 기준과 기능 해설을 따로 정리한 문서입니다.",
    items: [
      {
        title: "Dice Worker 정상작동",
        path: "WORKER_DICE_NORMAL_OPERATION.md",
        kind: "operation-doc",
        note: "Dice Worker의 정상 출력 조건과 호출 예시를 설명합니다."
      },
      {
        title: "Scene/Sprite Worker 정상작동",
        path: "WORKER_SCENE_SPRITE_NORMAL_OPERATION.md",
        kind: "operation-doc",
        note: "장면/Sprite Worker의 정상 출력 조건과 호환 범위를 설명합니다."
      },
      {
        title: "Dialogue Worker 정상작동",
        path: "WORKER_DIALOGUE_NORMAL_OPERATION.md",
        kind: "operation-doc",
        note: "대사 Worker의 정상 출력 조건과 입력 필드를 설명합니다."
      },
      {
        title: "Action Worker 정상작동",
        path: "WORKER_ACTION_NORMAL_OPERATION.md",
        kind: "operation-doc",
        note: "Action Worker의 정상 출력 조건과 판정 연출을 설명합니다."
      }
    ]
  }
];

const ARCHIVE_FILES = FULL_ARCHIVE.flatMap((section) => section.items);
const ALL_FILES = uniqueFiles([...DOCS, ...SOURCES, ...ARCHIVE_FILES]);
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
        fullArchive: FULL_ARCHIVE,
        generatedAt: new Date().toISOString()
      }, request);
    }

    if (url.pathname === "/api/full-archive") {
      return jsonResponse({
        stage: env.STAGE || "dev",
        repo: REPO,
        sections: FULL_ARCHIVE,
        generatedAt: new Date().toISOString()
      }, request);
    }

    if (url.pathname === "/api/file") {
      return proxyRawFile(url.searchParams.get("path"), request);
    }

    if (url.pathname === "/duran-chatbot-full" || url.pathname === "/duran-chatbot-full.html") {
      return htmlResponse(renderArchiveHtml(), request);
    }

    if (url.pathname === "/" || url.pathname === "/index.html") {
      return htmlResponse(renderHtml(), request);
    }

    return new Response("Not Found", { status: 404, headers: textHeaders() });
  }
};

function uniqueFiles(files) {
  const seen = new Set();
  return files.filter((file) => {
    if (seen.has(file.path)) return false;
    seen.add(file.path);
    return true;
  });
}

function proxyRawFile(path, request) {
  if (!path || !ALLOWED_PATHS.has(path)) {
    return new Response("Unknown file", { status: 404, headers: textHeaders() });
  }

  const rawUrl = `${RAW_BASE}${encodePath(path)}`;
  return fetch(rawUrl, {
    method: request.method === "HEAD" ? "HEAD" : "GET",
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
    .top-links {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 14px;
    }
    .top-links a {
      display: inline-flex;
      align-items: center;
      border: 1px solid var(--line);
      border-radius: 6px;
      background: var(--panel);
      color: var(--accent);
      padding: 7px 10px;
      text-decoration: none;
      font-size: 14px;
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
    <nav class="top-links" aria-label="관련 페이지">
      <a href="/duran-chatbot-full">초보자용 전체 원문 해설</a>
    </nav>
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

function renderArchiveHtml() {
  return `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Duran Chatbot Full Archive</title>
  <style>
    :root {
      color-scheme: light;
      --bg: #f6f7f5;
      --panel: #ffffff;
      --ink: #202225;
      --muted: #60666d;
      --line: #d7dde2;
      --soft: #eef3f0;
      --soft-blue: #edf4fb;
      --accent: #1c6b5f;
      --accent-blue: #365f91;
      --accent-red: #8c3f35;
      --code: #171b20;
      --code-ink: #f3f7f5;
    }
    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body {
      margin: 0;
      background: var(--bg);
      color: var(--ink);
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      line-height: 1.6;
    }
    a { color: var(--accent-blue); }
    .hero {
      border-bottom: 1px solid var(--line);
      background: linear-gradient(180deg, #fbfcfb 0%, #f0f5f2 100%);
      padding: 28px clamp(18px, 4vw, 52px) 24px;
    }
    .eyebrow {
      margin: 0 0 8px;
      color: var(--accent);
      font-weight: 700;
      font-size: 13px;
    }
    h1 {
      margin: 0;
      max-width: 1100px;
      font-size: clamp(28px, 4vw, 46px);
      line-height: 1.12;
      letter-spacing: 0;
    }
    .lead {
      max-width: 980px;
      margin: 12px 0 0;
      color: var(--muted);
      font-size: 16px;
    }
    .quick-links {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 18px;
    }
    .quick-links a,
    .copy-link {
      border: 1px solid var(--line);
      background: var(--panel);
      border-radius: 6px;
      color: var(--accent-blue);
      padding: 8px 10px;
      text-decoration: none;
      font: inherit;
      font-size: 14px;
      cursor: pointer;
    }
    main {
      width: min(1180px, calc(100% - 36px));
      margin: 0 auto;
      padding: 24px 0 56px;
    }
    section {
      margin: 0 0 28px;
    }
    h2 {
      margin: 0 0 10px;
      font-size: clamp(22px, 3vw, 32px);
      line-height: 1.2;
      letter-spacing: 0;
    }
    h3 {
      margin: 0;
      font-size: clamp(18px, 2.4vw, 24px);
      line-height: 1.25;
      letter-spacing: 0;
    }
    .plain {
      margin: 0 0 14px;
      color: var(--muted);
    }
    .overview-grid {
      display: grid;
      grid-template-columns: repeat(5, minmax(160px, 1fr));
      gap: 10px;
      margin-top: 16px;
    }
    .step {
      background: var(--panel);
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: 14px;
      min-height: 150px;
    }
    .step strong {
      display: block;
      margin-bottom: 6px;
      color: var(--accent);
      font-size: 15px;
    }
    .step span {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border-radius: 999px;
      background: var(--soft-blue);
      color: var(--accent-blue);
      font-weight: 700;
      margin-bottom: 10px;
    }
    .flow {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: center;
      background: var(--panel);
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: 14px;
      margin-top: 14px;
    }
    .flow b {
      background: var(--soft-blue);
      border-radius: 6px;
      color: #23466e;
      padding: 7px 9px;
      font-size: 14px;
    }
    .flow span {
      color: var(--muted);
    }
    .terms {
      display: grid;
      grid-template-columns: repeat(3, minmax(180px, 1fr));
      gap: 10px;
    }
    .term {
      background: var(--panel);
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: 14px;
    }
    .term strong {
      display: block;
      margin-bottom: 6px;
    }
    .toc {
      display: grid;
      grid-template-columns: repeat(4, minmax(160px, 1fr));
      gap: 8px;
      margin-top: 12px;
    }
    .toc a {
      display: block;
      background: var(--panel);
      border: 1px solid var(--line);
      border-radius: 6px;
      padding: 10px;
      text-decoration: none;
    }
    .archive-section {
      border-top: 2px solid var(--line);
      padding-top: 24px;
    }
    .section-head {
      display: flex;
      gap: 12px;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 12px;
    }
    .count {
      color: var(--muted);
      font-size: 13px;
      white-space: nowrap;
    }
    .file-card {
      background: var(--panel);
      border: 1px solid var(--line);
      border-radius: 8px;
      margin: 12px 0;
      overflow: hidden;
    }
    .file-head {
      display: flex;
      gap: 10px;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 1px solid var(--line);
      background: #fbfcfc;
      padding: 14px;
    }
    .file-meta {
      margin-top: 4px;
      color: var(--muted);
      font-size: 13px;
      word-break: break-all;
    }
    .raw-wrap {
      padding: 0;
    }
    pre {
      margin: 0;
      max-height: 520px;
      overflow: auto;
      background: var(--code);
      color: var(--code-ink);
      padding: 16px;
      white-space: pre-wrap;
      overflow-wrap: anywhere;
      tab-size: 2;
      font-family: ui-monospace, SFMono-Regular, Consolas, "Liberation Mono", monospace;
      font-size: 13px;
      line-height: 1.55;
    }
    .explain {
      border-top: 1px solid var(--line);
      background: var(--soft);
      padding: 14px;
    }
    .explain strong {
      color: var(--accent);
    }
    .explain p {
      margin: 6px 0 0;
    }
    .loading {
      color: var(--muted);
    }
    .error {
      color: var(--accent-red);
      background: #fff3f1;
      border-top: 1px solid #efc2ba;
      padding: 12px 14px;
    }
    .progress {
      position: sticky;
      bottom: 12px;
      z-index: 2;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      border: 1px solid var(--line);
      border-radius: 999px;
      background: var(--panel);
      box-shadow: 0 8px 22px rgba(18, 30, 25, .12);
      padding: 9px 13px;
      color: var(--muted);
      font-size: 14px;
    }
    @media (max-width: 980px) {
      .overview-grid,
      .terms,
      .toc {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }
    @media (max-width: 640px) {
      .overview-grid,
      .terms,
      .toc {
        grid-template-columns: 1fr;
      }
      .section-head,
      .file-head {
        display: block;
      }
      .copy-link {
        margin-top: 8px;
      }
      pre {
        max-height: 420px;
        font-size: 12px;
      }
    }
  </style>
</head>
<body>
  <header class="hero">
    <p class="eyebrow">Duran Chatbot Full Archive</p>
    <h1>듀란 챗봇을 처음 만드는 사람을 위한 전체 원문 해설</h1>
    <p class="lead">이 페이지는 시스템, 로어북, 세계관, 캐릭터 정보, Cloudflare Worker 전문을 빼지 않고 보여줍니다. 먼저 전체 작동 흐름을 쉬운 말로 보고, 아래에서 원문을 하나씩 확인한 뒤 마지막 주석으로 역할을 이해하는 구조입니다. 원문은 공개 GitHub main 브랜치 기준으로 불러옵니다.</p>
    <nav class="quick-links" aria-label="상단 이동">
      <a href="/">개발자용 문서 뷰어</a>
      <a href="#overview">작동 흐름</a>
      <a href="#terms">쉬운 용어</a>
      <a href="#archive">전체 원문</a>
    </nav>
  </header>

  <main>
    <section id="overview">
      <h2>전체 구조 먼저 보기</h2>
      <p class="plain">이 시스템은 챗봇이 이야기를 정해진 칸에 쓰고, Cloudflare Worker가 그 값을 이미지나 화면처럼 보이게 바꾸는 방식입니다.</p>
      <div class="overview-grid">
        <div class="step"><span>1</span><strong>챗봇 시스템</strong>챗봇에게 “본문은 밖에 쓰지 말고 정해진 주소 안에 넣어라” 같은 출력 규칙을 알려줍니다.</div>
        <div class="step"><span>2</span><strong>로어북</strong>챗봇이 잊으면 안 되는 규칙 노트입니다. 상태, 카드, 판정, 엔딩 조건을 붙잡습니다.</div>
        <div class="step"><span>3</span><strong>세계관/캐릭터</strong>이야기의 재료입니다. 어떤 세계인지, 누가 등장하는지, 무엇을 기억해야 하는지 정합니다.</div>
        <div class="step"><span>4</span><strong>Worker URL</strong>챗봇이 만든 호출 주소입니다. 이 주소를 열면 Worker가 글자를 이미지나 패널로 바꿉니다.</div>
        <div class="step"><span>5</span><strong>Turn Worker</strong>여러 Worker 결과를 한 턴 화면으로 묶고, 다음 턴에 쓸 상태를 남깁니다.</div>
      </div>
      <div class="flow" aria-label="작동 흐름">
        <b>사용자 입력</b><span>→</span>
        <b>챗봇 판단</b><span>→</span>
        <b>슬롯 채우기</b><span>→</span>
        <b>Turn Worker</b><span>→</span>
        <b>Dice/Scene/Dialogue/Action</b><span>→</span>
        <b>화면 출력</b><span>→</span>
        <b>상태 주석</b><span>→</span>
        <b>다음 턴</b>
      </div>
    </section>

    <section id="terms">
      <h2>처음 보는 용어</h2>
      <div class="terms">
        <div class="term"><strong>시스템</strong>챗봇이 반드시 지켜야 하는 기본 규칙입니다. 말투보다 출력 형식을 잡는 역할이 큽니다.</div>
        <div class="term"><strong>로어북</strong>챗봇이 상황에 맞게 꺼내 보는 규칙 노트입니다. 이야기 설정과 진행 규칙이 들어갑니다.</div>
        <div class="term"><strong>Worker</strong>Cloudflare에서 돌아가는 작은 서버입니다. 주소를 받으면 이미지, SVG, 텍스트 패널을 만들어 돌려줍니다.</div>
        <div class="term"><strong>슬롯</strong>값을 넣는 정해진 칸입니다. 예를 들어 대사, 배경, 표정, 상태 같은 값을 각 칸에 넣습니다.</div>
        <div class="term"><strong>Worker URL</strong>챗봇 답변 안에 들어가는 호출 주소입니다. 이야기 본문과 상태값이 이 주소 안에 담깁니다.</div>
        <div class="term"><strong>Turn</strong>사용자 입력 한 번에 대한 한 번의 진행 결과입니다. 장면, 대사, 판정, 다음 상태가 같이 움직입니다.</div>
        <div class="term"><strong>전문</strong>중간을 자르지 않은 원문 전체입니다. 아래 원문 칸은 요약본이 아니라 파일 내용을 그대로 불러옵니다.</div>
      </div>
    </section>

    <section>
      <h2>읽는 순서</h2>
      <p class="plain">처음이라면 시스템 → 세계관 → 로어북 → 캐릭터 → Worker → 설정 순서로 보면 됩니다. 코드를 먼저 이해하려고 하면 어렵습니다. 먼저 “왜 이런 구조가 필요한지”를 보고, 그 다음 원문을 보면 됩니다. 개발자용 세부 문서는 따로 보관하고, 이 페이지는 따라 읽는 순서를 우선합니다.</p>
      <nav id="toc" class="toc" aria-label="원문 카테고리"></nav>
    </section>

    <section id="archive">
      <h2>전체 원문</h2>
      <p class="plain">각 파일은 원문을 먼저 보여주고, 바로 아래에 쉬운 설명을 붙입니다. 코드가 길면 원문 칸 안에서 스크롤해 끝까지 볼 수 있습니다.</p>
      <div id="archiveRoot"></div>
      <div id="progress" class="progress">원문 불러오는 중...</div>
    </section>
  </main>

  <script>
    const root = document.getElementById("archiveRoot");
    const toc = document.getElementById("toc");
    const progress = document.getElementById("progress");
    let archive = [];
    let allItems = [];
    const cardByPath = new Map();
    let loaded = 0;

    boot();

    async function boot() {
      try {
        const response = await fetch("/api/full-archive");
        const data = await response.json();
        if (!response.ok) throw new Error(data && data.message ? data.message : "목록을 불러오지 못했습니다.");
        archive = Array.isArray(data.sections) ? data.sections : [];
        allItems = archive.flatMap((section) => section.items.map((item) => ({ ...item, sectionId: section.id })));
        buildPage();
        await loadAllFiles();
      } catch (error) {
        progress.textContent = "원문 목록을 불러오지 못했습니다.";
        const errorBox = document.createElement("div");
        errorBox.className = "error";
        errorBox.textContent = String(error && error.message ? error.message : error);
        root.appendChild(errorBox);
      }
    }

    function buildPage() {
      for (const section of archive) {
        const tocLink = document.createElement("a");
        tocLink.href = "#" + section.id;
        tocLink.textContent = section.title + " · " + section.items.length + "개";
        toc.appendChild(tocLink);

        const sectionEl = document.createElement("section");
        sectionEl.className = "archive-section";
        sectionEl.id = section.id;

        const head = document.createElement("div");
        head.className = "section-head";
        const titleBox = document.createElement("div");
        const title = document.createElement("h2");
        title.textContent = section.title;
        const lead = document.createElement("p");
        lead.className = "plain";
        lead.textContent = section.lead;
        titleBox.append(title, lead);
        const count = document.createElement("div");
        count.className = "count";
        count.textContent = section.items.length + " files";
        head.append(titleBox, count);
        sectionEl.appendChild(head);

        for (const item of section.items) {
          sectionEl.appendChild(createFileCard(item));
        }
        root.appendChild(sectionEl);
      }
    }

    function createFileCard(item) {
      const article = document.createElement("article");
      article.className = "file-card";
      article.dataset.path = item.path;
      cardByPath.set(item.path, article);

      const head = document.createElement("div");
      head.className = "file-head";
      const titleBox = document.createElement("div");
      const h3 = document.createElement("h3");
      h3.textContent = item.title;
      const meta = document.createElement("div");
      meta.className = "file-meta";
      meta.textContent = item.path + " · " + item.kind;
      titleBox.append(h3, meta);

      const copy = document.createElement("button");
      copy.className = "copy-link";
      copy.type = "button";
      copy.textContent = "원문 복사";
      copy.addEventListener("click", async () => {
        const pre = article.querySelector("pre");
        await navigator.clipboard.writeText(pre.textContent || "");
        copy.textContent = "복사됨";
        setTimeout(() => { copy.textContent = "원문 복사"; }, 1200);
      });

      head.append(titleBox, copy);
      const rawWrap = document.createElement("div");
      rawWrap.className = "raw-wrap";
      const pre = document.createElement("pre");
      pre.className = "loading";
      pre.textContent = "원문 불러오는 중...";
      rawWrap.appendChild(pre);

      const explain = document.createElement("div");
      explain.className = "explain";
      const label = document.createElement("strong");
      label.textContent = "쉬운 설명";
      const note = document.createElement("p");
      note.textContent = item.note;
      explain.append(label, note);

      article.append(head, rawWrap, explain);
      return article;
    }

    async function loadAllFiles() {
      updateProgress();
      const queue = [...allItems];
      const workers = Array.from({ length: 4 }, () => loadNext(queue));
      await Promise.all(workers);
      progress.textContent = "전체 원문 " + loaded + "개를 불러왔습니다.";
    }

    async function loadNext(queue) {
      while (queue.length) {
        const item = queue.shift();
        const card = cardByPath.get(item.path);
        const pre = card.querySelector("pre");
        try {
          const response = await fetch("/api/file?path=" + encodeURIComponent(item.path));
          const text = await response.text();
          if (!response.ok) throw new Error(text || "파일을 불러오지 못했습니다.");
          pre.classList.remove("loading");
          pre.textContent = text;
        } catch (error) {
          pre.textContent = "";
          const errorBox = document.createElement("div");
          errorBox.className = "error";
          errorBox.textContent = String(error && error.message ? error.message : error);
          card.appendChild(errorBox);
        } finally {
          loaded += 1;
          updateProgress();
        }
      }
    }

    function updateProgress() {
      progress.textContent = "원문 불러오는 중 " + loaded + " / " + allItems.length;
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

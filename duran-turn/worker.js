const STAGE_BASES = {
  dev: {
    dice: "https://dice-dev.musueman.workers.dev",
    sprite: "https://duran-sprite-dev.musueman.workers.dev"
  },
  prod: {
    dice: "https://dice.musueman.workers.dev",
    sprite: "https://duran-sprite.musueman.workers.dev"
  }
};

const ASSET_BASE_URL = "https://musueman.github.io/duran-assets";
const WORKER_BACKGROUND_VERSION = "2075ec6";
const WORKER_BACKGROUND_FOLDER = "워커배경";
const WORKER_BACKGROUND_ENVS = ["검문소", "성벽", "숲", "실내", "야외", "전장", "지하", "폐허"];
const WORKER_BACKGROUND_COUNT = 4;
const WORKER_BACKGROUND_OVERLAY = 0.48;
const WORKER_BACKGROUND_TINT_OPACITY = 0.34;
const WORKER_FRAME_FOLDER = "\uD504\uB808\uC784";
const WORKER_FRAME_CORNER_FILE = "20260520.png";
const WORKER_FRAME_VERSION = "45a3d94";
const WORKER_FRAME_CORNER_WIDTH = 150;
const WORKER_FRAME_CORNER_HEIGHT = Math.round((WORKER_FRAME_CORNER_WIDTH * 567) / 374);
const WORKER_ENV_TINTS = {
  검문소: "#65513d",
  성벽: "#5d5947",
  숲: "#24422f",
  실내: "#4c3a32",
  야외: "#635337",
  전장: "#5f463e",
  지하: "#29313d",
  폐허: "#51443c"
};
const SVG_HEADERS = {
  "content-type": "image/svg+xml; charset=utf-8",
  "cache-control": "no-store, no-cache, must-revalidate, max-age=0",
  "pragma": "no-cache",
  "expires": "0",
  "x-content-type-options": "nosniff",
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, HEAD, OPTIONS",
  "access-control-allow-headers": "content-type"
};

const ACTION_WIDTH = 700;
const ACTION_HEIGHT = 560;
const ACTION_SECONDS = 5.6;
const ACTION_SMALL_WIDTH = 260;
const ACTION_SMALL_HEIGHT = 520;
const ACTION_SMALL_Y = -20;
const ACTION_LARGE_WIDTH = 520;
const ACTION_LARGE_HEIGHT = 1150;
const ACTION_LARGE_Y = -128;
const ACTION_RESULT_WIDTH = 650;
const ACTION_RESULT_HEIGHT = 250;
const ACTION_RESULT_CENTER_X = ACTION_WIDTH / 2;
const ACTION_RESULT_CENTER_Y = ACTION_HEIGHT / 2;
const TRACE_BASE_OVERHANG = 30;
const ACTION_RESULT_ENTER_KEY = 0.035714;
const ACTION_SMALL_DELAY_KEY = 0.053571;
const ACTION_SMALL_BLUR_PEAK_KEY = 0.080357;
const ACTION_SMALL_ENTER_KEY = 0.107143;
const ACTION_LARGE_DELAY_KEY = 0.071429;
const ACTION_LARGE_BLUR_PEAK_KEY = 0.098214;
const ACTION_LARGE_ENTER_KEY = 0.125;
const ACTION_CHARACTER_EXIT_KEY = 0.892857;
const ACTION_CHARACTER_END_KEY = 0.928571;
const ACTION_RESULT_EXIT_KEY = ACTION_CHARACTER_END_KEY;
const ACTION_RESULT_BURST_KEY = 0.982143;
const ACTION_CACHE_MS = 5 * 60 * 1000;
const actionFileCache = new Map();

const AK = {
  destinyBottom: "\uC6B4\uBA85\uC758\uD558\uB2E8",
  background: "\uBC30\uACBD",
  character: "\uCE90\uB9AD\uD130",
  duran: "\uB4C0\uB780",
  judgement: "\uD310\uC815",
  success: "\uC131\uACF5",
  failure: "\uC2E4\uD328",
  layer: "\uB808\uC774\uC5B4"
};

const AE = {
  battle: "\uC804\uC7A5",
  forest: "\uC232",
  underground: "\uC9C0\uD558",
  ruins: "\uD3D0\uD5C8",
  checkpoint: "\uAC80\uBB38\uC18C",
  wall: "\uC131\uBCBD",
  indoor: "\uC2E4\uB0B4"
};

const AX = {
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

const ACTION_BACKGROUND_ROOT = ["visual", AK.destinyBottom, "000_" + AK.background];
const ACTION_DURAN_ROOT = ["visual", AK.destinyBottom, "001_" + AK.character, "000_" + AK.duran];
const ACTION_JUDGEMENT_ROOT = ["visual", AK.destinyBottom, "002_" + AK.judgement];
const DIALOGUE_SCENE_ROOT = ["visual", "\uB300\uC0AC\uC52C"];
const DIALOGUE_DURAN_ROOT = [...DIALOGUE_SCENE_ROOT, "\uB4C0\uB780"];
const DIALOGUE_BOBO_ROOT = [...DIALOGUE_SCENE_ROOT, "\uBCF4\uBCF4"];
const SCENE_DIALOGUE_SPEAKERS = new Set(["duran", "bobo", "maren", "elina", "ellarin"]);
const PET_DIALOGUE_SPEAKERS = new Set(["bobo"]);
const ACTION_ENVIRONMENT_DIRS = {
  [AE.battle]: "000_" + AE.battle,
  [AE.forest]: "001_" + AE.forest,
  [AE.underground]: "002_" + AE.underground,
  [AE.ruins]: "003_" + AE.ruins,
  [AE.checkpoint]: "004_" + AE.checkpoint,
  [AE.wall]: "005_" + AE.wall,
  [AE.indoor]: "006_" + AE.indoor
};
const ACTION_EXPRESSIONS = Object.values(AX).filter((expression) => expression !== AX.sigh);
const ACTION_EXPRESSION_FALLBACK_FILES = {
  [AX.resolve]: actionLayerFiles([1, 2, 3, 4]),
  [AX.guard]: actionLayerFiles([1, 2, 3, 4, 5, 6, 7, 8]),
  [AX.awkward]: actionLayerFiles([1, 2, 3, 4, 5, 6]),
  [AX.surprise]: actionLayerFiles([1, 2, 3, 4, 5, 6]),
  [AX.talk]: actionLayerFiles([1, 2, 3, 4, 5, 6]),
  [AX.smile]: actionLayerFiles([1, 2, 3, 4, 5, 6]),
  [AX.anxiousTalk]: actionLayerFiles([1, 4, 5]),
  [AX.sad]: actionLayerFiles([1, 2, 3, 4]),
  [AX.infer]: actionLayerFiles([1, 2, 3, 4, 5]),
  [AX.curious]: actionLayerFiles([1, 2, 3, 4, 5]),
  [AX.brightSmile]: actionLayerFiles([1, 2, 3, 4, 5])
};
const ACTION_SUCCESS_EXPRESSIONS = [AX.resolve, AX.guard, AX.infer, AX.curious, AX.smile, AX.brightSmile];
const ACTION_FAILURE_EXPRESSIONS = [AX.sad, AX.awkward, AX.surprise, AX.anxiousTalk, AX.guard];
const ACTION_PARTIAL_EXPRESSIONS = [AX.guard, AX.awkward, AX.anxiousTalk, AX.resolve];
const ACTION_BACKGROUND_FALLBACK_FILES = {
  ["000_" + AE.battle]: actionNumberedFiles(AE.battle, [1, 2, 3, 4]),
  ["001_" + AE.forest]: ["21.jpg", ...actionNumberedFiles(AE.forest, [1, 3, 4])],
  ["002_" + AE.underground]: actionNumberedFiles(AE.underground, [1, 2, 3, 4]),
  ["003_" + AE.ruins]: actionNumberedFiles(AE.ruins, [1, 2, 3, 4]),
  ["004_" + AE.checkpoint]: actionNumberedFiles(AE.checkpoint, [1, 2, 3, 4]),
  ["005_" + AE.wall]: actionNumberedFiles(AE.wall, [1, 2, 3, 4]),
  ["006_" + AE.indoor]: actionNumberedFiles(AE.indoor, [1, 2, 3, 4])
};
const ACTION_ENV_TINTS = {
  [AE.battle]: "#5b4138",
  [AE.forest]: "#263f2d",
  [AE.underground]: "#24313d",
  [AE.ruins]: "#51453c",
  [AE.checkpoint]: "#5b4739",
  [AE.wall]: "#4c5061",
  [AE.indoor]: "#4a372d"
};
const TEXT_HEADERS = {
  ...SVG_HEADERS,
  "content-type": "text/plain; charset=utf-8"
};

const JSON_HEADERS = {
  ...SVG_HEADERS,
  "content-type": "application/json; charset=utf-8"
};

const PANEL_WIDTH = 700;
const INSET_X = 32;
const INSET_WIDTH = PANEL_WIDTH - INSET_X * 2;
const OUTER_BORDER_INSET = 16;
const MARGIN = INSET_X;
const CONTENT_WIDTH = INSET_WIDTH;
const CARD_WIDTH = INSET_WIDTH;
const CARD_HEIGHT = Math.round((CARD_WIDTH * 560) / 700);
const SCENE_WIDTH = INSET_WIDTH;
const SCENE_HEIGHT = Math.round((SCENE_WIDTH * 559) / 700);
const GOLD_MAIN = "#ffd98a";
const GOLD_LIGHT = "#fff4cf";
const GOLD_DARK = "#b89c58";
const TEXT_DARK = "#f4e8c9";
const TEXT_MUTED = "#bcae8a";
const BG_PAGE = "#0f0e0b";
const BG_PANEL = "#1d1711";
const BORDER_GOLD = "#b99b57";
const DESKTOP_TURN_LAYOUT = {
  headerHeight: 66,
  headerGap: 18,
  sectionGap: 24,
  headerLabelFontSize: 15,
  headerTitleFontSize: 19,
  headerAccentFontSize: 18,
  headerLabelBaseline: 28,
  headerTitleBaseline: 51,
  headerAccentBaseline: 43,
  summaryColumns: 3,
  summaryPaddingX: 24,
  summaryPaddingY: 22,
  chipHeight: 28,
  chipGapX: 13,
  chipGapY: 12,
  chipFontSize: 13,
  chipTextBaseline: 19
};
const MOBILE_TURN_LAYOUT = {
  headerHeight: 102,
  headerGap: 18,
  sectionGap: 18,
  headerLabelFontSize: 22,
  headerTitleFontSize: 32,
  headerAccentFontSize: 27,
  headerLabelBaseline: 38,
  headerTitleBaseline: 76,
  headerAccentBaseline: 64,
  summaryColumns: 2,
  summaryPaddingX: 22,
  summaryPaddingY: 24,
  chipHeight: 50,
  chipGapX: 14,
  chipGapY: 14,
  chipFontSize: 26,
  chipTextBaseline: 34
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
      return textResponse(renderHelp(url, env), request);
    }

    if (url.pathname === "/health.json") {
      return jsonResponse({
        ok: true,
        worker: "duran-turn",
        stage: getStage(url, request, env),
        endpoints: ["/turn.svg", "/trace.svg", "/veil.svg"]
      }, request);
    }

    try {
      if (url.pathname === "/turn.svg") {
        return svgResponse(await renderTurnSvg(url, request, env), request);
      }

      if (url.pathname === "/trace.svg" || url.pathname === "/result.svg") {
        return svgResponse(await renderTraceSvg(url, request, env), request);
      }

      if (url.pathname === "/veil.svg" || url.pathname === "/scene.svg") {
        return svgResponse(await renderVeilSvg(url, request, env), request);
      }
    } catch (error) {
      return svgResponse(renderErrorSvg(error), request, 502);
    }

    return new Response("Not Found", { status: 404, headers: TEXT_HEADERS });
  }
};

async function renderTurnSvg(url, request, env) {
  const bases = getBases(url, request, env);
  const layout = getTurnLayout(url, request);
  const trace = parseTrace(url);
  const veil = parseVeil(url);
  const sceneMobile = veil.mobile || isMobileRequest(request);

  const traceCardUrl = makeUrl(bases.dice, "/card.svg", {
    카드: "a",
    환경: trace.environment,
    값: trace.pValue,
    면: trace.face
  });
  const traceDiceUrl = makeUrl(bases.dice, "/dice.webp", {
    "\uAC12": trace.pValue,
    "\uBA74": trace.face,
    "\uC560\uB2C8": "1"
  });
  const veilDiceUrl = makeUrl(bases.dice, "/dice.webp", {
    "\uAC12": veil.veilValue,
    "\uBA74": veil.face,
    "\uC560\uB2C8": "1"
  });
  const sceneUrl = makeUrl(bases.sprite, "/scene.svg", {
    환경: veil.environment,
    패: veil.cardType,
    관계: veil.relationship,
    분위기: veil.mood,
    감정: veil.emotion,
    모바일: sceneMobile ? "1" : ""
  });

  const veilCardUrl = makeUrl(bases.dice, "/card.svg", {
    카드: "b",
    환경: veil.environment,
    값: veil.veilValue,
    면: veil.face
  });

  const [traceCardRaw, veilCardRaw, scene] = await Promise.all([
    loadSvgFragment(traceCardUrl, env.DICE),
    loadSvgFragment(veilCardUrl, env.DICE),
    loadSvgFragment(sceneUrl, env.SPRITE)
  ]);
  const traceNarrativePanel = getNarrativePanel(trace.body, layout);
  const veilNarrativePanel = getNarrativePanel(veil.body, layout);
  const upperStatusPanel = getUpperStatusPanel(parseStatusParam(url, ["상단ST"]), layout);
  const lowerStatusPanel = getLowerStatusPanel(parseStatusParam(url, ["하단ST"]), layout);
  const veilInfoHeight = getVeilInfoPanelHeight(layout);
  const traceInfoHeight = getTraceInfoPanelHeight(layout);
  let y = MARGIN;
  const blocks = [];

  if (upperStatusPanel.height) {
    blocks.push(upperStatusPanel.svg(INSET_X, y));
    y += upperStatusPanel.height + layout.sectionGap;
  }

  blocks.push(renderCardBaseTitle(traceCardRaw, INSET_X, y, INSET_WIDTH));
  y += getCardBaseTitleHeight(INSET_WIDTH);

  blocks.push(await renderTraceInfoPanel(trace, traceDiceUrl, INSET_X, y, layout));
  y += traceInfoHeight + layout.sectionGap;

  const dialogueTurn = {
    ...veil,
    dialogue: trace.dialogue,
    speaker: trace.speaker
  };
  const traceNarrativeAttached = traceNarrativePanel.height > 0;
  const dialogueBackdrop = await renderVeilActionBackdrop(dialogueTurn, INSET_X, y, CARD_WIDTH, CARD_HEIGHT);
  blocks.push(`
  ${renderInsetFrame(INSET_X, y, CARD_WIDTH, CARD_HEIGHT, { bottomRadius: traceNarrativeAttached ? 0 : 8 })}
  ${renderClippedContent("turnDialogueCutClip", INSET_X, y, CARD_WIDTH, CARD_HEIGHT, `
    ${dialogueBackdrop}
  `, { bottomRadius: traceNarrativeAttached ? 0 : 8 })}`);
  y += CARD_HEIGHT;

  if (traceNarrativePanel.height) {
    blocks.push(traceNarrativePanel.svg(INSET_X, y, { topRadius: 0 }));
    y += traceNarrativePanel.height + layout.sectionGap;
  } else {
    y += layout.sectionGap;
  }

  blocks.push(renderCardBaseTitle(veilCardRaw, INSET_X, y, INSET_WIDTH));
  y += getCardBaseTitleHeight(INSET_WIDTH);

  blocks.push(renderVeilInfoPanel(veil, veilDiceUrl, INSET_X, y, layout));
  y += veilInfoHeight + layout.sectionGap;

  const veilNarrativeAttached = veilNarrativePanel.height > 0;
  blocks.push(`
  ${renderInsetFrame(INSET_X, y, SCENE_WIDTH, SCENE_HEIGHT, { bottomRadius: veilNarrativeAttached ? 0 : 8 })}
  ${renderClippedContent("turnSceneClip", INSET_X, y, SCENE_WIDTH, SCENE_HEIGHT, `
    ${placeSvg(scene, INSET_X, y, SCENE_WIDTH, SCENE_HEIGHT)}
  `, { bottomRadius: veilNarrativeAttached ? 0 : 8 })}`);
  y += SCENE_HEIGHT;

  if (veilNarrativePanel.height) {
    blocks.push(veilNarrativePanel.svg(INSET_X, y, { topRadius: 0 }));
    y += veilNarrativePanel.height + MARGIN;
  } else {
    y += MARGIN;
  }

  if (lowerStatusPanel.height) {
    y -= MARGIN - layout.sectionGap;
    blocks.push(lowerStatusPanel.svg(INSET_X, y));
    y += lowerStatusPanel.height + MARGIN;
  }

  return renderShell({
    title: "Duran Turn",
    desc: `턴 / 환경=${veil.environment} / P=${trace.pValue} / 장막값=${veil.veilValue}`,
    height: y,
    environment: veil.environment || trace.environment,
    body: blocks.join("\n")
  });
}

async function renderTraceSvg(url, request, env) {
  const bases = getBases(url, request, env);
  const layout = getTurnLayout(url, request);
  const turn = parseTrace(url);
  const cardUrl = makeUrl(bases.dice, "/card.svg", {
    카드: "a",
    환경: turn.environment,
    값: turn.pValue,
    면: turn.face
  });
  const card = prepareTraceCardLayer(await loadSvgFragment(cardUrl, env.DICE));
  const bodyPanel = getNarrativePanel(turn.body, layout);
  const cardY = bodyPanel.height ? MARGIN + bodyPanel.height + layout.sectionGap : MARGIN;
  const actionBackdrop = await renderTraceActionBackdrop(turn, INSET_X, cardY, CARD_WIDTH, CARD_HEIGHT);
  const diceUrl = makeUrl(bases.dice, "/dice.webp", {
    "\uAC12": turn.pValue,
    "\uBA74": turn.face,
    "\uC560\uB2C8": "1"
  });
  const traceBaseOverhangPx = Math.round((TRACE_BASE_OVERHANG * CARD_WIDTH) / ACTION_WIDTH);
  const infoY = cardY + CARD_HEIGHT + Math.max(layout.sectionGap, traceBaseOverhangPx + 8);
  const height = infoY + getTraceInfoPanelHeight(layout) + 32;

  return renderShell({
    title: "Duran Trace",
    desc: `판정 / 환경=${turn.environment} / P=${turn.pValue} / 결과=${turn.result}`,
    height,
    environment: turn.environment,
    body: `
  ${bodyPanel.svg ? bodyPanel.svg(INSET_X, MARGIN) : ""}
  ${renderInsetFrame(INSET_X, cardY, CARD_WIDTH, CARD_HEIGHT)}
  ${renderClippedContent("traceCardClip", INSET_X, cardY, CARD_WIDTH, CARD_HEIGHT, `
    ${actionBackdrop}
  `)}
  ${placeSvg(card, INSET_X, cardY, CARD_WIDTH, CARD_HEIGHT, true)}
  ${await renderTraceInfoPanel(turn, diceUrl, INSET_X, infoY, layout)}
`
  });
}

async function renderVeilSvg(url, request, env) {
  const bases = getBases(url, request, env);
  const turn = parseVeil(url);
  const sceneMobile = turn.mobile || isMobileRequest(request);
  const layout = getTurnLayout(url, request);

  const cardUrl = makeUrl(bases.dice, "/card.svg", {
    카드: "b",
    환경: turn.environment,
    값: turn.veilValue,
    면: turn.face
  });
  const diceUrl = makeUrl(bases.dice, "/dice.webp", {
    "\uAC12": turn.veilValue,
    "\uBA74": turn.face,
    "\uC560\uB2C8": "1"
  });
  const sceneUrl = makeUrl(bases.sprite, "/scene.svg", {
    환경: turn.environment,
    패: turn.cardType,
    관계: turn.relationship,
    분위기: turn.mood,
    감정: turn.emotion,
    모바일: sceneMobile ? "1" : ""
  });

  const [card, scene] = await Promise.all([
    loadSvgFragment(cardUrl, env.DICE),
    loadSvgFragment(sceneUrl, env.SPRITE)
  ]);
  const cardForeground = prepareVeilCardLayer(card);

  const bodyPanel = getNarrativePanel(turn.body, layout);
  const cardY = bodyPanel.height ? MARGIN + bodyPanel.height + layout.sectionGap : MARGIN;
  const veilBackdrop = await renderVeilActionBackdrop(turn, INSET_X, cardY, CARD_WIDTH, CARD_HEIGHT);
  const veilBaseOverhangPx = Math.round((TRACE_BASE_OVERHANG * CARD_WIDTH) / ACTION_WIDTH);
  const infoY = cardY + CARD_HEIGHT + Math.max(layout.sectionGap, veilBaseOverhangPx + 8);
  const sceneY = infoY + getVeilInfoPanelHeight(layout) + layout.sectionGap;
  const height = sceneY + SCENE_HEIGHT + MARGIN;

  return renderShell({
    title: "Duran Veil",
    desc: `장막 / 환경=${turn.environment} / 장막값=${turn.veilValue} / 대사=${turn.dialogue}`,
    height,
    environment: turn.environment,
    body: `
  ${bodyPanel.svg ? bodyPanel.svg(INSET_X, MARGIN) : ""}
  ${renderInsetFrame(INSET_X, cardY, CARD_WIDTH, CARD_HEIGHT)}
  ${renderClippedContent("veilCardClip", INSET_X, cardY, CARD_WIDTH, CARD_HEIGHT, `
    ${veilBackdrop}
  `)}
  ${placeSvg(cardForeground, INSET_X, cardY, CARD_WIDTH, CARD_HEIGHT, true)}
  ${renderVeilInfoPanel(turn, diceUrl, INSET_X, infoY, layout)}
  ${renderInsetFrame(INSET_X, sceneY, SCENE_WIDTH, SCENE_HEIGHT)}
  ${renderClippedContent("veilSceneClip", INSET_X, sceneY, SCENE_WIDTH, SCENE_HEIGHT, `
    ${placeSvg(scene, INSET_X, sceneY, SCENE_WIDTH, SCENE_HEIGHT)}
  `)}
`
  });
}

function parseTrace(url) {
  const pValue = getParam(url, ["P값", "P", "p", "값"], "0");
  const reward = getParam(url, ["보상", "reward"], "");
  const damage = getParam(url, ["피해", "damage"], "");
  const change = getParam(url, ["변화", "change"], "");
  const ability = getParam(url, ["능력", "ability"], "");
  const item = getParam(url, ["소비품", "item", "consumable"], "0");
  const tint = getParam(url, ["색틈", "color", "tint"], "0");
  const target = getParam(url, ["목표", "target"], "");
  const computedRoll = computeTraceRoll({ pValue, ability, item, tint, target });
  const bodyValue = getParam(url, ["운명의흔적본문"], "", 6000)
    || getParam(url, ["본문", "body", "narrative", "지문"], "", 6000);
  const bodyParts = splitBodyAndDialogue(bodyValue, "듀란");

  return {
    environment: getParam(url, ["환경", "env", "environment"], "전장"),
    pValue,
    face: getParam(url, ["면", "face", "dice"], "6"),
    action: getParam(url, ["행동", "act", "action"], ""),
    category: getParam(url, ["분류", "stat", "category"], ""),
    ability: normalizeModifierParam(ability),
    item: normalizeModifierParam(item),
    tint: normalizeModifierParam(tint),
    total: computedRoll.total || getParam(url, ["최종", "total"], ""),
    target,
    result: computedRoll.result || getParam(url, ["결과", "result"], ""),
    reward,
    damage,
    change,
    body: bodyParts.body,
    dialogue: formatDialogueEntries(bodyParts.dialogues),
    speaker: "듀란"
  };
}

function computeTraceRoll({ pValue, ability, item, tint, target }) {
  const p = parseRollNumber(pValue);
  const goal = parseRollNumber(target);
  if (p === null) return { total: "", result: "" };

  const total = p
    + parseModifierNumber(ability)
    + parseModifierNumber(item)
    + parseModifierNumber(tint);
  if (goal === null) return { total: String(total), result: "성공" };
  const result = total >= goal ? "성공" : total === goal - 1 ? "부분성공" : "실패";

  return { total: String(total), result };
}

function parseVeil(url) {
  const speaker = getParam(url, ["speaker", "actor", "ch", "화자", "캐릭터"], "듀란");
  const bodyValue = getParam(url, ["새운명의패본문"], "", 6000)
    || getParam(url, ["본문", "body", "narrative", "지문"], "", 6000);
  const lineParam = getParam(url, ["대사", "D", "d", "line", "text", "dialogue"], "");
  const dialogue = lineParam ? normalizeDialogueParam(lineParam) : "";

  return {
    environment: getParam(url, ["환경", "env", "environment"], "전장"),
    veilValue: getParam(url, ["newFateD8Roll", "장막값", "veil", "veilValue", "값"], "0"),
    face: getParam(url, ["면", "face", "dice"], "8"),
    cardType: getParam(url, ["패", "장면패", "카드", "card", "event"], "조사"),
    relationship: getParam(url, ["관계", "relationship", "relation"], "중립"),
    mood: getParam(url, ["분위기", "mood", "atmosphere"], "긴장"),
    emotion: getParam(url, ["감정", "emotion"], "불안"),
    dialogue: dialogue || "...",
    speaker,
    body: normalizeBodyParam(bodyValue),
    mobile: parseBool(getParam(url, ["모바일", "mobile", "m"], ""))
  };
}

function renderTraceSummary(turn, x, y, layout = DESKTOP_TURN_LAYOUT) {
  return renderPanel({
    x,
    y,
    width: INSET_WIDTH,
    height: getSummaryPanelHeight(9, layout),
    body: renderSummaryChips(getTraceSummaryChips(turn), x, y, layout)
  });
}

function renderVeilSummary(turn, x, y, layout = DESKTOP_TURN_LAYOUT) {
  return renderPanel({
    x,
    y,
    width: INSET_WIDTH,
    height: getSummaryPanelHeight(6, layout),
    body: renderSummaryChips(getVeilSummaryChips(turn), x, y, layout)
  });
}

function renderSummaryChips(chips, x, y, layout = DESKTOP_TURN_LAYOUT) {
  const columns = layout.summaryColumns;
  const paddingX = layout.summaryPaddingX;
  const gapX = layout.chipGapX;
  const chipWidth = (INSET_WIDTH - paddingX * 2 - gapX * (columns - 1)) / columns;

  return renderChips(chips, x + paddingX, y + layout.summaryPaddingY, columns, chipWidth, gapX, layout);
}

function getSummaryPanelHeight(itemCount, layout = DESKTOP_TURN_LAYOUT) {
  const rows = Math.ceil(itemCount / layout.summaryColumns);
  return layout.summaryPaddingY * 2
    + rows * layout.chipHeight
    + Math.max(0, rows - 1) * layout.chipGapY;
}

function getTraceResultPanelHeight(layout = DESKTOP_TURN_LAYOUT) {
  return getSummaryPanelHeight(9, layout)
    + layout.sectionGap
    + getOutcomeBoxHeight(layout);
}

function getTraceInfoPanelHeight(layout = DESKTOP_TURN_LAYOUT) {
  return layout.headerHeight
    + layout.headerGap
    + getTraceActionStripHeight(layout)
    + layout.headerGap
    + getTraceResultPanelHeight(layout);
}

function getVeilInfoPanelHeight(layout = DESKTOP_TURN_LAYOUT) {
  return layout.headerHeight
    + layout.headerGap
    + getSummaryPanelHeight(6, layout);
}

function getTraceActionStripHeight(layout = DESKTOP_TURN_LAYOUT) {
  return layout === MOBILE_TURN_LAYOUT ? 260 : 180;
}

async function renderTraceInfoPanel(turn, diceUrl, x, y, layout = DESKTOP_TURN_LAYOUT) {
  const headerHeight = layout.headerHeight;
  const actionX = x + 24;
  const actionY = y + headerHeight + layout.headerGap;
  const actionWidth = INSET_WIDTH - 48;
  const actionHeight = getTraceActionStripHeight(layout);
  const summaryY = actionY + actionHeight + layout.headerGap;
  const summaryHeight = getSummaryPanelHeight(9, layout);
  const outcomeY = summaryY + summaryHeight + layout.sectionGap;
  const firstDividerY = y + headerHeight + layout.headerGap / 2;
  const secondDividerY = summaryY + summaryHeight + layout.sectionGap / 2;
  const traceBackdrop = await renderTraceActionBackdrop(turn, actionX, actionY, actionWidth, actionHeight);

  return renderPanel({
    x,
    y,
    width: INSET_WIDTH,
    height: getTraceInfoPanelHeight(layout),
    body: `
    ${renderSectionHeaderText({
      x,
      y,
      width: INSET_WIDTH,
      label: "TRACE OF FATE",
      title: "운명의흔적 판정",
      accent: "",
      layout
    })}
    ${renderTraceHeaderDice(diceUrl, y, layout, turn.pValue, turn.face)}
    ${renderPanelDivider(x, firstDividerY)}
    <rect x="${actionX}" y="${actionY}" width="${actionWidth}" height="${actionHeight}" rx="8" fill="#0a0b0d" stroke="${BORDER_GOLD}" stroke-width="1" opacity="0.95"/>
    ${traceBackdrop}
    ${renderSummaryChips(getTraceSummaryChips(turn), x, summaryY, layout)}
    ${renderPanelDivider(x, secondDividerY)}
    ${renderOutcomeRows(turn, x, outcomeY, INSET_WIDTH, getOutcomeBoxHeight(layout), layout)}
    `
  });
}

function renderVeilInfoPanel(turn, diceUrl, x, y, layout = DESKTOP_TURN_LAYOUT) {
  const summaryY = y + layout.headerHeight + layout.headerGap;

  return renderPanel({
    x,
    y,
    width: INSET_WIDTH,
    height: getVeilInfoPanelHeight(layout),
    body: `
    ${renderSectionHeaderText({
      x,
      y,
      width: INSET_WIDTH,
      label: "VEIL OF FATE",
      title: "장막과 다음 장면",
      accent: "",
      layout
    })}
    ${renderTraceHeaderDice(diceUrl, y, layout, turn.veilValue, turn.face)}
    ${renderPanelDivider(x, y + layout.headerHeight + layout.headerGap / 2)}
    ${renderSummaryChips(getVeilSummaryChips(turn), x, summaryY, layout)}
    `
  });
}

function renderPanelDivider(x, y) {
  return `<line
    x1="${x + 24}"
    y1="${round2(y)}"
    x2="${x + INSET_WIDTH - 24}"
    y2="${round2(y)}"
    stroke="${BORDER_GOLD}"
    stroke-width="1"
    opacity="0.7"
  />`;
}

function renderTraceResultPanel(turn, x, y, layout = DESKTOP_TURN_LAYOUT) {
  const summaryHeight = getSummaryPanelHeight(9, layout);
  const outcomeHeight = getOutcomeBoxHeight(layout);
  const height = getTraceResultPanelHeight(layout);
  const dividerY = y + summaryHeight + layout.sectionGap / 2;
  return renderPanel({
    x,
    y,
    width: INSET_WIDTH,
    height,
    body: `
    ${renderSummaryChips(getTraceSummaryChips(turn), x, y, layout)}
    <line
      x1="${x + 24}"
      y1="${round2(dividerY)}"
      x2="${x + INSET_WIDTH - 24}"
      y2="${round2(dividerY)}"
      stroke="${BORDER_GOLD}"
      stroke-width="1"
      opacity="0.7"
    />
    ${renderOutcomeRows(turn, x, y + summaryHeight + layout.sectionGap, INSET_WIDTH, outcomeHeight, layout)}
    `
  });
}

function getTraceSummaryChips(turn) {
  return [
    ["P값", turn.pValue],
    ["행동", turn.action || "-"],
    ["분류", turn.category || "-"],
    ["능력", signed(turn.ability)],
    ["소비품", signed(turn.item)],
    ["색틈", signed(turn.tint)],
    ["최종", turn.total || "-"],
    ["목표", turn.target || "-"],
    ["결과", turn.result || "-"]
  ];
}

function getVeilSummaryChips(turn) {
  return [
    ["장막값", turn.veilValue],
    ["환경", turn.environment],
    ["패", turn.cardType],
    ["관계", turn.relationship],
    ["분위기", turn.mood],
    ["감정", turn.emotion]
  ];
}

function getOutcomeBoxHeight(layout = DESKTOP_TURN_LAYOUT) {
  return layout === MOBILE_TURN_LAYOUT ? 154 : 92;
}

function renderOutcomeBox(turn, x, y, width, layout = DESKTOP_TURN_LAYOUT) {
  return renderPanel({
    x,
    y,
    width,
    height: getOutcomeBoxHeight(layout),
    body: renderOutcomeRows(turn, x, y, width, getOutcomeBoxHeight(layout), layout)
  });
}

function renderOutcomeRows(turn, x, y, width, height, layout = DESKTOP_TURN_LAYOUT) {
  const mobile = layout === MOBILE_TURN_LAYOUT;
  const rows = [
    ["피해", normalizeOutcomeValue(turn.damage)],
    ["보상", normalizeOutcomeValue(turn.reward)],
    ["변화", normalizeOutcomeValue(turn.change)]
  ];
  const paddingX = mobile ? 28 : 26;
  const labelWidth = mobile ? 92 : 64;
  const rowHeight = mobile ? 38 : 22;
  const fontSize = mobile ? 23 : 16;
  const firstBaseline = y + (mobile ? 43 : 31);
  const valueMaxUnits = mobile ? 18 : 43;

  return rows.map(([label, value], index) => {
    const baseline = firstBaseline + index * rowHeight;
    return `
    <text
      x="${x + paddingX}"
      y="${baseline}"
      font-family="'Noto Serif KR', 'Malgun Gothic', serif"
      font-size="${fontSize}"
      font-weight="900"
      fill="${TEXT_DARK}"
    >[${escapeXml(label)}]</text>
    <text
      x="${x + paddingX + labelWidth}"
      y="${baseline}"
      font-family="'Noto Serif KR', 'Malgun Gothic', serif"
      font-size="${fontSize}"
      font-weight="700"
      fill="${TEXT_DARK}"
    >${escapeXml(fitText(value, valueMaxUnits))}</text>`;
  }).join("");
}

function normalizeOutcomeValue(value) {
  const text = safeText(value, "", 180);
  return text || "NONE";
}

function renderSectionHeader({ x, y, width, label, title, accent, layout = DESKTOP_TURN_LAYOUT }) {
  return `
  <g>
    <rect
      x="${x}"
      y="${y}"
      width="${width}"
      height="${layout.headerHeight}"
      rx="8"
      fill="#211a12"
      stroke="${BORDER_GOLD}"
      stroke-width="1.2"
    />
    ${renderSectionHeaderText({ x, y, width, label, title, accent, layout })}
  </g>`;
}

function renderSectionHeaderText({ x, y, width, label, title, accent, layout = DESKTOP_TURN_LAYOUT }) {
  return `
    <text
      x="${x + 24}"
      y="${y + layout.headerLabelBaseline}"
      font-family="Cinzel, Georgia, serif"
      font-size="${layout.headerLabelFontSize}"
      font-weight="700"
      letter-spacing="0.08em"
      fill="${GOLD_DARK}"
    >${escapeXml(label)}</text>
    <text
      x="${x + 24}"
      y="${y + layout.headerTitleBaseline}"
      font-family="'Noto Serif KR', 'Malgun Gothic', serif"
      font-size="${layout.headerTitleFontSize}"
      font-weight="900"
      fill="${TEXT_DARK}"
    >${escapeXml(title)}</text>
    <text
      x="${x + width - 24}"
      y="${y + layout.headerAccentBaseline}"
      text-anchor="end"
      font-family="'Noto Serif KR', 'Malgun Gothic', serif"
      font-size="${layout.headerAccentFontSize}"
      font-weight="900"
      fill="${GOLD_DARK}"
    >${escapeXml(accent)}</text>
  `;
}

function renderTraceHeaderDice(diceUrl, headerY, layout = DESKTOP_TURN_LAYOUT, value = "", face = "6") {
  const margin = 8;
  const height = Math.max(1, (layout.headerHeight - margin * 2) * 1.5);
  const parts = getDisplayDiceParts(value);
  const twoDice = parts.length > 1;
  const dieHeight = twoDice ? Math.round(height * 0.82) : height;
  const dieWidth = Math.round(dieHeight * 1.25);
  const gap = twoDice ? Math.round(dieWidth * 0.08) : 0;
  const groupWidth = twoDice ? dieWidth * 2 + gap : dieWidth;
  const x = MARGIN + CONTENT_WIDTH - margin - groupWidth;
  const y = headerY + (layout.headerHeight - height) / 2;
  const dieY = y + (height - dieHeight) / 2;
  const images = parts.map((part, index) => {
    const href = getDiceDisplayUrl(diceUrl, part, twoDice ? "6" : face);
    return `<image
      href="${escapeXml(href)}"
      x="${round2(x + index * (dieWidth + gap))}"
      y="${round2(dieY)}"
      width="${dieWidth}"
      height="${dieHeight}"
      preserveAspectRatio="xMidYMid meet"
    />`;
  }).join("");

  return `<g>${images}</g>`;
}

function getDisplayDiceParts(value) {
  let number = parseSignedNumber(value);
  if (!Number.isFinite(number)) number = 1;
  number = Math.max(1, Math.round(number));
  if (number < 6) return [number];
  return splitDiceValue(number);
}

function splitDiceValue(value) {
  const total = clamp(Math.round(value), 2, 12);
  const first = clamp(Math.floor(total / 2), 1, 6);
  const second = clamp(total - first, 1, 6);
  return [first, second];
}

function getDiceDisplayUrl(diceUrl, value, face = "6") {
  try {
    const url = new URL(diceUrl.toString());
    url.searchParams.set("값", String(value));
    url.searchParams.set("면", String(face || "6"));
    url.searchParams.set("애니", "1");
    return url.toString();
  } catch (_error) {
    return String(diceUrl || "");
  }
}

function roundedRectPath(x, y, width, height, radii = {}) {
  const tl = clamp(Number(radii.tl ?? 8), 0, Math.min(width, height) / 2);
  const tr = clamp(Number(radii.tr ?? 8), 0, Math.min(width, height) / 2);
  const br = clamp(Number(radii.br ?? 8), 0, Math.min(width, height) / 2);
  const bl = clamp(Number(radii.bl ?? 8), 0, Math.min(width, height) / 2);
  return [
    `M ${round2(x + tl)} ${round2(y)}`,
    `H ${round2(x + width - tr)}`,
    tr ? `Q ${round2(x + width)} ${round2(y)} ${round2(x + width)} ${round2(y + tr)}` : `L ${round2(x + width)} ${round2(y)}`,
    `V ${round2(y + height - br)}`,
    br ? `Q ${round2(x + width)} ${round2(y + height)} ${round2(x + width - br)} ${round2(y + height)}` : `L ${round2(x + width)} ${round2(y + height)}`,
    `H ${round2(x + bl)}`,
    bl ? `Q ${round2(x)} ${round2(y + height)} ${round2(x)} ${round2(y + height - bl)}` : `L ${round2(x)} ${round2(y + height)}`,
    `V ${round2(y + tl)}`,
    tl ? `Q ${round2(x)} ${round2(y)} ${round2(x + tl)} ${round2(y)}` : `L ${round2(x)} ${round2(y)}`,
    "Z"
  ].join(" ");
}

function renderPanel({ x, y, width, height, body, topRadius = 8, bottomRadius = 8 }) {
  const d = roundedRectPath(x, y, width, height, {
    tl: topRadius,
    tr: topRadius,
    br: bottomRadius,
    bl: bottomRadius
  });
  return `
  <g>
    <path
      d="${d}"
      fill="${BG_PANEL}"
      stroke="${BORDER_GOLD}"
      stroke-width="1"
      filter="url(#panelShadow)"
    />
    ${body}
  </g>`;
}

function getNarrativePanel(body, layout = DESKTOP_TURN_LAYOUT) {
  const text = formatNarrativeSentenceBreaks(normalizeBodyParam(body));
  if (!text) return { height: 0, svg: "" };

  const mobile = layout === MOBILE_TURN_LAYOUT;
  const paddingX = mobile ? 24 : 22;
  const paddingY = mobile ? 26 : 22;
  const fontSize = mobile ? 29 : 18;
  const lineHeight = mobile ? 46 : 30;
  const paragraphGap = mobile ? 16 : 11;
  const dialogueGap = mobile ? 32 : 22;
  const maxUnits = Math.floor((INSET_WIDTH - paddingX * 2) / (fontSize * 0.9));
  const paragraphs = text.split(/\n{2,}/).map((part) => part.trim()).filter(Boolean);
  const rows = [];

  paragraphs.forEach((paragraph, paragraphIndex) => {
    const dialogueParagraph = isNarrativeDialogueParagraph(paragraph);
    if (dialogueParagraph && rows.length && !rows[rows.length - 1].gap) {
      rows.push({ gap: true, size: dialogueGap });
    }
    wrapRichTextByUnits(paragraph, maxUnits).forEach((segments) => rows.push({ segments, gap: false }));
    if (paragraphIndex < paragraphs.length - 1) {
      const nextDialogueParagraph = isNarrativeDialogueParagraph(paragraphs[paragraphIndex + 1]);
      rows.push({
        text: "",
        gap: true,
        size: dialogueParagraph || nextDialogueParagraph ? dialogueGap : paragraphGap
      });
    }
  });

  const height = paddingY * 2
    + rows.filter((row) => !row.gap).length * lineHeight
    + rows.filter((row) => row.gap).reduce((sum, row) => sum + (row.size || paragraphGap), 0);

  return {
    height,
    svg: (x, y, panelOptions = {}) => renderNarrativePanel({
      x,
      y,
      width: INSET_WIDTH,
      height,
      rows,
      paddingX,
      paddingY,
      fontSize,
      lineHeight,
      paragraphGap,
      panelOptions
    })
  };
}

function parseStatusParam(url, aliases) {
  return getParam(url, aliases, "", 2200);
}

function normalizeStatusParam(value) {
  return decodeUrlTextTokens(safeText(value, "", 2200))
    .replace(/```info/gi, "")
    .replace(/```/g, "")
    .replace(/\r/g, "")
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .join("\n");
}

const STATUS_ABILITY_ORDER = ["힘", "민", "지", "의", "운"];
const STATUS_ABILITY_COLORS = {
  "힘": "#8F4A45",
  "민": "#4F8F68",
  "지": "#4E7694",
  "의": "#7D6394",
  "운": "#927D45"
};

function getUpperStatusPanel(body, layout = DESKTOP_TURN_LAYOUT) {
  const text = normalizeStatusParam(body);
  if (!text) return { height: 0, svg: "" };

  const mobile = layout === MOBILE_TURN_LAYOUT;
  const paddingX = mobile ? 24 : 22;
  const paddingY = mobile ? 24 : 18;
  const fontSize = mobile ? 29 : 18;
  const lineHeight = mobile ? 46 : 30;
  const maxUnits = Math.floor((INSET_WIDTH - paddingX * 2) / (fontSize * 0.9));
  const rows = [];

  text.split(/\n+/).forEach((line) => {
    wrapTextByUnits(line, maxUnits).forEach((wrapped) => rows.push(wrapped));
  });

  const height = paddingY * 2 + rows.length * lineHeight;
  return {
    height,
    svg: (x, y) => renderUpperStatusPanel({
      x,
      y,
      width: INSET_WIDTH,
      height,
      rows,
      paddingY,
      fontSize,
      lineHeight
    })
  };
}

function renderUpperStatusPanel({ x, y, width, height, rows, paddingY, fontSize, lineHeight }) {
  const centerX = x + width / 2;
  const lines = rows.map((line, index) => `
    <tspan x="${centerX}" y="${y + paddingY + fontSize + index * lineHeight}">${escapeXml(line)}</tspan>`).join("");

  return renderPanel({
    x,
    y,
    width,
    height,
    body: `
    <text
      font-family="'Noto Serif KR', 'Malgun Gothic', serif"
      font-size="${fontSize}"
      font-weight="700"
      fill="${TEXT_DARK}"
      text-anchor="middle"
    >${lines}</text>`
  });
}

function getLowerStatusPanel(body, layout = DESKTOP_TURN_LAYOUT) {
  const text = normalizeStatusParam(body);
  if (!text) return { height: 0, svg: "" };

  const mobile = layout === MOBILE_TURN_LAYOUT;
  const paddingX = mobile ? 22 : 20;
  const paddingY = mobile ? 24 : 18;
  const fontSize = mobile ? 29 : 18;
  const lineHeight = mobile ? 46 : 30;
  const rowGap = mobile ? 12 : 9;
  const innerPadX = mobile ? 18 : 14;
  const innerPadY = mobile ? 14 : 10;
  const cellGap = mobile ? 10 : 8;
  const cellHeight = mobile ? 54 : 36;
  const rawLines = text.split(/\n+/).map((line) => line.trim()).filter(Boolean);
  const abilities = extractStatusAbilities(rawLines.join(" "));
  const hasAbilities = STATUS_ABILITY_ORDER.some((stat) => abilities[stat] !== undefined);
  const lines = rawLines.filter((line) => !hasAbilities || !isStatusAbilityLine(line));
  const title = lines.shift() || rawLines[0] || "";
  const tableWidth = INSET_WIDTH - paddingX * 2;
  const textMaxUnits = Math.max(8, Math.floor((tableWidth - innerPadX * 2) / (fontSize * 0.9)));
  const rows = [];

  if (title) {
    rows.push({
      type: "text",
      emphasis: true,
      lines: wrapTextByUnits(title, textMaxUnits)
    });
  }

  if (hasAbilities) {
    rows.push({ type: "abilities", abilities });
  }

  lines.forEach((line) => {
    rows.push({
      type: "text",
      emphasis: false,
      lines: wrapTextByUnits(line, textMaxUnits)
    });
  });

  const contentHeight = rows.reduce((sum, row, index) => {
    const rowHeight = row.type === "abilities"
      ? cellHeight
      : innerPadY * 2 + row.lines.length * lineHeight;
    return sum + rowHeight + (index < rows.length - 1 ? rowGap : 0);
  }, 0);
  const height = paddingY * 2 + contentHeight;

  return {
    height,
    svg: (x, y) => renderLowerStatusPanel({
      x,
      y,
      width: INSET_WIDTH,
      height,
      rows,
      paddingX,
      paddingY,
      fontSize,
      lineHeight,
      rowGap,
      innerPadX,
      innerPadY,
      cellGap,
      cellHeight
    })
  };
}

function extractStatusAbilities(value) {
  const abilities = {};
  const pattern = /(힘|민|지|의|운)\s*[:：]?\s*([+-]?\d+)/g;
  let match;
  while ((match = pattern.exec(String(value || ""))) !== null) {
    abilities[match[1]] = match[2];
  }
  return abilities;
}

function isStatusAbilityLine(line) {
  const abilities = extractStatusAbilities(line);
  return STATUS_ABILITY_ORDER.filter((stat) => abilities[stat] !== undefined).length >= 3
    || /^능력\s*[:：]/.test(String(line || "").trim());
}

function renderLowerStatusPanel({
  x,
  y,
  width,
  height,
  rows,
  paddingX,
  paddingY,
  fontSize,
  lineHeight,
  rowGap,
  innerPadX,
  innerPadY,
  cellGap,
  cellHeight
}) {
  let cursorY = y + paddingY;
  const tableX = x + paddingX;
  const tableWidth = width - paddingX * 2;
  const body = rows.map((row) => {
    if (row.type === "abilities") {
      const rendered = renderAbilityStatusRow({
        x: tableX,
        y: cursorY,
        width: tableWidth,
        height: cellHeight,
        gap: cellGap,
        fontSize,
        abilities: row.abilities
      });
      cursorY += cellHeight + rowGap;
      return rendered;
    }

    const rowHeight = innerPadY * 2 + row.lines.length * lineHeight;
    const rendered = renderStatusTableTextRow({
      x: tableX,
      y: cursorY,
      width: tableWidth,
      height: rowHeight,
      lines: row.lines,
      fontSize,
      lineHeight,
      padX: innerPadX,
      padY: innerPadY,
      emphasis: row.emphasis
    });
    cursorY += rowHeight + rowGap;
    return rendered;
  }).join("");

  return renderPanel({
    x,
    y,
    width,
    height,
    body
  });
}

function renderStatusTableTextRow({ x, y, width, height, lines, fontSize, lineHeight, padX, padY, emphasis }) {
  const tspans = lines.map((line, index) => `
      <tspan x="${x + padX}" y="${y + padY + fontSize + index * lineHeight}">${escapeXml(line)}</tspan>`).join("");
  return `
    <g>
      <rect
        x="${x}"
        y="${y}"
        width="${width}"
        height="${height}"
        rx="7"
        ry="7"
        fill="#14100b"
        stroke="${BORDER_GOLD}"
        stroke-width="1"
        opacity="${emphasis ? "0.98" : "0.84"}"
      />
      <text
        font-family="'Noto Serif KR', 'Malgun Gothic', serif"
        font-size="${fontSize}"
        font-weight="${emphasis ? "900" : "700"}"
        fill="${TEXT_DARK}"
      >${tspans}</text>
    </g>`;
}

function renderAbilityStatusRow({ x, y, width, height, gap, fontSize, abilities }) {
  const cellWidth = (width - gap * (STATUS_ABILITY_ORDER.length - 1)) / STATUS_ABILITY_ORDER.length;
  return `
    <g>
      ${STATUS_ABILITY_ORDER.map((stat, index) => {
        const cellX = x + index * (cellWidth + gap);
        const value = abilities[stat] ?? "-";
        const fill = STATUS_ABILITY_COLORS[stat] || BORDER_GOLD;
        return `
      <g>
        <rect
          x="${round2(cellX)}"
          y="${y}"
          width="${round2(cellWidth)}"
          height="${height}"
          rx="7"
          ry="7"
          fill="${fill}"
          stroke="${BORDER_GOLD}"
          stroke-width="1"
          opacity="0.92"
        />
        <text
          x="${round2(cellX + cellWidth / 2)}"
          y="${round2(y + height / 2 + fontSize * 0.36)}"
          text-anchor="middle"
          font-family="'Noto Serif KR', 'Malgun Gothic', serif"
          font-size="${fontSize}"
          font-weight="900"
          fill="#fff8de"
        >${escapeXml(`${stat} ${value}`)}</text>
      </g>`;
      }).join("")}
    </g>`;
}

function renderNarrativePanel({ x, y, width, height, rows, paddingX, paddingY, fontSize, lineHeight, paragraphGap, panelOptions = {} }) {
  let cursorY = y + paddingY + fontSize;
  const tspans = rows.map((row) => {
    if (row.gap) {
      cursorY += row.size || paragraphGap;
      return "";
    }
    const segments = row.segments || [{ text: row.text || "", tint: "" }];
    const output = segments.map((segment, index) => {
      const attrs = [
        index === 0 ? `x="${x + paddingX}" y="${cursorY}"` : "",
        segment.tint ? `fill="${escapeXml(segment.tint)}" text-decoration="underline"` : ""
      ].filter(Boolean).join(" ");
      return `<tspan ${attrs}>${escapeXml(segment.text)}</tspan>`;
    }).join("");
    cursorY += lineHeight;
    return output;
  }).join("");

  return renderPanel({
    x,
    y,
    width,
    height,
    body: `
    <text
      font-family="'Noto Serif KR', 'Malgun Gothic', serif"
      font-size="${fontSize}"
      font-weight="700"
      fill="${TEXT_DARK}"
    >${tspans}</text>`,
    ...panelOptions
  });
}

function isNarrativeDialogueParagraph(value) {
  const text = String(value || "").trim();
  if (!text) return false;
  if (parsePipeDialogueEntries(text).length) return true;
  if (/^\[[^[\]\n]{1,24}(?:\||\uFF5C)\s*[^\]]+\]$/u.test(text)) return true;
  if (/^[\p{L}\p{N}_][\p{L}\p{N}_ \t]{0,24}\s*(?:\||\uFF5C)\s*\S/u.test(text)) return true;
  return false;
}

function renderChips(chips, x, y, perRow, chipWidth = 82, gapX = 13, layout = DESKTOP_TURN_LAYOUT) {
  const chipHeight = layout.chipHeight;
  const gapY = layout.chipGapY;
  const fontSize = layout.chipFontSize;
  const textBaseline = layout.chipTextBaseline;
  const maxUnits = Math.max(6, Math.floor(chipWidth / (fontSize * 0.78)));

  return chips.map(([label, value], index) => {
    const col = index % perRow;
    const row = Math.floor(index / perRow);
    const cx = x + col * (chipWidth + gapX);
    const cy = y + row * (chipHeight + gapY);
    const display = `${label}:${value}`;

    return `
    <g>
      <rect
        x="${cx}"
        y="${cy}"
        width="${chipWidth}"
        height="${chipHeight}"
        rx="6"
        fill="#15120e"
        stroke="${BORDER_GOLD}"
      />
      <text
        x="${cx + chipWidth / 2}"
        y="${cy + textBaseline}"
        text-anchor="middle"
        font-family="'Noto Serif KR', 'Malgun Gothic', serif"
        font-size="${fontSize}"
        font-weight="800"
        fill="${TEXT_DARK}"
      >${escapeXml(fitText(display, maxUnits))}</text>
    </g>`;
  }).join("");
}

function renderInlineLabel(label, x, y) {
  return `
  <g opacity="0.92">
    <rect x="${x}" y="${y - 18}" width="${Math.max(86, label.length * 15)}" height="26" rx="6" fill="#211a12" stroke="${BORDER_GOLD}" />
    <text
      x="${x + 12}"
      y="${y}"
      font-family="'Noto Serif KR', 'Malgun Gothic', serif"
      font-size="14"
      font-weight="900"
      fill="${TEXT_DARK}"
    >${escapeXml(label)}</text>
  </g>`;
}

function renderInsetFrame(x, y, width, height, options = {}) {
  const topRadius = options.topRadius ?? 8;
  const bottomRadius = options.bottomRadius ?? 8;
  const d = roundedRectPath(x, y, width, height, {
    tl: topRadius,
    tr: topRadius,
    br: bottomRadius,
    bl: bottomRadius
  });
  return `
  <path
    d="${d}"
    fill="#11100d"
    stroke="${BORDER_GOLD}"
    stroke-width="1.5"
  />`;
}

function renderClippedContent(id, x, y, width, height, body, options = {}) {
  const topRadius = options.topRadius ?? 8;
  const bottomRadius = options.bottomRadius ?? 8;
  const d = roundedRectPath(x, y, width, height, {
    tl: topRadius,
    tr: topRadius,
    br: bottomRadius,
    bl: bottomRadius
  });
  return `
  <defs>
    <clipPath id="${id}">
      <path d="${d}" />
    </clipPath>
  </defs>
  <g clip-path="url(#${id})">
    ${body}
  </g>`;
}

function renderShell({ title, desc, height, body, environment = "전장" }) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="100%"
  height="100%"
  viewBox="0 0 ${PANEL_WIDTH} ${height}"
  preserveAspectRatio="xMidYMid meet"
  style="display:block;width:100%;height:auto;max-width:100%;"
  role="img"
  aria-label="${escapeXml(title)}"
>
  <title>${escapeXml(title)}</title>
  <desc>${escapeXml(desc)}</desc>
  <defs>
    <filter id="panelShadow" x="-10%" y="-20%" width="120%" height="150%">
      <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#c7b684" flood-opacity="0.22" />
    </filter>
  </defs>
  <rect width="${PANEL_WIDTH}" height="${height}" fill="${BG_PAGE}" />
  ${renderWorkerBackground(environment, PANEL_WIDTH, height)}
  ${body}
  ${renderOuterBorder(height)}
  ${renderCornerFrame(height)}
</svg>`;
}

function renderOuterBorder(height) {
  const inset = OUTER_BORDER_INSET;
  return `
  <rect
    x="${inset}"
    y="${inset}"
    width="${PANEL_WIDTH - inset * 2}"
    height="${Math.max(0, height - inset * 2)}"
    rx="12"
    fill="none"
    stroke="${BORDER_GOLD}"
    stroke-width="1.4"
    pointer-events="none"
  />`;
}

function renderCornerFrame(height) {
  const href = `${actionAssetUrl(["visual", WORKER_FRAME_FOLDER, WORKER_FRAME_CORNER_FILE])}?v=${WORKER_FRAME_VERSION}`;
  const w = WORKER_FRAME_CORNER_WIDTH;
  const h = WORKER_FRAME_CORNER_HEIGHT;
  const image = `<image href="${escapeXml(href)}" x="0" y="0" width="${w}" height="${h}" preserveAspectRatio="xMinYMin meet"/>`;

  return `
  <g pointer-events="none" opacity="0.96">
    ${image}
    <g transform="translate(${PANEL_WIDTH} 0) scale(-1 1)">${image}</g>
    <g transform="translate(0 ${round2(height)}) scale(1 -1)">${image}</g>
    <g transform="translate(${PANEL_WIDTH} ${round2(height)}) scale(-1 -1)">${image}</g>
  </g>`;
}

function renderWorkerBackground(environment, width, height) {
  const href = makeWorkerBackgroundUrl(environment);
  const vertical = randomItem(["Min", "Mid", "Max"]);
  const tint = WORKER_ENV_TINTS[normalizeBackgroundEnvironment(environment)] || WORKER_ENV_TINTS["전장"];

  return `
  <image
    href="${escapeXml(href)}"
    x="0"
    y="0"
    width="${width}"
    height="${height}"
    preserveAspectRatio="xMidY${vertical} slice"
  />
  <rect
    width="${width}"
    height="${height}"
    fill="${tint}"
    opacity="${WORKER_BACKGROUND_TINT_OPACITY}"
    style="mix-blend-mode:multiply"
  />
  <rect width="${width}" height="${height}" fill="#070604" opacity="${WORKER_BACKGROUND_OVERLAY}" />`;
}

function makeWorkerBackgroundUrl(environment) {
  const envName = normalizeBackgroundEnvironment(environment);
  const index = 1 + Math.floor(Math.random() * WORKER_BACKGROUND_COUNT);
  const fileName = `${envName}${index}.jpg`;

  return `${ASSET_BASE_URL}/visual/${encodeURIComponent(WORKER_BACKGROUND_FOLDER)}/${encodeURIComponent(envName)}/${encodeURIComponent(fileName)}?v=${WORKER_BACKGROUND_VERSION}`;
}

function normalizeBackgroundEnvironment(environment) {
  const key = normalizeEnvironmentKey(environment);
  return WORKER_BACKGROUND_ENVS.find((name) => normalizeKey(name) === key) || "전장";
}

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

async function renderTraceActionBackdrop(turn, x, y, width, height) {
  const environment = normalizeActionEnvironment(turn.environment);
  const hasJudgement = hasTraceJudgement(turn);
  const result = hasJudgement ? turn.result || "" : "";
  const success = hasJudgement ? isActionSuccess(result) : true;
  const expression = pickActionExpression({ action: turn.action, result });
  const side = actionRandomPick(["left", "right"]);
  const backgroundUrl = await pickActionBackgroundUrl(environment);
  const [smallCharacterUrl, largeCharacterUrl] = await pickActionDuranUrls(expression);
  const judgementUrl = hasJudgement ? pickActionJudgementUrl(result) : "";
  const smallMotion = makeActionSmallMotion(side);
  const largeMotion = makeActionLargeMotion(oppositeActionSide(side));
  const smallFacingTransform = makeActionFacingTransform(ACTION_SMALL_WIDTH, smallMotion.fromLeft);
  const largeFacingTransform = makeActionFacingTransform(ACTION_LARGE_WIDTH, largeMotion.fromLeft);
  const tint = ACTION_ENV_TINTS[environment] || ACTION_ENV_TINTS[AE.battle];
  const palette = getActionEffectPalette(environment, success);
  const stripViewHeight = Math.min(ACTION_HEIGHT, (ACTION_WIDTH * height) / Math.max(1, width));
  const resultCenterY = height < 340 ? round2(stripViewHeight / 2) : ACTION_RESULT_CENTER_Y;

  return `
  <svg
    x="${x}"
    y="${y}"
    width="${width}"
    height="${height}"
    viewBox="0 0 ${ACTION_WIDTH} ${ACTION_HEIGHT}"
    preserveAspectRatio="xMidYMin slice"
  >
    <defs>
      <clipPath id="traceActionClip"><rect x="0" y="0" width="${ACTION_WIDTH}" height="${ACTION_HEIGHT}"/></clipPath>
      <filter id="traceActionMotionBlurSmall" x="-55%" y="-18%" width="210%" height="140%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="14 0"/>
      </filter>
      <filter id="traceActionMotionBlurLarge" x="-55%" y="-8%" width="210%" height="118%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="18 0"/>
      </filter>
      <filter id="traceActionResultShadow" x="-18%" y="-28%" width="136%" height="156%">
        <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.72"/>
        <feDropShadow dx="0" dy="0" stdDeviation="2.4" flood-color="#ffffff" flood-opacity="0.28"/>
      </filter>
      <filter id="traceActionParticleGlow" x="-80%" y="-80%" width="260%" height="260%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="1.8" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <linearGradient id="traceActionShade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#ffffff" stop-opacity="0.08"/>
        <stop offset="0.55" stop-color="#000000" stop-opacity="0"/>
        <stop offset="1" stop-color="#000000" stop-opacity="0.24"/>
      </linearGradient>
      <radialGradient id="traceActionFocus" cx="50%" cy="55%" r="68%">
        <stop offset="0" stop-color="#ffffff" stop-opacity="0.16"/>
        <stop offset="0.62" stop-color="#000000" stop-opacity="0"/>
        <stop offset="1" stop-color="#000000" stop-opacity="0.44"/>
      </radialGradient>
      <radialGradient id="traceActionFailureVignette" cx="50%" cy="54%" r="68%">
        <stop offset="0" stop-color="#000000" stop-opacity="0"/>
        <stop offset="0.56" stop-color="#21070b" stop-opacity="0.18"/>
        <stop offset="1" stop-color="#020103" stop-opacity="0.72"/>
      </radialGradient>
    </defs>
    <g clip-path="url(#traceActionClip)">
      <g>
        ${hasJudgement ? renderActionScreenShake(success) : ""}
        <image href="${escapeXml(backgroundUrl)}" x="0" y="0" width="${ACTION_WIDTH}" height="${ACTION_HEIGHT}" preserveAspectRatio="xMidYMin slice"/>
        <rect x="0" y="0" width="${ACTION_WIDTH}" height="${ACTION_HEIGHT}" fill="${tint}" opacity="0.22" style="mix-blend-mode:multiply"/>
        <rect x="0" y="0" width="${ACTION_WIDTH}" height="${ACTION_HEIGHT}" fill="url(#traceActionShade)"/>
        ${hasJudgement ? renderActionFailurePulse(success) : ""}
        <g transform="translate(${largeMotion.startX} ${ACTION_LARGE_Y})">
          <animateTransform attributeName="transform" type="translate" dur="${ACTION_SECONDS}s" values="${largeMotion.values}" keyTimes="0;${ACTION_LARGE_DELAY_KEY};${ACTION_LARGE_ENTER_KEY};${ACTION_CHARACTER_EXIT_KEY};${ACTION_CHARACTER_END_KEY};1" calcMode="spline" keySplines="0 0 1 1;.1 .72 .16 1;0 0 1 1;.7 0 .9 .18;0 0 1 1" repeatCount="indefinite" fill="remove"/>
          <g transform="${largeFacingTransform}">
            <image href="${escapeXml(largeCharacterUrl)}" x="0" y="0" width="${ACTION_LARGE_WIDTH}" height="${ACTION_LARGE_HEIGHT}" preserveAspectRatio="xMidYMin meet"/>
            <image href="${escapeXml(largeCharacterUrl)}" x="0" y="0" width="${ACTION_LARGE_WIDTH}" height="${ACTION_LARGE_HEIGHT}" preserveAspectRatio="xMidYMin meet" filter="url(#traceActionMotionBlurLarge)" opacity="0.82">
              <animate attributeName="opacity" dur="${ACTION_SECONDS}s" values="0;0;0.82;0;0" keyTimes="0;${ACTION_LARGE_DELAY_KEY};${ACTION_LARGE_BLUR_PEAK_KEY};${ACTION_LARGE_ENTER_KEY};1" repeatCount="indefinite" fill="remove"/>
            </image>
          </g>
        </g>
        <rect x="0" y="0" width="${ACTION_WIDTH}" height="${ACTION_HEIGHT}" fill="url(#traceActionFocus)"/>
        ${hasJudgement ? renderActionFailureVignette(success) : ""}
        ${hasJudgement ? `<g transform="translate(${ACTION_RESULT_CENTER_X} ${resultCenterY})" opacity="0">
          <animate attributeName="opacity" dur="${ACTION_SECONDS}s" values="0;0.95;0.95;0.95;0" keyTimes="0;${ACTION_RESULT_ENTER_KEY};${ACTION_RESULT_EXIT_KEY};${ACTION_RESULT_BURST_KEY};1" calcMode="spline" keySplines=".12 .72 .18 1;0 0 1 1;0 0 1 1;.18 0 1 .16" repeatCount="indefinite" fill="remove"/>
          <g transform="scale(0)">
            <animateTransform attributeName="transform" type="scale" dur="${ACTION_SECONDS}s" values="0;1;1.08;1.08;2.35" keyTimes="0;${ACTION_RESULT_ENTER_KEY};${ACTION_RESULT_EXIT_KEY};${ACTION_RESULT_BURST_KEY};1" calcMode="spline" keySplines=".12 .72 .18 1;0 0 1 1;0 0 1 1;.18 0 1 .16" repeatCount="indefinite" fill="remove"/>
            <image href="${escapeXml(judgementUrl)}" x="${-ACTION_RESULT_WIDTH / 2}" y="${-ACTION_RESULT_HEIGHT / 2}" width="${ACTION_RESULT_WIDTH}" height="${ACTION_RESULT_HEIGHT}" preserveAspectRatio="xMidYMid meet" filter="url(#traceActionResultShadow)"/>
          </g>
        </g>` : ""}
        <g transform="translate(${smallMotion.startX} ${ACTION_SMALL_Y})" opacity="0">
          <animateTransform attributeName="transform" type="translate" dur="${ACTION_SECONDS}s" values="${smallMotion.values}" keyTimes="0;${ACTION_SMALL_DELAY_KEY};${ACTION_SMALL_ENTER_KEY};${ACTION_CHARACTER_EXIT_KEY};${ACTION_CHARACTER_END_KEY};1" calcMode="spline" keySplines="0 0 1 1;.12 .72 .18 1;0 0 1 1;.72 0 .9 .22;0 0 1 1" repeatCount="indefinite" fill="remove"/>
          <animate attributeName="opacity" dur="${ACTION_SECONDS}s" values="0;0;1;1;0;0" keyTimes="0;${ACTION_SMALL_DELAY_KEY};${ACTION_SMALL_ENTER_KEY};${ACTION_CHARACTER_EXIT_KEY};${ACTION_CHARACTER_END_KEY};1" calcMode="spline" keySplines="0 0 1 1;.12 .72 .18 1;0 0 1 1;.18 0 1 .16;0 0 1 1" repeatCount="indefinite" fill="remove"/>
          <g transform="${smallFacingTransform}">
            <image href="${escapeXml(smallCharacterUrl)}" x="0" y="0" width="${ACTION_SMALL_WIDTH}" height="${ACTION_SMALL_HEIGHT}" preserveAspectRatio="xMidYMin meet" opacity="0.98"/>
            <image href="${escapeXml(smallCharacterUrl)}" x="0" y="0" width="${ACTION_SMALL_WIDTH}" height="${ACTION_SMALL_HEIGHT}" preserveAspectRatio="xMidYMin meet" filter="url(#traceActionMotionBlurSmall)" opacity="0.86">
              <animate attributeName="opacity" dur="${ACTION_SECONDS}s" values="0;0;0.86;0;0" keyTimes="0;${ACTION_SMALL_DELAY_KEY};${ACTION_SMALL_BLUR_PEAK_KEY};${ACTION_SMALL_ENTER_KEY};1" repeatCount="indefinite" fill="remove"/>
            </image>
          </g>
        </g>
        ${renderActionEnvironmentParticles(environment, palette)}
      </g>
    </g>
  </svg>`;
}

async function renderVeilActionBackdrop(turn, x, y, width, height) {
  const environment = normalizeActionEnvironment(turn.environment);
  const backgroundUrl = await pickActionBackgroundUrl(environment);
  const dialogueTurns = buildDialogueSequence(turn);
  const dialogueAssets = await Promise.all(dialogueTurns.map((dialogueTurn) => pickDialogueSceneAsset({
    ...turn,
    speaker: dialogueTurn.speaker,
    dialogue: dialogueTurn.dialogue
  })));
  const backdropUrls = await Promise.all(dialogueTurns.map((dialogueTurn) => pickVeilDialogueBackdropUrl({
    ...turn,
    speaker: dialogueTurn.speaker,
    dialogue: dialogueTurn.dialogue
  })));
  const loopSeconds = ACTION_SECONDS * Math.max(1, dialogueTurns.length);
  const tint = ACTION_ENV_TINTS[environment] || ACTION_ENV_TINTS[AE.battle];

  return `
  <svg
    x="${x}"
    y="${y}"
    width="${width}"
    height="${height}"
    viewBox="0 0 ${ACTION_WIDTH} ${ACTION_HEIGHT}"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <clipPath id="veilActionClip"><rect x="0" y="0" width="${ACTION_WIDTH}" height="${ACTION_HEIGHT}"/></clipPath>
      <linearGradient id="veilActionShade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#ffffff" stop-opacity="0.08"/>
        <stop offset="0.58" stop-color="#000000" stop-opacity="0.02"/>
        <stop offset="1" stop-color="#000000" stop-opacity="0.34"/>
      </linearGradient>
      <radialGradient id="veilDialogueGlow" cx="50%" cy="62%" r="58%">
        <stop offset="0" stop-color="#ffffff" stop-opacity="0.22"/>
        <stop offset="1" stop-color="#000000" stop-opacity="0"/>
      </radialGradient>
      <filter id="veilDialogueShadow" x="-12%" y="-25%" width="124%" height="150%">
        <feDropShadow dx="0" dy="5" stdDeviation="5" flood-color="#000000" flood-opacity="0.34"/>
      </filter>
    </defs>
    <g clip-path="url(#veilActionClip)">
      <image href="${escapeXml(backgroundUrl)}" x="0" y="0" width="${ACTION_WIDTH}" height="${ACTION_HEIGHT}" preserveAspectRatio="xMidYMid slice"/>
      <rect x="0" y="0" width="${ACTION_WIDTH}" height="${ACTION_HEIGHT}" fill="${tint}" opacity="0.26" style="mix-blend-mode:multiply"/>
      <rect x="0" y="0" width="${ACTION_WIDTH}" height="${ACTION_HEIGHT}" fill="url(#veilActionShade)"/>
      <rect x="0" y="0" width="${ACTION_WIDTH}" height="${ACTION_HEIGHT}" fill="url(#veilDialogueGlow)"/>
      ${dialogueTurns.map((dialogueTurn, index) => renderVeilDialogueTurn({
        dialogueTurn,
        scene: dialogueAssets[index],
        backdropUrl: backdropUrls[index],
        index,
        count: dialogueTurns.length,
        loopSeconds
      })).join("")}
    </g>
  </svg>`;
}

function renderVeilDialogueTurn({ dialogueTurn, scene, backdropUrl, index, count, loopSeconds }) {
  const speakerSide = dialogueTurn.side || (index % 2 === 0 ? "left" : "right");
  const backdropSide = speakerSide === "left" ? "right" : "left";
  const petSpeaker = isPetDialogueSpeaker(scene.speaker);
  const speakerMotion = makeDialogueMotion(scene.speaker, speakerSide);
  const backdropMotion = makeDialogueBackdropMotion(backdropSide);
  const speakerFacingTransform = makeActionFacingTransform(speakerMotion.width, speakerSide === "left");
  const backdropFacingTransform = makeActionFacingTransform(ACTION_LARGE_WIDTH, backdropSide === "left");
  const segment = { index, count, duration: loopSeconds };

  return `
      ${petSpeaker ? "" : `<g transform="translate(${backdropMotion.startX} ${ACTION_LARGE_Y})" opacity="0">
        ${renderSegmentAnimateTransform({
          ...segment,
          values: backdropMotion.values,
          localKeyTimes: [0, 0.07, 0.13, 0.84, 0.94, 1],
          localSplines: ["0 0 1 1", ".12 .72 .18 1", "0 0 1 1", ".72 0 .9 .22", "0 0 1 1"]
        })}
        ${renderSegmentAnimate({
          ...segment,
          attributeName: "opacity",
          values: ["0", "0", "0.46", "0.46", "0", "0"],
          localKeyTimes: [0, 0.07, 0.13, 0.84, 0.94, 1]
        })}
        <g transform="${backdropFacingTransform}">
          <image
            href="${escapeXml(backdropUrl)}"
            x="0"
            y="0"
            width="${ACTION_LARGE_WIDTH}"
            height="${ACTION_LARGE_HEIGHT}"
            preserveAspectRatio="xMidYMin meet"
          />
        </g>
      </g>`}
      <g transform="translate(${speakerMotion.startX} ${speakerMotion.y})" opacity="0">
        ${renderSegmentAnimateTransform({
          ...segment,
          values: speakerMotion.values,
          localKeyTimes: [0, 0.05, 0.12, 0.84, 0.94, 1],
          localSplines: ["0 0 1 1", ".12 .72 .18 1", "0 0 1 1", ".72 0 .9 .22", "0 0 1 1"]
        })}
        ${renderSegmentAnimate({
          ...segment,
          attributeName: "opacity",
          values: ["0", "0", "1", "1", "0", "0"],
          localKeyTimes: [0, 0.05, 0.12, 0.84, 0.94, 1]
        })}
        <g transform="${speakerFacingTransform}">
          <image
            href="${escapeXml(scene.url)}"
            x="0"
            y="0"
            width="${speakerMotion.width}"
            height="${speakerMotion.height}"
            preserveAspectRatio="xMidYMax meet"
          />
        </g>
      </g>
      ${renderVeilDialogueBubble(dialogueTurn.dialogue, scene.speaker, segment)}`;
}

function renderVeilDialogueBubble(dialogue, speaker, segment = { index: 0, count: 1, duration: ACTION_SECONDS }) {
  const boxWidth = Math.round(ACTION_WIDTH * 0.95);
  const textPaddingX = 34;
  const maxUnits = Math.floor((boxWidth - textPaddingX * 2) / (24 * 0.92));
  const lines = wrapDialogueLines(dialogue || "...", maxUnits, 4);
  const lineHeight = 33;
  const boxHeight = clamp(58 + lines.length * lineHeight, 96, 190);
  const boxX = round2((ACTION_WIDTH - boxWidth) / 2);
  const boxY = round2(ACTION_HEIGHT - boxHeight - 34);
  const textX = round2(boxX + textPaddingX);
  const textBlockHeight = (lines.length - 1) * lineHeight;
  const firstLineY = round2(boxY + boxHeight / 2 - textBlockHeight / 2 + 9);
  const label = getDialogueSpeakerLabel(speaker);
  const labelWidth = clamp(Math.round(countUnits(label) * 18 + 62), 96, 154);
  const labelX = round2(boxX + 26);
  const labelY = round2(boxY - 18);

  return `
  <g filter="url(#veilDialogueShadow)" opacity="0" transform="translate(0 14)">
    ${renderSegmentAnimate({
      ...segment,
      attributeName: "opacity",
      values: ["0", "0", "1", "1", "0", "0"],
      localKeyTimes: [0, 0.18, 0.23, 0.78, 0.9, 1]
    })}
    ${renderSegmentAnimateTransform({
      ...segment,
      values: ["0 14", "0 14", "0 0", "0 0", "0 -48", "0 -48"],
      localKeyTimes: [0, 0.18, 0.23, 0.78, 0.9, 1],
      localSplines: ["0 0 1 1", ".16 .72 .2 1", "0 0 1 1", ".2 0 1 .18", "0 0 1 1"]
    })}
    <rect x="${boxX}" y="${boxY}" width="${boxWidth}" height="${boxHeight}" rx="18" fill="#ffffff" opacity="0.94" stroke="#d7e6ea" stroke-width="3"/>
    <rect x="${labelX}" y="${labelY}" width="${labelWidth}" height="34" rx="13" fill="#13cfd2" stroke="#109ba4" stroke-width="2"/>
    <text x="${labelX + 18}" y="${labelY + 24}" text-anchor="start" font-family="Arial, 'Malgun Gothic', sans-serif" font-size="20" font-weight="900" fill="#05252b">${escapeXml(label)}</text>
    <text text-anchor="start" font-family="'Noto Serif KR', 'Malgun Gothic', serif" font-size="24" font-weight="900" fill="#17252b">
      ${lines.map((line, index) => `<tspan x="${textX}" y="${firstLineY + index * lineHeight}">${escapeXml(line)}</tspan>`).join("")}
    </text>
  </g>`;
}

function wrapDialogueLines(value, maxUnits, maxLines) {
  const text = safeText(value, "...", 180);
  const lines = [];
  let current = "";

  for (const char of [...text]) {
    const next = `${current}${char}`;
    if (current && countUnits(next) > maxUnits) {
      lines.push(current.trim());
      current = char;
      if (lines.length >= maxLines) break;
      continue;
    }
    current = next;
  }

  if (current && lines.length < maxLines) lines.push(current.trim());
  if (lines.length > maxLines) lines.length = maxLines;
  if (lines.length === maxLines && countUnits(lines[maxLines - 1]) >= maxUnits - 1) {
    lines[maxLines - 1] = `${lines[maxLines - 1].slice(0, Math.max(0, lines[maxLines - 1].length - 1))}...`;
  }
  return lines.length ? lines : ["..."];
}

function buildDialogueSequence(turn) {
  const parsed = parseDialogueEntries(turn.dialogue, turn.speaker);
  const parsedSceneEntries = parsed.filter((entry) => isSceneDialogueSpeaker(entry.speaker));
  const baseSequence = parsed.length ? parsedSceneEntries : (isNonSceneDialogueText(turn.dialogue) ? [] : [{
    speaker: normalizeDialogueSpeaker(turn.speaker),
    dialogue: safeText(turn.dialogue, "...", 180)
  }].filter((entry) => isSceneDialogueSpeaker(entry.speaker)));
  const sequence = baseSequence.map((entry, index) => ({
    speaker: normalizeDialogueSpeaker(entry.speaker),
    dialogue: safeText(entry.dialogue, "...", 180),
    side: entry.side || (index % 2 === 0 ? "left" : "right")
  }));

  if (!sequence.length) {
    sequence.push({
      speaker: "duran",
      dialogue: "...",
      side: "left"
    }, {
      speaker: "bobo",
      dialogue: "...",
      side: "right"
    });
  } else if (sequence.length === 1 && sequence[0].speaker === "duran") {
    sequence.push({
      speaker: "bobo",
      dialogue: "...",
      side: "right"
    });
  } else if (sequence.length === 1 && sequence[0].speaker === "bobo") {
    sequence.unshift({
      speaker: "duran",
      dialogue: "...",
      side: "left"
    });
  }

  return sequence.slice(0, 6);
}

function isNonSceneDialogueText(value) {
  const text = String(value || "").trim();
  if (!text) return false;
  return /^(?:\[?\s*)?(?:장막|노르가드|병사|약탈병|수색병|위병|하로몬트|NPC|적군|순찰병)\s*(?:[|｜:：\]]|$)/.test(text);
}

function parseDialogueEntries(dialogue, speaker) {
  const raw = String(dialogue || "").trim();
  if (!raw) return [];

  const entries = [];
  const bracketPattern = /\[([^[\]|｜\]]{1,24})[|｜]\s*([^\]]+)\]/g;
  let bracketMatch;
  while ((bracketMatch = bracketPattern.exec(raw)) !== null) {
    entries.push({
      speaker: bracketMatch[1],
      dialogue: bracketMatch[2]
    });
  }
  if (entries.length) return entries;

  const pipeEntries = parsePipeDialogueEntries(raw);
  if (pipeEntries.length) return pipeEntries;

  const labelPattern = /(?:^|[|｜/]\s*)([^:：|｜/]{1,24})[:：]\s*([^|｜/]+)/g;
  let match;
  while ((match = labelPattern.exec(raw)) !== null) {
    entries.push({
      speaker: match[1],
      dialogue: match[2]
    });
  }
  if (entries.length) return entries;

  const parts = raw
    .split(/\s*(?:\|\||｜｜|／)\s*/)
    .map((part) => part.trim())
    .filter(Boolean);
  if (parts.length <= 1) return [];

  const speakers = String(speaker || "")
    .split(/\s*(?:\|\||｜｜|／|,)\s*/)
    .map((part) => part.trim())
    .filter(Boolean);

  return parts.map((part, index) => ({
    speaker: speakers[index] || (index % 2 === 0 ? speaker : "\uBCF4\uBCF4"),
    dialogue: part
  }));
}

function parsePipeDialogueEntries(value) {
  const raw = String(value || "").trim();
  if (!raw) return [];

  const chunks = raw
    .split(/\s*(?:\|\||｜｜|／)\s*/)
    .map((part) => part.trim())
    .filter(Boolean);
  const source = chunks.length ? chunks : [raw];
  const entries = [];

  for (const chunk of source) {
    const match = chunk.match(/^([^|｜\n]{1,24})\s*[|｜]\s*(.{2,})$/);
    if (!match) return [];
    entries.push({
      speaker: match[1],
      dialogue: match[2]
    });
  }

  return entries;
}

function normalizeDialogueParam(value) {
  const text = decodeUrlTextTokens(safeText(value, "...", 900))
    .replace(/\n+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text || "...";
}

function normalizeBodyParam(value) {
  return separateInlineDialogueMarkers(sanitizeNarrativeMarkup(stripBodyTransportMarkers(decodeUrlTextTokens(safeText(value, "", 6000)))))
    .replace(/[ \t]+/g, " ")
    .replace(/\n[ \t]+/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function splitBodyAndDialogue(value, defaultSpeaker = "듀란") {
  const body = normalizeBodyParam(value);
  if (!body) return { body: "", dialogues: [] };

  const paragraphs = splitNarrativeParagraphs(body);
  const narrative = [];
  const dialogues = [];

  paragraphs.forEach((paragraph) => {
    const paragraphDialogues = parseStandaloneDialogueParagraph(paragraph, defaultSpeaker);
    if (paragraphDialogues.length) {
      const sceneDialogues = paragraphDialogues.filter((entry) => isSceneDialogueSpeaker(entry.speaker));
      if (sceneDialogues.length === paragraphDialogues.length) {
        dialogues.push(...sceneDialogues);
        return;
      }
    }
    narrative.push(paragraph);
  });

  return {
    body: narrative.join("\n\n"),
    dialogues
  };
}

function formatNarrativeSentenceBreaks(value) {
  return String(value || "")
    .split(/\n{2,}/)
    .map((paragraph) => {
      const trimmed = paragraph.trim();
      if (isNarrativeDialogueParagraph(trimmed)) return trimmed;
      return insertNarrativeSentenceBreaks(trimmed);
    })
    .filter(Boolean)
    .join("\n\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function insertNarrativeSentenceBreaks(paragraph) {
  const source = String(paragraph || "");
  let output = "";
  let quote = "";

  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    const next = source[index + 1] || "";
    output += char;

    if (char === "\"" || char === "“" || char === "”") {
      if (!quote && (char === "\"" || char === "“")) quote = char === "“" ? "”" : "\"";
      else if (quote && (char === quote || char === "\"")) quote = "";
      continue;
    }

    if (quote) continue;
    if (char !== "." || /\d/.test(source[index - 1] || "")) continue;
    if (!/[ \t]/.test(next)) continue;

    while (/[ \t]/.test(source[index + 1] || "")) index += 1;
    output += "\n\n";
  }

  return output;
}

function getDialogueSpeakerKoreanName(speaker) {
  const normalized = normalizeDialogueSpeaker(speaker);
  if (normalized === "bobo") return "보보";
  if (normalized === "maren") return "마렌";
  if (normalized === "elina") return "엘리나";
  if (normalized === "ellarin") return "엘라린";
  if (normalized === "duran") return "듀란";
  return "";
}

function splitNarrativeParagraphs(value) {
  const body = separateInlineDialogueMarkers(String(value || ""));
  const output = [];
  body.split(/\n{2,}/).forEach((paragraph) => {
    const trimmed = paragraph.trim();
    if (!trimmed) return;
    const pipeEntries = parsePipeDialogueEntries(trimmed);
    if (pipeEntries.length) {
      output.push(trimmed);
      return;
    }
    let cursor = 0;
    const pattern = /(^|[.!?。！？…]|[”"'])\s*([^|｜\n]{1,24})\s*[|｜]\s*(.{2,}?)(?=(?:\s{2,}|\n|$))/g;
    let match;
    while ((match = pattern.exec(trimmed)) !== null) {
      const dialogueStart = match.index + match[1].length;
      const before = trimmed.slice(cursor, dialogueStart).trim();
      if (before) output.push(before);
      output.push(trimmed.slice(dialogueStart, pattern.lastIndex).trim());
      cursor = pattern.lastIndex;
    }
    const rest = trimmed.slice(cursor).trim();
    if (rest) output.push(rest);
  });
  return output;
}

function separateInlineDialogueMarkers(value) {
  const source = String(value || "");
  const speakerName = String.raw`[\p{L}\p{N}_]{1,18}(?:[ \t][\p{L}\p{N}_]{1,12}){0,2}`;

  const quotedSeparated = source.replace(
    new RegExp(`(^|[\\s.!?。！？…])(${speakerName})\\s*[|｜]\\s*(["“])([^"”\\n]{1,220})(["”])`, "gu"),
    (_match, prefix, speaker, openQuote, dialogue, closeQuote) =>
      `${prefix}\n\n${speaker.trim()} | ${openQuote}${dialogue.trim()}${closeQuote}\n\n`
  );

  return quotedSeparated.replace(
    new RegExp(`(^|[\\s.!?。！？…])(${speakerName})\\s*[|｜]\\s*((?:(?!["“]?[\\s.!?。！？…]${speakerName}\\s*[|｜]).){2,220}?)(?=(?:\\s+[^\\s|｜]{1,24}\\s*[|｜])|$)`, "gu"),
    (_match, prefix, speaker, dialogue) => `${prefix}\n\n${speaker.trim()} | ${dialogue.trim()}\n\n`
  );
}

function parseStandaloneDialogueParagraph(paragraph, defaultSpeaker = "듀란") {
  const text = String(paragraph || "").trim();
  if (!text) return [];

  const bracketEntries = [];
  const bracketPattern = /\[([^[\]|｜\]]{1,24})[|｜]\s*([^\]]+)\]/g;
  const rest = text.replace(bracketPattern, (_match, speaker, dialogue) => {
    bracketEntries.push({ speaker, dialogue });
    return "";
  }).trim();
  if (bracketEntries.length && !rest) return bracketEntries;

  const pipeEntries = parsePipeDialogueEntries(text);
  if (pipeEntries.length) return pipeEntries;

  return [];
}

function formatDialogueEntries(entries) {
  return (entries || [])
    .map((entry) => `${safeText(entry.speaker, "듀란", 24)} | ${safeText(entry.dialogue, "...", 180)}`)
    .join("||");
}

function stripBodyTransportMarkers(value) {
  return String(value || "")
    .split(/\n/)
    .filter((line) => !/^\s*(?:BODY_START|BODY_END|본문시작|본문끝)\s*$/i.test(line))
    .join("\n")
    .replace(/\bBODY_START\b/gi, "")
    .replace(/\bBODY_END\b/gi, "")
    .replace(/본문시작|본문끝/g, "");
}

function sanitizeNarrativeMarkup(value) {
  let text = decodeBasicHtmlEntities(String(value || ""));
  text = text.replace(/\{\{\s*\/?\s*HTMLTAG\d+\s*\}\}/gi, "");
  text = text.replace(
    /\[\[\s*(?:색틈|TINT)\s*:\s*([^\]:]+)\s*:\s*([\s\S]*?)\]\]/gi,
    (_match, colorOrStat, inner) => `[[TINT:${normalizeTintColor(colorOrStat)}:${stripAllMarkup(inner)}]]`
  );
  text = text.replace(
    /<span\b(?=[^>]*border-bottom\s*:\s*2px\s+solid\s*#[0-9a-f]{3,8})[^>]*style=(["'])(?:(?!\1).)*border-bottom\s*:\s*2px\s+solid\s*(#[0-9a-f]{3,8})(?:(?!\1).)*\1[^>]*>([\s\S]*?)<\/span>/gi,
    (_match, _quote, color, inner) => `[[TINT:${normalizeTintColor(color)}:${stripAllMarkup(inner)}]]`
  );
  text = text
    .replace(/<\/?span\b[^>]*>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/[*_]{1,3}([^*_]+)[*_]{1,3}/g, "$1")
    .replace(/[*_]{1,3}/g, "");
  return decodeBasicHtmlEntities(text);
}

function stripAllMarkup(value) {
  return decodeBasicHtmlEntities(String(value || ""))
    .replace(/<\/?span\b[^>]*>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/[*_]{1,3}([^*_]+)[*_]{1,3}/g, "$1")
    .replace(/[*_]{1,3}/g, "");
}

function normalizeTintColor(value) {
  const text = String(value || "").trim();
  const normalized = text.replace(/\s+/g, "");
  const byStat = {
    "힘": "#8F4A45",
    "민": "#4F8F68",
    "민첩": "#4F8F68",
    "지": "#4E7694",
    "지력": "#4E7694",
    "의": "#7D6394",
    "의지": "#7D6394",
    "운": "#927D45"
  };
  if (byStat[normalized]) return byStat[normalized];
  if (/^#[0-9a-f]{3}$/i.test(text) || /^#[0-9a-f]{6}$/i.test(text)) return text;
  if (/^#[0-9a-f]{8}$/i.test(text)) return text.slice(0, 7);
  return "#927D45";
}

function decodeBasicHtmlEntities(value) {
  return String(value || "")
    .replace(/&quot;/gi, '"')
    .replace(/&#34;/g, '"')
    .replace(/&apos;/gi, "'")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&amp;/gi, "&");
}

function decodeUrlTextTokens(value) {
  return String(value || "")
    .replace(/~p~/gi, "\n\n")
    .replace(/(?:~n~|\\n|↵)/gi, "\n")
    .replace(/~amp~/gi, "&")
    .replace(/~hash~/gi, "#")
    .replace(/~pct~/gi, "%")
    .replace(/~q~/gi, "?")
    .replace(/~eq~/gi, "=");
}

function wrapTextByUnits(value, maxUnits) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  const lines = [];
  let current = "";

  for (const char of [...text]) {
    const next = `${current}${char}`;
    if (current && countUnits(next) > maxUnits) {
      lines.push(current.trim());
      current = char;
      continue;
    }
    current = next;
  }

  if (current) lines.push(current.trim());
  return lines.length ? lines : [""];
}

function wrapRichTextByUnits(value, maxUnits) {
  const tokens = tokenizeRichText(value);
  const lines = [];
  let current = [];
  let currentUnits = 0;

  const pushSegmentChar = (char, tint) => {
    const last = current[current.length - 1];
    if (last && last.tint === tint) {
      last.text += char;
      return;
    }
    current.push({ text: char, tint });
  };

  const pushCurrentLine = () => {
    const cleaned = trimRichSegments(current);
    if (cleaned.length) lines.push(cleaned);
    current = [];
    currentUnits = 0;
  };

  tokens.forEach((token) => {
    for (const char of [...token.text]) {
      const units = countUnits(char);
      if (current.length && currentUnits + units > maxUnits) pushCurrentLine();
      pushSegmentChar(char, token.tint || "");
      currentUnits += units;
    }
  });

  pushCurrentLine();
  return lines.length ? lines : [[{ text: "", tint: "" }]];
}

function tokenizeRichText(value) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  const tokens = [];
  const pattern = /\[\[TINT:(#[0-9a-f]{3,8}):([\s\S]*?)\]\]/gi;
  let cursor = 0;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > cursor) tokens.push({ text: text.slice(cursor, match.index), tint: "" });
    tokens.push({ text: match[2], tint: normalizeTintColor(match[1]) });
    cursor = pattern.lastIndex;
  }

  if (cursor < text.length) tokens.push({ text: text.slice(cursor), tint: "" });
  return tokens.length ? tokens : [{ text, tint: "" }];
}

function trimRichSegments(segments) {
  const copy = segments
    .map((segment) => ({ text: segment.text, tint: segment.tint || "" }))
    .filter((segment) => segment.text);
  if (!copy.length) return [];
  copy[0].text = copy[0].text.replace(/^\s+/, "");
  copy[copy.length - 1].text = copy[copy.length - 1].text.replace(/\s+$/, "");
  return copy.filter((segment) => segment.text);
}

function renderSegmentAnimate({
  attributeName,
  duration,
  values,
  localKeyTimes,
  localSplines = [],
  index,
  count
}) {
  const keyframes = makeSegmentKeyframes(localKeyTimes, values, index, count, localSplines);
  const splineAttrs = keyframes.keySplines
    ? ` calcMode="spline" keySplines="${keyframes.keySplines}"`
    : "";

  return `<animate attributeName="${attributeName}" dur="${round2(duration)}s" values="${keyframes.values}" keyTimes="${keyframes.keyTimes}"${splineAttrs} repeatCount="indefinite" fill="remove"/>`;
}

function renderSegmentAnimateTransform({
  duration,
  values,
  localKeyTimes,
  localSplines = [],
  index,
  count
}) {
  const keyframes = makeSegmentKeyframes(localKeyTimes, values, index, count, localSplines);
  const splineAttrs = keyframes.keySplines
    ? ` calcMode="spline" keySplines="${keyframes.keySplines}"`
    : "";

  return `<animateTransform attributeName="transform" type="translate" dur="${round2(duration)}s" values="${keyframes.values}" keyTimes="${keyframes.keyTimes}"${splineAttrs} repeatCount="indefinite" fill="remove"/>`;
}

function makeSegmentKeyframes(localKeyTimes, values, index, count, localSplines = []) {
  const valueList = Array.isArray(values) ? values : String(values).split(";");
  const start = index / count;
  const end = (index + 1) / count;
  const keyTimes = [];
  const mappedValues = [];
  const keySplines = [];

  if (start > 0) {
    keyTimes.push(0);
    mappedValues.push(valueList[0]);
    keySplines.push("0 0 1 1");
  }

  localKeyTimes.forEach((key, keyIndex) => {
    keyTimes.push(segmentKey(index, count, key));
    mappedValues.push(valueList[keyIndex]);
    if (keyIndex < localKeyTimes.length - 1) {
      keySplines.push(localSplines[keyIndex] || "0 0 1 1");
    }
  });

  if (end < 1) {
    keyTimes.push(1);
    mappedValues.push(valueList[valueList.length - 1]);
    keySplines.push("0 0 1 1");
  }

  const normalized = normalizeKeyframeTimes(keyTimes);
  return {
    keyTimes: normalized.map(formatKeyTime).join(";"),
    values: mappedValues.map((value) => escapeXml(value)).join(";"),
    keySplines: keySplines.length === normalized.length - 1 ? keySplines.join(";") : ""
  };
}

function normalizeKeyframeTimes(keyTimes) {
  const output = [];
  keyTimes.forEach((key, index) => {
    let next = clamp(Number(key) || 0, 0, 1);
    if (index > 0 && next <= output[index - 1]) {
      next = Math.min(1, output[index - 1] + 0.0001);
    }
    output.push(next);
  });
  output[output.length - 1] = 1;
  return output;
}

function segmentKey(index, count, localKey) {
  return (index + localKey) / count;
}

function formatKeyTime(value) {
  return value.toFixed(6).replace(/0+$/u, "").replace(/\.$/u, "");
}

async function pickDialogueSceneAsset(turn) {
  const speaker = normalizeDialogueSpeaker(turn.speaker);
  const context = `${turn.cardType || ""} ${turn.relationship || ""} ${turn.mood || ""} ${turn.emotion || ""} ${turn.dialogue || ""}`;
  const paths = pickDialogueScenePaths(speaker, context);

  for (const path of paths) {
    const files = await listActionGithubFiles(path.root, /\.(webp|png|jpe?g)$/i);
    if (files.length) {
      return {
        speaker,
        label: getDialogueSpeakerLabel(speaker),
        url: actionAssetUrl([...path.root, actionRandomPick(files)])
      };
    }
  }

  const fallback = paths[paths.length - 1];
  return {
    speaker,
    label: getDialogueSpeakerLabel(speaker),
    url: actionAssetUrl([...fallback.root, actionRandomPick(fallback.fallback)])
  };
}

async function pickVeilDialogueBackdropUrl(turn) {
  const context = `${turn.cardType || ""} ${turn.relationship || ""} ${turn.mood || ""} ${turn.emotion || ""} ${turn.dialogue || ""}`;
  const folder = isAnxiousDialogueContext(context) ? AX.anxiousTalk : AX.talk;
  const files = await listActionGithubFiles([...ACTION_DURAN_ROOT, folder], /\.(png|webp|jpe?g)$/i);
  const choices = files.length ? files : makeActionLayerFallback(folder);
  return actionAssetUrl([...ACTION_DURAN_ROOT, folder, actionRandomPick(choices)]);
}

function isAnxiousDialogueContext(value) {
  return /(danger|fear|anxious|tension|guard|threat|wound|shock|\uC704\uD5D8|\uC704\uD611|\uACF5\uD3EC|\uBD88\uC548|\uAE34\uC7A5|\uACBD\uACC4|\uD53C\uB85C|\uCDA9\uACA9|\uBD80\uC0C1|\uC0C1\uCC98)/i.test(String(value || ""));
}

function normalizeDialogueSpeaker(value) {
  const text = String(value || "").trim();
  if (/(bobo|\uBCF4\uBCF4|\uC218\uB2EC)/i.test(text)) return "bobo";
  if (/(maren|rowan|\uB9C8\uB80C|\uB80C)/i.test(text)) return "maren";
  if (/(elina|\uC5D8\uB9AC\uB098)/i.test(text)) return "elina";
  if (/(ellarin|\uC5D8\uB77C\uB9B0)/i.test(text)) return "ellarin";
  if (/(duran|\uB4C0\uB780|du)/i.test(text)) return "duran";
  return normalizeKey(text) || "duran";
}

function getDialogueSpeakerLabel(speaker) {
  if (speaker === "bobo") return "Bobo";
  if (speaker === "maren") return "Maren";
  if (speaker === "elina") return "Elina";
  if (speaker === "ellarin") return "Ellarin";
  if (speaker === "duran") return "Duran";
  return fitText(speaker, 10) || "Duran";
}

function getDialogueSpeakerFolder(speaker) {
  if (speaker === "bobo") return "\uBCF4\uBCF4";
  if (speaker === "maren") return "\uB9C8\uB80C";
  if (speaker === "elina") return "\uC5D8\uB9AC\uB098";
  if (speaker === "ellarin") return "\uC5D8\uB77C\uB9B0";
  return speaker === "duran" ? "\uB4C0\uB780" : speaker;
}

function isPetDialogueSpeaker(speaker) {
  return PET_DIALOGUE_SPEAKERS.has(normalizeDialogueSpeaker(speaker));
}

function isSceneDialogueSpeaker(speaker) {
  return SCENE_DIALOGUE_SPEAKERS.has(normalizeDialogueSpeaker(speaker));
}

function pickDialogueScenePaths(speaker, context) {
  const text = String(context || "").toLowerCase();

  if (speaker === "bobo") {
    if (/(pick|find|\uC90D|\uC8FC\uC6CC|\uCC3E|\uC218\uC0C9)/.test(text)) {
      return [{
        root: [...DIALOGUE_BOBO_ROOT, "\uC90D\uAE30"],
        fallback: ["\uC90D\uAE30a.webp", "\uC90D\uAE30d.webp", "\uC90D\uAE30f.webp", "\uC90D\uAE30s.webp"]
      }];
    }
    if (/(look|up|\uC62C\uB824|\uBCF4\uAE30|\uACBD\uACC4|\uBD88\uC548|\uAE34\uC7A5)/.test(text)) {
      return [{
        root: [...DIALOGUE_BOBO_ROOT, "\uC62C\uB824\uBCF4\uAE30"],
        fallback: ["\uC62C\uB824\uBCF4\uAE30a.webp", "\uC62C\uB824\uBCF4\uAE30d.webp", "\uC62C\uB824\uBCF4\uAE30s.webp"]
      }];
    }
    return [{
      root: [...DIALOGUE_BOBO_ROOT, "\uAE30\uBCF8\uB300\uD654"],
      fallback: ["\uAE30\uBCF8\uD081\uD081a.webp", "\uAE30\uBCF8\uD081\uD081d.webp", "\uAE30\uBCF8\uD081\uD081f.webp", "\uAE30\uBCF8\uD081\uD081s.webp"]
    }];
  }

  if (speaker === "duran") return [pickDialogueScenePath(speaker, context)];

  const folder = getDialogueSpeakerFolder(speaker);
  return [
    { root: [...DIALOGUE_SCENE_ROOT, folder, "\uAE30\uBCF8\uB300\uD654"], fallback: [] },
    { root: [...DIALOGUE_SCENE_ROOT, folder, "\uB300\uD654"], fallback: [] },
    { root: [...DIALOGUE_SCENE_ROOT, folder], fallback: [] },
    {
      root: [...DIALOGUE_DURAN_ROOT, "\uAE30\uBCF8\uB300\uD654"],
      fallback: ["\uAE30\uBCF8\uB300\uD654a.webp", "\uAE30\uBCF8\uB300\uD654b.webp"]
    }
  ];
}

function pickDialogueScenePath(speaker, context) {
  const text = String(context || "").toLowerCase();

  if (speaker === "bobo") {
    if (/(pick|find|\uC90D|\uC8FC\uC6CC|\uCC3E|\uC218\uC0C9)/.test(text)) {
      return {
        root: [...DIALOGUE_BOBO_ROOT, "\uC90D\uAE30"],
        fallback: ["\uC90D\uAE30a.webp", "\uC90D\uAE30d.webp", "\uC90D\uAE30f.webp", "\uC90D\uAE30s.webp"]
      };
    }
    if (/(look|up|\uC62C\uB824|\uBCF4\uAE30|\uACBD\uACC4|\uBD88\uC548|\uAE34\uC7A5)/.test(text)) {
      return {
        root: [...DIALOGUE_BOBO_ROOT, "\uC62C\uB824\uBCF4\uAE30"],
        fallback: ["\uC62C\uB824\uBCF4\uAE30a.webp", "\uC62C\uB824\uBCF4\uAE30d.webp", "\uC62C\uB824\uBCF4\uAE30s.webp"]
      };
    }
    return {
      root: [...DIALOGUE_BOBO_ROOT, "\uAE30\uBCF8\uB300\uD654"],
      fallback: ["기본킁킁a.webp", "기본킁킁d.webp", "기본킁킁f.webp", "기본킁킁s.webp"]
    };
  }

  if (/(danger|fear|anxious|tension|\uC704\uD5D8|\uACF5\uD3EC|\uBD88\uC548|\uAE34\uC7A5|\uD53C\uB85C|\uACBD\uACC4)/.test(text)) {
    return {
      root: [...DIALOGUE_DURAN_ROOT, "\uD314\uC9F1\uBD84\uAE30", "\uB300\uD654"],
      fallback: ["\uD314\uC9F1\uAE30\uBCF8\uB300\uD654a.webp", "\uD314\uC9F1\uAE30\uBCF8\uB300\uD654b.webp"]
    };
  }
  return {
    root: [...DIALOGUE_DURAN_ROOT, "\uAE30\uBCF8\uB300\uD654"],
    fallback: ["\uAE30\uBCF8\uB300\uD654a.webp", "\uAE30\uBCF8\uB300\uD654b.webp"]
  };
}

function makeDialogueMotion(speaker, side = "left") {
  const bobo = speaker === "bobo";
  const width = bobo ? 390 : 450;
  const height = bobo ? 500 : 680;
  const y = bobo ? 92 : -34;
  const fromLeft = side === "left";
  const startX = fromLeft ? -width - 45 : ACTION_WIDTH + 45;
  const slowStartX = fromLeft ? (bobo ? 88 : 42) : (bobo ? 222 : 210);
  const slowEndX = slowStartX + (fromLeft ? 30 : -30);
  const endX = fromLeft ? ACTION_WIDTH + 64 : -width - 64;

  return {
    width,
    height,
    y,
    startX,
    values: `${startX} ${y};${startX} ${y};${slowStartX} ${y};${slowEndX} ${y};${endX} ${y};${endX} ${y}`
  };
}

function makeDialogueBackdropMotion(side = "right") {
  const fromLeft = side === "left";
  const startX = fromLeft ? -ACTION_LARGE_WIDTH - 70 : ACTION_WIDTH + 70;
  const slowStartX = fromLeft ? -ACTION_LARGE_WIDTH * 0.3 - 26 : ACTION_WIDTH - ACTION_LARGE_WIDTH * 0.74;
  const slowEndX = slowStartX + (fromLeft ? 36 : -36);
  const endX = fromLeft ? ACTION_WIDTH + 70 : -ACTION_LARGE_WIDTH - 70;

  return {
    startX,
    values: `${startX} ${ACTION_LARGE_Y};${startX} ${ACTION_LARGE_Y};${round2(slowStartX)} ${ACTION_LARGE_Y};${round2(slowEndX)} ${ACTION_LARGE_Y};${endX} ${ACTION_LARGE_Y};${endX} ${ACTION_LARGE_Y}`
  };
}

function makeDialogueLeftMotion(speaker) {
  const bobo = speaker === "bobo";
  const width = bobo ? 390 : 450;
  const height = bobo ? 500 : 680;
  const y = bobo ? 92 : -34;
  const startX = -width - 45;
  const slowStartX = bobo ? 88 : 42;
  const slowEndX = slowStartX + 30;
  const endX = ACTION_WIDTH + 64;

  return {
    width,
    height,
    y,
    startX,
    values: `${startX} ${y};${startX} ${y};${slowStartX} ${y};${slowEndX} ${y};${endX} ${y};${endX} ${y}`
  };
}

function makeDialogueRightMotion() {
  const startX = ACTION_WIDTH + 70;
  const slowStartX = ACTION_WIDTH - ACTION_LARGE_WIDTH * 0.74;
  const slowEndX = slowStartX - 36;
  const endX = -ACTION_LARGE_WIDTH - 70;

  return {
    startX,
    values: `${startX} ${ACTION_LARGE_Y};${startX} ${ACTION_LARGE_Y};${round2(slowStartX)} ${ACTION_LARGE_Y};${round2(slowEndX)} ${ACTION_LARGE_Y};${endX} ${ACTION_LARGE_Y};${endX} ${ACTION_LARGE_Y}`
  };
}

function makeActionSmallMotion(side) {
  const fromLeft = side === "left";
  const startX = fromLeft ? -ACTION_SMALL_WIDTH - 40 : ACTION_WIDTH + 40;
  const centerX = (ACTION_WIDTH - ACTION_SMALL_WIDTH) / 2;
  const slowStartX = startX + (centerX - startX) * 0.8 - 70;
  const slowEndX = slowStartX + (fromLeft ? 29 : -29);
  const endX = fromLeft ? ACTION_WIDTH + 40 : -ACTION_SMALL_WIDTH - 40;
  return {
    fromLeft,
    startX,
    values: `${startX} ${ACTION_SMALL_Y};${startX} ${ACTION_SMALL_Y};${round2(slowStartX)} ${ACTION_SMALL_Y};${round2(slowEndX)} ${ACTION_SMALL_Y};${endX} ${ACTION_SMALL_Y};${endX} ${ACTION_SMALL_Y}`
  };
}

function makeActionLargeMotion(side) {
  const fromLeft = side === "left";
  const startX = fromLeft ? -ACTION_LARGE_WIDTH - 70 : ACTION_WIDTH + 70;
  const slowStartX = (fromLeft ? -ACTION_LARGE_WIDTH * 0.3 : ACTION_WIDTH - ACTION_LARGE_WIDTH * 0.7) - 26;
  const slowEndX = slowStartX + (fromLeft ? 36 : -36);
  const endX = fromLeft ? ACTION_WIDTH + 70 : -ACTION_LARGE_WIDTH - 70;
  return {
    fromLeft,
    startX,
    values: `${startX} ${ACTION_LARGE_Y};${startX} ${ACTION_LARGE_Y};${round2(slowStartX)} ${ACTION_LARGE_Y};${round2(slowEndX)} ${ACTION_LARGE_Y};${endX} ${ACTION_LARGE_Y};${endX} ${ACTION_LARGE_Y}`
  };
}

function makeActionFacingTransform(width, fromLeft) {
  return fromLeft ? "translate(0 0)" : `translate(${width} 0) scale(-1 1)`;
}

function isActionSuccess(result) {
  return /(success|\uC131\uACF5)/i.test(String(result || ""));
}

function hasTraceJudgement(turn) {
  return Boolean(String(turn && turn.result || "").trim());
}

function getActionEffectPalette(environment, success) {
  const env = {
    [AE.battle]: { particle: "#f0a33d", dust: "#d7b17a" },
    [AE.forest]: { particle: "#9ecf77", dust: "#6f8f5b" },
    [AE.underground]: { particle: "#9bb2c8", dust: "#7f8b94" },
    [AE.ruins]: { particle: "#d8b384", dust: "#b89872" },
    [AE.checkpoint]: { particle: "#e0ad6b", dust: "#b98a62" },
    [AE.wall]: { particle: "#ccd3df", dust: "#9299aa" },
    [AE.indoor]: { particle: "#d29b6a", dust: "#ad8062" }
  }[environment] || { particle: "#f0a33d", dust: "#d7b17a" };
  return { ...env, shock: success ? "#ffdf78" : "#ff5b72" };
}

function renderActionScreenShake(success) {
  const values = success
    ? "0 0;0 0;1 -1;-1 1;0 0;0 0"
    : "0 0;0 0;-5 2;4 -3;-3 2;2 -1;0 0;0 0";
  const keyTimes = success
    ? "0;0.035;0.055;0.078;0.11;1"
    : "0;0.032;0.047;0.062;0.08;0.105;0.14;1";
  return `<animateTransform attributeName="transform" type="translate" dur="${ACTION_SECONDS}s" values="${values}" keyTimes="${keyTimes}" repeatCount="indefinite" fill="remove"/>`;
}

function renderActionFailurePulse(success) {
  if (success) return "";
  return `<rect x="0" y="0" width="${ACTION_WIDTH}" height="${ACTION_HEIGHT}" fill="#050006" opacity="0">
    <animate attributeName="opacity" dur="${ACTION_SECONDS}s" values="0;0;0.34;0.08;0;0.22;0" keyTimes="0;0.032;0.055;0.11;0.28;${ACTION_RESULT_BURST_KEY};1" repeatCount="indefinite" fill="remove"/>
  </rect>`;
}

function renderActionFailureVignette(success) {
  if (success) return "";
  return `<rect x="0" y="0" width="${ACTION_WIDTH}" height="${ACTION_HEIGHT}" fill="url(#traceActionFailureVignette)" opacity="0">
    <animate attributeName="opacity" dur="${ACTION_SECONDS}s" values="0;0;0.48;0.18;0.18;0" keyTimes="0;${ACTION_RESULT_ENTER_KEY};0.11;0.22;${ACTION_RESULT_EXIT_KEY};1" repeatCount="indefinite" fill="remove"/>
  </rect>`;
}

function renderActionEnvironmentParticles(environment, palette) {
  const forest = environment === AE.forest;
  const underground = environment === AE.underground;
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
  const shapes = particles.map(([px, py, dx, dy, radius], index) => {
    const keyA = 0.075 + (index % 7) * 0.045;
    const keyB = Math.min(0.92, keyA + 0.52);
    if (forest) {
      return `<path d="M${px} ${py} q${radius * 2.4} -${radius * 3.4} ${radius * 6.2} 0 q-${radius * 2.4} ${radius * 3.4} -${radius * 6.2} 0" fill="${color}" opacity="0">
        <animate attributeName="opacity" dur="${ACTION_SECONDS}s" values="0;0.92;0.55;0" keyTimes="0;${keyA};${keyB};1" repeatCount="indefinite" fill="remove"/>
        <animateTransform attributeName="transform" type="translate" dur="${ACTION_SECONDS}s" values="0 0;${dx} ${dy};${dx * 1.55} ${dy * 1.24};${dx * 1.55} ${dy * 1.24}" keyTimes="0;${keyA};${keyB};1" repeatCount="indefinite" fill="remove"/>
      </path>`;
    }
    if (!underground && index % 3 === 0) {
      return `<path d="M${px} ${py - radius * 2.2} L${px + radius * 1.2} ${py} L${px} ${py + radius * 2.2} L${px - radius * 1.2} ${py} Z" fill="${color}" opacity="0">
        <animate attributeName="opacity" dur="${ACTION_SECONDS}s" values="0;1;0.42;0" keyTimes="0;${keyA};${keyB};1" repeatCount="indefinite" fill="remove"/>
        <animateTransform attributeName="transform" type="translate" dur="${ACTION_SECONDS}s" values="0 0;${dx} ${dy};${dx * 1.45} ${dy * 1.2};${dx * 1.45} ${dy * 1.2}" keyTimes="0;${keyA};${keyB};1" repeatCount="indefinite" fill="remove"/>
      </path>`;
    }
    return `<circle cx="${px}" cy="${py}" r="${radius}" fill="${dust}" opacity="0">
      <animate attributeName="opacity" dur="${ACTION_SECONDS}s" values="0;0.74;0.38;0" keyTimes="0;${keyA};${keyB};1" repeatCount="indefinite" fill="remove"/>
      <animateTransform attributeName="transform" type="translate" dur="${ACTION_SECONDS}s" values="0 0;${dx} ${dy};${dx * 1.45} ${dy * 1.2};${dx * 1.45} ${dy * 1.2}" keyTimes="0;${keyA};${keyB};1" repeatCount="indefinite" fill="remove"/>
    </circle>`;
  }).join("");
  return `<g filter="url(#traceActionParticleGlow)" style="mix-blend-mode:screen" pointer-events="none">${shapes}</g>`;
}

function pickActionExpression({ action, result }) {
  const resultText = String(result || "").toLowerCase();
  if (/(fail|\uC2E4\uD328)/i.test(resultText)) return actionRandomPick(ACTION_FAILURE_EXPRESSIONS);
  if (/(\uBD80\uBD84|partial)/i.test(resultText)) return actionRandomPick(ACTION_PARTIAL_EXPRESSIONS);
  if (/(success|\uC131\uACF5)/i.test(resultText)) return actionRandomPick(ACTION_SUCCESS_EXPRESSIONS);

  const text = `${action} ${result}`.toLowerCase();
  if (/(fail|damage|shock|fear|sad|wound|death|sigh|\uC2E4\uD328|\uD53C\uD574|\uBD80\uC0C1|\uC0C1\uCC98|\uCDA9\uACA9|\uC8FD\uC74C|\uACF5\uD3EC|\uC808\uB9DD|\uC2AC\uD514|\uD55C\uC228|\uD6C4\uD68C|\uC8C4\uCC45)/.test(text)) return actionRandomPick(ACTION_FAILURE_EXPRESSIONS);
  if (/(surprise|ambush|\uB180\uB78C|\uAE30\uC2B5|\uC2B5\uACA9)/.test(text)) return AX.surprise;
  if (/(threat|danger|anxious|tension|guard|hide|escape|\uC704\uD611|\uC704\uD5D8|\uBD88\uC548|\uACF5\uD3EC|\uAE34\uC7A5|\uACBD\uACC4|\uC740\uC2E0|\uC228|\uB3C4\uC8FC)/.test(text)) return AX.guard;
  if (/(investigate|search|infer|trace|clue|\uC870\uC0AC|\uC218\uC0C9|\uCD94\uB9AC|\uB2E8\uC11C|\uD754\uC801|\uD655\uC778|\uD0D0\uC0C9)/.test(text)) return AX.infer;
  if (/(curious|wonder|\uD638\uAE30\uC2EC|\uAD00\uC2EC|\uC774\uC0C1|\uAD81\uAE08|\uC758\uBB38)/.test(text)) return AX.curious;
  if (/(talk|speech|dialogue|persuade|\uB300\uD654|\uB9D0|\uC124\uB4DD|\uAD50\uC12D|\uAD50\uD658)/.test(text)) return AX.talk;
  if (/(success|reward|relief|smile|\uC131\uACF5|\uBCF4\uC0C1|\uD68C\uBCF5|\uC548\uB3C4|\uBBF8\uC18C)/.test(text)) return actionRandomPick(ACTION_SUCCESS_EXPRESSIONS);
  if (/(resolve|move|advance|arrive|endure|\uACB0\uC758|\uAC01\uC624|\uB3CC\uD30C|\uC774\uB3D9|\uC804\uC9C4|\uB3C4\uCC29|\uBC84\uD2F0)/.test(text)) return AX.resolve;
  if (/(awkward|hesitate|\uB09C\uCC98|\uACE4\uB780|\uB2F9\uD669|\uB9DD\uC124)/.test(text)) return AX.awkward;
  return actionRandomPick([...ACTION_SUCCESS_EXPRESSIONS, ...ACTION_FAILURE_EXPRESSIONS]);
}

async function pickActionBackgroundUrl(environment) {
  const dir = ACTION_ENVIRONMENT_DIRS[environment] || ACTION_ENVIRONMENT_DIRS[AE.battle];
  const files = await listActionGithubFiles([...ACTION_BACKGROUND_ROOT, dir], /\.(jpe?g|png|webp)$/i);
  const fallback = ACTION_BACKGROUND_FALLBACK_FILES[dir] || ACTION_BACKGROUND_FALLBACK_FILES["000_" + AE.battle];
  return actionAssetUrl([...ACTION_BACKGROUND_ROOT, dir, actionRandomPick(files.length ? files : fallback)]);
}

async function pickActionDuranUrls(expression) {
  const folder = ACTION_EXPRESSIONS.includes(expression) ? expression : AX.guard;
  const files = await listActionGithubFiles([...ACTION_DURAN_ROOT, folder], /\.(png|webp|jpe?g)$/i);
  const choices = files.length ? files : makeActionLayerFallback(folder);
  const first = actionRandomPick(choices);
  let second = actionRandomPick(choices);
  if (choices.length > 1) {
    for (let index = 0; index < 8 && second === first; index++) second = actionRandomPick(choices);
    if (second === first) second = choices[(choices.indexOf(first) + 1) % choices.length];
  }
  return [
    actionAssetUrl([...ACTION_DURAN_ROOT, folder, first]),
    actionAssetUrl([...ACTION_DURAN_ROOT, folder, second])
  ];
}

function pickActionJudgementUrl(result) {
  return actionAssetUrl([...ACTION_JUDGEMENT_ROOT, `${isActionSuccess(result) ? AK.success : AK.failure}.png`]);
}

async function listActionGithubFiles(pathSegments, extensionPattern) {
  const key = pathSegments.join("/");
  const cached = actionFileCache.get(key);
  const now = Date.now();
  if (cached && now - cached.time < ACTION_CACHE_MS) return cached.files;
  try {
    const apiUrl = `https://api.github.com/repos/musueman/duran-assets/contents/${encodeActionPath(pathSegments)}?ref=main`;
    const response = await fetch(apiUrl, {
      headers: {
        accept: "application/vnd.github+json",
        "user-agent": "duran-turn-worker"
      }
    });
    if (!response.ok) throw new Error(`GitHub API ${response.status}`);
    const json = await response.json();
    if (!Array.isArray(json)) throw new Error("GitHub contents response is not an array");
    const files = json
      .filter((item) => item && item.type === "file" && typeof item.name === "string")
      .map((item) => item.name)
      .filter((name) => extensionPattern.test(name))
      .sort(actionNaturalCompare);
    actionFileCache.set(key, { files, time: now });
    return files;
  } catch (_) {
    actionFileCache.set(key, { files: [], time: now });
    return [];
  }
}

function normalizeActionEnvironment(value) {
  const key = normalizeEnvironmentKey(value);
  return Object.keys(ACTION_ENVIRONMENT_DIRS).find((name) => normalizeKey(name) === key) || AE.battle;
}

function normalizeEnvironmentKey(value) {
  const key = normalizeKey(value);
  if (key === normalizeKey("건물안") || key === normalizeKey("건물 안")) return normalizeKey(AE.indoor);
  return key;
}

function oppositeActionSide(side) {
  return side === "left" ? "right" : "left";
}

function actionNumberedFiles(prefix, numbers) {
  return numbers.map((number) => `${prefix}${number}.jpg`);
}

function makeActionLayerFallback(folder) {
  return ACTION_EXPRESSION_FALLBACK_FILES[folder] || actionLayerFiles([1]);
}

function actionLayerFiles(numbers) {
  return numbers.map((number) => `${AK.layer} ${number}.png`);
}

function actionAssetUrl(pathSegments) {
  return `${ASSET_BASE_URL}/${encodeActionPath(pathSegments)}`;
}

function encodeActionPath(pathSegments) {
  return pathSegments.map((segment) => encodeURIComponent(segment)).join("/");
}

function actionRandomPick(items) {
  if (!Array.isArray(items) || items.length === 0) return "";
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return items[array[0] % items.length];
}

function actionNaturalCompare(a, b) {
  return String(a).localeCompare(String(b), "ko-KR", { numeric: true, sensitivity: "base" });
}

function round2(value) {
  return Math.round(value * 100) / 100;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function renderDiceBackLayer(environment, x, y, width, height) {
  const href = `${ASSET_BASE_URL}/dice/back/${encodeURIComponent(environment)}.jpg`;

  return `
  <image
    href="${escapeXml(href)}"
    x="${x}"
    y="${y}"
    width="${width}"
    height="${height}"
    preserveAspectRatio="xMidYMid slice"
  />`;
}

function stripDiceBackLayer(fragment) {
  if (!fragment.ok) return fragment;

  return {
    ...fragment,
    inner: fragment.inner.replace(
      /<image\b(?=[^>]*\b(?:href|xlink:href)=["'][^"']*\/card-back\.jpg[^"']*["'])[^>]*\/>/gi,
      ""
    )
  };
}

function prepareTraceCardLayer(fragment) {
  const stripped = stripDiceBackLayer(fragment);
  if (!stripped.ok) return stripped;

  let inner = stripped.inner;

  inner = inner.replace(
    /<image\b(?=[^>]*\b(?:href|xlink:href)=["'][^"']*\/card-base\.webp[^"']*["'])[^>]*\/>/gi,
    (tag) => {
      const height = parseSvgNumberAttr(tag, "height", 193);
      return setSvgNumberAttr(tag, "y", ACTION_HEIGHT - height + TRACE_BASE_OVERHANG);
    }
  );

  inner = inner.replace(
    /<image\b(?=[^>]*\b(?:href|xlink:href)=["'][^"']*\/dice\.webp[^"']*["'])[^>]*\/>/gi,
    ""
  );

  return { ...stripped, inner };
}

function prepareVeilCardLayer(fragment) {
  const stripped = stripDiceBackLayer(fragment);
  if (!stripped.ok) return stripped;

  let inner = stripped.inner;

  inner = inner.replace(
    /<image\b(?=[^>]*\b(?:href|xlink:href)=["'][^"']*\/card-base\.webp[^"']*["'])[^>]*\/>/gi,
    (tag) => {
      const height = parseSvgNumberAttr(tag, "height", 193);
      return setSvgNumberAttr(tag, "y", ACTION_HEIGHT - height + TRACE_BASE_OVERHANG);
    }
  );

  inner = inner.replace(
    /<image\b(?=[^>]*\b(?:href|xlink:href)=["'][^"']*\/dice\.webp[^"']*["'])[^>]*\/>/gi,
    ""
  );

  return { ...stripped, inner };
}

function prepareStaticCardLayer(fragment) {
  if (!fragment.ok) return fragment;

  return {
    ...fragment,
    inner: fragment.inner.replace(
      /<image\b(?=[^>]*\b(?:href|xlink:href)=["'][^"']*\/dice\.webp[^"']*["'])[^>]*\/>/gi,
      ""
    )
  };
}

function getCardBaseTitleHeight(width) {
  const titleWidth = Math.round(width * 0.76);
  return Math.round((titleWidth * 193) / 560);
}

function renderCardBaseTitle(fragment, x, y, width) {
  const href = getCardBaseHref(fragment);
  if (!href) return "";

  const titleWidth = Math.round(width * 0.76);
  const titleHeight = getCardBaseTitleHeight(width);
  const titleX = x + (width - titleWidth) / 2;

  return `
  <image
    href="${escapeXml(href)}"
    x="${round2(titleX)}"
    y="${round2(y)}"
    width="${titleWidth}"
    height="${titleHeight}"
    preserveAspectRatio="xMidYMid meet"
  />`;
}

function getCardBaseHref(fragment) {
  if (!fragment || !fragment.ok) return "";
  const match = fragment.inner.match(/<image\b(?=[^>]*\b(?:href|xlink:href)=["'][^"']*\/card-base\.webp[^"']*["'])[^>]*\b(?:href|xlink:href)=["']([^"']+)["'][^>]*\/?>/i);
  return match ? match[1] : "";
}

function parseSvgNumberAttr(tag, attr, fallback) {
  const match = String(tag).match(new RegExp(`\\b${attr}="(-?\\d+(?:\\.\\d+)?)"`, "i"));
  return match ? Number(match[1]) : fallback;
}

function setSvgNumberAttr(tag, attr, value) {
  const next = `${attr}="${round2(value)}"`;
  const pattern = new RegExp(`\\b${attr}="[^"]*"`, "i");
  return pattern.test(tag) ? tag.replace(pattern, next) : tag.replace(/\s*\/>$/, ` ${next}/>`);
}

function placeSvg(fragment, x, y, width, height, overflowVisible = false) {
  if (!fragment.ok) {
    return renderMissingSvg(fragment, x, y, width, height);
  }

  return `
  <svg
    x="${x}"
    y="${y}"
    width="${width}"
    height="${height}"
    viewBox="${escapeXml(fragment.viewBox)}"
    preserveAspectRatio="xMidYMid meet"
    overflow="${overflowVisible ? "visible" : "hidden"}"
  >
    ${fragment.inner}
  </svg>`;
}

function renderMissingSvg(fragment, x, y, width, height) {
  return `
  <g>
    <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="8" fill="#211a12" stroke="${BORDER_GOLD}" />
    <text x="${x + width / 2}" y="${y + height / 2 - 10}" text-anchor="middle" font-family="'Noto Serif KR', serif" font-size="18" font-weight="900" fill="${TEXT_DARK}">SVG 로드 실패</text>
    <text x="${x + width / 2}" y="${y + height / 2 + 18}" text-anchor="middle" font-family="'Noto Serif KR', serif" font-size="13" fill="${TEXT_MUTED}">${escapeXml(fragment.error || "unknown")}</text>
  </g>`;
}

async function loadSvgFragment(targetUrl, serviceBinding = null) {
  try {
    const request = new Request(targetUrl.toString(), {
      headers: {
        "user-agent": "duran-turn-worker/1.0"
      }
    });
    const response = serviceBinding && typeof serviceBinding.fetch === "function"
      ? await serviceBinding.fetch(request)
      : await fetch(request);

    if (!response.ok) {
      const body = safeText(await response.text(), "", 120);
      return { ok: false, error: `${response.status} ${response.statusText} ${targetUrl.origin}${targetUrl.pathname} ${body}` };
    }

    const origin = targetUrl.origin;
    const raw = rewriteRelativeHrefs(await response.text(), origin);
    const openMatch = raw.match(/<svg\b[^>]*>/i);
    const closeIndex = raw.lastIndexOf("</svg>");

    if (!openMatch || closeIndex < 0) {
      return { ok: false, error: "invalid svg" };
    }

    const viewBoxMatch = openMatch[0].match(/viewBox="([^"]+)"/i);
    const viewBox = viewBoxMatch ? viewBoxMatch[1] : "0 0 700 560";
    const inner = stripEmbeddedMetadata(raw.slice(openMatch.index + openMatch[0].length, closeIndex));

    return { ok: true, viewBox, inner };
  } catch (error) {
    return { ok: false, error: error?.message || String(error) };
  }
}

function stripEmbeddedMetadata(svg) {
  return svg
    .replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, "")
    .replace(/<desc\b[^>]*>[\s\S]*?<\/desc>/gi, "");
}

function rewriteRelativeHrefs(svg, origin) {
  return svg
    .replace(/\b(href|xlink:href)="\/([^"]*)"/g, `$1="${origin}/$2"`)
    .replace(/\b(href|xlink:href)='\/([^']*)'/g, `$1='${origin}/$2'`);
}

function getBases(url, request, env) {
  const stage = getStage(url, request, env);
  return STAGE_BASES[stage] || STAGE_BASES.dev;
}

function getStage(url, request, env) {
  const explicit = normalizeToken(getParam(url, ["stage", "환경구분"], ""));
  if (explicit === "prod" || explicit === "production" || explicit === "main") return "prod";
  if (explicit === "dev" || explicit === "test" || explicit === "staging") return "dev";

  const envStage = normalizeToken(env?.STAGE || "");
  if (envStage === "prod") return "prod";
  if (envStage === "dev") return "dev";

  return request.url.includes("-dev.") ? "dev" : "prod";
}

function makeUrl(base, path, params) {
  const url = new URL(path, base);
  for (const [key, value] of Object.entries(params)) {
    const text = safeText(value, "", 900);
    if (text) url.searchParams.set(key, text);
  }
  return url;
}

function getParam(url, aliases, fallback = "", maxLength = 900) {
  const wanted = new Set(aliases.map(normalizeKey));

  for (const [key, value] of url.searchParams.entries()) {
    if (wanted.has(normalizeKey(key)) && value !== "") {
      return safeText(value, fallback, maxLength);
    }
  }

  return fallback;
}

function isMobileRequest(request) {
  const cfDeviceType = safeText(request.headers.get("cf-device-type") || request.cf?.deviceType, "", 40);
  if (normalizeToken(cfDeviceType) === "mobile") return true;
  return /\b(Android|iPhone|iPod|Mobile|Windows Phone)\b/i.test(request.headers.get("user-agent") || "");
}

function parseBool(value) {
  const token = normalizeToken(value);
  if (!token) return false;
  return ["1", "true", "yes", "y", "mobile", "m"].includes(token);
}

function getTurnLayout(url, request) {
  const explicitMobile = parseBool(getParam(url, ["모바일", "mobile", "m"], ""));
  return explicitMobile || isMobileRequest(request) ? MOBILE_TURN_LAYOUT : DESKTOP_TURN_LAYOUT;
}

function signed(value) {
  const text = safeText(value, "", 30);
  if (!text) return "+0";
  if (/^[+-]/.test(text)) return text;
  if (/^\d+$/.test(text)) return `+${text}`;
  return text;
}

function parseRollNumber(value) {
  const number = parseSignedNumber(value);
  if (!Number.isFinite(number)) return null;
  return number === 0 ? 1 : number;
}

function parseModifierNumber(value) {
  const number = parseSignedNumber(value);
  return Number.isFinite(number) ? number : 0;
}

function normalizeModifierParam(value) {
  return String(parseModifierNumber(value));
}

function parseSignedNumber(value) {
  const text = safeText(value, "", 30);
  const match = text.match(/[+-]?\d+/);
  return match ? Number.parseInt(match[0], 10) : NaN;
}

function fitText(value, maxUnits) {
  const text = safeText(value, "", 100);
  if (countUnits(text) <= maxUnits) return text;

  let output = "";
  for (const char of [...text]) {
    if (countUnits(`${output}${char}…`) > maxUnits) break;
    output += char;
  }
  return `${output}…`;
}

function wrapText(value, maxUnits) {
  const text = safeText(value, "", 700);
  const words = text.split(" ");
  const lines = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (countUnits(next) <= maxUnits) {
      current = next;
      continue;
    }
    if (current) lines.push(current);
    current = word;
  }

  if (current) lines.push(current);
  return lines.length ? lines : [""];
}

function countUnits(text) {
  return [...text].reduce((sum, char) => sum + (/[ -~]/.test(char) ? 0.56 : 1), 0);
}

function safeText(value, fallback = "", maxLength = 240) {
  if (value === undefined || value === null) return fallback;
  const text = Array.isArray(value) ? value.join(",") : String(value);
  const cleaned = text
    .normalize("NFC")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return cleaned ? cleaned.slice(0, maxLength) : fallback;
}

function normalizeToken(value) {
  return safeText(value, "", 260)
    .toLowerCase()
    .replace(/[^0-9a-z가-힣]/g, "");
}

function normalizeKey(value) {
  return safeText(value, "", 80)
    .toLowerCase()
    .replace(/[\s_\-]/g, "");
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderErrorSvg(error) {
  return renderShell({
    title: "Duran Turn Error",
    desc: "combined SVG render failed",
    height: 260,
    body: `
  <text x="350" y="116" text-anchor="middle" font-family="'Noto Serif KR', serif" font-size="24" font-weight="900" fill="${GOLD_MAIN}">렌더링 실패</text>
  <text x="350" y="154" text-anchor="middle" font-family="'Noto Serif KR', serif" font-size="15" fill="${GOLD_LIGHT}">${escapeXml(error?.message || String(error))}</text>
`
  });
}

function renderHelp(url, env) {
  const stage = getStage(url, { url: url.toString(), headers: new Headers() }, env);
  return [
    "Duran Turn Worker is running.",
    "",
    `stage: ${stage}`,
    "",
    "Endpoints:",
    `  ${url.origin}/trace.svg?환경=전장&P값=5&행동=잔해은신&분류=민&능력=3&색틈=1&최종=9&목표=7&결과=성공&보상=은닉확보,추적약화`,
    `  ${url.origin}/veil.svg?환경=전장&veil=4&패=조사&관계=적대&분위기=긴장&감정=불안&대사=[듀란|먹을+것이+있을지도+모르지만...]`,
    ""
  ].join("\n");
}

function textResponse(text, request, status = 200) {
  return new Response(request.method === "HEAD" ? null : text, {
    status,
    headers: TEXT_HEADERS
  });
}

function jsonResponse(value, request, status = 200) {
  return new Response(request.method === "HEAD" ? null : `${JSON.stringify(value, null, 2)}\n`, {
    status,
    headers: JSON_HEADERS
  });
}

function svgResponse(svg, request, status = 200) {
  return new Response(request.method === "HEAD" ? null : compactSvg(svg), {
    status,
    headers: SVG_HEADERS
  });
}

function compactSvg(svg) {
  return String(svg || "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<[^>]+>/g, (tag) => tag
      .replace(/\s+/g, " ")
      .replace(/\s*=\s*/g, "=")
      .replace(/\s+\/>/g, "/>")
      .replace(/\s+>/g, ">"))
    .replace(/>\s+</g, "><")
    .trim();
}

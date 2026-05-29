const DEFAULT_ASSET_BASE_URL = "https://musueman.github.io/duran-assets";
const DIALOGUE_ASSET_ROOT = "visual";
const DIALOGUE_ASSET_FOLDER = "대사";

const BASE_HEADERS = {
  "cache-control": "no-store, no-cache, must-revalidate, max-age=0",
  "pragma": "no-cache",
  "expires": "0",
  "x-content-type-options": "nosniff",
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, HEAD, POST, OPTIONS",
  "access-control-allow-headers": "content-type"
};

const TEXT_HEADERS = {
  ...BASE_HEADERS,
  "content-type": "text/plain; charset=utf-8"
};

const JSON_HEADERS = {
  ...BASE_HEADERS,
  "content-type": "application/json; charset=utf-8"
};

const MARKDOWN_HEADERS = {
  ...BASE_HEADERS,
  "content-type": "text/markdown; charset=utf-8"
};

const SVG_HEADERS = {
  ...BASE_HEADERS,
  "content-type": "image/svg+xml; charset=utf-8"
};

const PANEL_WIDTH = 700;
const PANEL_HEIGHT = 175;
const MOBILE_PANEL_HEIGHT = PANEL_WIDTH / 3;
const FACE_BACKGROUND = "#00d9e0";
const BUBBLE_BORDER_COLOR = "#c9dce1";
const NAME_LABEL_TEXT = "Duran";
const BASE_FACE_SECONDS = 2;
const TYPING_FACE_SECONDS = 2;
const EMOTION_FACE_SECONDS = 2;
const FACE_FADE_SECONDS = 0;
const HIDDEN_FACE_OPACITY = "0.001";
const DESKTOP_LAYOUT = makePanelLayout({
  name: "desktop",
  height: PANEL_HEIGHT,
  faceSize: PANEL_HEIGHT,
  bubbleGap: 30,
  bubbleRight: 1.2,
  bubbleY: 22,
  bubbleRadius: 18,
  textInsetX: 28,
  textTopOffset: 38,
  textLineHeight: 25,
  textMaxLines: 4,
  textCharsPerLine: 24,
  textFontSize: 22,
  textClipHeight: 30,
  nameLabelOffsetX: 26,
  nameLabelOffsetY: -18,
  nameLabelWidth: 106,
  nameLabelHeight: 36,
  nameLabelRadius: 14,
  nameLabelFontSize: 22,
  nameLabelTextOffsetY: 26
});
const MOBILE_LAYOUT = makePanelLayout({
  name: "mobile",
  height: MOBILE_PANEL_HEIGHT,
  faceSize: MOBILE_PANEL_HEIGHT,
  bubbleGap: 24,
  bubbleRight: 1.2,
  bubbleY: 26,
  bubbleRadius: 18,
  textInsetX: 24,
  textTopOffset: 48,
  textLineHeight: 31,
  textMaxLines: 4,
  textCharsPerLine: 18,
  textFontSize: 26,
  textClipHeight: 36,
  nameLabelOffsetX: 24,
  nameLabelOffsetY: -21,
  nameLabelWidth: 124,
  nameLabelHeight: 42,
  nameLabelRadius: 16,
  nameLabelFontSize: 26,
  nameLabelTextOffsetY: 30
});

function makePanelLayout({
  name,
  height,
  faceSize,
  bubbleGap,
  bubbleRight,
  bubbleY,
  bubbleRadius,
  textInsetX,
  textTopOffset,
  textLineHeight,
  textMaxLines,
  textCharsPerLine,
  textFontSize,
  textClipHeight,
  nameLabelOffsetX,
  nameLabelOffsetY,
  nameLabelWidth,
  nameLabelHeight,
  nameLabelRadius,
  nameLabelFontSize,
  nameLabelTextOffsetY
}) {
  const bubbleX = faceSize + bubbleGap;
  const bubbleWidth = PANEL_WIDTH - bubbleX - bubbleRight;
  const bubbleHeight = height - bubbleY * 2;
  const faceImageScale = 2;
  const faceImageSize = faceSize * faceImageScale;

  return {
    name,
    panelWidth: PANEL_WIDTH,
    panelHeight: height,
    faceSize,
    faceCenter: faceSize / 2,
    faceCircleRadius: faceSize / 2,
    faceImageSize,
    faceImageX: (faceSize - faceImageSize) / 2,
    faceImageY: 0,
    bubbleX,
    bubbleY,
    bubbleWidth,
    bubbleHeight,
    bubbleRadius,
    textX: bubbleX + textInsetX,
    textTop: bubbleY + textTopOffset,
    textLineHeight,
    textMaxLines,
    textCharsPerLine,
    textFontSize,
    textClipHeight,
    textAreaWidth: bubbleWidth - textInsetX * 2,
    nameLabelX: bubbleX + nameLabelOffsetX,
    nameLabelY: bubbleY + nameLabelOffsetY,
    nameLabelWidth,
    nameLabelHeight,
    nameLabelRadius,
    nameLabelFontSize,
    nameLabelTextOffsetY
  };
}

const FIELD_ALIASES = {
  dialogue: ["대사", "말", "문장", "듀란대사", "d", "D", "line", "text", "txt", "dialogue", "message", "speech"],
  emotion: ["감정", "정서", "표정", "emotion", "emotions", "feeling", "tone"],
  expression: ["대사표정", "이미지감정", "동작", "expression", "portrait", "imageEmotion"],
  situation: ["상황", "장면", "맥락", "situation", "context", "scene"],
  environment: ["환경", "장소", "environment", "env", "place"],
  card: ["패", "카드", "성격", "card", "event", "type"],
  relationship: ["관계", "상대", "relationship", "relation"],
  mood: ["분위기", "무드", "mood", "atmosphere"],
  seed: ["시드", "seed", "id", "turn"],
  format: ["형식", "format", "output"]
};

const CARD_LIST = ["위협", "교환", "조우", "조사", "이동", "정비"];
const MOOD_LIST = ["평온", "교환", "낯섦", "긴장", "위험", "불안", "조사", "이동", "정비"];
const RELATIONSHIP_LIST = ["우호", "중립", "낯섦", "적대"];
const ENVIRONMENT_LIST = ["검문소", "성벽", "숲", "실내", "야외", "전장", "지하", "폐허"];
const EMOTION_LIST = [
  "중립",
  "긍정",
  "강한긍정",
  "관심",
  "경계",
  "불안",
  "난처",
  "결의",
  "충격",
  "슬픔",
  "부정",
  "피로",
  "냉정",
  "숙고",
  "단호"
];

const EXPRESSION_FILES = {
  결의: numberedFiles("결의", 1, 4),
  경계: numberedFiles("경계", 1, 4),
  기본: numberedFiles("기본", 3, 8),
  난처: numberedFiles("난처", 1, 3),
  놀람: numberedFiles("놀람", 1, 5),
  대화: numberedFiles("대화", 1, 5),
  메모: numberedFiles("메모", 1, 4),
  미소: numberedFiles("미소", 1, 8),
  불안대화: numberedFiles("불안대화", 1, 4),
  슬픔: numberedFiles("슬픔", 1, 4),
  추리: numberedFiles("추리", 1, 5),
  충격: numberedFiles("충격", 1, 4),
  턱집기: numberedFiles("턱집기", 1, 3),
  한숨: numberedFiles("한숨", 1, 4),
  호기심: numberedFiles("호기심", 1, 5),
  환한미소: numberedFiles("환한미소", 1, 2)
};

const EMOTION_ALIASES = makeAliasMap({
  중립: ["중립", "기본", "대화", "보통", "평온", "담담", "neutral", "normal", "calm"],
  긍정: ["긍정", "미소", "안도", "기쁨", "좋음", "positive", "smile", "relief"],
  강한긍정: ["강한긍정", "환한미소", "환희", "크게웃음", "bright", "happy", "joy"],
  관심: ["관심", "호기심", "궁금", "흥미", "curious", "interest"],
  경계: ["경계", "의심", "주의", "조심", "긴장", "guard", "wary", "alert"],
  불안: ["불안", "불안대화", "초조", "두려움", "겁", "anxious", "fear"],
  난처: ["난처", "곤란", "민망", "망설임", "awkward", "troubled"],
  결의: ["결의", "각오", "의지", "용기", "resolve", "determined"],
  충격: ["충격", "놀람", "경악", "당황", "shock", "surprise"],
  슬픔: ["슬픔", "비통", "눈물", "상실", "sad", "grief"],
  부정: ["부정", "침울", "씁쓸", "불쾌", "negative", "bitter"],
  피로: ["피로", "한숨", "지침", "탈진", "tired", "sigh"],
  냉정: ["냉정", "침착", "차분", "무표정", "cool", "composed"],
  숙고: ["숙고", "추리", "생각", "메모", "분석", "think", "reason"],
  단호: ["단호", "지시", "명령", "결단", "firm", "command"]
});

const EXPRESSION_ALIASES = makeAliasMap(
  Object.fromEntries(Object.keys(EXPRESSION_FILES).map((name) => [name, [name]]))
);

const EMOTION_TO_EXPRESSION = {
  중립: "대화",
  긍정: "미소",
  강한긍정: "환한미소",
  관심: "호기심",
  경계: "경계",
  불안: "불안대화",
  난처: "난처",
  결의: "결의",
  충격: "충격",
  슬픔: "슬픔",
  부정: "한숨",
  피로: "한숨",
  냉정: "턱집기",
  숙고: "추리",
  단호: "결의"
};

const CARD_ALIASES = makeAliasMap({
  위협: ["위협", "전투", "전장", "공격", "습격", "추격", "위험", "threat", "danger", "battle"],
  교환: ["교환", "거래", "흥정", "대가", "조건", "보상", "trade", "bargain"],
  조우: ["조우", "만남", "대면", "낯섦", "사람", "encounter", "meet"],
  조사: ["조사", "수색", "단서", "흔적", "발자국", "탐색", "investigate", "search"],
  이동: ["이동", "탈출", "우회", "길", "행군", "move", "travel", "escape"],
  정비: ["정비", "휴식", "치료", "상처", "물자", "수리", "rest", "repair", "heal"]
});

const MOOD_ALIASES = makeAliasMap({
  평온: ["평온", "안정", "차분", "calm", "peace"],
  교환: ["교환", "거래", "흥정", "trade"],
  낯섦: ["낯섦", "낯선", "처음", "strange", "unknown"],
  긴장: ["긴장", "압박", "팽팽", "tense"],
  위험: ["위험", "전투", "위협", "danger"],
  불안: ["불안", "공포", "초조", "anxiety"],
  조사: ["조사", "수색", "단서", "investigation"],
  이동: ["이동", "탈출", "여정", "movement"],
  정비: ["정비", "휴식", "치료", "maintenance"]
});

const RELATIONSHIP_ALIASES = makeAliasMap({
  우호: ["우호", "호의", "친분", "friendly", "ally"],
  중립: ["중립", "보통", "neutral"],
  낯섦: ["낯섦", "낯선", "처음", "stranger", "unknown"],
  적대: ["적대", "적", "반감", "hostile", "enemy"]
});

const ENVIRONMENT_ALIASES = makeAliasMap({
  검문소: ["검문소", "관문", "checkpoint"],
  성벽: ["성벽", "벽", "wall"],
  숲: ["숲", "까마귀숲", "forest", "woods"],
  실내: ["실내", "집", "방", "inside", "interior"],
  야외: ["야외", "들판", "길가", "outside", "field"],
  전장: ["전장", "전투", "battlefield"],
  지하: ["지하", "수로", "하수로", "underground", "sewer"],
  폐허: ["폐허", "불탄마을", "잔재", "ruins"]
});

const CARD_DEFAULTS = {
  위협: { relationship: "적대", mood: "위험", emotion: "경계" },
  교환: { relationship: "중립", mood: "교환", emotion: "난처" },
  조우: { relationship: "낯섦", mood: "낯섦", emotion: "관심" },
  조사: { relationship: "중립", mood: "조사", emotion: "숙고" },
  이동: { relationship: "중립", mood: "이동", emotion: "단호" },
  정비: { relationship: "중립", mood: "정비", emotion: "피로" }
};

const MOOD_TO_CARD = {
  평온: "정비",
  교환: "교환",
  낯섦: "조우",
  긴장: "위협",
  위험: "위협",
  불안: "위협",
  조사: "조사",
  이동: "이동",
  정비: "정비"
};

const DANGER_MOODS = new Set(["긴장", "위험", "불안"]);
const POSITIVE_EMOTIONS = new Set(["긍정", "강한긍정"]);
const POSITIVE_EXPRESSIONS = new Set(["미소", "환한미소"]);

const SITUATION_PATTERNS = [
  {
    card: "위협",
    mood: "위험",
    relationship: "적대",
    terms: ["위협", "위험", "전투", "전장", "공격", "습격", "추격", "매복", "노르가드", "병사", "적", "칼", "검", "죽음", "함정"]
  },
  {
    card: "교환",
    mood: "교환",
    relationship: "중립",
    terms: ["교환", "거래", "흥정", "대가", "조건", "값", "가격", "보상", "물건", "물자"]
  },
  {
    card: "조사",
    mood: "조사",
    relationship: "중립",
    terms: ["조사", "수색", "단서", "흔적", "발자국", "문서", "지도", "살피", "냄새", "핏자국"]
  },
  {
    card: "이동",
    mood: "이동",
    relationship: "중립",
    terms: ["이동", "탈출", "우회", "길", "건너", "지나", "행군", "문", "성벽", "수로"]
  },
  {
    card: "정비",
    mood: "정비",
    relationship: "중립",
    terms: ["정비", "휴식", "치료", "상처", "붕대", "식량", "물", "장비", "수리", "숨고르"]
  },
  {
    card: "조우",
    mood: "낯섦",
    relationship: "낯섦",
    terms: ["조우", "만남", "사람", "피난민", "아이", "가족", "상인", "문지기", "낯선", "집단"]
  }
];

export default {
  async fetch(request, env = {}) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: TEXT_HEADERS });
    }

    if (!["GET", "HEAD", "POST"].includes(request.method)) {
      return new Response("Method Not Allowed", {
        status: 405,
        headers: { ...TEXT_HEADERS, allow: "GET, HEAD, POST, OPTIONS" }
      });
    }

    if (url.pathname === "/manifest.json") {
      return jsonResponse(renderManifest(url, env), url);
    }

    if (url.pathname === "/" || url.pathname === "") {
      if (!hasDialogueInput(url.searchParams) && request.method !== "POST") {
        return textResponse(renderHelp(url));
      }
    }

    const supportedPath = [
      "/",
      "/dialogue",
      "/dialogue.json",
      "/chat",
      "/chat.svg",
      "/dchat.svg",
      "/panel.svg",
      "/duran",
      "/duran.json",
      "/line",
      "/line.txt",
      "/markdown",
      "/portrait.webp"
    ].includes(url.pathname);

    if (!supportedPath) {
      return new Response("Not Found", { status: 404, headers: TEXT_HEADERS });
    }

    const input = await readInput(request, url);
    const dialogue = buildDialogue(input, env, url);
    const layout = selectPanelLayout(request, input);
    dialogue.panel.width = layout.panelWidth;
    dialogue.panel.height = layout.panelHeight;
    dialogue.panel.ratio = layout.name === "mobile" ? "3:1" : "4:1";
    dialogue.panel.layout = layout.name;

    if (url.pathname === "/portrait.webp") {
      return redirectResponse(dialogue.asset.url);
    }

    const requestedFormat = normalizeFormat(getField(input, FIELD_ALIASES.format));

    if (url.pathname === "/chat.svg" || url.pathname === "/dchat.svg" || url.pathname === "/panel.svg" || requestedFormat === "svg") {
      return svgResponse(renderDialogueSvg(dialogue, layout));
    }

    if (url.pathname === "/line" || url.pathname === "/line.txt" || requestedFormat === "text") {
      return textResponse(`${dialogue.line}\n`);
    }

    if (url.pathname === "/markdown" || requestedFormat === "markdown") {
      return markdownResponse(`${dialogue.markdown}\n`);
    }

    return jsonResponse(dialogue, url);
  }
};

function buildDialogue(input, env = {}, url = null) {
  const scene = normalizeScene(input);
  const requestedEmotions = normalizeEmotionList(getField(input, FIELD_ALIASES.emotion), scene);
  const primaryRequestedEmotion = requestedEmotions[0] || inferEmotion(scene);
  const selectedEmotion = applySceneGuards(primaryRequestedEmotion, scene);

  const requestedExpression = normalizeExpression(getField(input, FIELD_ALIASES.expression));
  const selectedExpression = applyExpressionGuards(
    requestedExpression || EMOTION_TO_EXPRESSION[selectedEmotion] || "대화",
    scene
  );

  const seed = safeText(getField(input, FIELD_ALIASES.seed), "", 120);
  const line = normalizeDialogueLine(getField(input, FIELD_ALIASES.dialogue));
  const files = EXPRESSION_FILES[selectedExpression] || EXPRESSION_FILES.대화;
  const file = pick(files, seed || line || scene.situation, `asset:${selectedExpression}:${scene.card}:${scene.mood}`);
  const assetUrl = makeAssetUrl(env?.ASSET_BASE_URL || DEFAULT_ASSET_BASE_URL, selectedExpression, file);
  const talkingExpression = selectTalkingExpression({ scene, selectedEmotion, selectedExpression });
  const talkingFiles = EXPRESSION_FILES[talkingExpression] || EXPRESSION_FILES.대화;
  const talkingFile = pick(talkingFiles, seed || line || scene.situation, `talking:${talkingExpression}:${scene.card}:${scene.mood}`);
  const talkingAssetUrl = makeAssetUrl(env?.ASSET_BASE_URL || DEFAULT_ASSET_BASE_URL, talkingExpression, talkingFile);
  const baseExpression = "기본";
  const baseFiles = EXPRESSION_FILES[baseExpression] || EXPRESSION_FILES.대화;
  const baseFile = pick(baseFiles, seed || line || scene.situation, `base:${scene.card}:${scene.mood}`);
  const baseAssetUrl = makeAssetUrl(env?.ASSET_BASE_URL || DEFAULT_ASSET_BASE_URL, baseExpression, baseFile);
  const panelUrl = makePanelUrl(url, input);

  const guarded = primaryRequestedEmotion !== selectedEmotion || Boolean(requestedExpression && requestedExpression !== selectedExpression);

  return {
    ok: true,
    character: "듀란",
    line,
    hasLine: Boolean(line),
    speech: `듀란: "${line}"`,
    emotion: {
      requested: requestedEmotions.length ? requestedEmotions : [primaryRequestedEmotion],
      selected: selectedEmotion,
      expression: selectedExpression,
      guarded
    },
    scene,
    asset: {
      url: assetUrl,
      folder: `${DIALOGUE_ASSET_ROOT}/${DIALOGUE_ASSET_FOLDER}/${selectedExpression}`,
      file,
      talking: {
        url: talkingAssetUrl,
        folder: `${DIALOGUE_ASSET_ROOT}/${DIALOGUE_ASSET_FOLDER}/${talkingExpression}`,
        file: talkingFile,
        expression: talkingExpression
      },
      base: {
        url: baseAssetUrl,
        folder: `${DIALOGUE_ASSET_ROOT}/${DIALOGUE_ASSET_FOLDER}/${baseExpression}`,
        file: baseFile,
        expression: baseExpression
      }
    },
    panel: {
      url: panelUrl,
      width: PANEL_WIDTH,
      height: PANEL_HEIGHT,
      ratio: "4:1"
    },
    markdown: panelUrl ? `![듀란 대사](${panelUrl})` : `![듀란 ${selectedExpression}](${assetUrl})\n\n${line}`,
    seed: seed || null
  };
}

function normalizeScene(input) {
  const rawSituation = safeText(getField(input, FIELD_ALIASES.situation), "", 260);
  const inferred = inferSituation(rawSituation);

  const explicitCard = normalizeByAliases(getField(input, FIELD_ALIASES.card), CARD_ALIASES);
  const explicitMood = normalizeByAliases(getField(input, FIELD_ALIASES.mood), MOOD_ALIASES);
  const explicitRelationship = normalizeByAliases(getField(input, FIELD_ALIASES.relationship), RELATIONSHIP_ALIASES);
  const explicitEnvironment = normalizeByAliases(getField(input, FIELD_ALIASES.environment), ENVIRONMENT_ALIASES);

  const mood = explicitMood || inferred.mood || "";
  const card = explicitCard || inferred.card || MOOD_TO_CARD[mood] || "조우";
  const defaults = CARD_DEFAULTS[card] || CARD_DEFAULTS.조우;
  const relationship = explicitRelationship || inferred.relationship || defaults.relationship;
  const finalMood = mood || defaults.mood;
  const environment = explicitEnvironment || inferred.environment || "야외";
  const danger = relationship === "적대" || card === "위협" || DANGER_MOODS.has(finalMood);

  return {
    situation: rawSituation || `${environment} / ${card} / ${finalMood}`,
    card,
    mood: finalMood,
    relationship,
    environment,
    danger
  };
}

function inferSituation(rawSituation) {
  const text = safeText(rawSituation, "", 260);
  const compact = normalizeToken(text);
  const result = {};

  for (const environment of ENVIRONMENT_LIST) {
    if (compact.includes(normalizeToken(environment))) {
      result.environment = environment;
      break;
    }
  }

  const directCard = normalizeByAliases(text, CARD_ALIASES);
  if (directCard) result.card = directCard;

  const directMood = normalizeByAliases(text, MOOD_ALIASES);
  if (directMood) result.mood = directMood;

  const directRelationship = normalizeByAliases(text, RELATIONSHIP_ALIASES);
  if (directRelationship) result.relationship = directRelationship;

  for (const pattern of SITUATION_PATTERNS) {
    if (pattern.terms.some((term) => compact.includes(normalizeToken(term)))) {
      result.card ||= pattern.card;
      result.mood ||= pattern.mood;
      result.relationship ||= pattern.relationship;
      break;
    }
  }

  return result;
}

function normalizeEmotionList(value, scene) {
  const rawValues = splitValues(value);
  const normalized = [];

  for (const raw of rawValues) {
    const emotion = normalizeByAliases(raw, EMOTION_ALIASES);
    if (emotion && !normalized.includes(emotion)) {
      normalized.push(emotion);
    }
  }

  if (!normalized.length && scene) {
    normalized.push(inferEmotion(scene));
  }

  return normalized;
}

function inferEmotion(scene) {
  if (scene.mood === "위험") return "경계";
  if (scene.mood === "불안") return "불안";
  if (scene.mood === "긴장") return "경계";
  if (scene.mood === "조사") return "숙고";
  if (scene.mood === "교환") return "난처";
  if (scene.mood === "낯섦") return "관심";
  if (scene.mood === "이동") return "단호";
  if (scene.mood === "정비") return "피로";
  return CARD_DEFAULTS[scene.card]?.emotion || "중립";
}

function applySceneGuards(emotion, scene) {
  if (!scene.danger || !POSITIVE_EMOTIONS.has(emotion)) {
    return emotion;
  }

  if (scene.mood === "불안") return "불안";
  if (scene.card === "위협") return "경계";
  return "난처";
}

function normalizeExpression(value) {
  return normalizeByAliases(value, EXPRESSION_ALIASES);
}

function applyExpressionGuards(expression, scene) {
  if (scene.danger && POSITIVE_EXPRESSIONS.has(expression)) {
    return scene.mood === "불안" ? "불안대화" : "경계";
  }

  return EXPRESSION_FILES[expression] ? expression : "대화";
}

function selectTalkingExpression({ scene, selectedEmotion, selectedExpression }) {
  if (
    scene.danger ||
    scene.mood === "불안" ||
    selectedEmotion === "불안" ||
    selectedExpression === "불안대화"
  ) {
    return "불안대화";
  }

  return "대화";
}

function normalizeDialogueLine(value) {
  const text = safeText(value, "", 700);
  if (!text) return "";

  return text
    .replace(/^(?:듀란|du|duran|d)\s*[:：]\s*/i, "")
    .replace(/^["“”']|["“”']$/g, "")
    .trim();
}

function makePanelUrl(url, input) {
  if (!url) return "";

  const panelUrl = new URL("/chat.svg", url.origin);
  const fields = [
    ["대사", getField(input, FIELD_ALIASES.dialogue)],
    ["환경", getField(input, FIELD_ALIASES.environment)],
    ["패", getField(input, FIELD_ALIASES.card)],
    ["관계", getField(input, FIELD_ALIASES.relationship)],
    ["분위기", getField(input, FIELD_ALIASES.mood)],
    ["감정", getField(input, FIELD_ALIASES.emotion)],
    ["상황", getField(input, FIELD_ALIASES.situation)],
    ["시드", getField(input, FIELD_ALIASES.seed)],
    ["모바일", getField(input, ["모바일", "mobile", "m"])],
    ["비율", getField(input, ["비율", "ratio", "aspect", "aspectRatio"])]
  ];

  for (const [key, value] of fields) {
    const text = safeText(value, "", key === "대사" ? 700 : 260);
    if (text) panelUrl.searchParams.set(key, text);
  }

  return panelUrl.toString();
}

function selectPanelLayout(request, input) {
  const explicit = safeText(
    getField(input, ["모바일", "mobile", "m", "레이아웃", "layout", "비율", "ratio", "aspect", "aspectRatio"]),
    "",
    80
  );
  const explicitToken = normalizeToken(explicit);

  if (["0", "false", "desktop", "pc", "4", "41", "4대1"].includes(explicitToken)) {
    return DESKTOP_LAYOUT;
  }

  if (["1", "true", "mobile", "m", "phone", "3", "31", "3대1"].includes(explicitToken)) {
    return MOBILE_LAYOUT;
  }

  const cfDeviceType = safeText(request.headers.get("cf-device-type") || request.cf?.deviceType, "", 40);
  if (normalizeToken(cfDeviceType) === "mobile") {
    return MOBILE_LAYOUT;
  }

  const userAgent = request.headers.get("user-agent") || "";
  if (/\b(Android|iPhone|iPod|Mobile|Windows Phone)\b/i.test(userAgent)) {
    return MOBILE_LAYOUT;
  }

  return DESKTOP_LAYOUT;
}

function renderDialogueSvg(dialogue, layout = DESKTOP_LAYOUT) {
  const line = dialogue.line || "";
  const lines = wrapDialogueText(line, layout.textCharsPerLine, layout.textMaxLines);
  const hasOverflow = lines.overflow;
  const textLines = lines.items.length ? lines.items : [""];
  const firstTextY = layout.textTop + Math.max(0, (layout.textMaxLines - textLines.length) * layout.textLineHeight * 0.28);
  const bubblePath = renderSpeechBubblePath(layout);
  const displayLines = textLines.map((part, index) => {
    const suffix = hasOverflow && index === textLines.length - 1 ? "…" : "";
    return part + suffix;
  });
  const typingPlan = buildTypingPlan(displayLines);
  const loopDuration = BASE_FACE_SECONDS + typingPlan.totalDuration + EMOTION_FACE_SECONDS;
  const typingClipDefs = renderTypingClipDefs({ displayLines, firstTextY, typingPlan, loopDuration, layout });
  const faceLayers = renderFaceLayers(dialogue, { typingDuration: typingPlan.totalDuration, loopDuration, layout });
  const typedText = renderTypedText({ displayLines, firstTextY, layout });

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 ${layout.panelWidth} ${layout.panelHeight}"
  width="100%"
  height="100%"
  style="display:block;width:100%;height:auto;max-width:100%;"
  preserveAspectRatio="xMidYMid meet"
>
  <defs>
    <clipPath id="faceCircle">
      <circle cx="${fmtSvg(layout.faceCenter)}" cy="${fmtSvg(layout.faceCenter)}" r="${fmtSvg(layout.faceCircleRadius)}" />
    </clipPath>
    ${typingClipDefs}
    <filter id="bubbleShadow" x="-10%" y="-20%" width="120%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#12262a" flood-opacity="0.16" />
    </filter>
  </defs>
  <circle
    cx="${fmtSvg(layout.faceCenter)}"
    cy="${fmtSvg(layout.faceCenter)}"
    r="${fmtSvg(layout.faceCircleRadius)}"
    fill="${FACE_BACKGROUND}"
  />
  ${faceLayers}
  <path d="${bubblePath}" fill="#ffffff" stroke="${BUBBLE_BORDER_COLOR}" stroke-width="2.25" filter="url(#bubbleShadow)" />
  ${renderNameLabel(layout)}
  ${typedText}
</svg>`;
}

function renderFaceLayers(dialogue, { typingDuration, loopDuration, layout }) {
  const baseUrl = dialogue.asset.base?.url || dialogue.asset.url;
  const finalUrl = dialogue.asset.url;
  const talkingUrl = dialogue.asset.talking?.url || finalUrl;
  const baseEnd = BASE_FACE_SECONDS;
  const typingEnd = BASE_FACE_SECONDS + typingDuration;
  const baseFadeEnd = Math.min(baseEnd + FACE_FADE_SECONDS, typingEnd);
  const emotionFadeEnd = Math.min(typingEnd + FACE_FADE_SECONDS, loopDuration);

  return [
    renderFaceImage(
      baseUrl,
      "1",
      layout,
      renderLoopOpacityAnimation({
        loopDuration,
        values: ["1", "1", HIDDEN_FACE_OPACITY, HIDDEN_FACE_OPACITY],
        times: [0, baseEnd, baseFadeEnd, loopDuration]
      })
    ),
    renderFaceImage(
      talkingUrl,
      HIDDEN_FACE_OPACITY,
      layout,
      renderLoopOpacityAnimation({
        loopDuration,
        values: [HIDDEN_FACE_OPACITY, HIDDEN_FACE_OPACITY, "1", "1", HIDDEN_FACE_OPACITY, HIDDEN_FACE_OPACITY],
        times: [0, baseEnd, baseFadeEnd, typingEnd, emotionFadeEnd, loopDuration]
      })
    ),
    renderFaceImage(
      finalUrl,
      HIDDEN_FACE_OPACITY,
      layout,
      renderLoopOpacityAnimation({
        loopDuration,
        values: [HIDDEN_FACE_OPACITY, HIDDEN_FACE_OPACITY, "1", "1"],
        times: [0, typingEnd, emotionFadeEnd, loopDuration]
      })
    )
  ].join("\n  ");
}

function renderLoopOpacityAnimation({ loopDuration, values, times }) {
  return `<animate
      attributeName="opacity"
      values="${values.join(";")}"
      keyTimes="${times.map((time) => fmtSvg(time / loopDuration)).join(";")}"
      dur="${fmtSeconds(loopDuration)}s"
      repeatCount="indefinite"
    />`;
}

function renderFaceImage(url, opacity, layout, animation = "") {
  return `<image
    href="${escapeXml(url)}"
    x="${fmtSvg(layout.faceImageX)}"
    y="${fmtSvg(layout.faceImageY)}"
    width="${fmtSvg(layout.faceImageSize)}"
    height="${fmtSvg(layout.faceImageSize)}"
    preserveAspectRatio="xMidYMin slice"
    clip-path="url(#faceCircle)"
    opacity="${opacity}"
  >${animation}</image>`;
}

function buildTypingPlan(lines) {
  const units = lines.map((line) => Math.max(1, Math.ceil(countTextUnits(line))));
  const totalUnits = units.reduce((sum, value) => sum + value, 0);

  if (!lines.some(Boolean)) {
    return {
      totalDuration: 0,
      lines: lines.map(() => ({ begin: 0, duration: 0, steps: 1 }))
    };
  }

  const totalDuration = TYPING_FACE_SECONDS;
  const secondsPerUnit = totalDuration / totalUnits;
  let cursor = 0;

  return {
    totalDuration,
    lines: units.map((unit) => {
      const duration = unit * secondsPerUnit;
      const entry = {
        begin: cursor,
        duration,
        steps: Math.max(1, unit)
      };
      cursor += duration;
      return entry;
    })
  };
}

function renderTypingClipDefs({ displayLines, firstTextY, typingPlan, loopDuration, layout }) {
  return displayLines.map((line, index) => {
    const y = firstTextY + index * layout.textLineHeight - layout.textFontSize;
    const timing = typingPlan.lines[index] || { begin: 0, duration: 0, steps: 1 };
    const width = line ? layout.textAreaWidth : 0;

    return `<clipPath id="typingLineClip${index}">
      <rect x="${fmtSvg(layout.textX)}" y="${fmtSvg(y)}" width="0" height="${layout.textClipHeight}">
        ${renderLoopedWidthAnimation({ width, timing, loopDuration })}
      </rect>
    </clipPath>`;
  }).join("\n    ");
}

function renderLoopedWidthAnimation({ width, timing, loopDuration }) {
  if (!width || !timing.duration) return "";

  const steps = Math.max(1, timing.steps);
  const values = ["0", "0"];
  const keyTimes = ["0", fmtSvg((BASE_FACE_SECONDS + timing.begin) / loopDuration)];

  for (let index = 1; index <= steps; index += 1) {
    const localTime = timing.begin + timing.duration * (index / steps);
    values.push(fmtSvg((width * index) / steps));
    keyTimes.push(fmtSvg((BASE_FACE_SECONDS + localTime) / loopDuration));
  }

  values.push(fmtSvg(width));
  keyTimes.push("1");

  return `<animate
          attributeName="width"
          values="${values.join(";")}"
          keyTimes="${keyTimes.join(";")}"
          calcMode="discrete"
          dur="${fmtSeconds(loopDuration)}s"
          repeatCount="indefinite"
        />`;
}

function renderTypedText({ displayLines, firstTextY, layout }) {
  return displayLines.map((line, index) => {
    const y = firstTextY + index * layout.textLineHeight;

    return `<text
    font-family="Pretendard, 'Noto Sans KR', 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif"
    font-size="${layout.textFontSize}"
    font-weight="700"
    letter-spacing="0"
    fill="#162328"
    clip-path="url(#typingLineClip${index})"
  ><tspan x="${layout.textX}" y="${fmtSvg(y)}">${escapeXml(line)}</tspan></text>`;
  }).join("\n  ");
}

function renderSpeechBubblePath(layout) {
  const x = layout.bubbleX;
  const y = layout.bubbleY;
  const w = layout.bubbleWidth;
  const h = layout.bubbleHeight;
  const r = layout.bubbleRadius;
  const tailY = y + h * 0.5;
  const tailHalf = 14;
  const tailTipX = x - 22;

  return [
    `M ${fmtSvg(x + r)} ${fmtSvg(y)}`,
    `H ${fmtSvg(x + w - r)}`,
    `Q ${fmtSvg(x + w)} ${fmtSvg(y)} ${fmtSvg(x + w)} ${fmtSvg(y + r)}`,
    `V ${fmtSvg(y + h - r)}`,
    `Q ${fmtSvg(x + w)} ${fmtSvg(y + h)} ${fmtSvg(x + w - r)} ${fmtSvg(y + h)}`,
    `H ${fmtSvg(x + r)}`,
    `Q ${fmtSvg(x)} ${fmtSvg(y + h)} ${fmtSvg(x)} ${fmtSvg(y + h - r)}`,
    `V ${fmtSvg(tailY + tailHalf)}`,
    `L ${fmtSvg(tailTipX)} ${fmtSvg(tailY)}`,
    `L ${fmtSvg(x)} ${fmtSvg(tailY - tailHalf)}`,
    `V ${fmtSvg(y + r)}`,
    `Q ${fmtSvg(x)} ${fmtSvg(y)} ${fmtSvg(x + r)} ${fmtSvg(y)}`,
    "Z"
  ].join(" ");
}

function renderNameLabel(layout) {
  return `<g>
    <rect
      x="${fmtSvg(layout.nameLabelX)}"
      y="${fmtSvg(layout.nameLabelY)}"
      width="${fmtSvg(layout.nameLabelWidth)}"
      height="${fmtSvg(layout.nameLabelHeight)}"
      rx="${fmtSvg(layout.nameLabelRadius)}"
      ry="${fmtSvg(layout.nameLabelRadius)}"
      fill="${FACE_BACKGROUND}"
      stroke="#00aeb8"
      stroke-width="2"
    />
    <text
      x="${fmtSvg(layout.nameLabelX + layout.nameLabelWidth / 2)}"
      y="${fmtSvg(layout.nameLabelY + layout.nameLabelTextOffsetY)}"
      text-anchor="middle"
      font-family="Inter, Pretendard, 'Noto Sans KR', 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif"
      font-size="${layout.nameLabelFontSize}"
      font-weight="800"
      letter-spacing="0"
      fill="#08252a"
    >${NAME_LABEL_TEXT}</text>
  </g>`;
}

function wrapDialogueText(text, maxChars, maxLines) {
  const normalized = safeText(text, "", 700);
  if (!normalized) return { items: [], overflow: false };

  const words = normalized.split(" ");
  const lines = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;

    if (countTextUnits(next) <= maxChars) {
      current = next;
      continue;
    }

    if (current) lines.push(current);

    if (countTextUnits(word) > maxChars) {
      const chunks = chunkLongText(word, maxChars);
      lines.push(...chunks.slice(0, -1));
      current = chunks[chunks.length - 1] || "";
    } else {
      current = word;
    }
  }

  if (current) lines.push(current);

  const overflow = lines.length > maxLines;
  return {
    items: lines.slice(0, maxLines),
    overflow
  };
}

function chunkLongText(text, maxChars) {
  const chars = [...text];
  const chunks = [];
  let current = "";

  for (const char of chars) {
    const next = current + char;
    if (countTextUnits(next) > maxChars && current) {
      chunks.push(current);
      current = char;
    } else {
      current = next;
    }
  }

  if (current) chunks.push(current);
  return chunks;
}

function countTextUnits(text) {
  return [...text].reduce((sum, char) => sum + (/[ -~]/.test(char) ? 0.56 : 1), 0);
}

async function readInput(request, url) {
  const queryInput = paramsToObject(url.searchParams);

  if (request.method !== "POST") {
    return queryInput;
  }

  const contentType = request.headers.get("content-type") || "";
  let bodyInput = {};

  if (contentType.includes("application/json")) {
    bodyInput = await readJsonBody(request);
  } else if (contentType.includes("application/x-www-form-urlencoded")) {
    bodyInput = paramsToObject(new URLSearchParams(await request.text()));
  } else if (contentType.includes("multipart/form-data")) {
    const form = await request.formData();
    bodyInput = formDataToObject(form);
  } else {
    const text = await request.text();
    bodyInput = parseLooseTextBody(text);
  }

  return { ...queryInput, ...bodyInput };
}

async function readJsonBody(request) {
  try {
    const data = await request.json();
    return data && typeof data === "object" && !Array.isArray(data) ? data : {};
  } catch {
    return {};
  }
}

function parseLooseTextBody(text) {
  const safe = safeText(text, "", 1000);
  if (!safe) return {};

  if (safe.includes("=")) {
    return paramsToObject(new URLSearchParams(safe));
  }

  return { 대사: safe };
}

function paramsToObject(searchParams) {
  const output = {};

  for (const [key, value] of searchParams) {
    if (Object.prototype.hasOwnProperty.call(output, key)) {
      output[key] = Array.isArray(output[key]) ? [...output[key], value] : [output[key], value];
    } else {
      output[key] = value;
    }
  }

  return output;
}

function formDataToObject(formData) {
  const output = {};

  for (const [key, value] of formData.entries()) {
    output[key] = typeof value === "string" ? value : value.name;
  }

  return output;
}

function getField(input, aliases) {
  const wanted = new Set(aliases.map(normalizeKey));

  for (const [key, value] of Object.entries(input || {})) {
    if (wanted.has(normalizeKey(key)) && value !== undefined && value !== null && value !== "") {
      return value;
    }
  }

  return "";
}

function normalizeFormat(value) {
  const token = normalizeToken(value);
  if (["text", "txt", "line", "plain"].includes(token)) return "text";
  if (["markdown", "md"].includes(token)) return "markdown";
  if (["svg", "image", "panel"].includes(token)) return "svg";
  return "json";
}

function normalizeByAliases(value, aliases) {
  const text = safeText(value, "", 160);
  if (!text) return "";

  const token = normalizeToken(text);
  if (aliases[token]) return aliases[token];

  for (const part of splitValues(text)) {
    const partToken = normalizeToken(part);
    if (aliases[partToken]) return aliases[partToken];
  }

  return "";
}

function splitValues(value) {
  if (value === undefined || value === null || value === "") return [];
  const source = Array.isArray(value) ? value : [value];
  const values = [];

  for (const item of source) {
    const text = safeText(item, "", 260);
    if (!text) continue;
    values.push(...text.split(/[,\|;/+]+/).map((part) => part.trim()).filter(Boolean));
  }

  return values;
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

function makeAliasMap(groups) {
  const output = {};

  for (const [canonical, aliases] of Object.entries(groups)) {
    output[normalizeToken(canonical)] = canonical;
    for (const alias of aliases) {
      output[normalizeToken(alias)] = canonical;
    }
  }

  return output;
}

function numberedFiles(prefix, start, end) {
  const files = [];
  for (let number = start; number <= end; number += 1) {
    files.push(`${prefix}${number}_10F.webp`);
  }
  return files;
}

function makeAssetUrl(baseUrl, expression, file) {
  const cleanBase = safeText(baseUrl, DEFAULT_ASSET_BASE_URL, 300).replace(/\/+$/, "");
  return [
    cleanBase,
    encodeURIComponent(DIALOGUE_ASSET_ROOT),
    encodeURIComponent(DIALOGUE_ASSET_FOLDER),
    encodeURIComponent(expression),
    encodeURIComponent(file)
  ].join("/");
}

function pick(items, seed, salt = "") {
  if (!items.length) return "";
  if (items.length === 1) return items[0];

  if (seed) {
    return items[hashToIndex(`${seed}:${salt}`, items.length)];
  }

  const random = new Uint32Array(1);
  crypto.getRandomValues(random);
  return items[random[0] % items.length];
}

function hashToIndex(value, modulo) {
  let hash = 2166136261;
  const text = safeText(value, "", 1000);

  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return (hash >>> 0) % modulo;
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function escapeXml(value) {
  return safeText(value, "", 1000)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function fmtSvg(value) {
  return Number.parseFloat(value).toFixed(2).replace(/\.?0+$/, "");
}

function fmtSeconds(value) {
  return Number.parseFloat(value).toFixed(3).replace(/\.?0+$/, "");
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function hasDialogueInput(searchParams) {
  const keys = [...searchParams.keys()].map(normalizeKey);
  return FIELD_ALIASES.dialogue.some((alias) => keys.includes(normalizeKey(alias))) ||
    FIELD_ALIASES.emotion.some((alias) => keys.includes(normalizeKey(alias))) ||
    FIELD_ALIASES.situation.some((alias) => keys.includes(normalizeKey(alias)));
}

function renderManifest(url, env = {}) {
  return {
    ok: true,
    service: "Duran Dialogue Worker",
    origin: url.origin,
    assetBaseUrl: env?.ASSET_BASE_URL || DEFAULT_ASSET_BASE_URL,
    endpoints: ["/chat.svg", "/dialogue", "/line.txt", "/markdown", "/portrait.webp", "/manifest.json"],
    queryKeys: FIELD_ALIASES,
    emotions: EMOTION_LIST,
    cards: CARD_LIST,
    moods: MOOD_LIST,
    relationships: RELATIONSHIP_LIST,
    environments: ENVIRONMENT_LIST,
    expressions: Object.keys(EXPRESSION_FILES)
  };
}

function renderHelp(url) {
  return [
    "Duran Dialogue Worker is running.",
    "",
    "Examples:",
    `  ${url.origin}/chat.svg?환경=전장&패=위협&관계=적대&분위기=위험&감정=경계&대사=조용히 하세요. 앞쪽에 움직임이 있습니다.`,
    `  ${url.origin}/dialogue?환경=숲&패=조사&관계=중립&분위기=조사&감정=숙고&대사=발자국이 한 방향으로만 나 있지 않습니다.`,
    `  ${url.origin}/line.txt?대사=지금 움직입니다. 망설이면 기회가 사라집니다.`,
    `  ${url.origin}/portrait.webp?감정=불안&상황=추격`,
    "",
    "GET query and POST JSON are both supported.",
    "The worker does not write Duran's dialogue. Pass the chatbot's D line through 대사/D/line/text.",
    "Sprite-compatible keys: 환경, 패/카드, 관계, 분위기, 감정",
    "Extra keys: 대사, 상황, 시드, 형식",
    "English keys: line/text/dialogue, emotion, situation, environment, card, relationship, mood, seed, format",
    "",
    "Supported emotions:",
    `  ${EMOTION_LIST.join(", ")}`,
    "",
    "Supported situations/cards:",
    `  ${CARD_LIST.join(", ")}`,
    "",
    "Manifest:",
    `  ${url.origin}/manifest.json`
  ].join("\n");
}

function textResponse(text, init = {}) {
  return new Response(text, {
    ...init,
    headers: { ...TEXT_HEADERS, ...(init.headers || {}) }
  });
}

function markdownResponse(markdown, init = {}) {
  return new Response(markdown, {
    ...init,
    headers: { ...MARKDOWN_HEADERS, ...(init.headers || {}) }
  });
}

function svgResponse(svg, init = {}) {
  return new Response(compactSvg(svg), {
    ...init,
    headers: { ...SVG_HEADERS, ...(init.headers || {}) }
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

function jsonResponse(data, url, init = {}) {
  const pretty = url?.searchParams?.get("pretty") === "1";
  return new Response(JSON.stringify(data, null, pretty ? 2 : 0), {
    ...init,
    headers: { ...JSON_HEADERS, ...(init.headers || {}) }
  });
}

function redirectResponse(location) {
  return new Response(null, {
    status: 302,
    headers: {
      ...BASE_HEADERS,
      location
    }
  });
}

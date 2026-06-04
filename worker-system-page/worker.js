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
    id: "current-system",
    title: "추가 데이터",
    lead: "챗봇이 실제 답변을 어떤 형식으로 내보내야 하는지 정하는 추가 데이터입니다. 시스템의 출력 규칙과 Worker 호출 규칙을 붙잡습니다.",
    items: [
      {
        title: "현재 진행 시스템 원문",
        path: "lorebook_texts/00_현재_진행시스템.txt",
        kind: "system",
        note: "챗봇이 밖으로 일반 서사를 흘리지 않고, 정해진 출력 칸과 Worker 호출 주소 안에 내용을 넣도록 잡아주는 가장 중요한 규칙입니다.",
        details: [
          "정본 용어를 고정합니다. 상태는 상단ST/하단ST, 본문은 운명의흔적본문/새운명의패본문, 값은 FATE/LASTFATE처럼 이름을 통일합니다.",
          "챗봇 답변은 상단 고정 이미지, turnURL, GM_STATE 주석 3줄로 끝나야 합니다. 이 규칙 때문에 챗봇이 Worker 밖으로 이야기를 이어 쓰는 일을 막습니다.",
          "turnURL 안에 장면 본문, 다음 카드 본문, 대사, 상태값, 피해, 보상, 변화가 들어갑니다. 즉 사용자가 보는 이야기는 URL 값 안에 실려 Worker 화면으로 나갑니다.",
          "URL 예약문자 치환 규칙을 정합니다. 공백, 문단, 줄바꿈, &, #, %, ?, = 같은 문자가 주소를 깨지 않도록 바꾸는 역할입니다.",
          "!debug 입력은 직전 출력이 3줄 규칙을 지켰는지 검사하는 복구 명령입니다. 새 진행을 만들지 않고 같은 상태로 다시 출력하게 합니다.",
          "턴 진행 규칙을 정합니다. 지난 패의 해결은 운명의흔적본문에 닫고, 다음 패의 상황은 새운명의패본문에 열어 사용자가 다음 입력을 할 지점에서 멈추게 합니다.",
          "HP, 금화, 식량, 소지품, 상태, 사망 조건을 유지합니다. 실제로 바뀐 값만 하단ST와 damage/reward/change에 반영하게 합니다."
        ]
      }
    ]
  },
  {
    id: "world",
    title: "캐릭터 설정",
    lead: "듀란이 놓인 세계, 관전층, 환경 진행, 해금 장소를 정하는 설정입니다. 캐릭터가 자기 세계 안에서 어떻게 움직여야 하는지 기준을 줍니다.",
    items: [
      {
        title: "세계관 진행축",
        path: "lorebook_texts/세계관_진행축.txt",
        kind: "world",
        note: "챗봇이 아무 장면이나 만들지 않도록, 듀란 일대기의 큰 배경과 진행 방향을 붙잡아주는 캐릭터 설정 기준점입니다.",
        details: [
          "PL, DU, VM의 위치를 나눕니다. 플레이어와 장막은 관전층에 있고, 듀란은 자기 세계 안에서 사건과 위험을 겪는 사람으로 움직입니다.",
          "시작 무대를 고정합니다. 티리스 서력 5083년 2월 9일 새벽, 레이븐스톤 북부 국경지대가 기본 출발점입니다.",
          "로우판타지 톤을 정합니다. 피로, 지형, 부상, 인과가 생존을 좌우하고 초자연 현상은 드물고 부담이 따릅니다.",
          "환경 진행 방식을 정합니다. 전장, 숲, 폐허, 성벽, 검문소, 지하, 실내 중 하나가 매 턴 선택되고 누적 횟수가 상태값에 남습니다.",
          "모든 환경이 5회 이상 채워지기 전에는 일반 환경만 씁니다. 이 구간은 목적지를 바로 확정하지 않고 단서와 추격, 생존 압박으로 이어집니다.",
          "환경이 충분히 진행되면 뉴 홀로우, 레이븐스톤 진입로, 검문소, 지하수로, 피신한 집 같은 심화 장소가 해금됩니다.",
          "캐릭터 정보 관리가 인물 정본임을 선언합니다. 성격, 비밀, 등장 조건은 이 파일이 아니라 캐릭터 정보 관리 파일을 우선합니다."
        ]
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
        note: "상태값과 진행 필드를 유지하는 로어북 조각입니다.",
        details: [
          "상단ST와 하단ST가 어디에 들어가는지 정합니다. 상태창을 따로 쓰지 않고 turnURL 안의 값으로만 보냅니다.",
          "상단ST 두 줄 형식을 고정합니다. 날짜와 현장, 카드, 환경, 진행도를 매 턴 같은 모양으로 보여주게 합니다.",
          "하단ST에 듀란의 배경, HP, 능력치, 금화, 식량, 소지품, 상태를 넣게 합니다.",
          "카드 아이콘은 화면 표시용이고, URL/SVG 카드키는 아이콘 없는 한글키를 쓰게 나눕니다.",
          "색틈 단서를 어떤 능력치와 연결할지 정합니다. 단순 분위기가 아니라 실제로 활용 가능한 단서만 색틈으로 표시하게 합니다."
        ]
      },
      {
        title: "02 CARD 색틈",
        path: "lorebook_texts/02_CARD_색틈.txt",
        kind: "lorebook",
        note: "운명의 패, 색, 틈새 같은 카드 기반 진행 요소를 정의합니다.",
        details: [
          "새운명의패본문의 역할을 정합니다. 다음 패의 상황, 새 단서, 새 위험, 장막 평가를 넣어 사용자가 다음 행동을 고르게 합니다.",
          "FATE 값을 1~8 정수로 고정합니다. 이 값은 플레이어와 장막이 보는 새 패의 값으로 쓰입니다.",
          "패, 환경, 관계, 분위기, 감정 값을 정해 Worker가 카드와 장면을 일관되게 그릴 수 있게 합니다.",
          "NPC와 장막 대사는 본문에 두고, line 슬롯에는 컷씬용 대사만 넣게 분리합니다.",
          "힘, 민, 지, 의, 운의 판정 분류를 정의합니다. 플레이어 행동을 어떤 능력치로 판정할지 고르는 기준입니다."
        ]
      },
      {
        title: "04 새운명의패 SVG",
        path: "lorebook_texts/04_새운명의패SVG.txt",
        kind: "lorebook",
        note: "새 카드/운명패를 Worker 이미지 출력으로 연결하는 규칙입니다.",
        details: [
          "새운명의패본문을 Worker가 읽을 수 있는 BODY_START/BODY_END 형식으로 감싸게 합니다.",
          "새 패를 시작하는 문장은 사용자의 다음 입력 직전에서 멈추도록 합니다. 챗봇이 해결까지 먼저 써버리지 않게 막습니다.",
          "veil, card, relationship, mood, emotion 같은 화면용 값을 정해 새 운명패 SVG가 어떤 분위기로 보일지 알려줍니다.",
          "장막 또는 NPC 대사와 컷씬 대사를 분리해, 카드 본문과 대사창이 서로 섞이지 않게 합니다.",
          "한글 값과 공백 처리 규칙을 유지해 Worker URL이 깨지지 않게 합니다."
        ]
      },
      {
        title: "05 판정 피해보상",
        path: "lorebook_texts/05_판정_피해보상.txt",
        kind: "lorebook",
        note: "판정 결과, 피해, 보상 처리를 챗봇 진행과 연결합니다.",
        details: [
          "플레이어 행동을 힘, 민, 지, 의, 운 중 하나로 분류하게 합니다.",
          "소비품과 색틈은 숫자값으로 보내고, 피해/보상/변화는 실제 결과가 있을 때만 채우게 합니다.",
          "피해 후보를 정합니다. HP, 금화, 식량 감소뿐 아니라 위치 악화, 추적 강화, 정보 손실, 오해 같은 서사 손실도 포함합니다.",
          "보상 후보를 정합니다. 자원, 소지품, 단서, 위치 개선, 우회로, 위험 감소 같은 진행 이득을 반영합니다.",
          "판정 결과가 운명의흔적본문과 하단ST에 동시에 반영되도록 연결합니다."
        ]
      },
      {
        title: "07 시작 배경설정",
        path: "lorebook_texts/07_시작_배경설정.txt",
        kind: "lorebook",
        note: "초기 장면과 시작 조건을 잡는 로어북 조각입니다.",
        details: [
          "듀란의 시작 배경을 선택사항으로 둡니다. 명확한 입력이 없어도 기본 배경을 유지할 수 있게 합니다.",
          "기본값은 하로몬트의 종자입니다. HP, 능력치, 금화, 식량, 하로몬트유품을 초기 상태로 줍니다.",
          "불탄 마을의 잔재, 까마귀숲의 발자국, 이름 낮춘 피난자 같은 배경 선택지를 능력치와 소지품에 연결합니다.",
          "진행 중에 배경 선택이 뒤늦게 드러나도 장면상 자연스러우면 변화로 반영할 수 있게 합니다."
        ]
      },
      {
        title: "10 사망엔딩",
        path: "lorebook_texts/10_사망엔딩.txt",
        kind: "lorebook",
        note: "사망 또는 종료 상태에 도달했을 때의 처리 기준입니다.",
        details: [
          "사망엔딩에 들어가면 일반 턴 출력이 아니라 엔딩 출력으로 전환합니다.",
          "첫 줄에 사망 표시를 단독으로 두고, 이후에는 장막과 플레이어의 엔딩 대화만 이어가게 합니다.",
          "진행 시스템을 사망END_CARD로 닫아 더 이상 일반 카드 루프가 계속되지 않게 합니다.",
          "장막은 끝난 판을 내려다보며 대가, 허무, 다음 이야기의 그림자를 말하는 역할로 고정됩니다."
        ]
      },
      {
        title: "11 장막의 음모",
        path: "lorebook_texts/11_장막의_음모.txt",
        kind: "lorebook",
        note: "장막 세력과 음모 축을 진행 중 긴장 요소로 넣는 로어북입니다.",
        details: [
          "장막이 단순 진행자가 아니라 듀란과 플레이어의 절망을 관찰하고 원한다는 긴장 축을 줍니다.",
          "판정값은 추가 데이터의 URL 슬롯 기준을 따르게 하여 별도 규칙으로 갈라지지 않게 합니다.",
          "장막의 말투는 은근한 조롱과 냉소를 유지하고, 큰 실패에는 즐거워하는 기색을 드러내게 합니다.",
          "이 파일은 장막의 태도와 압박감을 강화해 매 턴의 평가와 위험을 더 날카롭게 만드는 역할입니다."
        ]
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
        note: "상태 유지 규칙의 압축본입니다.",
        details: [
          "상단ST와 하단ST가 turnURL 값이라는 핵심만 짧게 남긴 버전입니다.",
          "상단ST 두 줄 형식, 카드/환경/진행 표시, 하단ST의 HP/능력/자원/소지품/상태 구조를 압축해 둡니다.",
          "HTML이나 스타일을 넣지 말고 값만 보내라는 규칙을 짧게 보존합니다."
        ]
      },
      {
        title: "02 CARD 색틈 500",
        path: "lorebook_texts_500/02_CARD_색틈.txt",
        kind: "lorebook-short",
        note: "카드/색틈 규칙의 압축본입니다.",
        details: [
          "카드키, 관계, 분위기 기본값을 짧게 묶어 Worker가 장면 성격을 고를 수 있게 합니다.",
          "색틈 단서를 능력치 판정과 연결하는 핵심 조건을 압축해 둡니다.",
          "같은 카드키 반복 제한과 같은 색틈 분류 반복 금지처럼 진행이 단조로워지는 것을 막는 규칙을 남깁니다."
        ]
      },
      {
        title: "04 새운명의패 SVG 500",
        path: "lorebook_texts_500/04_새운명의패SVG.txt",
        kind: "lorebook-short",
        note: "운명패 SVG 출력 규칙의 압축본입니다.",
        details: [
          "새운명의패본문의 구조와 역할을 짧게 정리합니다.",
          "FATE, veil, card, 환경, 관계, 분위기, 감정 같은 새 패 화면값을 유지합니다.",
          "장막/NPC 대사와 컷씬 line 슬롯을 분리하는 규칙을 압축해 보존합니다."
        ]
      },
      {
        title: "05 판정 피해보상 500",
        path: "lorebook_texts_500/05_판정_피해보상.txt",
        kind: "lorebook-short",
        note: "판정/피해/보상 규칙의 압축본입니다.",
        details: [
          "힘, 민, 지, 의, 운 분류를 짧게 정의해 플레이어 행동을 어느 능력으로 볼지 정합니다.",
          "소비품, 색틈, 피해, 보상, 변화의 기본값과 사용 조건을 압축합니다.",
          "피해 후보와 보상 후보를 짧게 남겨 결과가 단순 성공/실패가 아니라 장면 변화로 이어지게 합니다."
        ]
      },
      {
        title: "07 시작 배경설정 500",
        path: "lorebook_texts_500/07_시작_배경설정.txt",
        kind: "lorebook-short",
        note: "시작 배경 설정의 압축본입니다.",
        details: [
          "기본 배경과 세 가지 선택 배경을 짧게 보존합니다.",
          "각 배경이 능력치와 1회성 소지품 또는 자원에 어떻게 연결되는지 보여줍니다.",
          "뒤늦게 배경이 명확해져도 자연스러우면 진행 중 반영할 수 있다는 유연성을 남깁니다."
        ]
      },
      {
        title: "10 사망엔딩 500",
        path: "lorebook_texts_500/10_사망엔딩.txt",
        kind: "lorebook-short",
        note: "사망 엔딩 처리의 압축본입니다.",
        details: [
          "사망 시 일반 턴 출력이 아니라 엔딩 출력으로 바뀐다는 점을 짧게 남깁니다.",
          "첫 줄 사망 표시와 장막/플레이어 엔딩 대화 구조를 유지합니다.",
          "사망END_CARD로 진행을 닫아 카드 루프가 계속되지 않게 합니다."
        ]
      },
      {
        title: "11 장막의 음모 500",
        path: "lorebook_texts_500/11_장막의_음모.txt",
        kind: "lorebook-short",
        note: "장막의 음모 축 압축본입니다.",
        details: [
          "장막이 듀란과 플레이어의 절망에 흥미를 느낀다는 태도를 압축해 둡니다.",
          "판정값 기준은 추가 데이터의 URL 슬롯을 따르게 해 규칙이 갈라지지 않게 합니다.",
          "조롱과 실패에 대한 반응을 짧게 남겨 장막의 목소리가 흔들리지 않게 합니다."
        ]
      }
    ]
  },
  {
    id: "characters",
    title: "캐릭터 정보 관리 (시뮬레이션 무한 프롬프트 전용)",
    lead: "인물의 성격, 비밀, 등장 조건을 관리하는 전용 자료입니다. 시스템과 로어북이 진행 규칙을 맡고, 이 카테고리는 인물 정본을 맡습니다.",
    items: [
      {
        title: "캐릭터 정보 관리 문서",
        path: "character_info/캐릭터_정보_관리.md",
        kind: "character",
        note: "시뮬레이션 무한 프롬프트에 넣기 위한 캐릭터 정보 관리 정본입니다.",
        details: [
          "시스템/로어북에는 진행 규칙과 환경축만 두고, 인물의 성격, 비밀, 등장 조건은 이 문서를 우선하게 합니다.",
          "장막은 진행자이자 냉소적인 관찰자입니다. 패, 값, 길, 대가를 말하며 듀란의 생존을 차갑게 비춥니다.",
          "듀란은 영웅형 주인공이 아니라 겁, 죄책감, 생존본능, 하로몬트의 마지막 부탁에 묶여 움직이는 어린 종자입니다.",
          "엘리나는 해금 후 발견되는 비극의 중심입니다. 이미 사망한 상태로 발견되어 듀란의 목적과 대가를 선명하게 만듭니다.",
          "엘라린은 엘리나와 하로몬트의 딸입니다. 듀란이 비극 이후 무엇을 지켜야 하는지 보여주는 후속 목표가 됩니다.",
          "보보는 매턴 단서나 물건을 주워오는 동행입니다. 기묘한 물건은 장면 소품이 되고, 쓸 만한 물건은 보상이나 변화에 반영됩니다.",
          "마렌 로완은 첫 동료 후보입니다. 길찾기, 수선, 응급처치, 사람 손짓 읽기에 강해 피난길 생존 보조자로 작동합니다."
        ]
      },
      {
        title: "characters.json",
        path: "character_info/characters.json",
        kind: "character",
        note: "캐릭터 정보 관리 문서를 도구가 읽기 쉬운 구조화 데이터로 옮긴 원문입니다.",
        details: [
          "각 캐릭터를 name, affiliation, appearance_condition, summary, detail 필드로 나눕니다.",
          "summary는 짧은 호출용 설명이고, detail은 말투, 성격, 역할, 특수효과, 등장 조건까지 담는 긴 설명입니다.",
          "챗봇이나 외부 도구가 특정 캐릭터만 뽑아 쓰기 쉽도록 Markdown 설명을 JSON 구조로 정리한 자료입니다.",
          "관리 문서와 같은 내용을 기계가 읽기 쉬운 형태로 반복하므로, 캐릭터 데이터 자동화나 검색에 쓰기 좋습니다."
        ]
      }
    ]
  },
  {
    id: "workers",
    title: "Worker 전문",
    lead: "챗봇이 만든 호출 주소를 실제 화면, 카드, 주사위, 대사창, 행동 장면으로 바꾸는 Cloudflare Worker 소스입니다.",
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
    id: "operation-docs",
    title: "기능별 정상작동 문서",
    lead: "맨 마지막에 보는 참고 자료입니다. 실제 원문과 Worker 전문을 본 뒤, 각 기능이 정상인지 확인할 때 사용합니다.",
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
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
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
    .detail-list {
      margin: 10px 0 0;
      padding-left: 1.2em;
    }
    .detail-list li {
      margin: 5px 0;
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
    <p class="lead">이 페이지는 듀란 챗봇이 답변을 만드는 데 직접 쓰는 원문만 남깁니다. 추가 데이터가 출력 형식을 잡고, 캐릭터 설정과 로어북과 캐릭터 정보 관리가 이야기 내용을 만들고, Worker가 그 내용을 화면으로 바꿔 챗봇 답변 안에 내보내는 흐름을 먼저 설명합니다.</p>
    <nav class="quick-links" aria-label="상단 이동">
      <a href="/">개발자용 문서 뷰어</a>
      <a href="#overview">작동 흐름</a>
      <a href="#terms">쉬운 용어</a>
      <a href="#archive">전체 원문</a>
    </nav>
  </header>

  <main>
    <section id="overview">
      <h2>카테고리가 이어지는 방식</h2>
      <p class="plain">각 원문은 따로 노는 파일이 아닙니다. 아래 순서대로 이어져서 사용자가 보는 챗봇 답변 하나를 만듭니다.</p>
      <div class="overview-grid">
        <div class="step"><span>1</span><strong>추가 데이터</strong>챗봇의 출력 형식을 정합니다. 무엇을 밖에 쓰면 안 되는지, 무엇을 Worker 주소 안에 넣어야 하는지 알려줍니다.</div>
        <div class="step"><span>2</span><strong>캐릭터 설정</strong>듀란이 놓인 세계와 관전층, 환경 진행을 잡습니다. 캐릭터가 자기 세계 안에서 어떻게 움직이는지 기준을 줍니다.</div>
        <div class="step"><span>3</span><strong>로어북 원문</strong>진행 규칙을 붙잡습니다. 상태, 카드, 판정, 시작 조건, 위험 조건 같은 운영 규칙을 챗봇이 참고합니다.</div>
        <div class="step"><span>4</span><strong>로어북 500자 버전</strong>같은 규칙을 더 짧게 쓰는 압축판입니다. 플랫폼에 넣을 공간이 부족할 때 비교해서 쓸 수 있습니다.</div>
        <div class="step"><span>5</span><strong>캐릭터 정보 관리</strong>등장인물의 기준입니다. 챗봇은 캐릭터 성격, 관계, 역할을 여기서 가져와 대사와 행동을 만듭니다.</div>
        <div class="step"><span>6</span><strong>Worker 전문</strong>챗봇이 만든 값을 화면으로 바꿉니다. 주사위, 카드, 장면, 대사창, 행동 연출이 여기서 만들어집니다.</div>
        <div class="step"><span>7</span><strong>기능별 정상작동 문서</strong>마지막 참고 자료입니다. 원문과 Worker를 본 뒤 각 기능이 제대로 동작하는지 확인할 때 봅니다.</div>
      </div>
      <div class="flow" aria-label="작동 흐름">
        <b>사용자 입력</b><span>→</span>
        <b>추가 데이터가 출력 형식 고정</b><span>→</span>
        <b>캐릭터 설정/로어북/캐릭터 정보 관리로 내용 결정</b><span>→</span>
        <b>Worker URL 작성</b><span>→</span>
        <b>Worker가 화면 생성</b><span>→</span>
        <b>챗봇 답변에 표시</b><span>→</span>
        <b>상태값이 다음 턴으로 이어짐</b>
      </div>
    </section>

    <section id="terms">
      <h2>처음 보는 용어</h2>
      <div class="terms">
        <div class="term"><strong>추가 데이터</strong>챗봇 답변의 틀입니다. 이야기 본문을 어디에 넣고, 상태값을 어떻게 남길지 정합니다.</div>
        <div class="term"><strong>캐릭터 설정</strong>듀란이 살아가는 세계와 진행 환경을 정합니다. 캐릭터가 어떤 세계 안에 놓였는지 알려줍니다.</div>
        <div class="term"><strong>로어북</strong>챗봇이 상황에 맞게 꺼내 보는 규칙 노트입니다. 세계 설정보다 “진행 중 지켜야 할 규칙”에 가깝습니다.</div>
        <div class="term"><strong>500자 버전</strong>긴 로어북을 짧게 줄인 버전입니다. 공간이 좁은 플랫폼에 넣을 때 비교 자료로 씁니다.</div>
        <div class="term"><strong>Worker</strong>Cloudflare에서 돌아가는 작은 서버입니다. 주소를 받으면 이미지, SVG, 텍스트 패널을 만들어 돌려줍니다.</div>
        <div class="term"><strong>슬롯</strong>값을 넣는 정해진 칸입니다. 예를 들어 대사, 배경, 표정, 상태 같은 값을 각 칸에 넣습니다.</div>
        <div class="term"><strong>Worker URL</strong>챗봇 답변 안에 들어가는 호출 주소입니다. 이야기 본문과 상태값이 이 주소 안에 담깁니다.</div>
        <div class="term"><strong>Turn</strong>사용자 입력 한 번에 대한 한 번의 진행 결과입니다. 장면, 대사, 판정, 다음 상태가 같이 움직입니다.</div>
        <div class="term"><strong>전문</strong>중간을 자르지 않은 원문 전체입니다. 아래 원문 칸은 요약본이 아니라 파일 내용을 그대로 불러옵니다.</div>
      </div>
    </section>

    <section>
      <h2>읽는 순서</h2>
      <p class="plain">처음이라면 추가 데이터 → 캐릭터 설정 → 로어북 원문 → 로어북 500자 버전 → 캐릭터 정보 관리 → Worker 전문 순서로 보면 됩니다. 기능별 정상작동 문서는 맨 마지막 참고 자료로 보면 됩니다.</p>
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
      if (Array.isArray(item.details) && item.details.length) {
        const detailLabel = document.createElement("strong");
        detailLabel.textContent = "원문 해석";
        const list = document.createElement("ul");
        list.className = "detail-list";
        for (const detail of item.details) {
          const li = document.createElement("li");
          li.textContent = detail;
          list.appendChild(li);
        }
        explain.append(detailLabel, list);
      }

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

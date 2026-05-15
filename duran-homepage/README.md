# 듀란일대기 홈페이지 시안

`005_홈페이지 제작용` 자료를 바탕으로 만든 서사형 홈페이지 초안입니다.

## 구성

- `index.html`: 로컬 미리보기 진입점
- `homepage.js`: 실제 화면을 렌더링하는 공유 템플릿
- `worker.js`: Cloudflare Worker 진입점
- `assets/arcadia-map.png`: Arcadia 고전 세계도
- `assets/ornate-frame-*.png`: 제공받은 프레임 시트에서 잘라낸 금장 장식 PNG

## 기획 방향

- 첫 화면의 브랜드 신호는 `듀란일대기`와 `죽지 않는 기사 전사편`으로 고정했습니다.
- 정서는 자료의 체크리스트에 맞춰 건조한 전쟁 후유증, 낮은 기록, 피난민 공동체의 기억에 맞췄습니다.
- 핵심 흐름은 `Arcadia 고전 세계도 → Greenhollow 함락 → Newhollow 형성 → Duran 성장 → 5083년 첫 전투`입니다.
- 주요 하위 섹션은 세계도, 연표, 인물, 낮은 사물입니다.
- 공개 문구는 설정집 설명보다 판타지 서문에 가깝게 조정했습니다.

## Worker 메모

`worker.js`는 Cloudflare Worker module syntax를 사용합니다. `/assets/arcadia-map.png`를 Worker Assets로 같이 올리거나, `ASSET_BASE_URL` 환경 변수를 지정하면 외부 asset base에서 이미지를 불러옵니다.

`wrangler.toml`에는 `assets` 바인딩을 포함해 두었습니다.
